"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scenario = exports.feature = exports.but = exports.and = exports.then = exports.when = exports.given = void 0;
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
const makeScenario = (modifier) => {
    return (description, fnOrOptions, maybeOptions) => {
        const isFn = typeof fnOrOptions === 'function';
        const fn = isFn ? fnOrOptions : undefined;
        const options = isFn ? maybeOptions : fnOrOptions;
        const tagString = options?.tags ? ` - Tags: ${options.tags.join(' ')}` : '';
        const title = `Scenario: ${description}${tagString}`;
        if (modifier === 'skip')
            return test_1.test.skip(`[SKIPPED] ${title}`, fn);
        if (modifier === 'only')
            return test_1.test.only(`[ONLY] ${title}`, fn);
        if (modifier === 'todo')
            return (0, test_1.test)(`[TODO] ${title}`, async () => {
                test_1.test.fixme(true, 'Test not implemented yet');
            });
        return (0, test_1.test)(title, fn);
    };
};
const baseScenario = makeScenario();
baseScenario.skip = makeScenario('skip');
baseScenario.only = makeScenario('only');
baseScenario.todo = makeScenario('todo');
/**
 * Defines a BDD-style **Scenario** within a `feature()` block.
 *
 * Wraps Playwright's `test()` with Gherkin-style readability and optional tags.
 *
 * @param description - A descriptive title for the scenario.
 * @param fn - The async test function. Receives Playwright context (`{ page, browser, context }`).
 * @param options - Optional scenario options like `tags`.
 *
 * @example
 * scenario('User logs in', async ({ page }) => {
 *   await page.goto('/login');
 * }, { tags: ['@smoke', '@auth'] });
 *
 * @example
 * scenario.skip('Fails on CI', async () => {
 *   // This test will be skipped
 * });
 *
 * @example
 * scenario.only('Debugging this scenario', async () => {
 *   // Only this test will run
 * });
 *
 * @example
 * scenario.todo('Implement forgot-password flow');
 */
exports.scenario = baseScenario;
