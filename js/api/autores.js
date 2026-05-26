import { supabase } from '../supabase.js';

export async function getAutores(page = 1, pageSize = 10, search = '') {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('autores')
    .select('*', { count: 'exact' })
    .order('nome', { ascending: true })
    .range(from, to);

  if (search) {
    query = query.ilike('nome', `%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) throw error;
  return { data, count };
}

export async function getAutorById(id) {
  const { data, error } = await supabase
    .from('autores')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getAllAutoresAtivos() {
  const { data, error } = await supabase
    .from('autores')
    .select('id, nome')
    .eq('ativo', true)
    .order('nome');

  if (error) throw error;
  return data;
}

export async function createAutor(autorData) {
  const { data, error } = await supabase
    .from('autores')
    .insert([autorData])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateAutor(id, autorData) {
  const { data, error } = await supabase
    .from('autores')
    .update(autorData)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function toggleAutorAtivo(id, ativo) {
  const { data, error } = await supabase
    .from('autores')
    .update({ ativo })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}
