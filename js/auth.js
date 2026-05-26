import { supabase } from './supabase.js';
import { showAlert } from './ui/alerts.js';

export async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const profile = await getUserProfile(data.user.id);
    if (!profile) throw new Error('Perfil de usuário não encontrado.');

    redirectByUserRole(profile.role);
    return data;
  } catch (error) {
    showAlert('Erro', error.message, 'error');
    throw error;
  }
}

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

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    window.location.href = '/login.html'; // 👈 Rota limpa, o Vite gerencia
  } catch (error) {
    showAlert('Erro', error.message, 'error');
  }
}

export async function getUserProfile(userId) {
  const { data: profile, error: profileError } = await supabase
    .from('perfis')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (profileError) throw profileError;
  return profile;
}

export function redirectByUserRole(role) {
  // 👈 Rotas absolutas limpas. O próprio Vite adiciona o prefixo do repositório
  if (role === 'proprietario') {
    window.location.href = '/pages/dashboard.html';
  } else {
    window.location.href = '/cliente/dashboard-cliente.html';
  }
}

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