# Mosap Abdel-Ghany — Portfolio

Personal portfolio site for **Mosap Abdel-Ghany**, an AI Engineer specializing in production LLM systems, Retrieval-Augmented Generation (RAG), and agentic AI.

🔗 Live: [mosap-abdelghany.vercel.app](https://mosap-abdelghany.vercel.app)

## Tech Stack

- **[Next.js 15](https://nextjs.org/)** (App Router) + **TypeScript**
- **Tailwind CSS 4** + **shadcn/ui** (Radix UI primitives)
- **next-themes** — dark/light mode
- **lucide-react** — icons
- Custom Node HTTP server (`server.ts`) wrapping the Next.js request handler, run via `tsx`

## Features

- Single-page portfolio: Hero, About, Skills, Projects, Experience, Certifications, Contact
- Responsive layout with a dedicated mobile navigation menu
- Dark/light theme toggle
- SEO: Open Graph + Twitter card metadata, `Person` JSON-LD structured data, `sitemap.ts`
- Optimized hero image via `next/image`
- Clickable contact methods (`mailto:`, `tel:`, GitHub, LinkedIn)
- Resume download button (expects `public/resume.pdf`)

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server (custom server via tsx + nodemon)
npm run dev

# On Windows, if `tee` isn't available, run the underlying command directly:
npx tsx server.ts

# Build for production
npm run build

# Start the production server
npm start

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Project Structure

```
src/
├── app/
│   ├── page.tsx        # All portfolio sections (single-page layout)
│   ├── layout.tsx       # Root layout, metadata, JSON-LD
│   ├── sitemap.ts       # sitemap.xml generation
│   ├── globals.css
│   └── api/health/      # Simple health-check route
├── components/
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── ui/               # shadcn/ui components
├── hooks/
└── lib/
    └── utils.ts
public/
├── hero-bg.jpg
├── robots.txt
└── resume.pdf           # (add your resume here — referenced by the Hero download button)
server.ts                 # Custom Node server wrapping Next.js
```

## Content Updates

All portfolio content (bio, skills, projects, experience, certifications, contact info) lives directly in `src/app/page.tsx` as plain arrays/objects near the top of the component — update those to change what's displayed. Site-wide metadata (title, description, Open Graph, JSON-LD) lives in `src/app/layout.tsx`.

## Deployment

Deployed on [Vercel](https://vercel.com/), auto-deploying from the `main` branch of this repository.

## License

Personal project — all rights reserved.
