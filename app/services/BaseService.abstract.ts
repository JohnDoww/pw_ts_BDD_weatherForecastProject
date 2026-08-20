import { BaseClass } from "../BaseClass";

export abstract class BaseService extends BaseClass {
  abstract getRequest(options?: {
    params?: string,
    headers?: {},
  }): {};

  abstract postRequest(options?: {
    params?: string,
    headers?: {},
    body?: {},
  }): {};

  async postRequestBase(
    url: string,
    headers?: {},
    body?: {},
  ): Promise<Record<string, any>> {
    const requestData: Record<string, any> = {};

    headers
      ? (requestData["headers"] = headers as Record<string, any>)
      : undefined;
    body ? (requestData["data"] = body as Record<string, any>) : undefined;

    const response = await this.page.request.post(url, requestData);

    return response.json();
  }

  async getRequestBase(
    url: string,
    headers?: {},
  ): Promise<Record<string, any>> {
    const requestData: Record<string, any> = {};

    headers
      ? (requestData["headers"] = headers as Record<string, any>)
      : undefined;

    const response = await this.page.request.get(url, requestData);

    return response;
  }
}
