import { supabase } from '../supabase.js';

export async function getLivros(page = 1, pageSize = 10, search = '') {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('livros')
    .select('*, autores(nome)', { count: 'exact' })
    .order('titulo', { ascending: true })
    .range(from, to);

  if (search) {
    query = query.ilike('titulo', `%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) throw error;
  return { data, count };
}

export async function getLivroById(id) {
  const { data, error } = await supabase
    .from('livros')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createLivro(livroData) {
  const { data, error } = await supabase
    .from('livros')
    .insert([livroData])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateLivro(id, livroData) {
  const { data, error } = await supabase
    .from('livros')
    .update(livroData)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function toggleLivroAtivo(id, ativo) {
  const { data, error } = await supabase
    .from('livros')
    .update({ ativo })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}

/**
 * 📁 CORREÇÃO DO BUILD: Exporta a função requisitada pela listagem de livros
 * Remove o registro fisicamente da tabela do Supabase baseado no ID recebido
 */
export async function deleteLivro(id) {
  const { data, error } = await supabase
    .from('livros')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data;
}