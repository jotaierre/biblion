# Sistema de Gerenciamento de Biblioteca

Este projeto é um frontend desenvolvido com HTML, Tailwind CSS e JavaScript Vanilla, utilizando Vite como ferramenta de build e Supabase como backend (Autenticação e Banco de Dados).

## Funcionalidades

- Autenticação (Login e Registro) com Supabase.
- Perfis de usuário (Proprietário e Cliente).
- CRUD completo de Autores e Livros (Apenas para Proprietários).
- Paginação em todas as listagens.
- Design System responsivo com suporte a temas.
- Mensagens de feedback com SweetAlert2.
- Ícones com Heroicons.

## Tecnologias Utilizadas

- **Frontend:** HTML5, Tailwind CSS, JavaScript Vanilla.
- **Build Tool:** Vite.
- **Backend-as-a-Service:** Supabase.
- **Bibliotecas:** SweetAlert2, @supabase/supabase-js.

## Como Executar Localmente

1. Clone o repositório.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Renomeie o arquivo `.env.example` para `.env`.
   - Preencha as chaves `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` com as credenciais do seu projeto no Supabase.
4. Execute o banco de dados:
   - Copie o conteúdo do arquivo `database.sql` e execute no SQL Editor do seu projeto Supabase.
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Publicação no GitHub Pages

Para publicar o projeto no GitHub Pages:

1. Execute o build do projeto:
   ```bash
   npm run build
   ```
2. O conteúdo da pasta `dist/` deve ser enviado para o branch de publicação (ex: `gh-pages`) ou configurado no GitHub Pages.
   - O projeto está configurado com `base: './'` no `vite.config.js` para garantir compatibilidade com caminhos relativos em hospedagem estática.
