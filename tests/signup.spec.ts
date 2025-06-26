import { test, expect } from '@playwright/test';
import { createInbox, waitForVerificationCode } from '../utils/mailslurp';
import { SignupPage } from '../pages/SignupPage';
import { DashboardPage } from '../pages/DashboardPage';

test('Fluxo completo de signup com 2FA via MailSlurp', async ({ page }) => {
  // 1. Cria uma inbox temporária
  const inbox = await createInbox();
  const emailAddress = inbox.emailAddress;

  // 2. Instancia Page Objects
  const signupPage = new SignupPage(page);
  const dashboardPage = new DashboardPage(page);

  // 3. Inicia cadastro
  await test.step('Iniciar cadastro', async () => {
    await signupPage.goto();
    await signupPage.startSignup(emailAddress);
  });

  // 4. Preenche dados do usuário
  await test.step('Preencher dados do usuário', async () => {
    await signupPage.createAccount('João Silva', emailAddress, 'Skill5');
  });

  // 5. Captura código 2FA do e‑mail
  const twoFACode = await test.step('Capturar código 2FA', async () => {
    return await waitForVerificationCode(inbox.id);
  });

  // 6. Finaliza cadastro
  await test.step('Inserir código 2FA e finalizar', async () => {
    await signupPage.enterTwoFactorCode(twoFACode);
  });

  // 7. Valida login
  await test.step('Validar login no dashboard', async () => {
    await dashboardPage.isLoaded();
  });

});
