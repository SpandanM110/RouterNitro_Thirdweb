import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@thirdweb-dev/react', '@thirdweb-dev/sdk'], // Adjust based on your actual dependencies
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // Ensure JSX extension is included
  },
});
