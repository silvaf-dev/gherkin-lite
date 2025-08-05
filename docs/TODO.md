# TODO for `gherkin-lite`

This document outlines planned features, improvements, and architectural considerations for the `gherkin-lite` DSL project.

---

## ✅ Core Features

- [ ] **Implement `Background` support**  
  Allow defining a `background(...)` block within a `feature(...)`.  
  It should execute before each `scenario(...)` or `scenarioOutline(...)`, and after any Playwright `beforeEach` hooks.

- [ ] **Add `.only` and `.skip` support**  
  Enable `.only` and `.skip` variants for:
  - `scenario.only(...)`
  - `scenario.skip(...)`

- [ ] **Support `.todo(...)` for incomplete tests**  
  Let users declare placeholders for future scenarios:
  ```ts
  scenario.todo('should support forgot password flow');
  ```

---

## 🧪 Testing Enhancements

- [ ] **Support `feature.only(...)` and `feature.skip(...)`**  
  Allow selective execution or skipping of entire features.

- [ ] **Implement `@tag` system**  
  Add tag support for scenarios and features, and allow filtering via environment variable or CLI:
  ```ts
  scenario('@smoke valid login', async () => { ... });
  ```

- [ ] **Expose test metadata for reporters**  
  Allow tools to extract structured info from scenarios and steps.

- [ ] **Add runtime warnings for missing `then(...)` or duplicate steps**  
  Helps prevent incomplete test definitions.

---

## 🧱 DSL Improvements

- [ ] **Strict step ordering (optional)**  
  Add option to enforce `given → when → then` semantics.

- [ ] **Support shared step definitions**  
  Allow importing common steps from separate files:
  ```ts
  import { userIsLoggedIn } from './steps/sharedSteps';
  await given(userIsLoggedIn);
  ```

---

## 📚 Documentation & DX

- [ ] **Add a full BDD example suite in `/examples/`**  
  E.g., login flow, registration, search, etc.

- [ ] **Expand `README.md` with advanced usage**
  - `background(...)`
  - `.only` / `.skip`
  - Tags

- [ ] **Create `docs/syntax.md`**  
  A reference for all DSL keywords, use cases, and examples.

- [ ] **Add `docs/architecture.md`**  
  Explain internal execution flow, design tradeoffs, and DSL scope handling.

- [ ] **Add typedoc output for published API reference**
