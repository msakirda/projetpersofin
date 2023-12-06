import { defineConfig } from 'vite';

export default defineConfig({
  // ... autres configurations

  optimizeDeps: {
    exclude: ['mock-aws-s3', 'aws-sdk', 'nock', '@mapbox/node-pre-gyp'  , 'util'],
  },
});
