import { Page } from "@playwright/test";
import { AppServices } from "./services/AppServices";
import { AppPages } from "./pages/AppPages";

export class App {
  readonly page: Page;
  readonly api: AppServices;
  readonly pages: AppPages;

  constructor(page: Page) {
    this.page = page;
    this.api = new AppServices(page);
    this.pages = new AppPages(page);
  }
}
