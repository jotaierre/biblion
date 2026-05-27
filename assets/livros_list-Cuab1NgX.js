import{o as e,s as t,t as n}from"./auth-Clpj9KIu.js";import{t as r}from"./icons-BIAwcOnk.js";import{t as i}from"./layout-BNuM0BnG.js";import{i as a,n as o}from"./livros-aH729Wwr.js";var s=1,c=10,l=1,u=null;async function d(){try{let{data:e,count:t}=await a(s,c);l=Math.ceil(t/c),f(e,t)}catch(t){e(`Erro`,`Não foi possível carregar os livros: `+t.message,`error`)}}function f(e,t){let n=window.location.hostname.includes(`github.io`)?`/biblion`:``;i(`
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <h1 class="text-2xl font-bold">Gerenciamento de Livros</h1>
      <a href="${n}/pages/livros/form.html" class="btn-primary flex items-center gap-2">
        ${r(`plus`)}
        Novo Livro
      </a>
    </div>

    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-border-light dark:border-border-dark">
              <th class="px-6 py-4 font-semibold">Título</th>
              <th class="px-6 py-4 font-semibold">Autor</th>
              <th class="px-6 py-4 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-light dark:divide-border-dark">
            ${e.length===0?`
              <tr>
                <td colspan="3" class="px-6 py-10 text-center text-text-secondary-light dark:text-text-secondary-dark">
                  Nenhum livro encontrado.
                </td>
              </tr>
            `:e.map(e=>`
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td class="px-6 py-4 font-medium">${e.titulo}</td>
                <td class="px-6 py-4">${e.autor?.nome||`-`}</td>
                <td class="px-6 py-4 text-right space-x-2">
                  <a href="${n}/pages/livros/form.html?id=${e.id}" class="text-primary hover:text-primary-hover inline-block" title="Editar">
                    ${r(`pencil`)}
                  </a>
                  <button onclick="window.handleDeleteLivro('${e.id}')" class="text-danger hover:text-red-700 inline-block" title="Excluir">
                    ${r(`trash`)}
                  </button>
                </td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      </div>

      <div class="px-6 py-4 border-t border-border-light dark:border-border-dark flex items-center justify-between">
        <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          Mostrando ${e.length} de ${t} registros
        </p>
        <div class="flex items-center gap-2">
          <button id="prevPage" class="btn-secondary px-2 py-2" ${s===1?`disabled`:``}>
            ${r(`chevron-left`)}
          </button>
          <span class="text-sm font-medium">Página ${s} de ${l||1}</span>
          <button id="nextPage" class="btn-secondary px-2 py-2" ${s===l?`disabled`:``}>
            ${r(`chevron-right`)}
          </button>
        </div>
      </div>
    </div>
  `,`livros`,u),document.getElementById(`prevPage`)?.addEventListener(`click`,()=>{s>1&&(s--,d())}),document.getElementById(`nextPage`)?.addEventListener(`click`,()=>{s<l&&(s++,d())})}window.handleDeleteLivro=async n=>{if(await t(`Tem certeza?`,`Você deseja excluir este livro?`))try{await o(n),e(`Sucesso`,`Livro excluído com sucesso!`,`success`),d()}catch(t){e(`Erro`,`Erro ao processar solicitação: `+t.message,`error`)}};async function p(){let{session:e,profile:t}=await n(),r=window.location.hostname.includes(`github.io`)?`/biblion`:``;if(!e||t?.role!==`proprietario`){t?.role===`cliente`?window.location.href=`${r}/cliente/dashboard-cliente.html`:window.location.href=`${r}/login.html`;return}u=t,d()}p();