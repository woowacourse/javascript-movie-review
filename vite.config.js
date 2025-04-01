import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api/image': {
                target: 'https://image.tmdb.org',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/image/, '/t/p/w400'),
            },
        },
    },
});
