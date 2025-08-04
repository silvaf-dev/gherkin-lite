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
export declare const scenario: (description: string, fn: (context?: any) => Promise<void>, options?: any) => void;
