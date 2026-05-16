#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# AGENTIQ — One-shot repo setup script
# Run from any directory. Clones the repo, scaffolds Vite + React,
# places AGENTIQ_World1.jsx, adds GitHub Actions deploy workflow, and pushes.
#
# Prerequisites:
#   - git installed and authenticated (ssh key or gh cli)
#   - node >= 18 installed
#   - npm installed
#   - AGENTIQ_World1.jsx downloaded to ~/Downloads/
#
# Usage:
#   chmod +x setup_agentiq.sh
#   ./setup_agentiq.sh
# ─────────────────────────────────────────────────────────────────────────────

set -e  # Exit immediately on any error

REPO_URL="https://github.com/coltonjcox92/AgenticIQ.git"
REPO_DIR="AgenticIQ"
JSX_SOURCE="$HOME/Downloads/AGENTIQ_World1.jsx"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  AGENTIQ Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ── 1. Check prerequisites ────────────────────────────────────────────────────
echo "▶ Checking prerequisites..."

if ! command -v git &> /dev/null; then
  echo "✗ git not found. Install git and try again."; exit 1
fi

if ! command -v node &> /dev/null; then
  echo "✗ node not found. Install Node.js >= 18 and try again."; exit 1
fi

if ! command -v npm &> /dev/null; then
  echo "✗ npm not found. Install npm and try again."; exit 1
fi

if [ ! -f "$JSX_SOURCE" ]; then
  echo ""
  echo "✗ AGENTIQ_World1.jsx not found at $JSX_SOURCE"
  echo ""
  echo "  Download it from the Claude conversation and place it in ~/Downloads/"
  echo "  then re-run this script."
  echo ""
  exit 1
fi

echo "✓ All prerequisites met."
echo ""

# ── 2. Clone the repo ─────────────────────────────────────────────────────────
echo "▶ Cloning repo..."
if [ -d "$REPO_DIR" ]; then
  echo "  Directory '$REPO_DIR' already exists — pulling latest instead."
  cd "$REPO_DIR"
  git pull origin main
else
  git clone "$REPO_URL" "$REPO_DIR"
  cd "$REPO_DIR"
fi
echo "✓ Repo ready."
echo ""

# ── 3. Scaffold Vite + React project ─────────────────────────────────────────
echo "▶ Scaffolding Vite + React..."
npm create vite@latest . -- --template react --yes 2>/dev/null || \
  npx --yes create-vite@latest . --template react

npm install
npm install lucide-react

echo "✓ Vite + React scaffolded."
echo ""

# ── 4. Place the game file ────────────────────────────────────────────────────
echo "▶ Installing AGENTIQ_World1.jsx as src/App.jsx..."
cp "$JSX_SOURCE" src/App.jsx
echo "✓ src/App.jsx installed."
echo ""

# ── 5. Configure vite for GitHub Pages ───────────────────────────────────────
echo "▶ Configuring vite.config.js for GitHub Pages..."
cat > vite.config.js << 'VITECONFIG'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/AgenticIQ/',   // Must match your repo name exactly (case-sensitive)
})
VITECONFIG
echo "✓ vite.config.js updated."
echo ""

# ── 6. Update index.html title ───────────────────────────────────────────────
echo "▶ Updating page title..."
sed -i.bak 's/<title>.*<\/title>/<title>AGENTIQ — Agentic AI Learning Game<\/title>/' index.html
rm -f index.html.bak
echo "✓ Title updated."
echo ""

# ── 7. Create GitHub Actions deploy workflow ──────────────────────────────────
echo "▶ Creating GitHub Actions deploy workflow..."
mkdir -p .github/workflows
cat > .github/workflows/deploy.yml << 'WORKFLOW'
name: Deploy AGENTIQ to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
WORKFLOW
echo "✓ .github/workflows/deploy.yml created."
echo ""

# ── 8. Update README ─────────────────────────────────────────────────────────
echo "▶ Updating README.md..."
cat > README.md << 'README'
# AGENTIQ 🤖

> **The Agentic AI Learning Game** — Learn agentic AI from first principles to production-grade architecture, one question at a time.

Inspired by Duolingo and trivia games. Built from the [Agentic AI Comprehensive Glossary](docs/).

## 🎮 Play Now

**[▶ Play AGENTIQ](https://coltonjcox92.github.io/AgenticIQ/)**

## What's Inside

- **World 1: The Basics** — What Is an Agent? (5 lessons, 32 questions, 1 Boss Challenge)
- 7 question types: Flashcard, Analogy Match, Spot the Concept, Fill the Trace, Build the Stack, Debug the Agent, Boss Scenarios
- XP system, hearts, streaks, star ratings
- Zero backend — plays in any browser, progress saved locally

## Worlds (Phases)

| # | World | Status |
|---|-------|--------|
| 1 | 🤖 The Basics | ✅ Live |
| 2 | 🧠 The Brain | 🔒 Coming soon |
| 3 | 🏛️ Memory Palace | 🔒 Coming soon |
| 4 | 🔧 The Tool Shed | 🔒 Coming soon |
| 5 | 📐 Pattern Library | 🔒 Coming soon |
| 6 | 👥 The Crew | 🔒 Coming soon |
| 7 | 🏭 The Factory | 🔒 Coming soon |
| 8 | 🗼 The Watchtower | 🔒 Coming soon |

## Tech Stack

- React + Vite (single-file, zero backend)
- Deployed via GitHub Pages
- State persisted in `localStorage`

## Development

```bash
npm install
npm run dev        # Local dev server → http://localhost:5173/AgenticIQ/
npm run build      # Production build → /dist
npm run preview    # Preview production build locally
```

## Adding Content

Each world's question bank lives in `src/data/worlds/W*.js`. See the [specification doc](docs/AGENTIQ_Game_Specification.pdf) for the full question schema and content guide.

## License

MIT
README
echo "✓ README.md updated."
echo ""

# ── 9. Test build ────────────────────────────────────────────────────────────
echo "▶ Running production build to verify everything works..."
npm run build

if [ $? -eq 0 ]; then
  echo "✓ Build succeeded — dist/ folder ready."
else
  echo "✗ Build failed. Check the error above before pushing."
  exit 1
fi
echo ""

# ── 10. Git commit and push ───────────────────────────────────────────────────
echo "▶ Committing and pushing to GitHub..."
git add -A
git commit -m "feat: scaffold Vite project + World 1 game (32 questions, 5 lessons, boss challenge)

- Initialize Vite + React project
- Add AGENTIQ_World1.jsx as src/App.jsx
- Configure vite.config.js base path for GitHub Pages
- Add GitHub Actions deploy workflow (.github/workflows/deploy.yml)
- Update README with play link and project overview

Worlds 2-8 coming in Phase 2."

git push origin main

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ Done! Everything pushed to GitHub."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Repo:    https://github.com/coltonjcox92/AgenticIQ"
echo ""
echo "  NEXT: Enable GitHub Pages"
echo "  ─────────────────────────────────────────"
echo "  1. Go to: https://github.com/coltonjcox92/AgenticIQ/settings/pages"
echo "  2. Under 'Source', select: GitHub Actions"
echo "  3. Save."
echo ""
echo "  The Actions workflow will run automatically."
echo "  Your game will be live at:"
echo "  https://coltonjcox92.github.io/AgenticIQ/"
echo ""
echo "  (First deploy takes ~2 minutes after enabling Pages)"
echo ""
