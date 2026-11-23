import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SortOption } from '../pages/InventoryPage';
import { CustomWorld } from '../support/world';

const sortOptions: Record<string, SortOption> = {
  'Name (A to Z)': 'az',
  'Name (Z to A)': 'za',
  'Price (low to high)': 'lohi',
  'Price (high to low)': 'hilo',
};

When('I sort products by {string}', async function (this: CustomWorld, label: string) {
  const option = sortOptions[label];
  if (!option) throw new Error(`Unknown sort option: "${label}"`);
  await this.inventoryPage.sortBy(option);
});

Then('product prices should be sorted ascending', async function (this: CustomWorld) {
  const prices = await this.inventoryPage.getPrices();
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

Then('product prices should be sorted descending', async function (this: CustomWorld) {
  const prices = await this.inventoryPage.getPrices();
  expect(prices).toEqual([...prices].sort((a, b) => b - a));
});

Then('the first product should be {string}', async function (this: CustomWorld, name: string) {
  await expect(this.inventoryPage.itemNames.first()).toHaveText(name);
});
