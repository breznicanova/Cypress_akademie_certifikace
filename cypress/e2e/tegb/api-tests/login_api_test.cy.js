import { UserApi } from "../../../api/tegb/user_api";
import { LoginPage } from "../../page-objects/login_page";

describe("Login API test", () => {
  beforeEach(() => {
    new LoginPage().openTegb();
  });
  it("Token and response status check", () => {
    const username = Cypress.env("tegb_username");
    const password = Cypress.env("tegb_password");
    const user = new UserApi();
    let accessToken;

    user.login(username, password).as("login_response");
    cy.get("@login_response").then((response) => {
      accessToken = response.body.access_token;
      expect(accessToken).to.not.be.empty;
      expect(response.status).to.eq(201);
    });
  });
});
