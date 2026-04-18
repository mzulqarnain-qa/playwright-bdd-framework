import { createBdd } from 'playwright-bdd';
import { test } from '../Support';

const { Before } = createBdd(test);

Before(async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});
