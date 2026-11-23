import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I proceed to checkout', async function (this: CustomWorld) {
  await this.cartPage.checkout();
});

When(
  'I enter checkout information {string}, {string}, {string}',
  async function (this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
    await this.checkoutPage.fillInformation(firstName, lastName, postalCode);
  },
);

When('I finish the order', async function (this: CustomWorld) {
  await this.checkoutPage.finish();
});

Then('I should see the order confirmation {string}', async function (this: CustomWorld, text: string) {
  await expect(this.checkoutPage.completeHeader).toHaveText(text);
});

Then('I should see the checkout error {string}', async function (this: CustomWorld, message: string) {
  await expect(this.checkoutPage.error).toHaveText(message);
});
