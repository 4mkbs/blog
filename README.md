# Blog Client

Frontend app for the blog platform, built with React + Vite.

## Overview

This client includes:

- Authentication flow (login/register/profile)
- Home feed and post detail pages
- Category/tag/search filtering
- Mobile and desktop interactive search suggestions
- Smooth route scroll reset and floating scroll-to-top button
- XSS-safe rendering with DOMPurify-based sanitization utilities

## Tech Stack

- React 19
- React Router
- Vite
- Tailwind CSS
- Axios
- DOMPurify

## Prerequisites

- Node.js 18+
- Running backend API (default: http://localhost:5000)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create .env (or update existing):

```env
VITE_API_URL=http://localhost:5000/api
```

3. Start development server:

```bash
npm run dev
```

App runs on http://localhost:5173

## Available Scripts

- npm run dev: Start Vite dev server
- npm run build: Build production bundle
- npm run preview: Preview production build
- npm run lint: Run ESLint

## Important Frontend Behavior

- Search query is synced with URL query param `search`
- Content rendering uses sanitization helpers in `src/utils/sanitize.js`
- `PostDetailPage` sanitizes HTML content before rendering
- `PostCard` and `FeaturedPostCard` sanitize text fields before display
- `ScrollToTop` handles route change reset and user-triggered smooth top scroll

## Project Structure

```text
client/
  src/
    components/
    context/
    hooks/
    pages/
    services/
    utils/
  public/
  index.html
```

## Notes

- If lint prints only a baseline-browser-mapping warning, code quality checks still pass.
- Make sure backend CORS and API URL are aligned with your environment.
