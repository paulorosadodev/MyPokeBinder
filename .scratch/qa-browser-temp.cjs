const fs = require('fs');
const path = require('path');
const cache = path.join(process.env.LOCALAPPDATA, 'npm-cache/_npx');
const pw = fs.readdirSync(cache).map(x => path.join(cache,x,'node_modules/playwright')).find(x => fs.existsSync(x+'/package.json') && require(x+'/package.json').version === '1.57.0');
const { chromium } = require(pw);
(async () => {
 const browser = await chromium.launch({headless:true});
 console.log('BROWSER',browser.version());
 for (const viewport of [{width:1440,height:900},{width:390,height:844}]) {
  const context = await browser.newContext({viewport});
  const page = await context.newPage();
  let errors = 0; let failed = [];
  page.on('pageerror',()=>errors++);
  page.on('response',r=>{if(r.status()>=400){const u=new URL(r.url());failed.push({host:u.hostname,path:u.pathname,status:r.status()});}});
  for(const route of ['/','/inicio','/login','/dashboard','/collection','/configuracoes','/perfil','/cards/00000000-0000-4000-8000-000000000001','/termos','/terms','/privacidade','/privacy','/perfil/qa_nonexistent_928173','/colecao/qa_nonexistent_928173','/qa-nonexistent-928173','/login?error=auth_failed','/auth/callback']) {
   errors=0;failed=[];
   try {
    const response=await page.goto('https://mypokebinder.vercel.app'+route,{waitUntil:'networkidle',timeout:30000});
    const info=await page.evaluate(()=>({title:document.title,headings:[...document.querySelectorAll('h1,h2')].map(e=>e.textContent),overflow:document.documentElement.scrollWidth>innerWidth,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).length,login:document.body.innerText.includes('Entrar com Google'),authError:document.body.innerText.includes('falha na autenticação')}));
    console.log(JSON.stringify({width:viewport.width,route,status:response.status(),destination:new URL(page.url()).pathname,...info,errors,failed}));
   } catch(e) { console.log(JSON.stringify({width:viewport.width,route,blocked:e.name})); }
  }
  for(const route of ['/api/binder','/api/cards','/api/dashboard','/api/profile','/api/settings','/api/search?name=Pikachu']){
   const r=await context.request.get('https://mypokebinder.vercel.app'+route);
   console.log(JSON.stringify({width:viewport.width,api:route,status:r.status()}));
  }
  await page.goto('https://mypokebinder.vercel.app/login',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'Entrar com Google'}).click();
  await page.waitForTimeout(2500);
  console.log(JSON.stringify({width:viewport.width,oauthDestinationHost:new URL(page.url()).hostname,oauthDestinationPath:new URL(page.url()).pathname,errors}));
  await context.close();
 }
 await browser.close();
})().catch(e=>{console.error(e.name);process.exitCode=1});
