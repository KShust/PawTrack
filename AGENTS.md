Project-level constraints for AI coding agents working in the PawTrack repository.

This file contains only rules that stay true regardless of what is currently implemented. Anything that describes the current state of the code lives in `STATUS.md`. Repeatable procedures live in `.claude/skills/`.

| Need                                                                       | Read                |
| --------------------------------------------------------------------------- | ------------------ |
| What exists right now, known bugs, lint baseline                          | `STATUS.md`        |
| Product scope, feature tiers, planned DB schema, milestones               | `PROJECT_BRIEF.md` |
| How to plan, add a route, add a query, review security, validate a change | `.claude/skills/`  |

## Source of truth

When sources disagree, this order wins:

1. **The code** — for structure, framework versions, and what actually works.
2. **`AGENTS.md`** — for rules and constraints.
3. **`PROJECT_BRIEF.md`** — for *product intent* only (features, tiers, planned schema, milestones). It is a plan, not a description of the repo.
4. **`README.md`** — least reliable. Partly aspirational, partly stale. Never cite it as evidence that something exists.

If the brief and the code conflict on a technical detail, the code wins and the conflict goes to Open Decisions — do not "fix" the code to match the brief without being asked.

## Product context

PawTrack is a pet health tracker for cats and dogs: pet profiles, feeding logs, medical events, activity logs, a Health Score, reminders, and Claude-powered assistance. It is a personal portfolio project intended to become a real SaaS later.

Durable product rules:

* **Multi-pet, multi-user.** Every domain row belongs to a pet, and every pet belongs to a user. No feature may assume a single pet or a single user.
* **Free/Pro tiers exist as a product concept.** Data models and UI must not make future gating impossible, but do not implement gating until explicitly asked.
* **Health Score is deterministic application logic, not AI.** It is computed from logged data. Never route the calculation through an LLM.
* **Bilingual from day one** (`en` default, `uk`). A feature is not complete in one language.
* **AI features are additive.** No core flow (logging, viewing, editing) may depend on an LLM being available.

## Technology constraints

Verify framework and dependency versions in `package.json` before relying on version-specific behavior.

* Next.js App Router + React + TypeScript with `strict: true`.
* `next-intl` provides `uk` and `en` locales; `en` is the default.
* Tailwind CSS v4 is configured through `src/app/globals.css`. Do not create `tailwind.config.*`.
* Supabase is accessed server-side through the established server client.
* `lucide-react` is the icon library.
* ESLint uses flat config.
* npm is the package manager. `package-lock.json` is the repository lockfile.
* Do not add dependencies or switch package managers without being asked.

Version-specific behavior must be verified against the actual installed packages rather than assumed from this document.

## Repository structure

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    [locale]/
      layout.tsx
  components/
    layout/
    <feature>/
    ui/
  config/
  hooks/
  i18n/
  lib/
  types/
messages/en.json
messages/uk.json
```

Where new code goes:

| Kind of code        | Location                                                                     |
| ------------------- | ---------------------------------------------------------------------------- |
| New route           | `src/app/[locale]/<route>/page.tsx`                                          |
| Feature UI          | `src/components/<feature>/`                                                  |
| Generic reusable UI | `src/components/ui/`                                                         |
| Domain types        | `src/types/<domain>/<domain>.types.ts` + re-export from `src/types/index.ts` |
| Pure helpers        | `src/lib/<name>.ts`                                                          |
| Client-only hooks   | `src/hooks/useX.ts`                                                          |
| UI strings          | `messages/en.json` and `messages/uk.json`                                    |

User-facing routes must live under `[locale]`, except for the existing root redirect in `src/app/page.tsx`.

## Architecture rules

### Server/client boundaries

* Server components fetch server-side data and pass plain serializable data to client components.
* Client components contain interaction, browser-only APIs, hooks, and event handlers.
* Do not import server-only modules into client components.
* Do not import Supabase into a `'use client'` component.
* Keep `'use client'` as far down the component tree as practical.
* Do not pass non-serializable values from server components to client components.

### Application structure

* `AppShell` is applied once in `src/app/[locale]/layout.tsx`. Pages must not re-add navigation.
* Navigation is data-driven from `src/config/navigation.ts`. Never hardcode navigation items in components.
* Reusable business/domain calculations should not live in presentation components or route files. Put reusable pure logic in `src/lib/`.
* Types must not depend on UI components or application-specific implementation modules.
* Pure helpers must not depend on React components.
* Keep dependencies flowing toward lower-level, reusable modules; do not introduce circular or inverted dependencies.

### Data access

* Database access is server-side.
* Do not introduce a new data-access abstraction, repository layer, server action, route handler, or browser Supabase client unless the relevant Open Decision has been explicitly resolved.
* Domain types mirror the Supabase table shape using `snake_case` column names.
* Keep hand-written types synchronized with queries when modifying data access.
* Do not manually invent database schema in application code. If a task requires a schema change, flag it before implementation because schema/migration management is not currently established in this repository.

### Ownership

* User-owned data must remain scoped to the authenticated/current user.
* Never remove an existing ownership filter from a query.
* Prefer explicit ownership filtering where the query can safely establish it.
* Ownership must also be preserved for indirectly owned records: a record belonging to a pet must only be accessible through a pet belonging to the current user.
* Do not assume that database authorization is sufficient merely because RLS may exist. Treat ownership boundaries as an application invariant as well as a database concern.
* Never expose another user's data through UI, query results, logs, errors, or AI context.

### Authentication

* New code must use the established current-user abstraction rather than depending directly on the current authentication implementation.
* Do not introduce a second authentication mechanism.
* Real authentication/session handling remains an Open Decision.

### Navigation and routing

* User-facing routes live under `src/app/[locale]/`.
* Next.js route `params` must be handled according to the installed Next.js version; verify the current API in the code/package version rather than assuming an older API.
* Use `notFound()` only when the requested resource genuinely does not exist.
* Use `redirect()` for intentional redirects.
* Do not treat arbitrary database/query failures as "not found".

## Coding conventions

### TypeScript

* `strict` is enabled; avoid `any`.
* Import domain types from `@/types`, not individual `*.types.ts` files.
* Component props use a named interface (`PetCardProps`) or `interface Props` for single-purpose components.

### React

* One component per file, using the project's established arrow-function/default-export style, `'use client'` only where client behavior is actually required.
* Do not add `memo()` merely because a component appears in a list. Use memoization only where the rendering pattern or measured performance justifies it.
* Use the `@/*` alias for imports outside the current folder; relative imports for siblings/children.

### Naming

Components/files `PascalCase.tsx`; hooks `useCamelCase.ts`; helpers/config `camelCase.ts`; types `domain.types.ts`; module-level constants `SCREAMING_SNAKE_CASE`. i18n namespaces are PascalCase and normally match the component/feature namespace.

### Styling

* Tailwind utilities are for layout, spacing, and typography sizing.
* Colors, borders, shadows, and radii come from CSS variables in `globals.css`.
* Do not use Tailwind palette colors such as `bg-gray-100` or `text-green-600`.
* Prefer existing semantic classes from `@layer components`.
* Add new design tokens to `globals.css` rather than hardcoding design values in components.

### State

* Use local React state unless a justified project-wide state requirement exists.
* Do not introduce a global state library without an explicit architectural decision.
* Do not introduce a data-fetching library without an explicit architectural decision.

## i18n

Internationalization is a hard requirement.

* No user-facing literal strings in components.
* Every user-facing string must use the appropriate translation mechanism.
* Every new or changed key must exist in both `messages/en.json` and `messages/uk.json`.
* Both locale files must maintain the same key structure.
* Do not leave one locale partially implemented while considering the feature complete.
* Server components use server-side translations; client components use the established client translation API.

## Supabase

* Use the established server-side Supabase client.
* Do not create a browser Supabase client unless the mutation/client-access architecture is explicitly changed.
* Query results use honest casts/types where generated Supabase types are not available.
* Never assume planned tables in `PROJECT_BRIEF.md` exist.
* Treat the actual database/query code as authoritative over the planned schema.
* Do not manually edit generated artifacts if a source file is responsible for generating them.

## Security rules

* Never read, print, copy, commit, or paste the contents of `.env.local` or any `.env*` file. Refer to environment variables by name only.
* Never put a secret or service-role key in a `NEXT_PUBLIC_*` variable.
* Never place a service-role key anywhere in `src/`.
* Never log or include in client-visible errors: pet owner email, user id, authentication tokens, secrets, or raw Supabase error objects.
* Treat all user-supplied text sent to the Claude API as untrusted input. Do not construct prompts in a way that allows user content to override system/developer instructions.
* Never use `dangerouslySetInnerHTML` with user-controlled content unless explicitly reviewed.
* Never trust client-provided input at a server boundary, even when no validation library has yet been selected.
* Changes involving auth, ownership, environment variables, file uploads, or AI prompts must use the `security-review` skill unless the change is genuinely trivial.

## Error handling

* Handle absence of a requested record separately from database, network, configuration, or authorization failures.
* Do not expose raw infrastructure/database errors to users.
* Error boundaries, `error.tsx`, and `loading.tsx` are not yet an established project pattern; do not introduce a broad convention without resolving the corresponding Open Decision.

## Formatting

* There is no Prettier or `.editorconfig`.
* Match the formatting style of the file being edited.
* Do not reformat an entire file as a side effect of an unrelated change.
* Avoid unrelated formatting churn.

## Definition of done

A task is not complete until the `validate-change` skill has been followed. At minimum, validation must establish:

* TypeScript is clean.
* No new lint problems are introduced relative to the baseline.
* Required builds pass for changes that affect routing, middleware, configuration, or i18n.
* Changed UI strings exist in both locales with matching key structure.
* `git diff` contains no debug leftovers, formatting churn, or unrelated edits.
* The final report states what changed, what was verified, and what was guessed or left unresolved.

There is no automated test suite currently established. Do not claim tests pass when no test runner exists, and do not add a test runner unless explicitly asked.

## Git

* Do not commit or push unless explicitly asked.
* Use feature branches for isolated work when branch-based development is requested.
* Use Conventional Commit subjects for new commits: `feat:`, `fix:`, `chore:`.
* Never commit `.env*`, `.next/`, `node_modules/`, `tsconfig.tsbuildinfo`, `next-env.d.ts`, or `.claude/worktrees/`.
* Do not manually edit `package-lock.json`.
* Do not manually edit generated build artifacts.

## Hard stops

The rules above already cover project style, architecture, and conventions. These are the highest-risk ones — irreversible, security-relevant, or capable of silently corrupting the project's invariants — repeated here because they must never be missed:

* Do not import Supabase into, or fetch database data from, a `'use client'` component.
* Do not expose secrets through `NEXT_PUBLIC_*` variables or client-visible code, or place a service-role key anywhere in `src/`.
* Do not create user-facing strings without updating both locale files.
* Do not silently resolve an Open Decision.
* Do not add dependencies or switch package managers without being asked.
* Do not commit or push unless explicitly asked.

## Open decisions

These are genuinely undecided. Do not resolve them silently. Implement the narrowest option that unblocks the task and report the unresolved decision.

* **Real authentication.** Sign-in method, session handling, and whether next-intl middleware is composed with Supabase session middleware.
* **Authorization boundary.** Long-term balance between Supabase RLS and application-level ownership checks.
* **Mutation strategy.** Server actions vs route handlers vs browser Supabase client.
* **Where data access lives long-term.** Inline queries vs `src/lib/queries/` vs repository layer.
* **Input validation.** Validation library, validation location, and project convention.
* **Supabase type generation** vs continuing with hand-written types.
* **Route shape.** `PROJECT_BRIEF.md` plans `/pets/[id]/...`; current implementation may use `/dashboard/pets/[id]`.
* **Locale-aware links.** Manual locale prefixes vs next-intl navigation helpers.
* **Health Score formula.** Deterministic logic is settled; the actual calculation is not.
* **Error boundaries, `error.tsx`, and `loading.tsx`.**
* **Dark mode activation.** Tokens exist, but activation is not established.
* **Database schema/migration workflow.** The repository currently does not establish how schema changes are created, reviewed, or stored.

## Skills

Use the matching Skill for repeatable procedures:

| Skill                 | Use when                                                                               |
| --------------------- | -------------------------------------------------------------------------------------- |
| `plan-story`          | Turning a milestone or feature request into an implementation plan before writing code |
| `add-localized-route` | Adding or filling in a page under `src/app/[locale]/`                                  |
| `add-supabase-read`   | Adding a query for a table that is not yet used in the code                            |
| `security-review`     | Changes touching auth, ownership, env vars, file upload, or AI prompts                 |
| `validate-change`     | Finishing any task and performing the Definition of Done procedure                     |

Skills contain the procedure. `AGENTS.md` contains the project-level constraints that the procedure must respect.

Do not add story-specific requirements, temporary implementation plans, review assignments, or unrelated prompts to this file. Those belong in the relevant story/plan/skill documentation.