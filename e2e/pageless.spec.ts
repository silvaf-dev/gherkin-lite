import { expect } from '@playwright/test';
import { given, when, then, feature, scenario } from '../dist/gherkinSyntax.js';

feature('addition of two numbers', async () => {
  const examples = [
    { a: 1, b: 2, expected: 3 },
    { a: 10, b: 5, expected: 15 }
  ];

  for (const { a, b, expected } of examples) {
    scenario(
      `adds ${a} and ${b} to get ${expected}`,
      async () => {
        let result = 0;

        await given(`two numbers: ${a} and ${b}`, async () => {
          result = a + b;
        });

        await when('they are added', async () => {
          // already added
        });

        await then(`the result is ${expected}`, async () => {
          expect(result).toBe(expected);
        });
      },
      { tags: ['@math', '@outline'] }
    );
  }
});
