import { expect } from '@playwright/test';
import { given, when, then, feature, scenario } from '../dist/gherkinSyntax.js';

feature('Wikipedia search returns correct article', async () => {
    const examples = [
        { term: 'Gherkin', expectedPath: '/wiki/Gherkin' },
        { term: 'Playwright', expectedPath: '/wiki/Playwright' }
    ];

    for (const { term, expectedPath } of examples) {
        scenario(
            `search term "${term}" yields expected article`,
            async ({ page, context, browser }) => {
                await given('a fresh browser context and a page are available', async () => {
                    expect(browser).toBeDefined();
                    expect(context).toBeDefined();
                    expect(page).toBeDefined();
                });

                await when(`the user navigates to Wikipedia and searches for "${term}"`, async () => {
                    await page.goto('https://en.wikipedia.org');
                    await page.getByPlaceholder('Search Wikipedia').first().fill(term);
                    await page.getByRole('button', { name: 'Search' }).click();
                });

                await then(`the user is taken to ${expectedPath}`, async () => {
                    await expect(page).toHaveURL('https://en.wikipedia.org' + expectedPath);
                });
            },
            { tags: ['@search', '@wikipedia'] }
        );
    }

    scenario.skip('Skipped test example', async () => {
        await given(`the developer wants to skip a test`, async () => {
        });

        await when(`the developer does skip a test`, async () => {
        });

        await then(`the assertion is not executed`, async () => {
            expect(false).toEqual(true);
        });
    });

    scenario.todo('Todo test example'); 
});
