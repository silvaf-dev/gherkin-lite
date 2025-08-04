import { test } from '@playwright/test';

/**
 * Defines a "Given" step in a BDD-style test.
 *
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
 *
 * @example
 * await when('the user submits the login form', async () => {
 *   await page.click('text=Login');
 * });
 */
export const when = (description: string, fn: () => Promise<void>) => {
  return test.step(`When ${description}`, fn);
};

/**
 * Defines a "Then" step in a BDD-style test.
 *
 * @example
 * await then('the user sees the dashboard', async () => {
 *   await expect(page).toHaveURL('/dashboard');
 * });
 */
export const then = (description: string, fn: () => Promise<void>) => {
  return test.step(`Then ${description}`, fn);
};

/**
 * Defines an "And" step in a BDD-style test.
 *
 * @example
 * await and('the dashboard greets the user', async () => {
 *   await expect(page.locator('text=Welcome')).toBeVisible();
 * });
 */
export const and = (description: string, fn: () => Promise<void>) => {
  return test.step(`And ${description}`, fn);
};

/**
 * Defines a "But" step in a BDD-style test.
 *
 * @example
 * await but('the admin panel is not visible', async () => {
 *   await expect(page.locator('text=Admin')).toHaveCount(0);
 * });
 */
export const but = (description: string, fn: () => Promise<void>) => {
  return test.step(`But ${description}`, fn);
};

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
export const feature = (description: string, fn: () => void) => {
  return test.describe(`Feature: ${description}`, fn);
};

/**
 * Defines a BDD-style "Scenario" block.
 * Wraps a Playwright test using the `Scenario:` prefix.
 *
 * The provided async function receives the Playwright test context
 * (e.g., `{ page }`) and should contain one or more `given`, `when`, `then`, etc. steps.
 *
 * @param description - A descriptive title for the scenario.
 * @param fn - An async function that defines the test logic using BDD-style steps.
 *
 * @example
 * scenario('User logs in successfully', async ({ page }) => {
 *   await given('the user is on the login page', async () => {
 *     await page.goto('/login');
 *   });
 *
 *   await when('the user submits valid credentials', async () => {
 *     await page.fill('#username', 'admin');
 *     await page.fill('#password', 'password123');
 *     await page.click('text=Login');
 *   });
 *
 *   await then('the user is redirected to the dashboard', async () => {
 *     await expect(page).toHaveURL('/dashboard');
 *   });
 * });
 */
export const scenario = (description: string, fn: (context?: any) => Promise<void>) => {
  return test(`Scenario: ${description}`, fn);
};

/**
 * Defines a BDD-style "Scenario Outline" that runs once per example, without Playwright context. It will not open any browser.
 * 
 * Use `scenarioOutlineWithContext` instead if context (e.g. `page`) is needed.
 *
 * @template T - The shape of the example data.
 *
 * @param title - A descriptive title for the scenario outline.
 * @param examples - Array of example objects to run the scenario with.
 * @param fn - Async function that receives each example and runs test steps.
 *
 * @example
 * scenarioOutline(
 *   'simple math works',
 *   [{ a: 2, b: 3, result: 5 }],
 *   async ({ a, b, result }) => {
 *     expect(a + b).toBe(result);
 *   }
 * );
 */
export function scenarioOutline<T>(
  title: string,
  examples: T[],
  fn: (example: T) => Promise<void>
) {
  for (const example of examples) {
    const testName = Object.entries(example as Record<string, unknown>)
      .map(([k, v]) => `${k}=${v}`)
      .join(', ');
    test(`Scenario Outline: ${title} | ${testName}`, async () => {
      await fn(example);
    });
  }
}

/**
 * Defines a BDD-style "Scenario Outline" with access to the Playwright `page`, `context` and `browser` fixtures.
 * 
 * This function generates one test per example, automatically injecting the Playwright context.
 *
 * @template T - The shape of the example input data.
 *
 * @param {string} title - A descriptive title for the scenario outline.
 * @param {T[]} examples - An array of input objects for parameterized testing.
 * @param {(example: T, context: { page: import('@playwright/test').Page }) => Promise<void>} fn - 
 *        The test function that receives an example and the Playwright context.
 *
 * @example
 * scenarioOutlineWithContext(
 *   'Wikipedia search',
 *   [
 *     { term: 'Gherkin', expectedPath: '/wiki/Gherkin' },
 *     { term: 'Playwright', expectedPath: '/wiki/Playwright' }
 *   ],
 *   async ({ term, expectedPath }, { page }) => {
 *     await page.goto('https://en.wikipedia.org');
 *     await page.fill('input[name="search"]', term);
 *     await page.click('button[type="submit"]');
 *     await expect(page).toHaveURL('https://en.wikipedia.org' + expectedPath);
 *   }
 * );
 */
export const scenarioOutlineWithContext = <T extends Record<string, any>>(
  title: string,
  examples: T[],
  fn: (example: T, context: {
    page: import('@playwright/test').Page,
    context: import('@playwright/test').BrowserContext,
    browser: import('@playwright/test').Browser
  }) => Promise<void>
) => {
  for (const example of examples) {
    const testName = Object.entries(example ?? {})
      .map(([k, v]) => `${k}=${String(v)}`)
      .join(', ');

    test(`Scenario Outline: ${title} | ${testName}`, async ({ page, context, browser }) => {
      await fn(example, { page, context, browser });
    });
  }
};
