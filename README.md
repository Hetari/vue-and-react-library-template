# Vue and React Library Template

This is a monorepo template for building a reusable library that supports both **Vue** and **React** components. It is set up using **Vite** for fast builds, TypeScript for type safety, and includes configuration for generating declaration files (`.d.ts`). The template is optimized for creating UI components that can be shared across different frontend frameworks.

## Features

- 🚀 **Fast Builds with Vite**: Vite is used as the build tool, providing fast build times for both Vue and React libraries.
- 💬 **TypeScript Support**: Type-safe development with automatic declaration file generation.
- 📦 **ESM and UMD Bundles**: Outputs both ES modules (`.es.js`) and UMD bundles (`.umd.js`).
- 🌐 **Framework-Specific Bundles**: Separate builds and types for Vue and React (`dist/vue` and `dist/react`).
- 🏗️ **Modular Design**: Supports tree-shaking to minimize bundle sizes.

## Table of Contents

- [Vue and React Library Template](#vue-and-react-library-template)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Getting Started](#getting-started)
    - [Setup Guide](#setup-guide)
      - [Rename Placeholder](#rename-placeholder)
    - [Commands](#commands)
  - [Usage](#usage)
    - [Vue](#vue)
    - [React](#react)
  - [Project Structure](#project-structure)
  - [Configuration](#configuration)
    - [Vite Config](#vite-config)
      - [Setting Up for Vue-Only or React-Only](#setting-up-for-vue-only-or-react-only)
        - [Vue-Only Configuration](#vue-only-configuration)
        - [React-Only Configuration](#react-only-configuration)
    - [TypeScript Config](#typescript-config)
    - [Dependencies](#dependencies)
      - [Vue and React](#vue-and-react)
      - [Vue Only](#vue-only)
      - [React Only](#react-only)
  - [Build](#build)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

Clone this repository to start developing your library:

```bash
git clone https://github.com/your-username/vue-and-react-library-template.git
cd vue-and-react-library-template
npm install
```

## Getting Started

The template includes two main modes:

- **Vue Mode**: Builds the library for Vue components.
- **React Mode**: Builds the library for React components.

### Setup Guide

#### Rename Placeholder

Before using this template, make sure to replace all instances of `"Library-Name"` with your actual library name. This includes:

1. **Package.json**: Update `name`, `description`, and other relevant fields.
2. **Vite Config**: Replace `"LibraryName"` in `vite.config.ts`.
3. **README.md**: Write your description and instructions for using your library.

### Commands

- **Build**:

  ```bash
  npm run build       # Builds both Vue and React packages
  npm run build:vue   # Builds Vue package only
  npm run build:react # Builds React package only
  ```

- **Clean**:

  ```bash
  npm run clean       # Removes the dist folder
  ```

- **Release Commands**:
  Automated scripts are provided for versioning and GitHub releases using [Conventional Changelog](https://github.com/conventional-changelog/standard-version):
  **Prerequisites: GitHub CLI installed `gh`**

  - **Patch Release**:

  Updates patch version (e.g., `1.0.0` → `1.0.1`).

  ```bash
  npm run release:patch
  ```

  - **Minor Release**:

  Updates minor version (e.g., `1.0.0` → `1.1.0`).

  ```bash
  npm run release:minor
  ```

  - **Major Release**:

  Updates major version (e.g., `1.0.0` → `2.0.0`).

  ```bash
  npm run release:major
  ```

## Usage

After building your library, the output will be in the `dist` folder, and after publishing, it will be available on npm with the following package names:

- **Vue package**: `libraryName/vue`
- **React package**: `libraryName/react`

You can install and use your library as follows:

### Vue

```javascript
import { MyVueComponent } from 'libraryName/vue';

export default {
  components: { MyVueComponent }
};
```

### React

```javascript
import { MyReactComponent } from 'libraryName/react';

function App() {
  return <MyReactComponent />;
}
```

## Project Structure

```
vue-and-react-library-template/
├── dist/                 # Build output
│   ├── vue/              # Vue library bundle
│   └── react/            # React library bundle
├── src/                  # Source code
│   ├── vue/              # Vue source code
│   └── react/            # React source code
├── tsconfig.json         # Main TypeScript config
├── tsconfig.vue.json     # Vue-specific TypeScript config
├── tsconfig.react.json   # React-specific TypeScript config
├── vite.config.ts        # Vite config for both Vue and React
├── package.json
└── README.md
```

## Configuration

### Vite Config

The `vite.config.ts` is set up to detect the build mode (`vue` or `react`) and apply the respective configuration:

```typescript
// ... vite.config.ts code ...
export default defineConfig(({ mode }) => {
  const isVue = mode === 'vue';
  const framework = isVue ? 'vue' : 'react';
  const global = (
    isVue ? { vue: 'Vue' } : { react: 'React', 'react/jsx-runtime': 'JSX' }
  ) as { [key: string]: string };

  return {
    // ... vite config code ...
  };
});
```

#### Setting Up for Vue-Only or React-Only

If you only want to build a Vue or React version of your library and skip dual-mode support, you can simplify your Vite configuration as follows:

##### Vue-Only Configuration

1. **Remove React files and configurations**:

   - Delete the `src/react/` directory.
   - Delete `tsconfig.react.json`.
   - Delete any React-related dependencies from `package.json` like `@vitejs/plugin-react`, `react`, and `react-dom`.

2. **Update `vite.config.ts`** to a Vue-only configuration:

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.vue.json',
      outDir: 'dist/vue',
      include: ['src/vue/**/*', 'src/vue-entry.ts'],
      insertTypesEntry: true,
      cleanVueFileName: true,
      rollupTypes: true,
      entryRoot: 'src/'
    })
  ],
  build: {
    target: 'es2015',
    copyPublicDir: false,
    outDir: 'dist/vue',
    lib: {
      entry: resolve(__dirname, 'src/vue-entry.ts'),
      name: 'LibraryName',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) =>
        format === 'es' ? 'index.js' : `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: { vue: 'Vue' }
      }
    }
  }
});
```

##### React-Only Configuration

1. **Remove Vue files and configurations**:

   - Delete the `src/vue/` directory.
   - Delete `tsconfig.vue.json`.
   - Delete any Vue-related dependencies from `package.json` like `@vitejs/plugin-vue` and `vue`.

2. **Update `vite.config.ts`** to a React-only configuration:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.react.json',
      outDir: 'dist/react',
      include: ['src/react/**/*', 'src/react-entry.ts'],
      insertTypesEntry: true,
      cleanVueFileName: true,
      rollupTypes: true,
      entryRoot: 'src/'
    })
  ],
  build: {
    target: 'es2015',
    copyPublicDir: false,
    outDir: 'dist/react',
    lib: {
      entry: resolve(__dirname, 'src/react-entry.ts'),
      name: 'LibraryName',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) =>
        format === 'es' ? 'index.js' : `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        exports: 'named',
        globals: { react: 'React', 'react/jsx-runtime': 'JSX' }
      }
    }
  }
});
```

### TypeScript Config

- `tsconfig.json`: Common settings
- `tsconfig.vue.json`: Vue-specific TypeScript settings
- `tsconfig.react.json`: React-specific TypeScript settings

for individual libraries, you can add the respective TypeScript configuration file (`tsconfig.react.json` for React or `tsconfig.vue.json` for Vue) to the main `tsconfig.json` file.

### Dependencies

Install necessary dependencies based on your preferred setup:

#### Vue and React

If you want both Vue and React support:

```bash
npm install vue react react-dom \
  @vitejs/plugin-vue @vitejs/plugin-react \
  @types/vue @types/react @types/node \
  typescript vite vite-plugin-dts generate-changelog
```

#### Vue Only

```bash
npm install vue @vitejs/plugin-vue @types/node typescript vite vite-plugin-dts generate-changelog
```

#### React Only

```bash
npm install react react-dom @vitejs/plugin-react @types/react @types/node typescript vite vite-plugin-dts generate-changelog
```

## Build

To build the project for both Vue and React, use:

```bash
npm run build
```

Or to build individually:

```bash
npm run build:vue
npm run build:react
```

The compiled files will be available in:

- `dist/vue`: For Vue components
- `dist/react`: For React components

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository
2. Create a feature branch (`feat/your-feature`)
3. Commit your changes with descriptive messages (`feat: add new component`)
4. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy coding! 🎉
