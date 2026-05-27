import{o as e,s as t,t as n}from"./auth-Clpj9KIu.js";import{t as r}from"./icons-BIAwcOnk.js";import{t as i}from"./layout-BNuM0BnG.js";import{a,i as o}from"./autores-3miUwHGL.js";var s=1,c=10,l=1,u=null;async function d(){try{let{data:e,count:t}=await o(s,c);l=Math.ceil(t/c),f(e,t)}catch(t){e(`Erro`,`Não foi possível carregar os autores: `+t.message,`error`)}}function f(e,t){let n=window.location.hostname.includes(`github.io`)?`/biblion`:``;i(`
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <h1 class="text-2xl font-bold">Gerenciamento de Autores</h1>
      <a href="${n}/pages/autores/form.html" class="btn-primary flex items-center gap-2">
        ${r(`plus`)}
        Novo Autor
      </a>
    </div>

    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-border-light dark:border-border-dark">
              <th class="px-6 py-4 font-semibold">Nome</th>
              <th class="px-6 py-4 font-semibold">Nacionalidade</th>
              <th class="px-6 py-4 font-semibold text-center">Status</th>
              <th class="px-6 py-4 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-light dark:divide-border-dark">
            ${e.length===0?`
              <tr>
                <td colspan="4" class="px-6 py-10 text-center text-text-secondary-light dark:text-text-secondary-dark">
                  Nenhum autor encontrado.
                </td>
              </tr>
            `:e.map(e=>`
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td class="px-6 py-4 font-medium">${e.nome}</td>
                <td class="px-6 py-4">${e.nacionalidade||`-`}</td>
                <td class="px-6 py-4 text-center">
                  <span class="px-2 py-1 rounded-full text-xs font-semibold ${e.ativo?`bg-success/10 text-success`:`bg-danger/10 text-danger`}">
                    ${e.ativo?`Ativo`:`Inativo`}
                  </span>
                </td>
                <td class="px-6 py-4 text-right space-x-2">
                  <a href="${n}/pages/autores/form.html?id=${e.id}" class="text-primary hover:text-primary-hover inline-block" title="Editar">
                    ${r(`pencil`)}
                  </a>
                  <button onclick="window.handleToggleActive('${e.id}', ${e.ativo})" class="${e.ativo?`text-danger hover:text-red-700`:`text-success hover:text-green-700`} inline-block" title="${e.ativo?`Inativar`:`Reativar`}">
                    ${e.ativo?r(`trash`):r(`check`)}
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
  `,`autores`,u),document.getElementById(`prevPage`)?.addEventListener(`click`,()=>{s>1&&(s--,d())}),document.getElementById(`nextPage`)?.addEventListener(`click`,()=>{s<l&&(s++,d())})}window.handleToggleActive=async(n,r)=>{let i=r?`inativar`:`reativar`;if(await t(`Tem certeza?`,`Você deseja ${i} este autor?`))try{await a(n,!r),e(`Sucesso`,`Autor ${i===`inativar`?`inativado`:`reativado`} com sucesso!`,`success`),d()}catch(t){e(`Erro`,`Erro ao processar solicitação: `+t.message,`error`)}};async function p(){let{session:e,profile:t}=await n(),r=window.location.hostname.includes(`github.io`)?`/biblion`:``;if(!e||t?.role!==`proprietario`){t?.role===`cliente`?window.location.href=`${r}/cliente/dashboard-cliente.html`:window.location.href=`${r}/login.html`;return}u=t,d()}p();