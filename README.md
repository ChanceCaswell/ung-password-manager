# UNG Password Manager

A team software-engineering project for a secure, accessible password-manager web application.

## Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- shadcn/ui using the `b1D0dv72` preset and Base UI primitives
- Bun for dependency management and scripts

MongoDB Atlas, authentication, and the vault-encryption design will be added after the security model is agreed upon.

## Development

Install [Bun](https://bun.sh/), then run:

```bash
bun install
bun dev
```

Open <http://localhost:3000>.

## Checks

```bash
bun run lint
bun run typecheck
bun run build
```

## Project documentation

Product requirements and Jira-ready backlog material are available in [`docs/`](docs/). Local instructor-provided class slides are intentionally excluded from the public repository.

> This project is under development. Do not store real credentials in it.
