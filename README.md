# Naren Kumar — 3D Portfolio

*Also known online as Kenta Kakashi.*

A personal, space-inspired portfolio for Naren Kumar (aka Kenta Kakashi) for the software I'm building and the things I'm learning in public.

## Featured work

- **Theo AI** — An Android AI assistant project focused on useful conversation, tutoring, and a more natural assistant experience. [Repository](https://github.com/Kentaakakashi/Theo-AI)
- **API Sentinel** — A developer-tools project in progress. More implementation details and a public source link will be added as the project becomes ready.
- **This portfolio** — An interactive 3D portfolio built with Next.js, React, TypeScript, and Tailwind CSS.

## Tech

- Next.js, React, TypeScript, Tailwind CSS
- Three.js / React Three Fiber and motion libraries from the base template
- GitHub Actions for repository automation

## Development

Requires Node.js 20.9+ and pnpm 11.

```bash
pnpm install
pnpm dev
```

Create a local `.env.local` from `.env.example` if you want to configure optional integrations. The portfolio can be explored without enabling the optional realtime backend.

## Personalization

- Site metadata: `src/data/config.ts`
- Project cards and descriptions: `src/data/projects.tsx`
- Interactive keyboard skills: `src/data/constants.ts`
- Custom project artwork: `public/assets/projects-screenshots/kenta/`

This portfolio is a work in progress. Project descriptions are intentionally limited to features and status that can be represented accurately.

## Credits and license

The 3D portfolio foundation is adapted from [Naresh Khatri's 3D Portfolio](https://github.com/Naresh-Khatri/3d-portfolio). The original MIT license is included in [LICENSE](LICENSE); please review it and retain the required copyright and license notice when redistributing.
