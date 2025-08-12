import { test } from '@playwright/test';

/**
 * Whitespace normalization
 * @param k key
 * @param d description
 * @returns string
 */
const label = (k: 'Given'|'When'|'Then'|'And'|'But'|'Feature :'|'Scenario :', d: string) => `${k} ${d.trim()}`;

/**
 * Defines a "Given" step in a BDD-style test.
 *
 * @example
 * await given('the user is on the login page', async () => {
 *   await page.goto('/login');
 * });
 */
export const given = (description: string, fn: () => Promise<void>) => {
  return test.step(label('Given', description), fn);
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
  return test.step(label('When', description), fn);
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
  return test.step(label('Then', description), fn);
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
  return test.step(label('And', description), fn);
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
  return test.step(label('But', description), fn);
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
  return test.describe(label('Feature :', `${description}`), fn);
};

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

const makeScenario = (modifier?: 'skip' | 'only' | 'todo') => {
  return (
    description: string,
    fnOrOptions?: ScenarioCallback | ScenarioOptions,
    maybeOptions?: ScenarioOptions
  ) => {
    const isFn = typeof fnOrOptions === 'function';
    const fn = isFn ? fnOrOptions as ScenarioCallback : undefined;
    const options = isFn ? maybeOptions : fnOrOptions as ScenarioOptions;
    const tagString = options?.tags ? ` - Tags: ${options.tags.join(' ')}` : '';
    const title = label('Scenario :', `${description}${tagString}`);

    if (modifier === 'skip') return test.skip(`[SKIPPED] ${title}`, fn!);
    if (modifier === 'only') return test.only(`[ONLY] ${title}`, fn!);
    if (modifier === 'todo') return test(`[TODO] ${title}`, async () => {
      test.fixme(true, 'Test not implemented yet');
    });
    return test(title, fn!);
  };
}

const baseScenario = makeScenario() as ScenarioFn;

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
export const scenario = baseScenario;

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
export const step = async (description: string, fn: () => Promise<void>) => {
  return await test.step(description, fn);
};

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
export const before = (description: string, fn: () => Promise<void>) => {
  return test.beforeEach(description, fn);
};

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
export const after = (description: string, fn: () => Promise<void>) => {
  return test.afterEach(description, fn);
};

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
export const beforeAll = (description: string, fn: () => Promise<void>) => {
  return test.beforeAll(description, fn);
};

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
export const afterAll = (description: string, fn: () => Promise<void>) => {
  return test.afterAll(description, fn);
};