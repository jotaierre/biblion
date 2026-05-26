-- Criação da tabela de perfis
CREATE TABLE IF NOT EXISTS public.perfis (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('proprietario', 'cliente')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS para perfis
ALTER TABLE public.perfis ENABLE ROW LEVEL SECURITY;

-- Políticas para perfis
CREATE POLICY "Perfis são visíveis por todos os usuários autenticados" 
ON public.perfis FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Usuários podem inserir seu próprio perfil" 
ON public.perfis FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" 
ON public.perfis FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);

-- Criação da tabela de autores
CREATE TABLE IF NOT EXISTS public.autores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    nacionalidade TEXT,
    data_nascimento DATE,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS para autores
ALTER TABLE public.autores ENABLE ROW LEVEL SECURITY;

-- Políticas para autores
CREATE POLICY "Autores são visíveis por todos" 
ON public.autores FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Apenas proprietários podem gerenciar autores" 
ON public.autores FOR ALL 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.perfis 
        WHERE id = auth.uid() AND role = 'proprietario'
    )
);

-- Criação da tabela de livros
CREATE TABLE IF NOT EXISTS public.livros (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    ano_publicacao INTEGER,
    isbn TEXT,
    genero TEXT,
    autor_id UUID REFERENCES public.autores(id) ON DELETE CASCADE,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS para livros
ALTER TABLE public.livros ENABLE ROW LEVEL SECURITY;

-- Políticas para livros
CREATE POLICY "Livros são visíveis por todos" 
ON public.livros FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Apenas proprietários podem gerenciar livros" 
ON public.livros FOR ALL 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.perfis 
        WHERE id = auth.uid() AND role = 'proprietario'
    )
);

-- Grant permissions (necessário dependendo da configuração do projeto)
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
