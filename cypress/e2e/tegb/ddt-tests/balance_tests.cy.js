import newBalanceData from "../../../fixtures/account_balance_data.json";
import { LoginPage } from "../../../page-objects/login_page";
import { faker } from "@faker-js/faker";
import { AccountApi } from "../../../api/tegb/create_account_api";
import { UserApi } from "../../../api/tegb/user_api";

describe("DDT test account balance", () => {
  let firstName;
  let lastName;
  let email;
  let telephone;
  let age;
  let username;
  let password;
  let accountNumber;
  let balance;

  beforeEach(() => {
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

  newBalanceData.forEach((balanceValue) => {
    it(`Add balance ${balanceValue.balance} Kč`, () => {
      const value = balanceValue.balance;
      const type = "checking";
      const user = new UserApi();
      const accounts = new AccountApi();
      user.register(username, password, email);
      user.login(username, password).as("login_response");
      cy.get("@login_response").then((response) => {
        const token = response.body.access_token;
        cy.setCookie("access_token", token);
        accounts.createAccount(token, value, type).as("account");
        cy.get("@account").then((accountResponse) => {
          accountNumber = accountResponse.body.accountNumber;
          balance = accountResponse.body.balance;
          cy.log(accountNumber);
          cy.log(balance);

          new LoginPage()
            .typeLoginUsername(username)
            .typeLoginPassword(password)
            .clickLogin()
            .balanceHaveTextAndIsVisible(balance);
        });
      });
    });
  });
});
