# Playwright BDD Automation Framework

This repository was created by **Zulqarnain**, a **Senior QA Automation Engineer**, to demonstrate my approach to building a scalable and maintainable **UI automation framework** using modern test automation practices.

The framework is built with:

- Playwright  
- TypeScript  
- Gherkin / BDD  
- playwright-bdd  
- GitHub Actions  

This project reflects how I design automation frameworks that are:

- Easy to maintain  
- Reusable across projects  
- Readable for teams  
- CI/CD ready  
- Optimized for faster execution  

The sample application used in this project is the **Sauce Demo** practice e-commerce platform.

---

## Why I Built This Framework

I created this project to showcase the engineering standards I follow when developing automation solutions in real-world QA environments.

My focus while building this framework was to demonstrate:

- Clean automation architecture  
- Separation of concerns  
- Reusable step definitions  
- Reliable authentication handling  
- Environment-based configuration  
- Reporting and CI integration  

Rather than simply automating test cases, the goal was to build a framework that can scale as application coverage grows.

---

## Technical Design

### BDD Layer

Business-readable scenarios are written inside:

```bash
Features/**/*.feature
```

Example:

```gherkin
Scenario: Complete checkout successfully
  Given user is logged into the application
  When user adds a product to the cart
  And user completes the checkout process
  Then the order should be placed successfully
```

This keeps test scenarios understandable for both technical and non-technical stakeholders.

---

### Step Definitions

Step implementations are stored in:

```bash
TestFramework/Steps/
```

Responsibilities include:

- Mapping feature steps to automation logic  
- Keeping scenarios readable  
- Avoiding duplicated code  
- Supporting reusable actions across tests  

---

### Page Object Model

Page files are located in:

```bash
TestFramework/Pages/
```

Each page contains:

- Locators  
- Page actions  
- Reusable methods  

This reduces maintenance effort when UI changes occur.

---

### Configuration Management

Environment values are loaded from:

```bash
TestFramework/TestConfig/testconfig.json
```

Sensitive values are stored in:

```bash
.env
```

Example:

```env
STANDARD_USER=standard_user
STANDARD_PASS=secret_sauce
BASE_URL=https://www.saucedemo.com
```

This allows the framework to run across multiple environments.

---

## Authentication Strategy

To improve execution speed, the framework uses **Playwright storage state**.

During setup:

- Login runs once  
- Session is stored  
- Remaining tests reuse the saved session  

Generated file:

```bash
TestFramework/Auth/auth.json
```

Benefits:

- Faster execution  
- Reduced repeated login  
- Improved stability  

---

## Project Structure

```bash
.github/workflows/
Features/
TestFramework/
 ├── Auth/
 ├── Hooks/
 ├── Pages/
 ├── Steps/
 ├── Support/
 └── TestConfig/

playwright.config.ts
eslint.config.mjs
tsconfig.json
```

---

## Running the Framework

Install dependencies:

```bash
npm install
npx playwright install
```

Run tests:

```bash
npm test
```

Useful commands:

| Command | Purpose |
|--------|---------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run with browser visible |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run report` | Open latest HTML report |
| `npm run lint` | Run code quality checks |

---

## Reporting

Execution reports are generated in:

```bash
playwright-report/
cucumber-report/
```

Reports provide:

- Pass/fail results  
- Execution duration  
- Screenshots  
- Failure analysis  

---

## Continuous Integration

The framework includes CI execution through **GitHub Actions**.

Workflow file:

```bash
.github/workflows/playwright-tests.yml
```

Pipeline steps include:

- Dependency installation  
- Lint validation  
- Browser setup  
- Test execution  
- Report artifact upload  

---

## About Me

**Zulqarnain**  
Senior QA Automation Engineer  

📧 mzulkarnian231@gmail.com

This project represents the framework design principles I apply when building automation solutions that support long-term product quality.

---

## License

ISC