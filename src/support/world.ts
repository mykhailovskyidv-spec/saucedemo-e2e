import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// One World instance per scenario: holds the page and lazily created page objects.
export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  get loginPage() {
    return new LoginPage(this.page);
  }
  get inventoryPage() {
    return new InventoryPage(this.page);
  }
  get cartPage() {
    return new CartPage(this.page);
  }
  get checkoutPage() {
    return new CheckoutPage(this.page);
  }
}

setWorldConstructor(CustomWorld);
