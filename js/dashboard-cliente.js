import { checkSession } from './auth.js';
import { renderLayout } from './ui/layout.js';
import { getLivros } from './api/livros.js';
import { initIcons } from './ui/icons.js';
import { showAlert } from './ui/alerts.js';

// Importação do CSS para garantir a compilação das classes do Tailwind nesta rota
import '../styles/main.css';

let currentPage = 1;
const pageSize = 12;
let totalPages = 1;
let currentProfile = null;

/**
 * 🔒 Inicialização e controle de segurança da página do leitor
 */
async function init() {
  try {
    // Valida a sessão e extrai o perfil de forma segura (.maybeSingle)
    const { session, profile } = await checkSession();

    if (!session || !profile) {
      window.location.href = '/login.html';
      return;
    }

    currentProfile = profile;

    // Guarda de Rota: Se um administrador cair aqui, manda de volta pro painel dele
    if (currentProfile.role === 'proprietario') {
      window.location.href = '/pages/dashboard.html';
      return;
    }

    console.log("Acesso autorizado ao catálogo: ", currentProfile.nome);

    // Carrega a primeira leva de livros do acervo
    await loadLivros();

  } catch (error) {
    console.error("Erro crítico na inicialização do cliente:", error);
    window.location.href = '/login.html';
  }
}

/**
 * 🔄 Busca os registros paginados diretamente do Supabase
 */
async function loadLivros() {
  try {
    const { data, count } = await getLivros(currentPage, pageSize);
    totalPages = Math.ceil(count / pageSize);

    // Renderiza o grid de cards na tela
    renderGrid(data, count);
  } catch (error) {
    console.error("Erro ao carregar catálogo de livros:", error);
    showAlert('Erro', 'Não foi possível carregar o acervo de livros.', 'error');
  }
}

/**
 * 🎨 Monta a estrutura HTML da interface utilizando Tailwind CSS
 */
function renderGrid(livros, totalCount) {
  const content = `
    <div class="mb-8">
      <h1 class="text-2xl font-bold">Catálogo de Livros</h1>
      <p class="text-text-secondary-light dark:text-text-secondary-dark">Explore nosso acervo completo</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      ${livros.length === 0 ? `
        <div class="col-span-full py-20 text-center">
          <p class="text-text-secondary-light dark:text-text-secondary-dark text-lg">Nenhum livro disponível no momento.</p>
        </div>
      ` : livros.map(livro => `
        <div class="card flex flex-col hover:shadow-md transition-shadow bg-white dark:bg-slate-900 border border-border-light dark:border-border-dark p-4 rounded-xl">
          
          <div class="bg-primary/5 rounded-lg h-48 flex items-center justify-center mb-4 text-primary">
            <div data-heroicon="book" class="w-12 h-12 flex items-center justify-center"></div>
          </div>
          
          <div class="flex-1">
            <h3 class="font-bold text-lg mb-1 text-slate-900 dark:text-white line-clamp-2">${livro.titulo}</h3>
            <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-2">${livro.autores?.nome || 'Autor Desconhecido'}</p>
            <div class="flex items-center gap-2 text-xs mt-auto pt-2">
              <span class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded font-medium">${livro.genero || 'Geral'}</span>
              <span class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded font-medium">${livro.ano_publicacao || 'N/A'}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="mt-10 flex items-center justify-center gap-4">
      <button id="prevPage" class="btn-secondary flex items-center gap-2 px-4 py-2 rounded-lg border border-border-light dark:border-border-dark disabled:opacity-50" ${currentPage === 1 ? 'disabled' : ''}>
        <span data-heroicon="chevron-left"></span> Anterior
      </button>
      <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Página ${currentPage} de ${totalPages || 1}</span>
      <button id="nextPage" class="btn-secondary flex items-center gap-2 px-4 py-2 rounded-lg border border-border-light dark:border-border-dark disabled:opacity-50" ${currentPage === totalPages ? 'disabled' : ''}>
        Próxima <span data-heroicon="chevron-right"></span>
      </button>
    </div>
  `;

  // Renderiza o esqueleto com o layout lateral e superior injetado
  renderLayout(content, 'dashboard', currentProfile);

  // 🔥 Gatilho crucial: Varre os novos elementos do Grid injetando os SVGs reais do dicionário de ícones
  initIcons();

  // Ouvintes de evento de clique para a paginação
  document.getElementById('prevPage')?.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      loadLivros();
    }
  });

  document.getElementById('nextPage')?.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      loadLivros();
    }
  });
}

// Inicializa a esteira de execução
init();