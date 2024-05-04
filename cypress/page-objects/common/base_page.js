export class BasePage {
  constructor(path) {
    this.baseUrl = Cypress.env("tegb_url");
    this.path = path;
  }

  visit() {
    cy.visit(this.baseUrl + this.path);
    return this;
  }
}
