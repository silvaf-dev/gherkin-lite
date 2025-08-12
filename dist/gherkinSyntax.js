"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.afterAll = exports.beforeAll = exports.after = exports.before = exports.step = exports.scenario = exports.feature = exports.but = exports.and = exports.then = exports.when = exports.given = void 0;
const test_1 = require("@playwright/test");
/**
 * Whitespace normalization
 * @param k key
 * @param d description
 * @returns string
 */
const label = (k, d) => `${k} ${d.trim()}`;
/**
 * Defines a "Given" step in a BDD-style test.
 *
 * @example
 * await given('the user is on the login page', async () => {
 *   await page.goto('/login');
 * });
 */
const given = (description, fn) => {
    return test_1.test.step(label('Given', description), fn);
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
    return test_1.test.step(label('When', description), fn);
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
    return test_1.test.step(label('Then', description), fn);
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
    return test_1.test.step(label('And', description), fn);
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
    return test_1.test.step(label('But', description), fn);
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
    return test_1.test.describe(label('Feature :', `${description}`), fn);
};
exports.feature = feature;
const makeScenario = (modifier) => {
    return (description, fnOrOptions, maybeOptions) => {
        const isFn = typeof fnOrOptions === 'function';
        const fn = isFn ? fnOrOptions : undefined;
        const options = isFn ? maybeOptions : fnOrOptions;
        const tagString = options?.tags ? ` - Tags: ${options.tags.join(' ')}` : '';
        const title = label('Scenario :', `${description}${tagString}`);
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
/**
 * Creates a named substep in the Playwright report.
 * Use this command to make inner statements visible on the report.
 *
 * @example
 * await step('fill login form', async () => {
 *   await page.fill('#username', 'admin');
 *   await page.fill('#password', 'admin');
 * });
 */
const step = async (description, fn) => {
    return await test_1.test.step(description, fn);
};
exports.step = step;
/**
 * Defines a setup step to run **before each** scenario in a `feature()` block.
 *
 * Wraps Playwright's `beforeEach()` with a description for clearer reports.
 *
 * @param description - A descriptive label for the setup step.
 * @param fn - The async function to run before each scenario.
 *
 * @example
 * before('log in user', async ({ page }) => {
 *   await page.goto('/login');
 *   await page.fill('#username', 'admin');
 *   await page.fill('#password', 'admin123');
 *   await page.click('text=Login');
 * });
 */
const before = (description, fn) => {
    return test_1.test.beforeEach(description, fn);
};
exports.before = before;
/**
 * Defines a teardown step to run **after each** scenario in a `feature()` block.
 *
 * Wraps Playwright's `afterEach()` with a description for clearer reports.
 *
 * @param description - A descriptive label for the teardown step.
 * @param fn - The async function to run after each scenario.
 *
 * @example
 * after('clear session data', async ({ context }) => {
 *   await context.clearCookies();
 * });
 */
const after = (description, fn) => {
    return test_1.test.afterEach(description, fn);
};
exports.after = after;
/**
 * Defines a setup step to run **once before all** scenarios in a `feature()` block.
 *
 * Wraps Playwright's `beforeAll()` with a description for clearer reports.
 *
 * @param description - A descriptive label for the one-time setup.
 * @param fn - The async function to run before all scenarios.
 *
 * @example
 * beforeAll('start server', async () => {
 *   await startTestServer();
 * });
 */
const beforeAll = (description, fn) => {
    return test_1.test.beforeAll(description, fn);
};
exports.beforeAll = beforeAll;
/**
 * Defines a teardown step to run **once after all** scenarios in a `feature()` block.
 *
 * Wraps Playwright's `afterAll()` with a description for clearer reports.
 *
 * @param description - A descriptive label for the one-time teardown.
 * @param fn - The async function to run after all scenarios.
 *
 * @example
 * afterAll('stop server', async () => {
 *   await stopTestServer();
 * });
 */
const afterAll = (description, fn) => {
    return test_1.test.afterAll(description, fn);
};
exports.afterAll = afterAll;
