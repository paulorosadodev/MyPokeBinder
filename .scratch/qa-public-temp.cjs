const fs=require('fs'),path=require('path');
const cache=path.join(process.env.LOCALAPPDATA,'npm-cache/_npx');
const pw=fs.readdirSync(cache).map(x=>path.join(cache,x,'node_modules/playwright')).find(x=>fs.existsSync(x+'/package.json')&&require(x+'/package.json').version==='1.57.0');
const {chromium}=require(pw);
(async()=>{
const browser=await chromium.launch({headless:true});
for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:844}});
 for(let repetition=1;repetition<=2;repetition++){
  for(const route of ['/perfil/qa_nonexistent_928173','/colecao/qa_nonexistent_928173']){
   const responses=[];
   const listener=r=>{if(new URL(r.url()).pathname.startsWith('/api/profile'))responses.push(r.status());};
   page.on('response',listener);
   await page.goto('https://mypokebinder.vercel.app'+route,{waitUntil:'domcontentloaded',timeout:20000});
   await page.waitForTimeout(8000);
   console.log(JSON.stringify({width,repetition,route,responses,text:(await page.locator('main').innerText()).slice(0,800)}));
   if(repetition===2)await page.screenshot({path:'.scratch/qa-public-'+width+'-'+(route.startsWith('/perfil')?'profile':'collection')+'.png'});
   page.off('response',listener);
  }
 }
 await page.goto('https://mypokebinder.vercel.app/inicio',{waitUntil:'domcontentloaded'});
 await page.getByRole('link',{name:'Entrar',exact:true}).first().click();
 await page.getByRole('button',{name:'Entrar com Google'}).waitFor();
 await page.reload();
 await page.getByRole('button',{name:'Entrar com Google'}).waitFor();
 await page.goBack();
 await page.getByRole('heading',{name:'Seu fichário 3×3 dos 151 de Kanto'}).first().waitFor();
 await page.goForward();
 await page.getByRole('button',{name:'Entrar com Google'}).waitFor();
 await page.screenshot({path:'.scratch/qa-login-'+width+'.png'});
 console.log(JSON.stringify({width,navigation:'landing-login-refresh-back-forward PASS'}));
 await page.close();
}
await browser.close();
})().catch(e=>{console.error(e.name,e.message.split('\n')[0]);process.exit(1)});
