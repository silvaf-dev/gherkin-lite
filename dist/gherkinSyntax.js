"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scenarioOutline = exports.scenario = exports.feature = exports.but = exports.and = exports.then = exports.when = exports.given = void 0;
const test_1 = require("@playwright/test");
/**
 * Defines a "Given" step in a BDD-style test.
 * @param description Description of the step.
 * @param fn Async function containing the test logic.
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
 * @param description Description of the step.
 * @param fn Async function containing the test logic.
 * @example
 * await when('the user fills in the login form', async () => {
 *   await page.fill('#username', 'user');
 *   await page.fill('#password', 'pass');
 * });
 */
const when = (description, fn) => {
    return test_1.test.step(`When ${description}`, fn);
};
exports.when = when;
/**
 * Defines a "Then" step in a BDD-style test.
 * @param description Description of the step.
 * @param fn Async function containing the test logic.
 * @example
 * await then('the user should be logged in', async () => {
 *   await expect(page).toHaveURL('/dashboard');
 * });
 */
const then = (description, fn) => {
    return test_1.test.step(`Then ${description}`, fn);
};
exports.then = then;
/**
 * Defines an "And" step in a BDD-style test.
 * @param description Description of the step.
 * @param fn Async function containing the test logic.
 * @example
 * await and('the dashboard should show a welcome message', async () => {
 *   await expect(page.locator('text=Welcome')).toBeVisible();
 * });
 */
const and = (description, fn) => {
    return test_1.test.step(`And ${description}`, fn);
};
exports.and = and;
/**
 * Defines a "But" step in a BDD-style test.
 * @param description Description of the step.
 * @param fn Async function containing the test logic.
 * @example
 * await but('the admin link should not be visible', async () => {
 *   await expect(page.locator('text=Admin')).toHaveCount(0);
 * });
 */
const but = (description, fn) => {
    return test_1.test.step(`But ${description}`, fn);
};
exports.but = but;
/**
 * Defines a BDD-style "Feature" test.
 * @param description Description of the feature.
 * @param fn Test function receiving the Playwright `page`.
 * @example
 * feature('User login', async ({ page }) => {
 *   await given('the user is on the login page', async () => {
 *     await page.goto('/login');
 *   });
 * });
 */
const feature = (description, fn) => {
    return (0, test_1.test)(`Feature ${description}`, fn);
};
exports.feature = feature;
/**
 * Defines a BDD-style "Scenario" block.
 * @param description Description of the scenario.
 * @param fn Async function with test steps inside.
 * @example
 * scenario('Successful login', async () => {
 *   await given(...);
 *   await when(...);
 *   await then(...);
 * });
 */
const scenario = (description, fn) => {
    return test_1.test.describe(`Scenario ${description}`, fn);
};
exports.scenario = scenario;
/**
 * Defines a BDD-style "Scenario Outline" with multiple example inputs.
 * @param title Title of the scenario outline.
 * @param examples Array of example data objects.
 * @param fn Function to run for each example.
 * @example
 * scenarioOutline('Login with multiple users', [
 *   { username: 'user1', password: 'pass1' },
 *   { username: 'user2', password: 'pass2' }
 * ], async ({ username, password }) => {
 *   await page.goto('/login');
 *   await page.fill('#username', username);
 *   await page.fill('#password', password);
 *   await page.click('text=Login');
 * });
 */
const scenarioOutline = (title, examples, fn) => {
    for (const example of examples) {
        test_1.test.describe(`Scenario Outline: ${title} | ${JSON.stringify(example)}`, () => fn(example));
    }
};
exports.scenarioOutline = scenarioOutline;
