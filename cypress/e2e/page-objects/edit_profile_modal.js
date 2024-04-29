import { customElement } from "../../helpers/custom_element";
import { HeaderSection } from "./common/header_page";
import { HomePage } from "./home_page";

export class EditProfile extends HeaderSection {
  constructor() {
    super("tegb/accounts");
    this.firstNameInput = customElement("[data-testid='chage-name-input']");
    this.lastNameInput = customElement("[data-testid='chage-surname-input']");
    this.emailInput = customElement("[data-testid='chage-email-input']");
    this.telephoneInput = customElement("[data-testid='chage-phone-input']");
    this.ageInput = customElement("[data-testid='chage-age-input']");
    this.saveForm = customElement("form");
    this.exitButton = customElement(
      "[data-testid='toggle-edit-profile-button']"
    );
  }

  typeFirstName(firstName) {
    this.firstNameInput.get().type(firstName);
    return this;
  }

  typeLastName(lastName) {
    this.lastNameInput.get().type(lastName);
    return this;
  }

  typeEmail(email) {
    this.emailInput.get().type(email);
    return this;
  }

  typeTelephone(telephone) {
    this.telephoneInput.get().type(telephone);
    return this;
  }

  typeAge(age) {
    this.ageInput.get().type(age);
    return this;
  }

  clickSave() {
    this.saveForm.get().submit();
    return new HomePage();
  }

  clickExit() {
    this.exitButton.get().click();
    return new HomePage();
  }
}
