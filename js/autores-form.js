import { checkSession } from './auth.js';
import { renderLayout } from './ui/layout.js';
import { createAutor, updateAutor, getAutorById } from './api/autores.js';
import { showAlert } from './ui/alerts.js';

let currentProfile = null;
let autorId = null;

// 📁 FORÇA BRUTA ABSOLUTA: Identifica se o ambiente é o GitHub Pages em tempo de execução
const isGitHubPages = window.location.hostname.includes('github.io');
const base = isGitHubPages ? '/biblion' : '';

async function init() {
  const { session, profile } = await checkSession();
  if (!session || profile?.role !== 'proprietario') return;
  currentProfile = profile;

  const urlParams = new URLSearchParams(window.location.search);
  autorId = urlParams.get('id');

  let autorData = { nome: '', nacionalidade: '', data_nascimento: '' };

  if (autorId) {
    try {
      autorData = await getAutorById(autorId);
    } catch (error) {
      showAlert('Erro', 'Erro ao carregar autor: ' + error.message, 'error');
    }
  }

  const content = `
    <div class="mb-6">
      <h1 class="text-2xl font-bold">${autorId ? 'Editar Autor' : 'Novo Autor'}</h1>
    </div>

    <div class="card max-w-2xl">
      <form id="autorForm" class="space-y-4">
        <div>
          <label for="nome" class="label-field">Nome</label>
          <input type="text" id="nome" class="input-field" value="${autorData.nome}" required>
        </div>
        <div>
          <label for="nacionalidade" class="label-field">Nacionalidade</label>
          <input type="text" id="nacionalidade" class="input-field" value="${autorData.nacionalidade || ''}">
        </div>
        <div>
          <label for="data_nascimento" class="label-field">Data de Nascimento</label>
          <input type="date" id="data_nascimento" class="input-field" value="${autorData.data_nascimento || ''}">
        </div>
        
        <div class="flex gap-4 pt-4">
          <button type="submit" class="btn-primary">Salvar</button>
          <a href="${base}/pages/autores/index.html" class="btn-secondary">Cancelar</a>
        </div>
      </form>
    </div>
  `;

  renderLayout(content, 'autores', profile);

  document.getElementById('autorForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      nome: document.getElementById('nome').value,
      nacionalidade: document.getElementById('nacionalidade').value,
      data_nascimento: document.getElementById('data_nascimento').value || null,
    };

    try {
      if (autorId) {
        await updateAutor(autorId, formData);
        showAlert('Sucesso', 'Autor updated com sucesso!', 'success');
      } else {
        await createAutor(formData);
        showAlert('Sucesso', 'Autor criado com sucesso!', 'success');
      }

      // 📁 CORREÇÃO: Redirecionamento de sucesso ajustado com a base dinâmica
      setTimeout(() => {
        window.location.href = `${base}/pages/autores/index.html`;
      }, 1500);

    } catch (error) {
      showAlert('Erro', 'Erro ao salvar autor: ' + error.message, 'error');
    }
  });
}

init();