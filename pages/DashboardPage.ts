import { Page } from '@playwright/test';

export class DashboardPage {
  constructor(private readonly page: Page) {}

  //Verifica se um elemento visível confirma o login.

  async isLoaded(): Promise<void> {
    await this.page.getByText('DASHBOARD', { exact: true }).waitFor({ state: 'visible' });
  }

}
