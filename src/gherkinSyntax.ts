import { test, type Page } from '@playwright/test';

/**
 * Defines a "Given" step in a BDD-style test.
 * @param description Description of the step.
 * @param fn Async function containing the test logic.
 * @example
 * await given('the user is on the login page', async () => {
 *   await page.goto('/login');
 * });
 */
export const given = (description: string, fn: () => Promise<void>) => {
  return test.step(`Given ${description}`, fn);
};

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
export const when = (description: string, fn: () => Promise<void>) => {
  return test.step(`When ${description}`, fn);
};

/**
 * Defines a "Then" step in a BDD-style test.
 * @param description Description of the step.
 * @param fn Async function containing the test logic.
 * @example
 * await then('the user should be logged in', async () => {
 *   await expect(page).toHaveURL('/dashboard');
 * });
 */
export const then = (description: string, fn: () => Promise<void>) => {
  return test.step(`Then ${description}`, fn);
};

/**
 * Defines an "And" step in a BDD-style test.
 * @param description Description of the step.
 * @param fn Async function containing the test logic.
 * @example
 * await and('the dashboard should show a welcome message', async () => {
 *   await expect(page.locator('text=Welcome')).toBeVisible();
 * });
 */
export const and = (description: string, fn: () => Promise<void>) => {
  return test.step(`And ${description}`, fn);
};

/**
 * Defines a "But" step in a BDD-style test.
 * @param description Description of the step.
 * @param fn Async function containing the test logic.
 * @example
 * await but('the admin link should not be visible', async () => {
 *   await expect(page.locator('text=Admin')).toHaveCount(0);
 * });
 */
export const but = (description: string, fn: () => Promise<void>) => {
  return test.step(`But ${description}`, fn);
};

type FeatureCallback = (args: { page: Page }) => Promise<void>;

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
export const feature = (description: string, fn: FeatureCallback) => {
  return test(`Feature ${description}`, fn);
};

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
export const scenario = (description: string, fn: () => Promise<void>) => {
  return test.describe(`Scenario ${description}`, fn);
};

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
export const scenarioOutline = (
  title: string,
  examples: any[],
  fn: (example: any) => Promise<void>
) => {
  for (const example of examples) {
    test.describe(`Scenario Outline: ${title} | ${JSON.stringify(example)}`, () => fn(example));
  }
};
