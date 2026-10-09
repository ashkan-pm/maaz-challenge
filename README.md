# Maaz Frontend Challenge

Vue and Nuxt frontend project for the Maaz interview challenge, using [Fake Store API](https://fakestoreapi.com). UI controls use Farsi and an RTL layout; product titles, descriptions, and category names retain the API's English content.

## Setup

Requires **Node.js 24.x** and **pnpm 11.13.1**, specified in `.node-version` and `package.json`.

```bash
pnpm install
pnpm dev
```

Open **http://localhost:3000**. Installation generates Nuxt types and ESLint configuration and installs Git hooks.

## Production

```bash
pnpm build
pnpm start
```

The server defaults to **http://localhost:3000**; configure it with `PORT` and `HOST`. Use `pnpm preview` to preview a build locally. Static hosting uses `pnpm generate` and `.output/public`; dynamic routes require a prerendering strategy.

## Scripts

| Command             | Purpose                                                                 |
| ------------------- | ----------------------------------------------------------------------- |
| `pnpm dev`          | Start development with hot reload.                                      |
| `pnpm build`        | Create the production build.                                            |
| `pnpm start`        | Run the built production server.                                        |
| `pnpm preview`      | Preview an existing build locally.                                      |
| `pnpm generate`     | Prerender the site for static hosting.                                  |
| `pnpm type-check`   | Check TypeScript and Vue templates.                                     |
| `pnpm lint`         | Check source files; formatting errors and warnings fail.                |
| `pnpm lint:fix`     | Apply automatic lint and formatting fixes.                              |
| `pnpm format`       | Format supported project files.                                         |
| `pnpm format:check` | Check formatting without changing files.                                |
| `pnpm test`         | Run all tests once.                                                     |
| `pnpm test:watch`   | Rerun tests when files change.                                          |
| `pnpm postinstall`  | Generate Nuxt types and configuration automatically after installation. |
| `pnpm prepare`      | Install Husky hooks automatically after installation.                   |

## Structure

```text
app/                       Application entry point and components
public/                    Static assets served directly
test/nuxt/                 Nuxt runtime tests
.github/workflows/ci.yml   Continuous integration
.husky/pre-commit          Staged-file checks
nuxt.config.ts             Application configuration
eslint.config.mjs          Nuxt lint rules and Prettier integration
vitest.config.ts           Node unit and Nuxt runtime test projects
```

## Code quality and testing

[Nuxt ESLint](https://eslint.nuxt.com/packages/module) provides Vue, TypeScript, and auto-import support. Additional rules enforce `<script setup>`, explicit events, immutable props, and avoiding `v-html`. Prettier violations are ESLint errors, with conflicting formatting rules disabled.

Formatting uses two spaces, single quotes, no semicolons, trailing commas, a 100-character line width, and LF endings. Generated files and `pnpm-lock.yaml` are excluded from formatting.

[Vitest and Nuxt Test Utils](https://nuxt.com/docs/4.x/getting-started/testing) run pure utility tests in Node (`test/unit/`) and component/composable tests in Nuxt with Vue Test Utils and happy-dom (`test/nuxt/`). Nuxt runtime tests are included in the app's TypeScript context. Assert observable behavior, unmount components, and mock API calls to keep tests independent of the network. Browser end-to-end tests and coverage thresholds are not configured.

## Commit checks and CI

Husky runs lint-staged on matching **staged files only**:

- Source files: ESLint fixes, then Prettier.
- Documentation, styles, and configuration: Prettier.

Fixes are staged automatically; unresolved lint errors block the commit. Standalone lint and format scripts process the whole project, respecting ignore rules.

GitHub Actions runs separate **Formatting**, **Lint**, **Type check**, **Tests**, and **Build** jobs on pull requests, pushes to `main`, and manual dispatch. Each uses the pinned pnpm version and a frozen lockfile for reproducible installs. Jobs cache dependencies, use read-only repository permissions, and cancel superseded runs.

## Data assumptions

Fake Store API is the source of product content. Currency handling and unavailable stock information must be documented when data integration is implemented.
