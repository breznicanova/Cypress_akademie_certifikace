import { customElement } from "../../helpers/custom_element";
import { HomePage } from "./home_page";

export class LoginPage {
  constructor() {
    this.tegbFrontendUrl = Cypress.env("tegb_url");
    this.registerButton = customElement("[data-testid='register-button']");
    this.usernameInput = customElement("[data-testid='username-input']");
    this.passwordInput = customElement("[data-testid='password-input']");
    this.loginButton = customElement("[data-testid='submit-button']");
    cy.intercept("tegb/profile").as("profile_api");
    cy.intercept("tegb/accounts").as("accounts_api");
  }

  openTegb() {
    cy.visit(this.tegbFrontendUrl);
    return this;
  }

  clickRegister() {
    this.registerButton.get().click();
    return new RegisterUser();
  }

  typeLoginUsername(username) {
    this.usernameInput.get().type(username);
    return this;
  }

  typeLoginPassword(password) {
    this.passwordInput.get().type(password);
    return this;
  }

  clickLogin() {
    this.loginButton.get().click();
    cy.wait("@profile_api");
    cy.wait("@accounts_api");
    return new HomePage();
  }
}
