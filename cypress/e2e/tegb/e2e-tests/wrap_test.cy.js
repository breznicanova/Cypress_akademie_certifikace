import { AccountApi } from "../../../api/tegb/create_account_api";
import { UserApi } from "../../../api/tegb/user_api";
import { LoginPage } from "../../page-objects/login_page";

describe("Access to account_number and balance test", () => {
  let accountNumber;
  let balance;

  beforeEach(() => {});
  it("How to access and assert?", () => {
    new LoginPage().openTegb();

    const startBalance = 10000;
    const type = "checking";
    const user = new UserApi();
    const accounts = new AccountApi();
    user
      .login(Cypress.env("tegb_username"), Cypress.env("tegb_password"))
      .as("login_response");
    cy.get("@login_response").then((response) => {
      const token = response.body.access_token;
      cy.setCookie("access_token", token);
      accounts.createAccount(token, startBalance, type).as("account");
      cy.get("@account").then((accountResponse) => {
        accountNumber = cy.wrap(accountResponse.body.accountNumber);
        balance = accountResponse.body.balance;
        cy.log(accountNumber);
        cy.log(balance);

        new LoginPage()
          .typeLoginUsername(Cypress.env("tegb_username"))
          .typeLoginPassword(Cypress.env("tegb_password"))
          .clickLogin();

        cy.get("[data-testid='account-balance']").should(
          "contain.text",
          balance.toString()
        );
      });
    });
  });
});
