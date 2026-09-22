# UNG Password Manager

A team software-engineering project for a secure, accessible password-manager web application.

## Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- shadcn/ui with Base UI primitives
- Bun for dependency management and scripts

Sprint 1 stores one client-encrypted vault in the browser. MongoDB synchronization and authentication remain separate follow-up architecture decisions.

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
