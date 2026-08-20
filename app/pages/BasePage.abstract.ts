/**
 * This file defines the abstract class BasePage, which serves as a base class for all page objects in the application.
 * It extends the BaseClass and provides abstract methods for opening and loading pages.
 * Subclasses of BasePage must implement the open and loaded methods to define specific behavior for each page.
 */

import { BaseClass } from "../BaseClass";

export abstract class BasePage extends BaseClass {
  abstract open(...args: unknown[]): Promise<void>;
  abstract loaded(...args: unknown[]): Promise<void>;
}
