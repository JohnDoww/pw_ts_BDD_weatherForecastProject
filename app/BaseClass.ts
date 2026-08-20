/**
 * BaseClass.ts
 * This file defines the BaseClass which serves as a foundational class for other classes in the project.
 * It provides common properties and methods that can be inherited by subclasses.
 */

import { Page } from "@playwright/test";
import { FunctionHelpers } from "../utils/helpers/HelperFunctions";
import { urls } from "../utils/data/urls";

export class BaseClass {
  protected page: Page;
  protected helper: FunctionHelpers;
  protected urls = urls;

  constructor(page: Page) {
    this.page = page;
    this.helper = new FunctionHelpers(page);

  }
}
