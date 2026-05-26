import { register } from './auth.js';
import { initIcons } from './ui/icons.js';
import { showAlert } from './ui/alerts.js';

// 🔄 SOLUÇÃO PADRÃO VITE: Captura de forma dinâmica o prefixo (/biblion/ ou /) configurado no projeto
const baseUrl = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

document.addEventListener('DOMContentLoaded', () => {
  initIcons();

  const registerForm = document.getElementById('registerForm');
  const registerBtn = document.getElementById('registerBtn');

  if (!registerForm || !registerBtn) return;

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;

    if (!nome || !email || !password) {
      showAlert('Atenção', 'Por favor, preencha todos os campos obrigatórios.', 'warning');
      return;
    }

    // Trava o botão para evitar múltiplos cliques assíncronos
    registerBtn.disabled = true;
    registerBtn.textContent = 'Criando conta...';

    try {
      // Executa a criação da conta enviando os metadados para o módulo de autenticação
      await register(email, password, nome, role);

      // Feedback visual moderno com SweetAlert2 conforme diretrizes do PDF
      showAlert(
        'Sucesso!',
        'Sua conta foi criada com sucesso! O perfil foi gerado de forma segura.',
        'success'
      );

      // 📁 CORREÇÃO: Redireciona para a tela de login mantendo o subdiretório oficial na nuvem
      setTimeout(() => {
        window.location.href = `${baseUrl}login.html`;
      }, 1500);

    } catch (error) {
      console.error("Erro capturado no formulário:", error);
    } finally {
      // Destrava o botão caso o fluxo termine (ou falhe)
      registerBtn.disabled = false;
      registerBtn.textContent = 'Criar Conta';
    }
  });
});