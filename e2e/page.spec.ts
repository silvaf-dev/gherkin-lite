import { expect } from '@playwright/test';
import { given, when, then, feature, scenario, scenarioOutline } from '../dist/gherkinSyntax.js';

feature('Wikipedia search returns correct article', async () => {
    scenario('Wikipedia search', async ({ page }) => {
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
