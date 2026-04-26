# Stack

**Framework & language**
- Vue 3.5 — Composition API with `<script setup lang="ts">` only (no Options API, no JSX)
- TypeScript ~5.9, type-checked with `vue-tsc`

**UI**
- Vuetify 4 (auto-import via `vite-plugin-vuetify`; theme/settings in `src/styles/settings.scss`)
- Tailwind CSS 4 (`@tailwindcss/vite`) — used alongside Vuetify
- MDI icons (`@mdi/font`)
- Fontsource (Roboto, Roboto Mono) via `unplugin-fonts`
- Sass (`sass-embedded`)

**Build & tooling**
- Vite 8, dev server on port 3000, `@` → `src/`
- npm (lockfile present), `npm-run-all2` for parallel scripts
- ESLint (`eslint.config.js`), Prettier (`.prettierrc`)

**Not in use**
- No Vue Router, no Pinia, no testing framework (Vitest/Vue Test Utils absent)
- No SSR

## Conventions

- Always Composition API + `<script setup lang="ts">`; never Options API or JSX.
- Prefer Vuetify components for UI primitives; reach for Tailwind utilities for layout/spacing/custom styling.
- Keep theme tokens in `src/styles/settings.scss`; route global styles through the existing files in `src/styles/`.
- Use the `@/...` alias for imports from `src/`.
- Run `npm run type-check` to validate changes. No test command exists — say so explicitly when behavior can't be verified.
- Don't introduce Router/Pinia/Vitest unless asked — they're deliberately absent.

# Workflow

## When to open a PR

Open a new branch and pull request for **new features** and **refactors**.
Smaller changes (bug fixes, typos, config tweaks, dependency bumps) can be
committed directly to the working branch without a dedicated PR.

## PR authorization

Standing authorization to open PRs without asking each time. Still:
- Use a descriptive branch name and PR title.
- Don't auto-merge; leave the PR open for human review.
- Don't push to `main` directly.
