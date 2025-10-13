import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            
            // UI libraries
            if (id.includes('@radix-ui') || id.includes('class-variance-authority')) {
              return 'ui-vendor';
            }
            
            // Chart libraries (maior componente)
            if (id.includes('recharts') || id.includes('d3')) {
              return 'charts-vendor';
            }
            
            // Icons
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            
            // Utilities
            if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('marked')) {
              return 'utils-vendor';
            }
            
            // Outras bibliotecas menores
            return 'vendor';
          }
          
          // App chunks baseados na estrutura
          if (id.includes('/charts/')) {
            return 'app-charts';
          }
          
          if (id.includes('/assistentes/')) {
            return 'app-assistentes';
          }
          
          if (id.includes('/pages/')) {
            return 'app-pages';
          }
          
          if (id.includes('/components/ui/')) {
            return 'app-ui-components';
          }
        }
      }
    },
    // Configurações de otimização
    chunkSizeWarningLimit: 600,
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false, // Desabilitar sourcemaps em produção para reduzir tamanho
    cssCodeSplit: true // Dividir CSS em chunks separados
  }
});
