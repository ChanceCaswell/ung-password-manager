# UNG Password Manager

A team software-engineering project for a secure, accessible password-manager web application.

## Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- shadcn/ui with Base UI primitives
- Bun for dependency management and scripts

Sprint 1 stores one client-encrypted vault in the browser and includes a configurable cryptographically secure password generator. MongoDB synchronization and authentication remain separate follow-up architecture decisions.

## Where the code lives

```
app/                 routes only - each page.tsx renders one component
  page.tsx           redirects to /vault
  vault/page.tsx     the vault: saved credentials and the add-credential form
  generate/page.tsx  the standalone password generator
components/vault/    everything specific to this app
components/ui/       vendored shadcn/ui primitives - generated, not written by us
lib/vault/           vault logic: validation, encryption, storage, service
lib/password-generator.ts   password generation
tests/unit/          bun tests for lib/
tests/e2e/           playwright tests that drive the real browser
```

Everything runs in the browser. `lib/vault/service.client.ts` is the one place
that ties the pieces together: it validates a credential, encrypts the whole
vault, and hands it to `repository.client.ts` to store. Start there.

## Development

```bash
bun install
bun dev
```

Open <http://localhost:3000>.

## Checks

```bash
bun run lint
bun run typecheck
bun run test
bun run build
bun run test:e2e
```

> This project is under development. Do not store real credentials in it.
