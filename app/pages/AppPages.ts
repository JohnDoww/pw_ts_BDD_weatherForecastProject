import { Page } from "@playwright/test";

export class AppPages {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
