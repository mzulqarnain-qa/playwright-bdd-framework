# Playwright BDD Framework

Sample project using **Gherkin**, **[Playwright](https://playwright.dev/)**, and **[playwright-bdd](https://vitalets.github.io/playwright-bdd/)** so scenarios compile to Playwright tests (`bddgen`) and run with the Playwright runner.

The demo app is **[Sauce Demo](https://www.saucedemo.com/)** (Sauce Labs’ practice e-commerce UI).

## Contents

- **Features** (`Features/**/*.feature`) — Gherkin scenarios under `RegressionSuite/` (for example checkout).
- **Step definitions** (`TestFramework/Steps/**/*.ts`) — `createBdd(test)` steps; locators resolved via `ElementResolver`.
- **Page maps** (`TestFramework/Pages/*.ts`) — locator objects merged into `ElementResolver`.
- **Support** (`TestFramework/Support/`) — shared `test` export and `ElementResolver`.
- **Config** (`TestFramework/TestConfig/testconfig.json`) — loaded at startup via `configLoader.ts` (`BASE_URL`, credentials in `process.env`).
- **Generated tests** — `.features-gen/` (from `bddgen` / `npm test`; ignored in git).
- **Saved login state** — `TestFramework/Auth/auth.json` is created by `global.setup.ts` before tests (Playwright `storageState`). It is **not** committed; configure `.env` (see `.env.example`) and run `npm test` once to generate it.

## Prerequisites

- Node.js 18+ (LTS recommended).

## Run

```bash
npm install
npx playwright install chromium
npm test
```

`npm test` runs **`bddgen`** then **`playwright test`**.

| Command                | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| `npm run test:headed`  | Headed browser.                                    |
| `npm run test:ui`      | Playwright UI mode.                                |
| `npm run bddgen`       | Regenerate `.features-gen/` only.                  |
| `npm run report`       | `playwright show-report` for the last HTML report. |
| `npm run lint`         | ESLint (`eslint.config.mjs`, TypeScript).          |
| `npm run lint:fix`     | ESLint with `--fix`.                               |
| `npm run format`       | Prettier write (`.prettierrc`).                    |
| `npm run format:check` | Prettier check only (e.g. in CI).                  |

## Configuration

- Default **`baseURL`**: values from `testconfig.json` are applied through `TestFramework/TestConfig/configLoader.ts` (`BASE_URL`, `INVENTORY_URL`, user env vars). `playwright.config.ts` uses `process.env.BASE_URL`, then **`URL`**, then falls back to `https://www.saucedemo.com/`.
- Override the target app with OS env **`BASE_URL`** or **`URL`** if you point tests at another environment.
- **`TestFramework/Auth/auth.json`**: ignored in git. `global.setup.ts` logs in with `STANDARD_USER` / `STANDARD_PASS` from `.env` and writes this file so tests reuse the session (`storageState` in `playwright.config.ts`). If it is missing, `npm test` still works because global setup runs first.

## CI (GitHub Actions)

Workflow: [`.github/workflows/playwright-tests.yml`](.github/workflows/playwright-tests.yml). It runs on pushes and pull requests to `main` / `master`, and can be started manually (**Actions** → **Playwright tests** → **Run workflow**).

In the repository, go to **Settings → Secrets and variables → Actions** and add:

| Secret          | Required | Purpose                                                                                  |
| --------------- | -------- | ---------------------------------------------------------------------------------------- |
| `STANDARD_USER` | Yes      | Sauce Demo username (e.g. `standard_user`).                                              |
| `STANDARD_PASS` | Yes      | Sauce Demo password for that user.                                                       |
| `BASE_URL`      | No       | If omitted, `testconfig.json` supplies the default Sauce Demo URL when the config loads. |

Runs **`npm ci`**, **`npm run lint`**, installs **Chromium** only (`--with-deps chromium`), writes **`.env`** from secrets, then **`npm test`** with **`CI=true`**. Uploads **Playwright** and **Cucumber** HTML report folders as workflow artifacts.

## Layout

```
.github/workflows/
  playwright-tests.yml
Features/
  RegressionSuite/
    TestCase_CheckoutFlow.feature
TestFramework/
  Auth/
    .gitkeep                 # folder tracked; auth.json generated locally
  Pages/
    CheckoutPage.ts
  Steps/
    CheckoutStepDefinitions.ts
  Hooks/
    bdd.hooks.ts
  Support/
    index.ts
    ElementResolver.ts        # merges page maps
  TestConfig/
    testconfig.json
    configLoader.ts
eslint.config.mjs
playwright.config.ts
tsconfig.json
.prettierrc
```

## IDE: feature → step definitions

**Syntax colors in `.feature` files** (pink `Scenario`, orange quoted strings, etc.) come from a Gherkin grammar in the editor, not from this repo. Install **[Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)**; this workspace lists it under `.vscode/extensions.json` as a recommended extension. Reload the editor, then open a `.feature` file. If it still looks plain, set the file language mode to **Gherkin** / **Feature** / **Cucumber** instead of Plain Text.

Point the extension at `Features/**/*.feature` and `TestFramework/Steps/**/*.ts` (already set in `.vscode/settings.json`). Do not enable both this extension and the **official Cucumber** extension at once; pick one (see [playwright-bdd IDE notes](https://github.com/vitalets/playwright-bdd/blob/main/docs/guides/ide-integration.md)).

## Reports

- **Cucumber HTML**: `cucumber-report/index.html`
- **Playwright HTML**: `playwright-report/`

## License

ISC (see `package.json`).
