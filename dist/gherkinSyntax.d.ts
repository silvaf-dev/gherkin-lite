/**
 * Defines a "Given" step in a BDD-style test.
 *
 * @example
 * await given('the user is on the login page', async () => {
 *   await page.goto('/login');
 * });
 */
export declare const given: (description: string, fn: () => Promise<void>) => Promise<void>;
/**
 * Defines a "When" step in a BDD-style test.
 *
 * @example
 * await when('the user submits the login form', async () => {
 *   await page.click('text=Login');
 * });
 */
export declare const when: (description: string, fn: () => Promise<void>) => Promise<void>;
/**
 * Defines a "Then" step in a BDD-style test.
 *
 * @example
 * await then('the user sees the dashboard', async () => {
 *   await expect(page).toHaveURL('/dashboard');
 * });
 */
export declare const then: (description: string, fn: () => Promise<void>) => Promise<void>;
/**
 * Defines an "And" step in a BDD-style test.
 *
 * @example
 * await and('the dashboard greets the user', async () => {
 *   await expect(page.locator('text=Welcome')).toBeVisible();
 * });
 */
export declare const and: (description: string, fn: () => Promise<void>) => Promise<void>;
/**
 * Defines a "But" step in a BDD-style test.
 *
 * @example
 * await but('the admin panel is not visible', async () => {
 *   await expect(page.locator('text=Admin')).toHaveCount(0);
 * });
 */
export declare const but: (description: string, fn: () => Promise<void>) => Promise<void>;
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
export declare const feature: (description: string, fn: () => void) => void;
type ScenarioCallback = (context?: any) => Promise<void>;
type ScenarioOptions = {
    tags?: string[];
};
type ScenarioFn = {
    (description: string, fn: ScenarioCallback, options?: ScenarioOptions): void;
    skip: (description: string, fn: ScenarioCallback, options?: ScenarioOptions) => void;
    only: (description: string, fn: ScenarioCallback, options?: ScenarioOptions) => void;
    todo: (description: string) => void;
};
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
export declare const scenario: ScenarioFn;
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
export declare const step: (description: string, fn: () => Promise<void>) => Promise<void>;
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
export declare const before: (description: string, fn: () => Promise<void>) => void;
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
export declare const after: (description: string, fn: () => Promise<void>) => void;
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
export declare const beforeAll: (description: string, fn: () => Promise<void>) => void;
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
export declare const afterAll: (description: string, fn: () => Promise<void>) => void;
export {};
