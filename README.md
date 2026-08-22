# نادي مدار (Madar Club)

The website for **Madar Club**, a student club platform — currently live as a "coming soon" landing page while the full member portal is finished behind it.

> في مدار بصمةٌ تـبقى، وفـكرٌ يُـدار
> *"In Madar, a mark that lasts, and a thought that's steered."*

## Overview

Madar Club is a creative, student-run club. This repo holds the club's web app: a public landing page today, with a full member portal built out and ready behind login (auth, club structure, events, news, leaderboard, and an admin panel).

## Features

- 🌗 **Light / Dark theme**, with a custom warm gold-on-navy dark palette
- 🌐 **Bilingual UI** — Arabic (RTL) and English (LTR), fully switchable
- 🔐 **Auth flow** — register / login (currently backed by `localStorage`, no server yet)
- 🏛 **Club structure** — board of directors, sectors, and committees
- 📰 **News feed** with image/video (including YouTube embed) support
- 🏆 **Leaderboard** / points system
- 📅 **Events** — browse, register, filter by status (current / upcoming / past)
- 🧑‍🤝‍🧑 **Member profiles** with badges and social links
- 🛠 **Admin panel** for managing members, news, points, and events

## Tech Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Create React App](https://create-react-app.dev/) (`react-scripts`)
- [Tailwind CSS](https://tailwindcss.com/) (loaded via CDN at runtime)
- [Lucide](https://lucide.dev/) icons, with a few custom SVGs for brand icons (X, TikTok, WhatsApp, Instagram, LinkedIn)

## Getting Started

```bash
npm install
npm start
```

The app runs at `http://localhost:3000`.

```bash
npm run build
```

builds an optimized production bundle into `build/`.

## Project Structure

```
src/
  App.tsx       # entire app: state, views, and UI
  index.tsx     # React entry point
  styles.css    # base styles
public/
  index.html    # HTML shell
```

## Status

🚧 Pre-launch. The public site currently shows a "coming soon" landing page while the full portal above is finished and connected to a real backend.
