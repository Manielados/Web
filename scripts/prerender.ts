import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';

function prerender() {
  const distIndexPath = path.resolve(process.cwd(), 'dist', 'index.html');

  if (!fs.existsSync(distIndexPath)) {
    console.error(`[Prerender Error] dist/index.html was not found at ${distIndexPath}. Make sure 'vite build' runs first.`);
    process.exit(1);
  }

  let indexHtml = fs.readFileSync(distIndexPath, 'utf-8');

  // Render the full React App component to static HTML string
  const rawAppHtml = renderToString(React.createElement(App));

  // In React 19, resource preloads (such as early images) may be rendered as <link rel="preload"...> tags
  const preloadLinks: string[] = [];
  const bodyHtml = rawAppHtml.replace(/<link rel="preload"[^>]*>/g, (match) => {
    preloadLinks.push(match);
    return '';
  });

  // Inject preload links into <head> if any exist
  if (preloadLinks.length > 0 && indexHtml.includes('</head>')) {
    const preloadBlock = `    ${preloadLinks.join('\n    ')}\n  </head>`;
    indexHtml = indexHtml.replace('</head>', preloadBlock);
  }

  // Inject the prerendered HTML directly inside <div id="root"></div>
  const rootRegex = /<div id="root">\s*<\/div>/;
  if (!rootRegex.test(indexHtml)) {
    // If not matching exact empty tags, try matching any root container
    const genericRootRegex = /<div id="root">[\s\S]*?<\/div>/;
    if (genericRootRegex.test(indexHtml)) {
      indexHtml = indexHtml.replace(genericRootRegex, `<div id="root">${bodyHtml}</div>`);
    } else {
      console.warn('[Prerender Warning] Could not find <div id="root"> container in dist/index.html.');
    }
  } else {
    indexHtml = indexHtml.replace(rootRegex, `<div id="root">${bodyHtml}</div>`);
  }

  fs.writeFileSync(distIndexPath, indexHtml, 'utf-8');
  console.log(`[Prerender Success] Pre-rendered static HTML written to dist/index.html (${(indexHtml.length / 1024).toFixed(1)} KB)`);
}

prerender();
