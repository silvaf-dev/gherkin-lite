"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scenarioOutline = exports.scenario = exports.feature = exports.but = exports.and = exports.then = exports.when = exports.given = void 0;
const test_1 = require("@playwright/test");
/**
 * Defines a "Given" step in a BDD-style test.
 *
 * @example
 * await given('the user is on the login page', async () => {
 *   await page.goto('/login');
 * });
 */
const given = (description, fn) => {
    return test_1.test.step(`Given ${description}`, fn);
};
exports.given = given;
/**
 * Defines a "When" step in a BDD-style test.
 *
 * @example
 * await when('the user submits the login form', async () => {
 *   await page.click('text=Login');
 * });
 */
const when = (description, fn) => {
    return test_1.test.step(`When ${description}`, fn);
};
exports.when = when;
/**
 * Defines a "Then" step in a BDD-style test.
 *
 * @example
 * await then('the user sees the dashboard', async () => {
 *   await expect(page).toHaveURL('/dashboard');
 * });
 */
const then = (description, fn) => {
    return test_1.test.step(`Then ${description}`, fn);
};
exports.then = then;
/**
 * Defines an "And" step in a BDD-style test.
 *
 * @example
 * await and('the dashboard greets the user', async () => {
 *   await expect(page.locator('text=Welcome')).toBeVisible();
 * });
 */
const and = (description, fn) => {
    return test_1.test.step(`And ${description}`, fn);
};
exports.and = and;
/**
 * Defines a "But" step in a BDD-style test.
 *
 * @example
 * await but('the admin panel is not visible', async () => {
 *   await expect(page.locator('text=Admin')).toHaveCount(0);
 * });
 */
const but = (description, fn) => {
    return test_1.test.step(`But ${description}`, fn);
};
exports.but = but;
/**
 * Defines a BDD-style "Feature" block.
 * Groups related scenarios.
 *
 * @param description - The name of the feature.
 * @param fn - A synchronous function grouping related scenarios.
 *
 * @example
 * feature('User authentication', () => {
 *   scenario('valid login', async () => {
 *     await given('the user is on the login page', async () => {
 *       await page.goto('/login');
 *     });
 *
 *     await when('they enter correct credentials', async () => {
 *       await page.fill('#username', 'admin');
 *       await page.fill('#password', 'admin123');
 *       await page.click('text=Login');
 *     });
 *
 *     await then('they should see the dashboard', async () => {
 *       await expect(page).toHaveURL('/dashboard');
 *     });
 *   });
 * });
 */
const feature = (description, fn) => {
    return test_1.test.describe(`Feature: ${description}`, fn);
};
exports.feature = feature;
/**
 * Defines a BDD-style "Scenario" block.
 *
 * @example
 * scenario('User logs in successfully', async () => {
 *   await given(...);
 *   await when(...);
 *   await then(...);
 * });
 */
const scenario = (description, fn) => {
    return (0, test_1.test)(`Scenario: ${description}`, fn);
};
exports.scenario = scenario;
/**
 * Defines a BDD-style "Scenario Outline" that generates one test case per example.
 * Each example is passed along with the Playwright test context (e.g., `page`).
 *
 * This is equivalent to writing multiple `test(...)` calls for each row of example data,
 * but wrapped in a more expressive BDD-style API.
 *
 * @template T The shape of the example data (e.g., `{ username: string, password: string }`).
 *
 * @param title A descriptive title for the scenario outline.
 * @param examples An array of data objects to use as inputs for individual test runs.
 * @param fn An async function that receives each example and the Playwright test context.
 *           The test logic should be defined here using `given`, `when`, `then`, etc.
 *
 * @example
 * scenarioOutline(
 *   'Wikipedia search works for multiple terms',
 *   [
 *     { term: 'Gherkin', expectedPath: '/wiki/Gherkin' },
 *     { term: 'Playwright', expectedPath: '/wiki/Playwright' }
 *   ],
 *   async ({ term, expectedPath }, { page }) => {
 *     await given('the user is on the Wikipedia homepage', async () => {
 *       await page.goto('https://en.wikipedia.org');
 *     });
 *
 *     await when(`the user searches for "${term}"`, async () => {
 *       await page.getByPlaceholder('Search Wikipedia').first().fill(term);
 *       await page.getByRole('button', { name: 'Search' }).click();
 *     });
 *
 *     await then(`the user is taken to ${expectedPath}`, async () => {
 *       await expect(page).toHaveURL('https://en.wikipedia.org' + expectedPath);
 *     });
 *   }
 * );
 */
const scenarioOutline = (title, examples, fn) => {
    for (const example of examples) {
        const testName = Object.entries(example)
            .map(([key, val]) => `${key}=${val}`)
            .join(', ');
        (0, test_1.test)(`Scenario Outline: ${title} | ${testName}`, async ({ page }) => {
            await fn(example, { page });
        });
    }
};
exports.scenarioOutline = scenarioOutline;
