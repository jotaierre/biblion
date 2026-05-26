import { checkSession } from './auth.js';
import { renderLayout } from './ui/layout.js';
import { supabase } from './supabase.js';

/**
 * Inicialização e checagem de privilégios do Painel Administrativo
 */
async function init() {
  const { session, profile } = await checkSession();

  // Se não houver sessão, barra a renderização e joga para o login
  if (!session) {
    window.location.href = '/login.html';
    return;
  }

  // Se não for administrador/proprietário, redireciona para a respectiva área de nível de acesso
  if (profile?.role !== 'proprietario') {
    if (profile?.role === 'cliente') {
      window.location.href = '/cliente/dashboard-cliente.html';
    } else {
      window.location.href = '/login.html';
    }
    return;
  }

  // Busca contagens assíncronas do banco de dados para os cards informativos
  const { count: autoresCount } = await supabase.from('autores').select('*', { count: 'exact', head: true });
  const { count: livrosCount } = await supabase.from('livros').select('*', { count: 'exact', head: true });

  // Estrutura de conteúdo com estilização utilitária do Tailwind CSS
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

  // Renderiza a estrutura global com o conteúdo acoplado
  renderLayout(content, 'dashboard', profile);
}

// Executa o ciclo de inicialização da página
init();