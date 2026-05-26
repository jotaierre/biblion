import { checkSession } from './auth.js';
import { renderLayout } from './ui/layout.js';
import { getAutores, toggleAutorAtivo } from './api/autores.js';
import { showAlert, showConfirm } from './ui/alerts.js';
import { heroicon } from './ui/icons.js';

let currentPage = 1;
const pageSize = 10;
let totalPages = 1;
let currentProfile = null;

async function loadAutores() {
  try {
    const { data, count } = await getAutores(currentPage, pageSize);
    totalPages = Math.ceil(count / pageSize);
    renderTable(data, count);
  } catch (error) {
    showAlert('Erro', 'Não foi possível carregar os autores: ' + error.message, 'error');
  }
}

function renderTable(autores, totalCount) {
  const isGitHubPages = window.location.hostname.includes('github.io');
  const base = isGitHubPages ? '/biblion' : '';

  const content = `
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <h1 class="text-2xl font-bold">Gerenciamento de Autores</h1>
      <a href="${base}/pages/autores/form.html" class="btn-primary flex items-center gap-2">
        ${heroicon('plus')}
        Novo Autor
      </a>
    </div>

    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-border-light dark:border-border-dark">
              <th class="px-6 py-4 font-semibold">Nome</th>
              <th class="px-6 py-4 font-semibold">Nacionalidade</th>
              <th class="px-6 py-4 font-semibold text-center">Status</th>
              <th class="px-6 py-4 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-light dark:divide-border-dark">
            ${autores.length === 0 ? `
              <tr>
                <td colspan="4" class="px-6 py-10 text-center text-text-secondary-light dark:text-text-secondary-dark">
                  Nenhum autor encontrado.
                </td>
              </tr>
            ` : autores.map(autor => `
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td class="px-6 py-4 font-medium">${autor.nome}</td>
                <td class="px-6 py-4">${autor.nacionalidade || '-'}</td>
                <td class="px-6 py-4 text-center">
                  <span class="px-2 py-1 rounded-full text-xs font-semibold ${autor.ativo ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}">
                    ${autor.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td class="px-6 py-4 text-right space-x-2">
                  <a href="${base}/pages/autores/form.html?id=${autor.id}" class="text-primary hover:text-primary-hover inline-block" title="Editar">
                    ${heroicon('pencil')}
                  </a>
                  <button onclick="window.handleToggleActive('${autor.id}', ${autor.ativo})" class="${autor.ativo ? 'text-danger hover:text-red-700' : 'text-success hover:text-green-700'} inline-block" title="${autor.ativo ? 'Inativar' : 'Reativar'}">
                    ${autor.ativo ? heroicon('trash') : heroicon('check')}
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="px-6 py-4 border-t border-border-light dark:border-border-dark flex items-center justify-between">
        <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          Mostrando ${autores.length} de ${totalCount} registros
        </p>
        <div class="flex items-center gap-2">
          <button id="prevPage" class="btn-secondary px-2 py-2" ${currentPage === 1 ? 'disabled' : ''}>
            ${heroicon('chevron-left')}
          </button>
          <span class="text-sm font-medium">Página ${currentPage} de ${totalPages || 1}</span>
          <button id="nextPage" class="btn-secondary px-2 py-2" ${currentPage === totalPages ? 'disabled' : ''}>
            ${heroicon('chevron-right')}
          </button>
        </div>
      </div>
    </div>
  `;

  renderLayout(content, 'autores', currentProfile);

  document.getElementById('prevPage')?.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      loadAutores();
    }
  });

  document.getElementById('nextPage')?.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      loadAutores();
    }
  });
}

window.handleToggleActive = async (id, currentStatus) => {
  const action = currentStatus ? 'inativar' : 'reativar';
  const confirmed = await showConfirm(`Tem certeza?`, `Você deseja ${action} este autor?`);

  if (confirmed) {
    try {
      await toggleAutorAtivo(id, !currentStatus);
      showAlert('Sucesso', `Autor ${action === 'inativar' ? 'inativado' : 'reativado'} com sucesso!`, 'success');
      loadAutores();
    } catch (error) {
      showAlert('Erro', 'Erro ao processar solicitação: ' + error.message, 'error');
    }
  }
};

async function init() {
  const { session, profile } = await checkSession();
  const isGitHubPages = window.location.hostname.includes('github.io');
  const base = isGitHubPages ? '/biblion' : '';

  if (!session || profile?.role !== 'proprietario') {
    if (profile?.role === 'cliente') {
      window.location.href = `${base}/cliente/dashboard-cliente.html`;
    } else {
      window.location.href = `${base}/login.html`;
    }
    return;
  }

  currentProfile = profile;
  loadAutores();
}

init();