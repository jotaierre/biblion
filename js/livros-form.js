import { checkSession } from './auth.js';
import { renderLayout } from './ui/layout.js';
import { createLivro, updateLivro, getLivroById } from './api/livros.js';
import { getAllAutoresAtivos } from './api/autores.js';
import { showAlert } from './ui/alerts.js';

let currentProfile = null;
let livroId = null;

// 📁 FORÇA BRUTA ABSOLUTA: Garante a persistência do /biblion/ em ambiente de produção
const isGitHubPages = window.location.hostname.includes('github.io');
const base = isGitHubPages ? '/biblion' : '';

async function init() {
  const { session, profile } = await checkSession();
  if (!session || profile?.role !== 'proprietario') return;
  currentProfile = profile;

  const urlParams = new URLSearchParams(window.location.search);
  livroId = urlParams.get('id');

  let livroData = { titulo: '', ano_publicacao: '', isbn: '', genero: '', autor_id: '' };
  let autores = [];

  try {
    autores = await getAllAutoresAtivos();
    if (livroId) {
      livroData = await getLivroById(livroId);
    }
  } catch (error) {
    showAlert('Erro', 'Erro ao carregar dados: ' + error.message, 'error');
  }

  const content = `
    <div class="mb-6">
      <h1 class="text-2xl font-bold">${livroId ? 'Editar Livro' : 'Novo Livro'}</h1>
    </div>

    <div class="card max-w-2xl">
      <form id="livroForm" class="space-y-4">
        <div>
          <label for="titulo" class="label-field">Título</label>
          <input type="text" id="titulo" class="input-field" value="${livroData.titulo}" required>
        </div>
        <div>
          <label for="autor_id" class="label-field">Autor</label>
          <select id="autor_id" class="input-field" required>
            <option value="">Selecione um autor</option>
            ${autores.map(autor => `
              <option value="${autor.id}" ${autor.id === livroData.autor_id ? 'selected' : ''}>${autor.nome}</option>
            `).join('')}
          </select>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="ano_publicacao" class="label-field">Ano de Publicação</label>
            <input type="number" id="ano_publicacao" class="input-field" value="${livroData.ano_publicacao || ''}">
          </div>
          <div>
            <label for="isbn" class="label-field">ISBN</label>
            <input type="text" id="isbn" class="input-field" value="${livroData.isbn || ''}">
          </div>
        </div>
        <div>
          <label for="genero" class="label-field">Gênero</label>
          <input type="text" id="genero" class="input-field" value="${livroData.genero || ''}">
        </div>
        
        <div class="flex gap-4 pt-4">
          <button type="submit" class="btn-primary">Salvar</button>
          <a href="${base}/pages/livros/index.html" class="btn-secondary">Cancelar</a>
        </div>
      </form>
    </div>
  `;

  renderLayout(content, 'livros', profile);

  document.getElementById('livroForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      titulo: document.getElementById('titulo').value,
      autor_id: document.getElementById('autor_id').value,
      ano_publicacao: parseInt(document.getElementById('ano_publicacao').value) || null,
      isbn: document.getElementById('isbn').value,
      genero: document.getElementById('genero').value,
    };

    try {
      if (livroId) {
        await updateLivro(livroId, formData);
        showAlert('Sucesso', 'Livro atualizado com sucesso!', 'success');
      } else {
        await createLivro(formData);
        showAlert('Sucesso', 'Livro criado com sucesso!', 'success');
      }

      // 📁 CORREÇÃO: Redirecionamento após sucesso blindado com a rota do repositório
      setTimeout(() => {
        window.location.href = `${base}/pages/livros/index.html`;
      }, 1500);

    } catch (error) {
      showAlert('Erro', 'Erro ao salvar livro: ' + error.message, 'error');
    }
  });
}

init();