import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:4321',
    viewport: { width: 375, height: 812 },
    headless: true,
  },
  webServer: {
    command: 'bun run preview',
    port: 4321,
    reuseExistingServer: true,
  },
});
