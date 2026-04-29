# AGENTS.md

## Repository expectations

- Read and follow this file before making changes.
- Keep UI changes aligned with FounderWrapped brand tokens and typography.
- Avoid changing product logic unless explicitly requested.
- Prefer minimal dependencies.
- Run available checks before committing.

## Codex instruction discovery reference

Codex discovers instruction files in layered precedence:

1. Global scope in `~/.codex/`:
   - `AGENTS.override.md` (if non-empty), otherwise `AGENTS.md`.
2. Project scope from repo root to current directory:
   - `AGENTS.override.md`, then `AGENTS.md`, then fallback names from config.
3. Merge order is root to leaf; deeper files override earlier guidance.

Codex skips empty files and respects size limits (`project_doc_max_bytes`, default 32 KiB).

## Recommended local setup

Create global defaults:

```bash
mkdir -p ~/.codex
cat > ~/.codex/AGENTS.md <<'MD'
# ~/.codex/AGENTS.md

## Working agreements

- Always run `npm test` after modifying JavaScript files.
- Prefer `pnpm` when installing dependencies.
- Ask for confirmation before adding new production dependencies.
MD
```

Optional temporary override:

- Use `~/.codex/AGENTS.override.md`.
- Remove it to return to base global guidance.

## Project-level layering

At repo root:

```md
# AGENTS.md

## Repository expectations

- Run `npm run lint` before opening a pull request.
- Document public utilities in `docs/` when you change behavior.
```

Example nested override (`services/payments/AGENTS.override.md`):

```md
## Payments service rules

- Use `make test-payments` instead of `npm test`.
- Never rotate API keys without notifying the security channel.
```

## Fallback filenames and limits

Configure in `~/.codex/config.toml`:

```toml
project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]
project_doc_max_bytes = 65536
```

## Verification commands

```bash
codex --ask-for-approval never "Summarize the current instructions."
codex --cd subdir --ask-for-approval never "Show which instruction files are active."
```

## Troubleshooting

- Ensure files are non-empty.
- Check for unexpected higher-level `AGENTS.override.md`.
- Restart Codex after config changes.
- Verify `CODEX_HOME` when using alternate profiles.
