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

    // Busca o perfil do usuário na tabela pública de forma assíncrona
    const profile = await getUserProfile(data.user.id);

    if (!profile) {
      throw new Error('Perfil de usuário não encontrado na base de dados.');
    }

    // Encaminha dinamicamente para o dashboard correto baseado na Role
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
    // Passamos o nome e a role dentro de options.data para o PostgreSQL criar o perfil automaticamente
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome,
          role
        }
      }
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

    // Redirecionamento absoluto padronizado. O Vite injeta o prefixo /biblion/ na build.
    window.location.href = '/login.html';
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
    .maybeSingle(); // Retorna null de forma amigável caso o usuário não tenha linha na tabela pública

  if (profileError) {
    console.error("Erro na consulta de perfil:", profileError.message);
    throw profileError;
  }

  return profile;
}

/**
 * Gerencia as Guardas de Rota no modelo multipáginas (Vite)
 */
export function redirectByUserRole(role) {
  // O Vite intercepta as barras iniciais e insere o subdiretório automaticamente na compilação
  if (role === 'proprietario') {
    window.location.href = '/pages/dashboard.html';
  } else {
    window.location.href = '/cliente/dashboard-cliente.html';
  }
}

/**
 * Middleware/Guarda executado na inicialização de cada página restrita
 */
export async function checkSession() {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    return { session: null, profile: null };
  }

  try {
    const profile = await getUserProfile(session.user.id);
    return { session, profile };
  } catch (error) {
    console.error('Erro ao buscar perfil durante validação:', error);
    return { session, profile: null };
  }
}