import { customElement } from "../../helpers/custom_element";
import { HeaderSection } from "./common/header_page";
import { EditProfile } from "./edit_profile_modal";

export class HomePage extends HeaderSection {
  constructor() {
    super("tegb/profile");
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
      .should("contain.text", accountNumber)
      .and("be.visible");
    return this;
  }

  balanceHaveTextAndIsVisible(balance) {
    this.accountBalanceValue
      .get()
      .should("contain.text", balance)
      .and("be.visible");
    return this;
  }
}
