/**
 * This file defines the data exchange fixture for the BDD tests.
 * It imports the necessary modules and sets up the test fixtures for API services and context.
 * The test fixtures can be used in the BDD step definitions to access the API services and context.
 */

import { APIResponse } from "@playwright/test";
import { test as base, createBdd } from "playwright-bdd";
import { App } from "../app/App";

type Fixtures = {
  ctx: { response: APIResponse | any };
  apiServices: App["api"];
};

export const test = base.extend<Fixtures>({
  ctx: async ({}, use) => {
    const ctx = {} as Fixtures["ctx"];
    await use(ctx);
  },

  apiServices: async ({ page }, use) => {
    const apiServices = new App(page).api;
    await use(apiServices);
  },
});

export const { Given, When, Then } = createBdd(test);
