/**
 * This file defines the API step definitions for the BDD tests.
 */

import { expect } from "@playwright/test";
import { When, Then, test } from "../../fixtures/dataExchangeFixture";
import { defineParameterType } from "playwright-bdd";
import { AppServices } from "../../app/services/AppServices";

defineParameterType({
  name: "serviceName",
  regexp: /["']?(anotherExampleService|weatherForecastService)["']?/,
  transformer: (s) => s as keyof AppServices,
});

When(
  "GET {serviceName} without params and headers",
  async ({ ctx, apiServices }, serviceName: keyof AppServices) => {
    ctx.response = await apiServices[serviceName].getRequest();
  },
);

When(
  "GET {serviceName} with {string} params",
  async (
    { ctx, apiServices },
    serviceName: keyof AppServices,
    params: string,
  ) => {
    ctx.response = await apiServices[serviceName].getRequest({
      params: params,
    });
  },
);

Then(
  "Response from service should contain:",
  async ({ ctx }, docString: string) => {
    const expectedObject = JSON.parse(docString);
    const responseBody = await ctx.response.json();
    expect
      .soft(
        responseBody,
        `Response ${responseBody} should contain ${JSON.stringify(expectedObject)}`,
      )
      .toMatchObject(expectedObject);
  },
);

Then(
  "Response from {serviceName} should match the data type",
  async ({ ctx, apiServices }, serviceName: keyof AppServices) => {
    const isMatched = apiServices[serviceName].isObjectMatchNeededResponseType(
      ctx.response,
    );
    if (!isMatched) {
      await test.info().attach("Wrong Response Body", {
        body: JSON.stringify(await ctx.response.json(), null, 2),
        contentType: "application/json",
      });
    }
    expect
      .soft(
        isMatched,
        `Response from ${serviceName} matches the expected data type`,
      )
      .toBe(true);
  },
);

Then("Response status should be {int}", async ({ ctx }, statusCode: number) => {
  expect
    .soft(ctx.response.status(), `Response status should be ${statusCode}`)
    .toBe(statusCode);
});
