import { customElement } from "../../../helpers/custom_element";
import { BasePage } from "./base_page";

export class MenuSection extends BasePage {
  constructor(path) {
    super(path);
    this.dashboardHome = customElement(
      "//aside[@class='dashboard-sidebar']//li[1]"
    );
    this.dashboardAccounts = customElement(
      "//aside[@class='dashboard-sidebar']//li[2]"
    );
    this.dashboardTransactions = customElement(
      "//aside[@class='dashboard-sidebar']//li[3]"
    );
    this.dashboardSupport = customElement(
      "//aside[@class='dashboard-sidebar']//li[4]"
    );
  }
}
