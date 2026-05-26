import { supabase } from './supabase.js';
import { showAlert } from './ui/alerts.js';

/**
 * Realiza o login do usuário por e-mail/senha e redireciona baseado na Role
 */
export async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const profile = await getUserProfile(data.user.id);
    if (!profile) throw new Error('Perfil de usuário não encontrado na base de dados.');

    redirectByUserRole(profile.role);
    return data;
  } catch (error) {
    showAlert('Erro', error.message, 'error');
    throw error;
  }
}

/**
 * Cadastra um novo usuário enviando os metadados para ativação do Trigger no banco
 */
export async function register(email, password, nome, role = 'cliente') {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nome, role } }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    showAlert('Erro', error.message, 'error');
    throw error;
  }
}

/**
 * Encerra a sessão e limpa os tokens do navegador
 */
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    const isGitHubPages = window.location.hostname.includes('github.io');
    const base = isGitHubPages ? '/biblion' : '';
    window.location.href = `${base}/login.html`;
  } catch (error) {
    showAlert('Erro', error.message, 'error');
  }
}

/**
 * Busca as informações do perfil de forma segura
 */
export async function getUserProfile(userId) {
  const { data: profile, error: profileError } = await supabase
    .from('perfis')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (profileError) throw profileError;
  return profile;
}

/**
 * Gerencia as Guardas de Rota no modelo multipáginas via Força Bruta
 */
export function redirectByUserRole(role) {
  const isGitHubPages = window.location.hostname.includes('github.io');
  const base = isGitHubPages ? '/biblion' : '';

  if (role === 'proprietario') {
    window.location.href = `${base}/pages/dashboard.html`;
  } else {
    window.location.href = `${base}/cliente/dashboard-cliente.html`;
  }
}

/**
 * Middleware/Guarda executado na inicialização de cada página restrita
 */
export async function checkSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) return { session: null, profile: null };

  try {
    const profile = await getUserProfile(session.user.id);
    return { session, profile };
  } catch (error) {
    return { session, profile: null };
  }
}