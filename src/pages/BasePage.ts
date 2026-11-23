import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  // saucedemo.com marks elements with data-test="..."
  protected byTestId(id: string): Locator {
    return this.page.locator(`[data-test="${id}"]`);
  }

  get title(): Locator {
    return this.byTestId('title');
  }
}
