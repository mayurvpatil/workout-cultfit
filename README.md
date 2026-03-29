# Cult Fit Workout Planner

A modern, responsive, static personal workout planner using Cult Fit YouTube workout videos.

## Features
- **Weekly Split View**: Displays a Monday-Sunday breakdown.
- **Random Video Picker**: Selects a categorized workout (e.g., Push, Under 40 Minutes) from your library at random. Contains a "Shuffle" option to cycle through.
- **Full Library**: Filterable tabs for all video resources.
- **Monthly Progression**: Visualizes a 3-month growth structure.
- **Busy Fallbacks**: Quick workouts when you're short on time.
- **Athletic UI**: Dark and light mode toggle, clean card structure.

## Tech Stack
- Frontend: **React.js** via **Vite**
- Styling: **Tailwind CSS**
- Deployment: Fully static, configured for **GitHub Pages** via **GitHub Actions**

## Local Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build Output**
   ```bash
   npm run build
   ```

## Managing Workout Data
All video references and progression plans are separated from the UI logic. 
Open `src/data/videos.js` to modify the workout dictionaries and plans without having to adjust React components.

## Deploying to GitHub Pages
This project includes a `.github/workflows/deploy.yml` configured to build and deploy exactly to GitHub. 

1. Ensure your code is pushed securely to GitHub.
2. In your repository on GitHub, go to **Settings** > **Pages**.
3. Under **Source**, select **GitHub Actions**.
4. The workflow will automatically pick up any pushes to the `main` branch, build the static site, and publish the artifact to your repository's GitHub Pages domain.

*Note: If you are serving this under a subdirectory like \`https://username.github.io/repo-name/\`, the \`vite.config.js\` file is already configured with \`base: './'\` to easily handle relative paths.*
