import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'

/** Dev-only plugin: POST /__save-css to update @theme variables in style.css */
function cssEditorPlugin(): Plugin {
    return {
        name: 'css-editor',
        apply: 'serve',
        configureServer(server) {
            server.middlewares.use('/__save-css', (req, res) => {
                if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
                let body = '';
                req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
                req.on('end', () => {
                    try {
                        const updates: Record<string, string> = JSON.parse(body);
                        const cssPath = resolve(__dirname, 'src/style.css');
                        let css = readFileSync(cssPath, 'utf-8');

                        // Handle Google Fonts import updates
                        const fontImportUrl = updates['__google_font_imports__'];
                        delete updates['__google_font_imports__'];

                        for (const [varName, value] of Object.entries(updates)) {
                            // Match the variable declaration inside @theme { ... }
                            const escaped = varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                            const re = new RegExp(`(${escaped}:\\s*)([^;]+)(;)`, 'g');
                            css = css.replace(re, `$1${value}$3`);
                        }

                        // Update Google Fonts @import if font changed
                        if (fontImportUrl) {
                            const importRe = /@import\s+url\(['"]?https:\/\/fonts\.googleapis\.com\/css2\?[^)]+\);\s*/g;
                            css = css.replace(importRe, '');
                            // Insert new import after the comment header, before @import "tailwindcss"
                            const twImport = '@import "tailwindcss"';
                            css = css.replace(twImport, `${fontImportUrl}\n\n${twImport}`);
                        }

                        writeFileSync(cssPath, css, 'utf-8');
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ ok: true, count: Object.keys(updates).length }));
                    } catch (e) {
                        res.statusCode = 500;
                        res.end(JSON.stringify({ error: String(e) }));
                    }
                });
            });
        },
    };
}

export default defineConfig({
    base: process.env.GITHUB_PAGES === 'true' ? '/tradehub/' : '/',
    plugins: [
        tailwindcss(),
        cssEditorPlugin(),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                'style-test': resolve(__dirname, 'style-test.html'),
                'product-detail': resolve(__dirname, 'product-detail.html'),
                products: resolve(__dirname, 'products.html'),
                manufacturers: resolve(__dirname, 'manufacturers.html'),
                login: resolve(__dirname, 'login.html'),
                register: resolve(__dirname, 'register.html'),
            },
        },
    },
})
