import { HomePage } from "../../../page-objects/home_page";
import { LoginPage } from "../../../page-objects/login_page";
import { faker } from "@faker-js/faker";
import { AccountApi } from "../../../api/tegb/create_account_api";
import { UserApi } from "../../../api/tegb/user_api";

describe("Dashboard Page Atomic Tests", { testIsolation: false }, () => {
  let username;
  let password;
  let balance;

  before(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    username = Cypress.env("tegb_username");
    password = Cypress.env("tegb_password");

    new LoginPage()
      .openTegb()
      .typeLoginUsername(username)
      .typeLoginPassword(password)
      .clickLogin();
  });

  context("Header tests", () => {
    it("Logo is visible", () => {
      new HomePage().logoIsVisible();
    });

    it("Header have text", () => {
      new HomePage().headerHaveText("TEG#B Dashboard");
    });
  });

  context("Left menu tests", () => {
    it("Transactions have text", () => {
      new HomePage().transactionsHaveText("Transakce");
    });

    it("Accounts is not clickable", () => {
      new HomePage().accountsIsNotClicked();
    });
  });

  context("Dashboard content tests", () => {
    it("Neme and age have text after update profil", () => {
      const firstName = faker.person.firstName();
      const age = faker.string.numeric({ length: 2, allowLeadingZeros: false });
      new HomePage()
        .clickEditProfile()
        .typeFirstName(firstName)
        .typeAge(age)
        .clickSave()
        .nameHaveText(firstName)
        .ageHaveText(age);
    });

    it("Edit Profile button is clickable", () => {
      new HomePage().editProfileIsClickable().clickExit();
    });

    it("Account number heading contains text", () => {
      new HomePage().accountNumberContainsText("Číslo");
    });

    it("Account have balance after create account", () => {
      const startBalance = 10000;
      const type = "checking";
      const user = new UserApi();
      const accounts = new AccountApi();
      user.login(username, password).as("login_response");
      cy.get("@login_response").then((response) => {
        const token = response.body.access_token;
        cy.setCookie("access_token", token);
        accounts.createAccount(token, startBalance, type).as("account");
        cy.get("@account").then((accountResponse) => {
          balance = accountResponse.body.balance;

          new HomePage().balanceHaveTextAndIsVisible(balance);
        });
      });
    });
  });
});
