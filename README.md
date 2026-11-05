# Publicação Automática no GitHub Pages

Este repositório está configurado para publicação automática e estática no **GitHub Pages** utilizando **GitHub Actions**.

## 🚀 Como ativar a publicação no GitHub

Quando sincronizar este repositório com a sua conta do GitHub:

1. Acesse o seu repositório no GitHub.
2. Vá em **Settings** (Configurações) > **Pages** (no menu lateral esquerdo).
3. Na seção **Build and deployment** > **Source**, alterne de *Deploy from a branch* para:
   👉 **GitHub Actions**
4. Pronto! O workflow configurado em `.github/workflows/deploy.yml` será acionado automaticamente a cada `git push` nas branches `main` ou `master`, além de poder ser executado manualmente via **Run workflow** na aba *Actions*.

---

## ⚙️ Recursos técnicos configurados

- **GitHub Actions oficial**:
  - `actions/checkout@v4`
  - `actions/setup-node@v4` com cache de dependências
  - `actions/configure-pages@v5`
  - `actions/upload-pages-artifact@v3`
  - `actions/deploy-pages@v4`
- **Permissões necessárias**: `contents: read`, `pages: write`, `id-token: write`.
- **Prevenção de conflitos**: `concurrency: pages` para evitar sobreposição de deploys.
- **Ambiente GitHub Pages**: Registro automático da URL publicada nas execuções do workflow.
- **Caminhos relativos universais**: `base: process.env.BASE_PATH || './'` no `vite.config.ts`, permitindo que o site funcione sem alterações em qualquer nome de repositório (`https://usuario.github.io/nome-do-repo/`) ou domínio customizado.
- **Fallback SPA (`404.html`)**: Cópia automática do `index.html` gerada durante o build para garantir compatibilidade com rotas do cliente.
- **Arquivo `.nojekyll`**: Desativa o processamento Jekyll do GitHub Pages para garantir integridade de todos os assets estáticos.
