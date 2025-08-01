import { expect } from '@playwright/test';
import { given, when, then, feature, scenario } from '../dist/gherkinSyntax.js';

scenario('Wikipedia search', async () => {
  feature('search "Gherkin" on Wikipedia', async ({ page }) => {
    await given('the user is on the Wikipedia homepage', async () => {
      await page.goto('https://en.wikipedia.org');
    });

    await when('the user searches for "Gherkin"', async () => {
      await page.getByPlaceholder('Search Wikipedia').first().fill('Gherkin');
      await page.getByRole('button', { name: 'Search' }).click();
    });

    await then('they land on the Gherkin article', async () => {
      await expect(page).toHaveURL(/\/wiki\/Gherkin/);
    });
  });
});
