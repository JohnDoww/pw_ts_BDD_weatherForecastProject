/**
 * This file defines the HomePage class, which represents the home page of the application.
 * It extends the BasePage class and provides implementations for opening and loading the home page.
 * The HomePage class can be used to interact with the home page in tests.
 */
import { BasePage } from "./BasePage.abstract";

export class HomePage extends BasePage {
  async open(): Promise<void> {
    await this.page.goto("/");
  }

  async loaded(): Promise<void> {
    await this.page.waitForLoadState("load");
  }
}
