import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { Browser, chromium, firefox, webkit } from '@playwright/test';
import { config } from './config';
import { CustomWorld } from './world';

setDefaultTimeout(config.defaultTimeoutMs);

let browser: Browser;

BeforeAll(async function () {
  const launcher = { chromium, firefox, webkit }[config.browser];
  browser = await launcher.launch({ headless: config.headless, slowMo: config.slowMo });
});

Before(async function (this: CustomWorld) {
  this.context = await browser.newContext({ baseURL: config.baseUrl });
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, { result }) {
  // Attach a screenshot to the report when a scenario fails
  if (result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
});
