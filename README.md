# Cuneiform Chat Documentation

Official documentation for [Cuneiform Chat](https://cuneiform.chat) — Document-trained AI chatbots.

*Run your business through conversation.*

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the docs.

### Building

```bash
# Build static site
npm run build
```

Output is in the `out/` directory.

## Deployment

### GitHub Pages

1. Push to `main` branch
2. GitHub Actions builds and deploys automatically
3. Available at `https://cuneiform-chat.github.io/docs` (or custom domain)

### Custom Domain

To use `docs.cuneiform.chat`:

1. Add CNAME record: `docs.cuneiform.chat` → `cuneiform-chat.github.io`
2. Add `CNAME` file to `public/` with content: `docs.cuneiform.chat`
3. Enable HTTPS in GitHub Pages settings

## Structure

```
pages/
├── index.mdx              # Landing page
├── getting-started/       # Quick start guides
├── agents/                # Agent configuration
├── knowledge-base/        # Document management
├── integrations/          # Channel integrations
├── analytics/             # Usage analytics
└── billing/               # Plans and billing
```

## Contributing

1. Edit `.mdx` files in `pages/`
2. Preview locally with `npm run dev`
3. Submit a pull request

## Tech Stack

- [Nextra](https://nextra.site/) - Documentation framework
- [Next.js](https://nextjs.org/) - React framework
- [MDX](https://mdxjs.com/) - Markdown with React components

## License

Copyright © 2025 Cuneiform Chat. All rights reserved.
