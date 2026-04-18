import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Go to application
  await page.goto(process.env.BASE_URL!);

  // Login using ENV credentials
  await page.fill('#user-name', process.env.STANDARD_USER!);
  await page.fill('#password', process.env.STANDARD_PASS!);
  await page.click('#login-button');

  // Wait for successful login
  await page.waitForURL('**/inventory.html');

  // Save session state
  await page.context().storageState({
    path: 'TestFramework/Auth/auth.json',
  });

  await browser.close();
}

export default globalSetup;
