/**
 * This file defines the AppServices class, which serves as a central point for accessing different service classes in the application.
 * It imports the necessary service classes and initializes them in the constructor.
 * The AppServices class can be extended to include additional services as needed.
 */

import { Page } from "@playwright/test";
import { WeatherForecastService } from "./WeatherForecastService";
import { AnotherExampleService } from "./AnotherExampleService";

export class AppServices {
  protected page: Page;
  readonly weatherForecastService: WeatherForecastService;
  readonly anotherExampleService: AnotherExampleService;

  constructor(page: Page) {
    this.page = page;
    this.weatherForecastService = new WeatherForecastService(page);
    this.anotherExampleService = new AnotherExampleService(page);
  }
}
