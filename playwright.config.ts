import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: { timeout: 10000 },
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://beta.skill5.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
   // { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
   // { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],
});
