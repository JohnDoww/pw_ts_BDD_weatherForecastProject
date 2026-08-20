/**
 * This file defines the App class, which serves as a central point for accessing all services and all pages in the application.
 * It imports the all service and page classes and initializes them in the constructor.
 * The App class can be extended to include additional services and pages.
 * This class  is the entry point for all the services and pages in the application, providing a single access point for all functionality.
 */

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
