import { DataTable, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I add {string} to the cart', async function (this: CustomWorld, product: string) {
  await this.inventoryPage.addToCart(product);
});

When('I remove {string} from the cart', async function (this: CustomWorld, product: string) {
  await this.inventoryPage.removeFromCart(product);
});

When('I open the cart', async function (this: CustomWorld) {
  await this.inventoryPage.openCart();
});

Then('the cart badge should show {string}', async function (this: CustomWorld, count: string) {
  await expect(this.inventoryPage.cartBadge).toHaveText(count);
});

Then('the cart should contain:', async function (this: CustomWorld, table: DataTable) {
  const expected = table.raw().map(([name]) => name);
  await expect(this.cartPage.itemNames).toHaveText(expected);
});
