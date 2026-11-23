import 'dotenv/config';

type BrowserName = 'chromium' | 'firefox' | 'webkit';

// `||` (not `??`) so that an empty CI secret also falls back to the default.
export const config = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  browser: (process.env.BROWSER || 'chromium') as BrowserName,
  headless: process.env.HEADLESS !== 'false',
  slowMo: Number(process.env.SLOW_MO || 0),
  defaultTimeoutMs: 30_000,
  users: {
    standard: {
      username: process.env.SAUCE_USERNAME || 'standard_user',
      password: process.env.SAUCE_PASSWORD || 'secret_sauce',
    },
    lockedOut: {
      username: 'locked_out_user',
      password: process.env.SAUCE_PASSWORD || 'secret_sauce',
    },
  },
};

export type UserKey = keyof typeof config.users;
