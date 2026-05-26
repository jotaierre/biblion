import{r as e}from"./auth-XPfV9UYX.js";import{n as t,t as n}from"./icons-1bdniJDT.js";function r(r,i=`dashboard`,a){let o=document.getElementById(`app`);if(!o)return;let s=a?.role===`proprietario`,c=[{id:`dashboard`,label:`Dashboard`,icon:`dashboard`,href:s?`/pages/dashboard.html`:`/cliente/dashboard-cliente.html`}];s&&c.push({id:`autores`,label:`Autores`,icon:`author`,href:`/pages/autores/index.html`},{id:`livros`,label:`Livros`,icon:`book`,href:`/pages/livros/index.html`}),o.innerHTML=`
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <aside class="w-64 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark hidden md:flex flex-col fixed inset-y-0">
        <div class="p-6 flex items-center gap-3">
          <div class="text-primary">${n(`book`)}</div>
          <span class="text-xl font-bold">Biblioteca</span>
        </div>
        
        <nav class="flex-1 px-4 py-4 space-y-1">
          ${c.map(e=>`
            <a href="${e.href}" class="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${i===e.id?`bg-primary text-white`:`text-text-secondary-light dark:text-text-secondary-dark hover:bg-slate-100 dark:hover:bg-slate-800`}">
              ${n(e.icon)}
              <span>${e.label}</span>
            </a>
          `).join(``)}
        </nav>
        
        <div class="p-4 border-t border-border-light dark:border-border-dark">
          <button id="logoutBtn" class="flex items-center gap-3 w-full px-4 py-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-danger transition-colors">
            ${n(`logout`)}
            <span>Sair</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 md:ml-64 bg-background-light dark:bg-background-dark">
        <!-- Header -->
        <header class="h-16 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark flex items-center justify-between px-6 sticky top-0 z-10">
          <div class="md:hidden flex items-center gap-3">
             <div class="text-primary">${n(`book`)}</div>
             <span class="text-lg font-bold">Biblioteca</span>
          </div>
          <div class="hidden md:block">
            <h2 class="text-lg font-semibold capitalize">${i}</h2>
          </div>
          
          <div class="flex items-center gap-4">
            <button id="themeToggle" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
               <div id="sunIcon" class="hidden dark:block text-yellow-500">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M3 12h2.25m.386-6.364 1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M3 12h2.25m.386-6.364 1.591-1.591M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                 </svg>
               </div>
               <div id="moonIcon" class="block dark:hidden text-slate-700">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                 </svg>
               </div>
            </button>
            <div class="text-right hidden sm:block">
              <p class="text-sm font-medium">${a?.nome||`Usuário`}</p>
              <p class="text-xs text-text-secondary-light dark:text-text-secondary-dark">${a?.role===`proprietario`?`Administrador`:`Leitor`}</p>
            </div>
            <div class="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500">
              ${n(`user`)}
            </div>
          </div>
        </header>
        
        <div class="p-6">
          ${r}
        </div>
      </main>
    </div>
  `,t();let l=document.getElementById(`themeToggle`);l&&l.addEventListener(`click`,()=>{document.documentElement.classList.toggle(`dark`),localStorage.setItem(`theme`,document.documentElement.classList.contains(`dark`)?`dark`:`light`)}),localStorage.getItem(`theme`)===`dark`||!localStorage.getItem(`theme`)&&window.matchMedia(`(prefers-color-scheme: dark)`).matches?document.documentElement.classList.add(`dark`):document.documentElement.classList.remove(`dark`),document.getElementById(`logoutBtn`)?.addEventListener(`click`,()=>{e()})}export{r as t};