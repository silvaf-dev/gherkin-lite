import { expect } from '@playwright/test';
import { given, when, then, feature, scenario, scenarioOutline } from '../dist/gherkinSyntax.js';

feature('addition of two numbers', async () => {
  scenario('adds two numbers', async () => {
    let result = 0;

    await given('two numbers 2 and 3', async () => {
      result = 2 + 3;
    });

    await when('they are added', async () => {
      // already added above
    });

    await then('the result is 5', async () => {
      expect(result).toBe(5);
    });
  });

  scenarioOutline(
    'addition yields correct result',
    [
      { a: 1, b: 2, expected: 3 },
      { a: 10, b: 5, expected: 15 }
    ],
    async ({ a, b, expected }) => {
      let result = 0;

      await given(`two numbers: ${a} and ${b}`, async () => {
        result = a + b;
      });

      await when('they are added', async () => {
        // already done in given
      });

      await then(`the result is ${expected}`, async () => {
        expect(result).toBe(expected);
      });
    }
  );
});
