import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { config, UserKey } from '../support/config';
import { CustomWorld } from '../support/world';

Given('I am on the login page', async function (this: CustomWorld) {
  await this.loginPage.open();
});

Given('I am logged in as {string} user', async function (this: CustomWorld, user: UserKey) {
  const { username, password } = config.users[user];
  await this.loginPage.open();
  await this.loginPage.login(username, password);
  await expect(this.inventoryPage.title).toHaveText('Products');
});

When('I log in as {string} user', async function (this: CustomWorld, user: UserKey) {
  const { username, password } = config.users[user];
  await this.loginPage.login(username, password);
});

When(
  'I log in with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage.login(username, password);
  },
);

Then('I should see the {string} page', async function (this: CustomWorld, title: string) {
  await expect(this.inventoryPage.title).toHaveText(title);
});

Then('I should see the login error {string}', async function (this: CustomWorld, message: string) {
  await expect(this.loginPage.error).toHaveText(message);
});
