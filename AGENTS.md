# Project instructions

## GitHub identity

- This school project belongs to the GitHub account `ChanceCaswell`.
- Use the SSH host alias `github-school`, which is configured in `~/.ssh/config` with the UNG schoolwork key.
- Use SSH repository URLs in this form: `git@github-school:ChanceCaswell/<repository>.git`.
- Before cloning or pushing, verify the identity with `ssh -T github-school`; GitHub should identify the account as `ChanceCaswell`.
- Do not expose, copy, commit, or modify the private SSH key.
- Use `gh-school` for GitHub CLI/API operations on this project; it is independently authenticated as `ChanceCaswell` through `~/.config/gh-school`.
- Plain `gh` is reserved for non-school work; do not use it to create or configure this project's repository.

- Do not add AI attribution, AI co-author lines, generated-by notices, or AI references to commit messages, pull requests, or push-related metadata.


## User-facing copy

- Write rendered UI copy for end users, not developers.
- Never expose sprint labels, prototype status, implementation or storage details, demo/test language, internal roadmap items, security-review notes, or unfinished-feature commentary in the product UI.
- Keep those details in documentation, issues, pull requests, code comments, or tests. Review rendered copy before publishing, and ask the user when product wording is uncertain.


## Next.js version guidance

<!-- BEGIN:nextjs-agent-rules -->
This project uses a current Next.js version whose APIs and conventions may differ from older training data. Read the relevant guide in `node_modules/next/dist/docs/` before changing framework behavior, and follow deprecation notices.
<!-- END:nextjs-agent-rules -->
