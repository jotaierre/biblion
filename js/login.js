import { login } from './auth.js';
import { initIcons } from './ui/icons.js';

document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  
  const loginForm = document.getElementById('loginForm');
  const loginBtn = document.getElementById('loginBtn');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) return;

    loginBtn.disabled = true;
    loginBtn.textContent = 'Entrando...';

    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
    } finally {
      loginBtn.disabled = false;
      loginBtn.textContent = 'Entrar';
    }
  });
});
