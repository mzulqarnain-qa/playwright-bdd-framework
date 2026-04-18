import { type Locator, type Page } from '@playwright/test';
import { CheckoutPage } from '../Pages/CheckoutPage';

type LocatorFn = ((page: Page, ...args: unknown[]) => Locator | string) | string;

const merged: Record<string, LocatorFn> = {
  ...CheckoutPage,
};

export class ElementResolver {
  constructor(private readonly page: Page) {}

  get(name: string, ...args: unknown[]): Locator {
    const entry = merged[name];

    if (!entry) {
      throw new Error(
        `ElementResolver: unknown locator key "${name}". Please add it in CheckoutPage.ts or merged locator map.`
      );
    }

    if (typeof entry === 'string') {
      return this.page.locator(entry);
    }

    const result = (entry as (p: Page, ...a: unknown[]) => Locator | string)(this.page, ...args);

    return typeof result === 'string' ? this.page.locator(result) : result;
  }
}
