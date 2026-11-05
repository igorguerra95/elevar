import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import {defineConfig, type Plugin} from 'vite';

/**
 * GitHub Pages helper plugin:
 * - Generates 404.html from index.html for SPA route fallback
 * - Generates .nojekyll to prevent Jekyll from bypassing asset directories
 */
function githubPagesPlugin(): Plugin {
  return {
    name: 'github-pages-plugin',
    closeBundle() {
      const outDir = path.resolve(import.meta.dirname, 'dist');
      const indexPath = path.join(outDir, 'index.html');
      const notFoundPath = path.join(outDir, '404.html');
      const noJekyllPath = path.join(outDir, '.nojekyll');

      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath);
      }
      if (!fs.existsSync(noJekyllPath)) {
        fs.writeFileSync(noJekyllPath, '');
      }
    },
  };
}

export default defineConfig(() => {
  return {
    // Relative base ensures asset URLs (e.g. ./assets/...) work seamlessly
    // both at domain root and subpaths like https://<username>.github.io/<repository-name>/
    base: process.env.BASE_PATH || './',
    plugins: [react(), tailwindcss(), githubPagesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
