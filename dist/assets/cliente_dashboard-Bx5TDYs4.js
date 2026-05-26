import{o as e,t}from"./auth-XPfV9UYX.js";import{n}from"./icons-1bdniJDT.js";import{t as r}from"./layout-HDTcLn4t.js";import{r as i}from"./livros-C2Sbd6LX.js";var a=1,o=12,s=1,c=null;async function l(){try{let{session:e,profile:n}=await t();if(!e||!n){window.location.href=`/login.html`;return}if(c=n,c.role===`proprietario`){window.location.href=`/pages/dashboard.html`;return}console.log(`Acesso autorizado ao catálogo: `,c.nome),await u()}catch(e){console.error(`Erro crítico na inicialização do cliente:`,e),window.location.href=`/login.html`}}async function u(){try{let{data:e,count:t}=await i(a,o);s=Math.ceil(t/o),d(e,t)}catch(t){console.error(`Erro ao carregar catálogo de livros:`,t),e(`Erro`,`Não foi possível carregar o acervo de livros.`,`error`)}}function d(e,t){r(`
    <div class="mb-8">
      <h1 class="text-2xl font-bold">Catálogo de Livros</h1>
      <p class="text-text-secondary-light dark:text-text-secondary-dark">Explore nosso acervo completo</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      ${e.length===0?`
        <div class="col-span-full py-20 text-center">
          <p class="text-text-secondary-light dark:text-text-secondary-dark text-lg">Nenhum livro disponível no momento.</p>
        </div>
      `:e.map(e=>`
        <div class="card flex flex-col hover:shadow-md transition-shadow bg-white dark:bg-slate-900 border border-border-light dark:border-border-dark p-4 rounded-xl">
          
          <div class="bg-primary/5 rounded-lg h-48 flex items-center justify-center mb-4 text-primary">
            <div data-heroicon="book" class="w-12 h-12 flex items-center justify-center"></div>
          </div>
          
          <div class="flex-1">
            <h3 class="font-bold text-lg mb-1 text-slate-900 dark:text-white line-clamp-2">${e.titulo}</h3>
            <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-2">${e.autores?.nome||`Autor Desconhecido`}</p>
            <div class="flex items-center gap-2 text-xs mt-auto pt-2">
              <span class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded font-medium">${e.genero||`Geral`}</span>
              <span class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded font-medium">${e.ano_publicacao||`N/A`}</span>
            </div>
          </div>
        </div>
      `).join(``)}
    </div>

    <div class="mt-10 flex items-center justify-center gap-4">
      <button id="prevPage" class="btn-secondary flex items-center gap-2 px-4 py-2 rounded-lg border border-border-light dark:border-border-dark disabled:opacity-50" ${a===1?`disabled`:``}>
        <span data-heroicon="chevron-left"></span> Anterior
      </button>
      <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Página ${a} de ${s||1}</span>
      <button id="nextPage" class="btn-secondary flex items-center gap-2 px-4 py-2 rounded-lg border border-border-light dark:border-border-dark disabled:opacity-50" ${a===s?`disabled`:``}>
        Próxima <span data-heroicon="chevron-right"></span>
      </button>
    </div>
  `,`dashboard`,c),n(),document.getElementById(`prevPage`)?.addEventListener(`click`,()=>{a>1&&(a--,u())}),document.getElementById(`nextPage`)?.addEventListener(`click`,()=>{a<s&&(a++,u())})}l();