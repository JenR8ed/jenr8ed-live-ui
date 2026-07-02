---
id: readme-live-ui-v1
created_at: 2026-07-01
state: approved
owner: JenR8ed
tags: [live-ui, jaios, cloudflare-pages, frontend]
---

# jenr8ed-live-ui

![Status](https://img.shields.io/badge/status-active-success.svg)
![Architecture](https://img.shields.io/badge/arch-JAIOS%20local--first-orange.svg)
![Hosting](https://img.shields.io/badge/hosting-Cloudflare%20Pages-F38020.svg)

**jenr8ed-live-ui** is the public-facing UI layer for the JenR8ed platform.
It hosts the live interface, edge functions, and published documentation that
represent the JenR8ed brand and product surface externally.

> 🔖 **Purpose decision in progress.** See [`PURPOSE.md`](./PURPOSE.md) for the
> open classification decision (portfolio site / JAIOS dashboard shell /
> Cloudflare Pages static host). This README will be updated once confirmed.

---

## Repository Structure

```
jenr8ed-live-ui/
├── public/                  # Static assets (HTML, CSS, JS, images)
├── functions/               # Cloudflare Pages edge functions
├── docs/
│   └── LETS_CODE_PROFILE.md # Let's Code profile and engineering context
├── fsad/
│   ├── proposals/           # Pending operational records
│   ├── approved/            # Validated records
│   ├── archive/
│   │   └── 2026-06-27-docs/ # Migrated from 04-2026-06-27-docs/
│   └── meta/                # Aggregated indices (generated)
├── AGENTS.md                # Agent governance (JAIOS)
├── JAIOS_SOT.md             # System of Truth reference
├── PURPOSE.md               # Open classification decision
└── README.md
```

---

## Deployment

This project deploys to **Cloudflare Pages**.

| Setting | Value |
|---|---|
| Build command | *(static — no build step)* |
| Output directory | `public/` |
| Edge functions | `functions/` |
| Environment variables | Injected via Cloudflare Pages settings — **no `.env` files** |

Zero-trust secrets policy: all environment variables are set in the
Cloudflare Pages dashboard or via Doppler.
See [JAIOS Dash Governance](https://github.com/JenR8ed/.github/blob/main/docs/governance/dash-governance.md).

---

## Local Development

```bash
# Clone
git clone https://github.com/JenR8ed/jenr8ed-live-ui.git
cd jenr8ed-live-ui

# Run locally with Cloudflare Pages dev server (edge functions supported)
npx wrangler pages dev public/
```

---

## FSAD Structure

This repo uses the JAIOS File-System-as-Database pattern for operational records.

```
fsad/proposals/   ← new records (UI tasks, content requests, deploys)
fsad/approved/    ← validated and ready for action
fsad/archive/     ← completed or historical records
fsad/meta/        ← generated indices (do not edit manually)
```

File naming: `YYYYMMDD-<slug>.yaml` with required fields:
`id`, `created_at`, `state`, `owner`, `tags`

Full spec: [docs/governance/fsad-architecture.md](https://github.com/JenR8ed/.github/blob/main/docs/governance/fsad-architecture.md)

---

## Agent Governance

This repo is governed by JAIOS agent protocols.
See [`AGENTS.md`](./AGENTS.md) for allowed tools, state machine rules,
and hallucination escalation paths.

Active agents: Gemini · Claude · Grok Build · Jules · Cursor

---

## CI / Dash Governance

All PRs require **Dash CI** to pass before merging to `main`.

```
.github/workflows/dash.yml  ← SOT check · lint · secret scan · build
```

Merges to `main` require `dash_validated: true`.
See [JenR8ed/.github — Dash Governance](https://github.com/JenR8ed/.github/blob/main/docs/governance/dash-governance.md).

---

## Documentation

| Doc | Description |
|---|---|
| [`PURPOSE.md`](./PURPOSE.md) | Open classification decision for this repo |
| [`AGENTS.md`](./AGENTS.md) | Agent governance and JAIOS compliance rules |
| [`JAIOS_SOT.md`](./JAIOS_SOT.md) | Org-wide System of Truth |
| [`docs/LETS_CODE_PROFILE.md`](./docs/LETS_CODE_PROFILE.md) | Engineering profile |

---

## Org Governance

This repo is part of the **JenR8ed AI OS (JAIOS)** organization.
- Org governance: [JenR8ed/.github](https://github.com/JenR8ed/.github)
- Legal: [docs/legal/](https://github.com/JenR8ed/.github/tree/main/docs/legal)
- Architecture: [docs/governance/](https://github.com/JenR8ed/.github/tree/main/docs/governance)

**JenR8ed** — deterministic, agentic, local-first.
