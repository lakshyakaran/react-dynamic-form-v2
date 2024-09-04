import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.jsx', // or wherever your entry point is
      name: 'ReactDynamicFormV2',
      fileName: (format) => `react-dynamic-form-v2.${format}.js`,
      formats: ['es', 'cjs'], // Support both ES Modules and CommonJS
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [react()],
});
