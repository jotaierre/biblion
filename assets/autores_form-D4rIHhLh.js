import{o as e,t}from"./auth-Clpj9KIu.js";import"./icons-BIAwcOnk.js";import{t as n}from"./layout-BNuM0BnG.js";import{o as r,r as i,t as a}from"./autores-3miUwHGL.js";var o=null,s=window.location.hostname.includes(`github.io`)?`/biblion`:``;async function c(){let{session:c,profile:l}=await t();if(!c||l?.role!==`proprietario`)return;o=new URLSearchParams(window.location.search).get(`id`);let u={nome:``,nacionalidade:``,data_nascimento:``};if(o)try{u=await i(o)}catch(t){e(`Erro`,`Erro ao carregar autor: `+t.message,`error`)}n(`
    <div class="mb-6">
      <h1 class="text-2xl font-bold">${o?`Editar Autor`:`Novo Autor`}</h1>
    </div>

    <div class="card max-w-2xl">
      <form id="autorForm" class="space-y-4">
        <div>
          <label for="nome" class="label-field">Nome</label>
          <input type="text" id="nome" class="input-field" value="${u.nome}" required>
        </div>
        <div>
          <label for="nacionalidade" class="label-field">Nacionalidade</label>
          <input type="text" id="nacionalidade" class="input-field" value="${u.nacionalidade||``}">
        </div>
        <div>
          <label for="data_nascimento" class="label-field">Data de Nascimento</label>
          <input type="date" id="data_nascimento" class="input-field" value="${u.data_nascimento||``}">
        </div>
        
        <div class="flex gap-4 pt-4">
          <button type="submit" class="btn-primary">Salvar</button>
          <a href="${s}/pages/autores/index.html" class="btn-secondary">Cancelar</a>
        </div>
      </form>
    </div>
  `,`autores`,l),document.getElementById(`autorForm`).addEventListener(`submit`,async t=>{t.preventDefault();let n={nome:document.getElementById(`nome`).value,nacionalidade:document.getElementById(`nacionalidade`).value,data_nascimento:document.getElementById(`data_nascimento`).value||null};try{o?(await r(o,n),e(`Sucesso`,`Autor updated com sucesso!`,`success`)):(await a(n),e(`Sucesso`,`Autor criado com sucesso!`,`success`)),setTimeout(()=>{window.location.href=`${s}/pages/autores/index.html`},1500)}catch(t){e(`Erro`,`Erro ao salvar autor: `+t.message,`error`)}})}c();