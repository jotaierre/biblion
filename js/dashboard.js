import { checkSession } from './auth.js';
import { renderLayout } from './ui/layout.js';
import { supabase } from './supabase.js';

async function init() {
  const { session, profile } = await checkSession();

  if (!session) {
    window.location.href = '/login.html';
    return;
  }

  if (profile?.role !== 'proprietario') {
    if (profile?.role === 'cliente') {
      window.location.href = '/cliente/dashboard-cliente.html';
    } else {
      window.location.href = '/login.html';
    }
    return;
  }

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