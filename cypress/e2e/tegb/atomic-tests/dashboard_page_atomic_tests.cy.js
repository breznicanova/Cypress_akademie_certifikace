import { HomePage } from "../../page-objects/home_page";
import { LoginPage } from "../../page-objects/login_page";
import { faker } from "@faker-js/faker";

describe("Dashboard Page Atomic Tests", { testIsolation: false }, () => {
  before(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    const username = Cypress.env("tegb_username");
    const password = Cypress.env("tegb_password");

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
    it("Message is visible and have text", () => {
      const firstName = faker.person.firstName();
      const age = faker.string.numeric({ length: 2, allowLeadingZeros: false });
      new HomePage()
        .clickEditProfile()
        .typeFirstName(firstName)
        .typeAge(age)
        .clickSave()
        .messageIsVisibleAndHaveText("Profile updated successfully!");
    });

    it("Edit Profile button is clickable", () => {
      new HomePage().editProfileIsClickable().clickExit();
    });

    it("Account number heading contains text", () => {
      new HomePage().accountNumberContainsText("Číslo");
    });
  });
});
