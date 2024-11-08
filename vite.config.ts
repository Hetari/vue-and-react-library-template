import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
// import libCss from 'vite-plugin-libcss';
// import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig(({ mode }) => {
  const isVue = mode === 'vue';
  const framework = isVue ? 'vue' : 'react';
  const global = (
    isVue ? { vue: 'Vue' } : { react: 'React', 'react/jsx-runtime': 'JSX' }
  ) as { [key: string]: string };

  return {
    plugins: [
      isVue ? vue() : react(),
      dts({
        tsconfigPath: `./tsconfig.${framework}.json`,
        outDir: `dist/${framework}`,
        include: [`src/${framework}/**/*`, `src/${framework}-entry.ts`],
        insertTypesEntry: true,
        cleanVueFileName: true,
        rollupTypes: true
      })
    ].filter(Boolean),
    build: {
      target: 'es2015',

      copyPublicDir: false,
      outDir: `dist/${framework}`,

      lib: {
        entry: resolve(__dirname, `src/${framework}-entry.ts`),
        // name: isVue ? 'GMotionVue' : 'GMotionReact',
        name: 'G-Motion',
        formats: ['es'],
        fileName: 'index'
        // fileName: (format) => `index.${format}.js`
      },
      rollupOptions: {
        external: ['vue', 'react', 'react/jsx-runtime'],
        output: {
          // assetFileNames: 'assets/[name][extname]',
          // entryFileNames: 'index.js',
          exports: 'named',
          globals: global
        }
      }
    },
    resolve: {
      alias: {
        '@vue': resolve(__dirname, 'src/vue'),
        '@react': resolve(__dirname, 'src/react')
      }
    }
  };
});
