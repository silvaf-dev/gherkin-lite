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

![Example test report with Gherkin steps](img/report.png)

## 📦 Installation

```bash
npm install gherkin-lite
```

> Requires [`@playwright/test`](https://playwright.dev/) in your project.

## 🚀 Usage

### Basic Example

```ts
import { expect } from '@playwright/test';
import { given, when, then, feature, scenario } from 'gherkin-lite';

feature('search "Gherkin" on Wikipedia', async () => {
  scenario('Wikipedia search', async ({ page }) => {
    await given('the user is on the Wikipedia homepage', async () => {
      await page.goto('https://en.wikipedia.org');
    });

    await when('the user searches for "Gherkin"', async () => {
      await page.getByPlaceholder('Search Wikipedia').first().fill('Gherkin');
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

feature('Wikipedia search returns correct article', async () => {
  scenarioOutline(
    'search term yields expected article',
    [
      { term: 'Gherkin', expectedPath: '/wiki/Gherkin' },
      { term: 'Playwright', expectedPath: '/wiki/Playwright' }
    ],
    async ({ term, expectedPath }, { page }) => {
      await given('the user is on the Wikipedia homepage', async () => {
        await page.goto('https://en.wikipedia.org');
      });

      await when(`the user searches for "${term}"`, async () => {
        await page.getByPlaceholder('Search Wikipedia').first().fill(term);
        await page.getByRole('button', { name: 'Search' }).click();
      });

      await then(`the user is taken to ${expectedPath}`, async () => {
        await expect(page).toHaveURL('https://en.wikipedia.org' + expectedPath);
      });
    }
  );
});
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

## 🤔 Why I Built This

I like the clarity of Gherkin syntax (`Given–When–Then`), but not the overhead of Cucumber.

In my experience:
- Business people almost never write tests, even if you give them `.feature` files.
- Adding a whole Cucumber layer to a Playwright project often creates more friction than value.
- Most teams just want **readable test reports** that map cleanly to user stories.

So instead of adding Cucumber, I added semantics to what I already had:  
Playwright + `test.step()` + a little structure.

**`gherkin-lite`** gives you the BDD clarity — `given`, `when`, `then`, `scenario`, `feature` — without any extra tooling.  
It works out of the box with Playwright, generates clean reports, and is fully TypeScript-friendly.

No plugins. No DSL parser. No `.feature` files.  
Just simple structure that makes your tests easier to read, debug, and explain to stakeholders.

## 📄 License

MIT © [Federico Silva]