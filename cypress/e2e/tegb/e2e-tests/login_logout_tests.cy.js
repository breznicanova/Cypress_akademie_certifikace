import { LoginPage } from "../../../page-objects/login_page";
import { faker } from "@faker-js/faker";
import { AccountApi } from "../../../api/tegb/create_account_api";
import { UserApi } from "../../../api/tegb/user_api";

describe("Login, fill prifile and logout", () => {
  let firstName;
  let lastName;
  let email;
  let telephone;
  let age;
  let username;
  let password;
  let accountNumber;
  let balance;

  before(() => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    email = faker.internet.exampleEmail({
      firstName: firstName,
      lastName: lastName,
    });
    telephone = faker.phone.number();
    age = faker.string.numeric({ length: 2, allowLeadingZeros: false });
    username = faker.internet.userName({
      firstName: firstName,
      lastName: lastName,
    });
    password = faker.internet.password({ length: 20 });

    cy.log(username);
    cy.log(password);

    new LoginPage().openTegb();
  });

  it.only("Register user and create account", () => {
    const startBalance = 10000;
    const type = "checking";
    const user = new UserApi();
    const accounts = new AccountApi();
    user.register(username, password, email);
    user.login(username, password).as("login_response");
    cy.get("@login_response").then((response) => {
      const token = response.body.access_token;
      cy.setCookie("access_token", token);
      accounts.createAccount(token, startBalance, type).as("account");
      cy.get("@account").then((accountResponse) => {
        accountNumber = accountResponse.body.accountNumber;
        balance = accountResponse.body.balance;
        cy.log(accountNumber);
        cy.log(balance);

        new LoginPage()
          .typeLoginUsername(username)
          .typeLoginPassword(password)
          .clickLogin()
          .clickEditProfile()
          .typeFirstName(firstName)
          .typeLastName(lastName)
          .typeEmail(email)
          .typeTelephone(telephone)
          .typeAge(age)
          .clickSave()
          .nameHaveText(firstName)
          .surnameHaveText(lastName)
          .emailHaveText(email)
          .telephoneHaveText(telephone)
          .ageHaveText(age)
          .accountNumberHaveValueAndIsVisible(accountNumber)
          .balanceHaveTextAndIsVisible(balance)
          .clickLogout();
      });
    });
  });
});
