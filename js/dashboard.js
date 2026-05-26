import { checkSession } from './auth.js';
import { renderLayout } from './ui/layout.js';
import { supabase } from './supabase.js';

async function init() {
  const { session, profile } = await checkSession();

  // 📁 CORREÇÃO DINÂMICA: Detecta se está no GitHub Pages para montar a rota certa
  const isGitHubPages = window.location.hostname.includes('github.io');
  const basePath = isGitHubPages ? '/biblion' : '';

  // Se não houver sessão ativa, manda o usuário direto para a tela de login
  if (!session) {
    window.location.href = `${basePath}/login.html`;
    return;
  }

  // Se estiver logado mas não for o proprietário administrativo
  if (profile?.role !== 'proprietario') {
    if (profile?.role === 'cliente') {
      // 📁 CORREÇÃO: Mantém o /biblion/ na URL para o cliente
      window.location.href = `${basePath}/cliente/dashboard-cliente.html`;
    } else {
      // Caso não tenha role definida, manda para o login por segurança
      window.location.href = `${basePath}/login.html`;
    }
    return;
  }

  // Fetch some quick stats
  const { count: autoresCount } = await supabase.from('autores').select('*', { count: 'exact', head: true });
  const { count: livrosCount } = await supabase.from('livros').select('*', { count: 'exact', head: true });

  const content = `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card flex items-center gap-4">
        <div class="p-3 bg-primary/10 text-primary rounded-lg">
          <div data-heroicon="author"></div>
        </div>
        <div>
          <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark">Total de Autores</p>
          <p class="text-2xl font-bold">${autoresCount || 0}</p>
        </div>
      </div>
      
      <div class="card flex items-center gap-4">
        <div class="p-3 bg-success/10 text-success rounded-lg">
          <div data-heroicon="book"></div>
        </div>
        <div>
          <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark">Total de Livros</p>
          <p class="text-2xl font-bold">${livrosCount || 0}</p>
        </div>
      </div>
    </div>

    <div class="card">
      <h3 class="text-lg font-bold mb-4">Bem-vindo ao Sistema Administrativo</h3>
      <p class="text-text-secondary-light dark:text-text-secondary-dark">
        Utilize o menu lateral para gerenciar os autores e livros da biblioteca.
      </p>
    </div>
  `;

  renderLayout(content, 'dashboard', profile);
}

init();