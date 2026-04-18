import { expect, type Page } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { ElementResolver, test } from '../Support';

const { Given, When, Then } = createBdd(test);

const getElements = (page: Page) => new ElementResolver(page);

// ---------------- NAVIGATION ----------------

Given(`the user navigates to the {string} page`, async ({ page }, pageName: string) => {
  if (pageName === 'Inventory') {
    await page.goto('/inventory.html');
    await page.waitForLoadState('domcontentloaded');
    return;
  }

  throw new Error(`Unknown page: ${pageName}`);
});

// ---------------- CLICK ----------------

When(`the user clicks on the {string}`, async ({ page }, key: string) => {
  await getElements(page).get(key).click();
});

// ---------------- INPUT ----------------

When(`the user enters {string} in the {string}`, async ({ page }, value: string, key: string) => {
  await getElements(page).get(key).fill(value);
});

// ---------------- VISIBILITY CHECK ----------------

Then(`the user verifies that {string} is visible`, async ({ page }, key: string) => {
  await expect(getElements(page).get(key)).toBeVisible({ timeout: 20000 });
});
