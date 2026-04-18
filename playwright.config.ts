import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';

// Loads TestFramework/TestConfig/testconfig.json into process.env
import './TestFramework/TestConfig/configLoader';

const testDir = defineBddConfig({
  features: 'Features/**/*.feature',
  steps: ['TestFramework/Steps/**/*.ts', 'TestFramework/Hooks/**/*.ts'],
  featuresRoot: 'Features',
});

export default defineConfig({
  testDir,

  // Matches @ParallelExecution on scenarios: scenarios can run in parallel across workers.
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 180000,

  globalSetup: './global.setup',

  reporter: [
    ['list', { printSteps: true }],
    [
      'html',
      {
        open: 'never',
        outputFolder: 'playwright-report',
      },
    ],
    cucumberReporter('html', {
      outputFile: 'cucumber-report/index.html',
      externalAttachments: true,
    }),
    cucumberReporter('@cucumber/pretty-formatter'),
  ],

  use: {
    baseURL: process.env.BASE_URL || process.env.URL || 'https://www.saucedemo.com/',

    headless: true,
    viewport: {
      width: 1280,
      height: 720,
    },

    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    storageState: 'TestFramework/Auth/auth.json',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
