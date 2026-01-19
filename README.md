# GitHub Pages Projects Showcase

A modern, responsive portfolio website that automatically discovers and displays all your GitHub Pages projects. Built with React, Vite, TypeScript, and Tailwind CSS.

## Features

- 🔍 **Automatic Project Discovery**: Fetches all repositories from your GitHub account via the GitHub API
- 📊 **Rich Project Information**: Displays project name, description, tech stack, stars, and links
- 🔎 **Search & Filter**: Filter projects by language, topic, or search by name
- 📱 **Responsive Design**: Works beautifully on mobile, tablet, and desktop
- ⚡ **Fast Performance**: Optimized builds with Vite
- 🚀 **Automated Deployment**: GitHub Actions automatically builds and deploys on every push

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A GitHub account
- (Optional) GitHub personal access token for higher API rate limits

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd hugsndnugs-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set:
   - `VITE_GITHUB_USERNAME`: Your GitHub username
   - `VITE_GITHUB_TOKEN`: (Optional) Your GitHub personal access token

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Configuration

### Environment Variables

- `VITE_GITHUB_USERNAME` (Required): Your GitHub username or organization name
- `VITE_GITHUB_TOKEN` (Optional): GitHub personal access token for higher API rate limits (5,000 requests/hour vs 60 requests/hour)

### GitHub Pages Base Path

The `vite.config.ts` is configured to use `/hugsndnugs-website/` as the base path. If your repository has a different name, update the `base` property in `vite.config.ts` and the `GITHUB_PAGES_BASE` in `.env.example`.

## Deployment

### GitHub Pages via GitHub Actions

1. Push your code to the `main` branch
2. Go to your repository Settings → Pages
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically build and deploy on every push to `main`

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to GitHub Pages using your preferred method (gh-pages, GitHub CLI, etc.)

## Project Structure

```
src/
├── components/     # React components
│   ├── Header.tsx
│   ├── ProjectCard.tsx
│   └── ProjectList.tsx
├── services/       # API services
│   └── githubService.ts
├── types/          # TypeScript interfaces
│   └── project.ts
├── utils/          # Utility functions
│   └── filterUtils.ts
├── App.tsx         # Main application component
├── main.tsx        # Entry point
└── index.css       # Global styles
```

## Customization

### Styling

The project uses Tailwind CSS. Customize the theme in `tailwind.config.js`.

### Project Filtering

By default, the website displays all repositories. To filter only repositories with GitHub Pages enabled, modify the `filterGitHubPagesProjects` function in `src/services/githubService.ts`.

## License

MIT
