import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



module.exports = {
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:80',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
}
