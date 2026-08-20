/**
 * This file defines the WeatherForecastService class, which represents the weather forecast service.
 * It extends the BaseService class and provides specific implementations for making requests.
 */

import { BaseService } from "./BaseService.abstract";
import { cityBasedWeatherForecastSchema } from "../../utils/dataModels/weatherForecastDataTypes";

export class WeatherForecastService extends BaseService {
  private readonly serviceUrl: string = this.urls.api + "/search";

  isObjectMatchNeededResponseType(obj: any): boolean {
    const schema = cityBasedWeatherForecastSchema;
    return schema.safeParse(obj).success;
  }

  async getRequest(options?: { params?: string; headers?: {} }): Promise<{}> {
    const { params, headers } = options || {};
    const url = params ? `${this.serviceUrl}?${params}` : this.serviceUrl;
    const response = await this.getRequestBase(url, headers);

    return response;
  }

  async postRequest(options?: {
    params?: string;
    headers?: {};
    body?: {};
  }): Promise<{}> {
    const { params, headers, body } = options || {};
    const url = params ? `${this.serviceUrl}/${params}` : this.serviceUrl;

    const response = await this.postRequestBase(url, headers, body);

    return response;
  }
}
