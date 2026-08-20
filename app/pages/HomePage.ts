import { BasePage } from "./BasePage.abstract";

export class HomePage extends BasePage {
  async open(): Promise<void> {
    await this.page.goto("/");
  }

  async loaded(): Promise<void> {
    await this.page.waitForLoadState("load");
  }
}
