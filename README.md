# gherkin-lite

A lightweight, TypeScript-first Gherkin-style DSL for [Playwright](https://playwright.dev/).  
Easily write expressive tests using `Given`, `When`, `Then`, `Feature`, and `Scenario` — no `.feature` files or Cucumber required.

Ideal for teams that want readable, business-aligned test reports *without* introducing extra complexity.


## ✨ Features

- ✅ Human-readable BDD syntax (`given`, `when`, `then`, `and`, `but`)
- ✅ `feature`, `scenario`, and `scenarioOutline` helpers
- ✅ Type-safe and compatible with `@playwright/test`
- ✅ Zero runtime dependencies
- ✅ Works with JavaScript and TypeScript

## 📦 Installation

```bash
npm install gherkin-lite
```

> Requires [`@playwright/test`](https://playwright.dev/) in your project.

## 🚀 Usage

### Basic Example

```ts
import { test, expect } from '@playwright/test';
import { given, when, then, feature, scenario } from 'gherkin-lite';

scenario('Wikipedia search', () => {
  feature('search "Gherkin" on Wikipedia', async ({ page }) => {
    await given('the user is on the Wikipedia homepage', async () => {
      await page.goto('https://en.wikipedia.org');
    });

    await when('the user searches for "Gherkin"', async () => {
      await page.getByPlaceholder('Search Wikipedia').fill('Gherkin');
      await page.getByRole('button', { name: 'Search' }).click();
    });

    await then('they land on the Gherkin article', async () => {
      await expect(page).toHaveURL(/\/wiki\/Gherkin/);
    });
  });
});
```

### Scenario Outline (Parameterized)

```ts
import { feature, scenarioOutline, given, when, then } from 'gherkin-lite';

scenarioOutline(
  'Wikipedia search returns correct article',
  [
    { term: 'Gherkin', expectedPath: '/wiki/Gherkin' },
    { term: 'Playwright', expectedPath: '/wiki/Playwright' }
  ],
  ({ term, expectedPath }) => {
    feature(`search "${term}"`, async ({ page }) => {
      await given('the user is on the Wikipedia homepage', async () => {
        await page.goto('https://en.wikipedia.org');
      });

      await when(`the user searches for "${term}"`, async () => {
        await page.getByPlaceholder('Search Wikipedia').fill(term);
        await page.getByRole('button', { name: 'Search' }).click();
      });

      await then(`the user is taken to ${expectedPath}`, async () => {
        await expect(page).toHaveURL('https://en.wikipedia.org' + expectedPath);
      });
    });
  }
);
```

## 🧱 API Reference

| Function                  | Description                                   |
|---------------------------|-----------------------------------------------|
| `given(description, fn)`  | Marks a "Given" step in the test              |
| `when(description, fn)`   | Marks a "When" step                           |
| `then(description, fn)`   | Marks a "Then" step                           |
| `and(description, fn)`    | Optional continuation step                    |
| `but(description, fn)`    | Optional exception step                       |
| `feature(description, fn)`| Defines a single feature test                 |
| `scenario(description, fn)`| Defines a grouped test scenario              |
| `scenarioOutline(description, examples[], fn)` | Defines multiple examples for a scenario |

## 🛠 Development

```bash
npm install
npm run build
```

## 📄 License

MIT © [Federico Silva]