import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
// import libCss from 'vite-plugin-libcss';

export default defineConfig({
  plugins: [
    vue(), // Enables Vue SFC support
    react(), // Enables React JSX support
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json'
    })
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'G-Motion',
      formats: ['es', 'umd'],
      fileName: (format) => `g-motion.${format}.js`
    },
    rollupOptions: {
      external: [
        'vue',
        'react',
        'react-dom',
        'react/jsx-runtime' // <-- Add this line to externalize react/jsx-runtime
      ],
      output: {
        globals: {
          vue: 'Vue',
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime'
        }
      }
    }
  }
});
