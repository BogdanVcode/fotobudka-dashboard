import fs from 'node:fs';import path from 'node:path';
const dest=path.resolve('.publish/fotobudka-dashboard');
if(!fs.existsSync(path.join(dest,'.git')))throw Error('Missing checkout');
const excluded=new Set(['archive','receipts-local']);
function copyTree(src,rel='') {for(const e of fs.readdirSync(src,{withFileTypes:true})) {if(excluded.has(e.name)||/archive|\.bak-|budget-priority-check/.test(e.name))continue;const f=path.join(src,e.name),r=path.join(rel,e.name);if(e.isDirectory()){copyTree(f,r);continue;}const out=path.join(dest,r);fs.mkdirSync(path.dirname(out),{recursive:true});if(/\.(html|js|css)$/.test(f)) {let s=fs.readFileSync(f,'utf8');if(!rel)s=s.replaceAll('../drawings/','drawings/').replaceAll('../output/','output/').replaceAll('../docs/','docs/').replaceAll('../assets/','assets/');else if(rel==='camera-module')s=s.replaceAll('../../docs/','../docs/').replaceAll('../../drawings/','../drawings/');fs.writeFileSync(out,s);}else fs.copyFileSync(f,out);}}
copyTree('dashboard');
for(const folder of ['docs/camera-module','docs/knowledge/arduino','docs/camera-module/archive','drawings/revision-10','output/pdf']) {for(const e of fs.readdirSync(folder,{withFileTypes:true})){if(!e.isFile()||/\.(png|jpg|blend\d*|txt)$/.test(e.name))continue;const out=path.join(dest,folder,e.name);fs.mkdirSync(path.dirname(out),{recursive:true});fs.copyFileSync(path.join(folder,e.name),out);}}
fs.writeFileSync(path.join(dest,'docs/MASTER-SPEC.md'),fs.readFileSync('docs/MASTER-SPEC.md','utf8').split('<!-- CURRENT-REVISION-09 -->')[0]);
const wiring=path.join(dest,'camera-module/pin-wiring.html');fs.writeFileSync(wiring,fs.readFileSync(wiring,'utf8').replaceAll('href="PIN-WIRING-P1-archive.md"','href="../docs/camera-module/PIN-WIRING-P1-archive.md"'));
// Keep receipt originals private, as designated in the local project.
const c=path.join(dest,'current10.js');let s=fs.readFileSync(c,'utf8');s=s.replace(/'<a href="'\+r\.purchase\.order\.evidence\+'" target="_blank" rel="noopener">Скріншот замовлення ↗<\/a>'/g,"'<span>Оригінал підтвердження збережено локально</span>'");
// The receipt link is part of a longer concatenated string.
s=s.replace(/<a href="'\+r\.purchase\.order\.evidence\+'" target="_blank" rel="noopener">Скріншот замовлення ↗<\/a>/g,'<span>Оригінал підтвердження збережено локально</span>');fs.writeFileSync(c,s);
const stamp='p2-20260927';const idx=path.join(dest,'index.html');s=fs.readFileSync(idx,'utf8').replace(/([?&]v=)[^"'&]+/g,'$1'+stamp);fs.writeFileSync(idx,s);fs.writeFileSync(path.join(dest,'404.html'),s);
const manifestPath=path.join(dest,'DEPLOY-MANIFEST.json');let manifest=JSON.parse(fs.readFileSync(manifestPath));manifest.publishedContentAt=new Date().toISOString();manifest.update='P2 canonical lift wiring; CNCPROM ordered 9587 UAH; P1 archive only';manifest.privateExclusions=['receipts-local'];fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');
for(const file of ['build-assembly-shopping.mjs','build-p2-purchases.mjs','build-camera-module.mjs','build-pin-wiring.mjs','build-budget-10.mjs','publish-current-dashboard.mjs'])fs.copyFileSync('scripts/'+file,path.join(dest,'engineering-source',file));
console.log('Prepared current local dashboard in existing publication checkout.');
