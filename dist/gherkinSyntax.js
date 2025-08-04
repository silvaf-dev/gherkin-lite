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
/**
 * Defines a BDD-style "Scenario" test with optional tags.
 *
 * @param description - A descriptive title for the scenario.
 * @param fn - The async test function, optionally receiving the Playwright context.
 * @param options - Optional config like `tags` (array of strings).
 *
 * @example
 * scenario('User logs in', async ({ page }) => {
 *   await page.goto('/login');
 * }, { tags: ['@smoke', '@auth'] });
 */
const scenario = (description, fn, options) => {
    const tagString = options ? ` - Tags: ${options?.tags?.join(' ')}` : '';
    return (0, test_1.test)(`Scenario: ${description}${tagString}`, fn);
};
exports.scenario = scenario;
