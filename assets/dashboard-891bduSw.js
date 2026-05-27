import{c as e,t}from"./auth-Clpj9KIu.js";import"./icons-BIAwcOnk.js";import{t as n}from"./layout-BNuM0BnG.js";async function r(){let{session:r,profile:i}=await t(),a=window.location.hostname.includes(`github.io`)?`/biblion`:``;if(!r){window.location.href=`${a}/login.html`;return}if(i?.role!==`proprietario`){i?.role===`cliente`?window.location.href=`${a}/cliente/dashboard-cliente.html`:window.location.href=`${a}/login.html`;return}let{count:o}=await e.from(`autores`).select(`*`,{count:`exact`,head:!0}),{count:s}=await e.from(`livros`).select(`*`,{count:`exact`,head:!0});n(`
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card flex items-center gap-4">
        <div class="p-3 bg-primary/10 text-primary rounded-lg">
          <div data-heroicon="author"></div>
        </div>
        <div>
          <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark">Total de Autores</p>
          <p class="text-2xl font-bold">${o||0}</p>
        </div>
      </div>
      
      <div class="card flex items-center gap-4">
        <div class="p-3 bg-success/10 text-success rounded-lg">
          <div data-heroicon="book"></div>
        </div>
        <div>
          <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark">Total de Livros</p>
          <p class="text-2xl font-bold">${s||0}</p>
        </div>
      </div>
    </div>

    <div class="card">
      <h3 class="text-lg font-bold mb-4">Bem-vindo ao Sistema Administrativo</h3>
      <p class="text-text-secondary-light dark:text-text-secondary-dark">
        Utilize o menu lateral para gerenciar os autores e livros da biblioteca.
      </p>
    </div>
  `,`dashboard`,i)}r();