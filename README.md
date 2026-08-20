# Weather Forecast API tests (Playwright + TypeScript + BDD)

Automated API tests for a weather-forecast service. The idea of the service: you send a city
name, and it answers with a 7-day forecast where each day has activities (hiking, surfing,
outdoor / indoor sightseeing) ranked by how good the weather is for them.

Tests are written in plain English (Gherkin `.feature` files) and executed by Playwright
through `playwright-bdd`.

---

## 1. Project overview

### Structure

```
features/api/
  weatherForecastService.feature        # scenarios that run
  weatherForecastService.scenarios.txt  # scenarios to implement

app/
  App.ts                    # one entry point: new App(page).api / .pages
  BaseClass.ts              # gives every class the page, helpers and urls
  services/                 # API layer
    AppServices.ts          # list of all services
    BaseService.abstract.ts # shared GET/POST request code
    WeatherForecastService.ts
    AnotherExampleService.ts  # empty example of how to add a new service
    apiSteps.ts             # step definitions for the API scenarios
  pages/                    # UI layer, prepared for later
    AppPages.ts, BasePage.abstract.ts, HomePage.ts, uiSteps.ts

fixtures/
  dataExchangeFixture.ts    # test fixtures: apiServices + ctx (shared data between steps)

utils/
  data/urls.ts              # base URLs
  dataModels/               # types and zod schemas of API responses
  helpers/HelperFunctions.ts   # place for shared helper functions

tests/features-gen/          # generated from .feature files - do not edit by hand
.github/workflows/playwright.yml
playwright.config.ts
```

### Design patterns and Best Practices

- **BDD / Gherkin** - a scenario is written as readable sentences; each sentence is connected to
  code in `apiSteps.ts`.
- **Followed Principles** - OOP Principles (Inheritance, Encapsulation, Polymorphism and Abstraction), DRY, KISS, YAGNI
- **Facade** - `App` is a single door to everything: `new App(page).api.weatherForecastService`.
  You never need to import a service directly in a test.
- **Service object (same idea as Page Object)** - one class per API service. The class knows its
  own URL and its own response schema, the test does not.
- **Base class + abstract class** - `BaseClass` shares `page`, `helper` and `urls`.
  `BaseService.abstract` holds the common request code (`getRequestBase`, `postRequestBase`) and
  forces every service to have `getRequest` / `postRequest`.
- **Fixtures for shared state** - `apiServices` builds the services for a test, and `ctx` carries
  the response from a `When` step to the `Then` steps.
- **Schema validation instead of many small checks** - one zod schema check replaces dozens of
  field-by-field assertions.
- **Soft assertions** - `expect.soft` lets a scenario report all problems, not only the first one.
  A failed response body is attached to the report.
- **Custom Gherkin parameter** - `{serviceName}` in step text, so the same step works for any
  service.
- **Parallelization** - all tests are executed in parallel.
- **Scalable system** - this framework can be easily scaled by adding more classes to AppServices.ts and AppPages.ts.
- **Tests are independent**
- **Tests have clear errors in the case tests are broken**
- **Tests are fully integrated with CI**

### Tools

| Tool                      | Why                                                        |
| ------------------------- | ---------------------------------------------------------- |
| Playwright Test           | runner, API requests, report, traces                       |
| playwright-bdd (`bddgen`) | turns `.feature` files into Playwright tests               |
| TypeScript                | typed test code                                            |
| zod                       | validates that the API response matches the expected shape |
| Node.js + npm             | runtime and scripts                                        |
| GitHub Actions            | runs the tests on every push / pull request                |
| ESLint                    | To be added - for following project coding style           |

---

## 2. How to install

You need Node.js LTS and npm.

```bash
git clone https://github.com/JohnDoww/pw_ts_BDD_weatherForecastProject.git
cd pw_ts_BDD_weatherForecastProject
npm ci                      # or: npm install
npx playwright install      # download browsers
```

---

## 3. How to run tests

```bash
npm run test:bdd            # main command: generate tests from .feature, then run them
```

Other commands:

```bash
npm run bdd:gen             # only generate tests into tests/features-gen
npm test                    # only run already generated tests
npx playwright show-report  # open the HTML report of the last run
```

---

## 4. Assumptions

- **The response schema is taken from the data model, not from a real API.** The service under
  test does not exist yet, so the expected response shape is `CityBasedWeatherForecast` and its
  zod schema `cityBasedWeatherForecastSchema` in
  `utils/dataModels/weatherForecastDataTypes.ts`. That file is treated as the contract: if the
  real API changes, change it there only.

- **The current endpoint is a stand-in.** `utils/data/urls.ts` points to the Open-Meteo geocoding
  API (`https://geocoding-api.open-meteo.com/v1`, service path `/search`). It answers with city
  coordinates, not with a forecast, so the step _"Response from ... should match the data type"_
  is expected to fail until the real service is ready. When it is ready, only `urls.api` has to
  be updated.

- **Service mocking is needed for most scenarios.** The service depends on Open-Meteo, and we
  cannot ask a live provider for snow, for a 500 error or for a broken body. So scenarios about
  weather content (suitability and reasoning per activity) and about provider failures
  (500, 503, 504, 429, corrupted payload) require mocked responses - for example intercepting the
  request with Playwright `page.route(...)` and returning a prepared JSON, or running the service
  against a mock server. These scenarios are parked in
  `features/api/weatherForecastService.scenarios.txt` and will move into the `.feature` file when
  mocking is added.

- **City name limits are guessed.** The MIN / MAX examples in the feature file
  (`kyiv`, `longAllowedNameHEre`) are placeholders. Replace them with the real limits once the
  service defines them.

- **Dates are `YYYY-MM-DD`** (see `ISODateString` in `utils/dataModels/commonDataTypes.ts`), and
  a forecast is assumed to be 7 days starting today.

- **`app/pages/*` and `HelperFunctions.ts` are scaffolding.** They are prepared for future UI
  tests and are not used by the API suite. `AnotherExampleService.ts` is an intentional stub that
  throws - it shows how a second service would be added.

---

## 5. Omissions

- Not all tes scenarios are covered, Mocking logic not implemented, tags structure for the tests and Before all test file with service health check wasn't implemented - it was intentionally to do not extend test framework implementation time.
