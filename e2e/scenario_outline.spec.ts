import { Page, expect } from '@playwright/test';
import { given, when, then, feature, scenarioOutline } from '../dist/gherkinSyntax.js';

feature('Wikipedia search returns correct article', async () => {
  scenarioOutline(
    'search term yields expected article',
    [
      { term: 'Gherkin', expectedPath: '/wiki/Gherkin' },
      { term: 'Playwright', expectedPath: '/wiki/Playwright' }
    ],
    async ({ term, expectedPath }, { page }) => {
      await given('the user is on the Wikipedia homepage', async () => {
        await page.goto('https://en.wikipedia.org');
      });

      await when(`the user searches for "${term}"`, async () => {
        await page.getByPlaceholder('Search Wikipedia').first().fill(term);
        await page.getByRole('button', { name: 'Search' }).click();
      });

      await then(`the user is taken to ${expectedPath}`, async () => {
        await expect(page).toHaveURL('https://en.wikipedia.org' + expectedPath);
      });
    }
  );
});
