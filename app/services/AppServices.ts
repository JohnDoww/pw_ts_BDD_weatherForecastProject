import { Page } from "@playwright/test";
import { WeatherForecastService } from "./WeatherForecastService";
import { AnotherExampleService } from "./AnotherExampleService";

export class AppServices {
  readonly page: Page;
  readonly weatherForecastService: WeatherForecastService;
  readonly anotherExampleService: AnotherExampleService;

  constructor(page: Page) {
    this.page = page;
    this.weatherForecastService = new WeatherForecastService(page);
    this.anotherExampleService = new AnotherExampleService(page);
  }
}
