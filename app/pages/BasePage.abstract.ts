import { BaseClass } from "../BaseClass";

export abstract class BasePage extends BaseClass {
  abstract open(...args: unknown[]): Promise<void>;
  abstract loaded(...args: unknown[]): Promise<void>;
}
