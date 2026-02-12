import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: {
                'dashboard': 'src/dashboard.ts'
            },
            formats: ['es']
        },
        outDir: '../wwwroot/App_Plugins/Our.Umbraco.GitHubIssues',
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            external: [/^@umbraco/]
        }
    }
});
