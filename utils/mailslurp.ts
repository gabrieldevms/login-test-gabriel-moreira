import { MailSlurp } from 'mailslurp-client';
import * as cheerio from 'cheerio';

const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY! });


// Cria uma nova inbox e retorna o objeto completo.
 
export async function createInbox() {
  return await mailslurp.createInbox();
}

// Aguarda o e‑mail com o código 2FA e extrai um número de 6 dígitos do corpo.

export async function waitForVerificationCode(inboxId: string, timeoutMs = 30000): Promise<string> {
  const email = await mailslurp.waitForLatestEmail(inboxId, timeoutMs);
  if (!email.body) throw new Error('E-mail vazio');

  // Carregar o HTML do email no cheerio
  const $ = cheerio.load(email.body);

  // Buscar o texto dentro do elemento com classe 'verification-code'
  const code = $('.verification-code').text().trim();

  if (!code) throw new Error('Código 2FA não encontrado no e-mail.');

  return code;
  
}
