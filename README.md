# saucedemo-e2e

End-to-end UI tests for [saucedemo.com](https://www.saucedemo.com) (Swag Labs demo store).

**Stack:** Playwright · Cucumber (BDD / Gherkin) · TypeScript · Page Object Model

## What is covered

| Feature   | Scenarios                                                          | Tags                    |
|-----------|--------------------------------------------------------------------|-------------------------|
| Login     | valid login, locked-out user, validation (empty/wrong credentials) | `@smoke` `@regression`  |
| Cart      | add, remove, cart content                                          | `@smoke` `@regression`  |
| Sorting   | price asc/desc, name Z–A                                           | `@regression`           |
| Checkout  | full purchase, required postal code                                | `@smoke` `@e2e` `@regression` |

## Project structure

```
features/            Gherkin scenarios
src/
  pages/             Page Objects (BasePage, LoginPage, InventoryPage, CartPage, CheckoutPage)
  steps/             Step definitions
  support/
    config.ts        Environment config (BASE_URL, BROWSER, HEADLESS, credentials)
    world.ts         Custom World: page + page objects per scenario
    hooks.ts         Browser lifecycle, screenshot on failure
cucumber.js          Cucumber profiles: default / smoke / regression
```

## Run locally

Requires Node.js 22+.

```bash
npm ci
npx playwright install chromium
cp .env.example .env        # optional, defaults work out of the box

npm test                    # all scenarios
npm run test:smoke          # @smoke only
npm run test:regression     # @regression only
npm run test:headed         # watch the browser
npx cucumber-js --tags "@cart and not @wip"
```

## Reports

After a run, see `reports/`:

- `cucumber-report.html` — HTML report (failed scenarios include a screenshot)
- `cucumber-report.json` — for third-party reporters
- `junit.xml` — for CI test result widgets (GitHub Actions, GitLab, Jenkins)

## Environment variables

| Variable          | Default                       | Description                     |
|-------------------|-------------------------------|---------------------------------|
| `BASE_URL`        | `https://www.saucedemo.com`   | Application under test          |
| `BROWSER`         | `chromium`                    | `chromium` / `firefox` / `webkit` |
| `HEADLESS`        | `true`                        | `false` to see the browser      |
| `SAUCE_USERNAME`  | `standard_user`               | Test user                       |
| `SAUCE_PASSWORD`  | `secret_sauce`                | Test password (use a CI secret) |
| `CI`              | —                             | When set, `@flaky` scenarios get 1 retry |

## CI

[![E2E tests](https://github.com/mykhailovskyidv-spec/saucedemo-e2e/actions/workflows/e2e.yml/badge.svg)](https://github.com/mykhailovskyidv-spec/saucedemo-e2e/actions/workflows/e2e.yml)

- **Push / PR:** `@smoke` suite in Chromium
- **Nightly:** full `@regression` suite in Chromium, Firefox and WebKit (matrix)
- **Manual:** any tag expression and browser via "Run workflow"
- Reports (HTML + screenshots) are uploaded as artifacts; results are published as a GitHub check