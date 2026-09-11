import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';

function injectPrerender(filePath: string, bodyHtml: string, preloadLinks: string[]) {
  if (!fs.existsSync(filePath)) return;

  let html = fs.readFileSync(filePath, 'utf-8');

  // Inject preload links into <head> if not already present
  for (const link of preloadLinks) {
    if (!html.includes(link) && html.includes('</head>')) {
      html = html.replace('</head>', `    ${link}\n  </head>`);
    }
  }

  // Find exact position of <div id="root"> and its boundary
  const rootStart = html.indexOf('<div id="root">');
  if (rootStart === -1) {
    console.warn(`[Prerender Warning] Could not find <div id="root"> in ${filePath}`);
    return;
  }

  let afterRootIndex = -1;
  const devScriptIndex = html.indexOf('<script', rootStart);
  const bodyEndIndex = html.indexOf('</body>', rootStart);

  if (devScriptIndex !== -1 && devScriptIndex < bodyEndIndex) {
    afterRootIndex = devScriptIndex;
  } else if (bodyEndIndex !== -1) {
    afterRootIndex = bodyEndIndex;
  }

  if (afterRootIndex === -1) {
    console.warn(`[Prerender Warning] Could not find end boundary after <div id="root"> in ${filePath}`);
    return;
  }

  const beforeRoot = html.substring(0, rootStart);
  const afterRoot = html.substring(afterRootIndex);

  html = `${beforeRoot}<div id="root">${bodyHtml}</div>\n    ${afterRoot}`;

  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`[Prerender Success] Updated ${filePath} (${(html.length / 1024).toFixed(1)} KB)`);
}

function prerender() {
  console.log('[Prerender] Generating static HTML for App...');
  const rawAppHtml = renderToString(React.createElement(App));

  // Extract any React 19 resource preloads (<link rel="preload"...>)
  const preloadLinks: string[] = [];
  const bodyHtml = rawAppHtml.replace(/<link rel="preload"[^>]*>/g, (match) => {
    preloadLinks.push(match);
    return '';
  });

  const rootIndexPath = path.resolve(process.cwd(), 'index.html');
  const distIndexPath = path.resolve(process.cwd(), 'dist', 'index.html');

  // Update root index.html (so dev server & source repository have full static HTML)
  injectPrerender(rootIndexPath, bodyHtml, preloadLinks);

  // Update dist/index.html (so production build has full static HTML)
  if (fs.existsSync(distIndexPath)) {
    injectPrerender(distIndexPath, bodyHtml, preloadLinks);
  }
}

prerender();
