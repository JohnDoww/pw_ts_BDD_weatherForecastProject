/**
 * This file is used to define the AppPages class, which serves as a central point for accessing different page objects in the application.
 * It imports the necessary page classes and initializes them in the constructor.
 * The AppPages class can be extended to include additional pages as needed.
 */

import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class AppPages {
  protected page: Page;
  readonly homePage: HomePage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
  }
}
