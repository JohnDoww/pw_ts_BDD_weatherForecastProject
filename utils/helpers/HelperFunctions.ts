/**
 * This file defines helper functions for the application.
 * It imports the necessary modules and sets up the helper functions for the BDD tests.
 * The helper functions can be used in the BDD step definitions to perform common tasks and operations.
 */

import { Page } from "@playwright/test";

export class FunctionHelpers {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
}
