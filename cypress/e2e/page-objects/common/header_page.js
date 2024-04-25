import { customElement } from "../../../helpers/custom_element";
import { LoginPage } from "../login_page";
import { MenuSection } from "./menu_section";

export class HeaderSection extends MenuSection {
  constructor(path) {
    super(path);
    this.logoutButton = customElement(".logout-link");
  }

  clickLogout() {
    this.logoutButton.get().click();
    return new LoginPage();
  }
}
