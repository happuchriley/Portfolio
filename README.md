# Riley Happuch - Portfolio Website

A modern, responsive portfolio website showcasing digital design and front-end development work.

## Features

- 🎨 Modern, clean design
- 📱 Fully responsive mobile navigation
- ⚡ Optimized performance
- ♿ Accessibility-focused
- 🎯 Smooth animations and transitions

## Setup & Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone git@github.com:happuchriley/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Build Tailwind CSS:
```bash
npm run build-css
```

4. For development with auto-rebuild on file changes:
```bash
npm run watch-css
```

### Project Structure

```
├── dist/
│   └── output.css          # Compiled Tailwind CSS
├── src/
│   └── input.css           # Tailwind source file
├── images/                 # Image assets
├── index.html              # Main HTML file
├── main.css                # Custom styles
├── script.js               # JavaScript functionality
├── tailwind.config.js      # Tailwind configuration
└── package.json            # Dependencies and scripts
```

## Building for Production

Before deploying, build the CSS:

```bash
npm run build-css
```

This creates a minified CSS file in `dist/output.css` that's optimized for production.

## Deployment

The site can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

Make sure to run `npm run build-css` before deploying, or set up a build step in your deployment pipeline.

## Technologies Used

- HTML5
- Tailwind CSS
- Vanilla JavaScript
- CSS3 Animations

## License

© 2025 Riley Happuch. All rights reserved.
