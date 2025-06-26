import { Page, expect } from '@playwright/test';

export class SignupPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async startSignup(email: string) {
    // link “Sign up”
    await this.page.getByRole('link', { name: /Sign up/i }).click();

    await expect(
      this.page.getByPlaceholder(/Enter your invite code/i)
    ).toBeVisible();

    await this.page
      .getByPlaceholder(/Enter your invite code/i)
      .fill('SKILL5-BETA-ACCESS');

    await this.page.getByRole('button', { name: /Verify Code/i }).click();
  }

  async createAccount(name: string, email: string, company: string) {

    await expect(
      this.page.getByPlaceholder(/Enter your full name/i)
    ).toBeVisible();
    await this.page
      .getByPlaceholder(/Enter your full name/i)
      .fill(name);

    await expect(
      this.page.getByPlaceholder(/Enter your email/i)
    ).toBeVisible()
    await this.page
      .getByPlaceholder(/Enter your email/i)
      .fill(email);

    await expect(
      this.page.getByPlaceholder(/Company name/i)
    ).toBeVisible();
    await this.page
      .getByPlaceholder(/Company name/i)
      .fill(company);

    const termsCheckbox = this.page.locator('input[name="accept-terms"]');
    await expect(termsCheckbox).toBeVisible();
    await termsCheckbox.check();

    const roleDropdown = this.page.locator('button >> text=Select your role in the company');
    await expect(roleDropdown).toBeVisible();
    await roleDropdown.click();

    const firstRoleOption = this.page.getByRole('option').first();
    await expect(firstRoleOption).toBeVisible();
    await firstRoleOption.click();

    await this.page
      .getByRole('button', { name: /Create account/i })
      .click();
  }

  async enterTwoFactorCode(code: string) {
    const inputs = await this.page.locator('input[type="tel"][maxlength="1"]').all();

    if (inputs.length < code.length) {
      throw new Error(`Esperado ao menos ${code.length} campos para o código 2FA, mas só encontrei ${inputs.length}.`);
    }

    for (let i = 0; i < code.length; i++) {
      await inputs[i].fill(code[i]);
    }

    await this.page.getByRole('button', { name: /Confirm/i }).click();
  }
  
}
