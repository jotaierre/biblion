import{o as e,t}from"./auth-Clpj9KIu.js";import"./icons-BIAwcOnk.js";import{t as n}from"./layout-BNuM0BnG.js";import{n as r}from"./autores-3miUwHGL.js";import{a as i,r as a,t as o}from"./livros-aH729Wwr.js";var s=null,c=window.location.hostname.includes(`github.io`)?`/biblion`:``;async function l(){let{session:l,profile:u}=await t();if(!l||u?.role!==`proprietario`)return;s=new URLSearchParams(window.location.search).get(`id`);let d={titulo:``,ano_publicacao:``,isbn:``,genero:``,autor_id:``},f=[];try{f=await r(),s&&(d=await a(s))}catch(t){e(`Erro`,`Erro ao carregar dados: `+t.message,`error`)}n(`
    <div class="mb-6">
      <h1 class="text-2xl font-bold">${s?`Editar Livro`:`Novo Livro`}</h1>
    </div>

    <div class="card max-w-2xl">
      <form id="livroForm" class="space-y-4">
        <div>
          <label for="titulo" class="label-field">Título</label>
          <input type="text" id="titulo" class="input-field" value="${d.titulo}" required>
        </div>
        <div>
          <label for="autor_id" class="label-field">Autor</label>
          <select id="autor_id" class="input-field" required>
            <option value="">Selecione um autor</option>
            ${f.map(e=>`
              <option value="${e.id}" ${e.id===d.autor_id?`selected`:``}>${e.nome}</option>
            `).join(``)}
          </select>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="ano_publicacao" class="label-field">Ano de Publicação</label>
            <input type="number" id="ano_publicacao" class="input-field" value="${d.ano_publicacao||``}">
          </div>
          <div>
            <label for="isbn" class="label-field">ISBN</label>
            <input type="text" id="isbn" class="input-field" value="${d.isbn||``}">
          </div>
        </div>
        <div>
          <label for="genero" class="label-field">Gênero</label>
          <input type="text" id="genero" class="input-field" value="${d.genero||``}">
        </div>
        
        <div class="flex gap-4 pt-4">
          <button type="submit" class="btn-primary">Salvar</button>
          <a href="${c}/pages/livros/index.html" class="btn-secondary">Cancelar</a>
        </div>
      </form>
    </div>
  `,`livros`,u),document.getElementById(`livroForm`).addEventListener(`submit`,async t=>{t.preventDefault();let n={titulo:document.getElementById(`titulo`).value,autor_id:document.getElementById(`autor_id`).value,ano_publicacao:parseInt(document.getElementById(`ano_publicacao`).value)||null,isbn:document.getElementById(`isbn`).value,genero:document.getElementById(`genero`).value};try{s?(await i(s,n),e(`Sucesso`,`Livro atualizado com sucesso!`,`success`)):(await o(n),e(`Sucesso`,`Livro criado com sucesso!`,`success`)),setTimeout(()=>{window.location.href=`${c}/pages/livros/index.html`},1500)}catch(t){e(`Erro`,`Erro ao salvar livro: `+t.message,`error`)}})}l();