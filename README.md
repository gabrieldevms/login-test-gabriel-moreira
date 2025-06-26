# Desafio Técnico — QA Automatizador com Playwright

Automação de teste E2E com [Playwright](https://playwright.dev) validando o fluxo de **criação de conta com autenticação 2FA** no site [beta.skill5.com](https://beta.skill5.com), utilizando integração com [MailSlurp](https://mailslurp.com) para captura automatizada do código enviado por e-mail.

---

## 🚀 Objetivo

Este projeto automatiza, de ponta a ponta, o seguinte fluxo:

1. Acesso ao site `https://beta.skill5.com`
2. Geração de uma **inbox temporária** usando a API do MailSlurp
3. Preenchimento do formulário de criação de conta com o e-mail temporário
4. Uso do código de acesso `SKILL5-BETA-ACCESS`
5. Captura do **código de verificação (2FA)** enviado por e-mail
6. Finalização do cadastro
7. Validação do login automático (ex: presença de elementos no dashboard)

---

## 🧪 Tecnologias Utilizadas

- [Playwright](https://playwright.dev/) com TypeScript
- [MailSlurp](https://www.mailslurp.com) para e-mails temporários
- [dotenv](https://www.npmjs.com/package/dotenv) para variáveis de ambiente
- Testes estruturados com Page Object Model

---

## 🛠️ Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/gabrieldevms/login-test-gabriel-moreira
   cd login-test-gabriel-moreira
   ```

2. Instale as dependências:
   ```bash
   npm install
   npx playwright install
   ```

3. Configure o arquivo `.env`:
   ```bash
   cp .env.example .env
   # edite o arquivo .env e adicione sua API KEY do MailSlurp
   ```

---

## 🔐 Variáveis de Ambiente

Arquivo `.env.example` incluso no projeto:

```dotenv
MAILSLURP_API_KEY=your_mailslurp_key_here
```

Crie uma conta gratuita em [mailslurp.com](https://app.mailslurp.com) e copie sua API Key.

---

## ▶️ Executando os Testes

### Teste padrão (headless):
```bash
npm run test
```

### Teste com navegador visível (debug):
```bash
npm run test:headed
```

### Gerar e abrir relatório HTML:
```bash
npm run test:report
```

---

## 📁 Estrutura do Projeto

```
.
├── pages/               # Page Objects com ações encapsuladas
│   ├── SignupPage.ts
│   └── DashboardPage.ts
│
├── tests/               # Suíte de testes automatizados
│   └── signup.spec.ts
│
├── utils/               # Utilitários e integrações externas
│   └── mailslurp.ts
│
├── .env.example         # Template para variáveis de ambiente
├── README.md            # Instruções completas
├── package.json         # Scripts e dependências
├── tsconfig.json        # Configurações TypeScript
└── playwright.config.ts # Configurações Playwright
```

---

## ✅ Boas Práticas Aplicadas

- Código 100% automatizado e idempotente (nova inbox por teste)
- Uso de Page Objects para melhor manutenção
- Relatórios com vídeo, trace e HTML
- Fluxo robusto e pronto para CI

---

## 📸 Exemplo de Execução

No final do teste, o usuário é redirecionado ao dashboard. O teste verifica isso buscando por um seletor visível de confirmação, como um banner ou componente exclusivo da área logada.
O que pode ser útil para decisões de fluxo em testes futuros.

---

## 📬 Suporte

Caso você deseje adaptar este projeto para outro site com 2FA ou adicionar testes adicionais (login, logout, etc), os utilitários e estrutura modular facilitam a expansão.

---

## 👨‍💻 Autor

Desenvolvido por **Gabriel Moreira** como parte de um desafio técnico para a vaga de **QA Automatizador**.

---