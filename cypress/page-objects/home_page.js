import { customElement } from "../helpers/custom_element";
import { HeaderSection } from "./common/header_page";
import { EditProfile } from "./edit_profile_modal";
import { LoginPage } from "./login_page";

export class HomePage extends HeaderSection {
  constructor() {
    super("dashboard");
    this.editProfileButton = customElement(
      "[data-testid='toggle-edit-profile-button']"
    );
    this.firstNameValue = customElement("[data-testid='name']");
    this.lastNameValue = customElement("[data-testid='surname']");
    this.emailValue = customElement("[data-testid='email']");
    this.telephoneValue = customElement("[data-testid='phone']");
    this.ageValue = customElement("[data-testid='age']");
    this.accountNumberValue = customElement("[data-testid='account-number']");
    this.accountBalanceValue = customElement("[data-testid='account-balance']");
    this.logoutButton = customElement(".logout-link");
    this.logoImage = customElement("[data-testid='logo-img']");
    this.headerText = customElement(".app-title");
    this.successfullMessage = customElement(".update-message");
    this.accountNumberHeader = customElement(
      "[data-testid='account-number-heading']"
    );
  }

  clickEditProfile() {
    this.editProfileButton.get().click();
    return new EditProfile();
  }

  nameHaveText(name) {
    this.firstNameValue.get().should("contain.text", name);
    return this;
  }

  surnameHaveText(surname) {
    this.lastNameValue.get().should("contain.text", surname);
    return this;
  }

  emailHaveText(email) {
    this.emailValue.get().should("contain.text", email);
    return this;
  }

  telephoneHaveText(telephone) {
    this.telephoneValue.get().should("contain.text", telephone);
    return this;
  }

  ageHaveText(age) {
    this.ageValue.get().should("contain.text", age);
    return this;
  }

  accountNumberHaveValueAndIsVisible(accountNumber) {
    this.accountNumberValue
      .get()
      .should("contain.text", accountNumber.toString())
      .and("be.visible");
    return this;
  }

  balanceHaveTextAndIsVisible(balance) {
    this.accountBalanceValue
      .get()
      .should("contain.text", balance.toString())
      .and("be.visible");
    return this;
  }

  clickLogout() {
    this.logoutButton.get().click();
    return new LoginPage();
  }

  logoIsVisible() {
    this.logoImage.get().should("be.visible");
    return this;
  }

  headerHaveText(text) {
    this.headerText.get().should("have.text", text);
    return this;
  }

  transactionsHaveText(text) {
    this.dashboardTransactions.getXpath().should("have.text", text);
    return this;
  }

  accountsIsNotClicked() {
    this.dashboardAccounts.getXpath().should("not.have.attr", "onclick");
    return this;
  }

  editProfileIsClickable() {
    this.editProfileButton
      .get()
      .should("be.visible")
      .should("be.enabled")
      .click();
    return new EditProfile();
  }

  accountNumberContainsText(text) {
    this.accountNumberHeader.get().should("contain", text);
    return this;
  }
}
