import './build-p2-purchases.mjs';
import fs from 'node:fs';
import './build-assembly-shopping.mjs';
import './build-lift-visual.mjs';
import './build-lift-overview.mjs';
const root='dashboard/camera-module/';
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const inline=s=>esc(s).replace(/\[([^\]]+)\]\(([^)]+)\)/g,(_,label,url)=>{
 const map={'../../dashboard/camera-module/assembly-shopping.html':'assembly-shopping.html','archive/P1-PIN-PURCHASES.md':'../../docs/camera-module/archive/P1-PIN-PURCHASES.md','PIN-WIRING-P1-archive.md':'../../docs/camera-module/PIN-WIRING-P1-archive.md','../../dashboard/camera-module/visual-wiring.html':'visual-wiring.html','PIN-WIRING.md':'pin-wiring.html','PIN-PURCHASES.md':'pin-purchases.html','../knowledge/arduino/README.md':'arduino-library.html','../../camera-module/PIN-WIRING.md':'pin-wiring.html','../../camera-module/PIN-PURCHASES.md':'pin-purchases.html','../../dashboard/camera-module/pin-wiring.html':'pin-wiring.html','../../dashboard/camera-module/pin-wiring.svg':'pin-wiring.svg'};
 return `<a href="${map[url]??url}">${label}</a>`;
}).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,'<code>$1</code>');
function md(text){let out='',inTable=false,inList=false;
 for(const line of text.split(/\r?\n/)){
  if(line.startsWith('|')){if(/^\|[-| :]+$/.test(line))continue;const cells=line.trim().slice(1,-1).split('|');if(!inTable){out+='<div class="table-scroll"><table><thead><tr>'+cells.map(c=>'<th>'+inline(c.trim())+'</th>').join('')+'</tr></thead><tbody>';inTable=true;}else out+='<tr>'+cells.map(c=>'<td>'+inline(c.trim())+'</td>').join('')+'</tr>';continue;}
  if(inTable){out+='</tbody></table></div>';inTable=false;}
  if(/^(- |\d+\. )/.test(line)){if(!inList){out+='<ul>';inList=true;}out+='<li>'+inline(line.replace(/^(- |\d+\. )/,''))+'</li>';continue;}
  if(inList){out+='</ul>';inList=false;}
  if(!line.trim())continue;
  const h=line.match(/^(#{1,3}) (.*)/);out+=h?`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`:`<p>${inline(line)}</p>`;
 }
 if(inTable)out+='</tbody></table></div>';if(inList)out+='</ul>';return out;
}
const style=`:root{font-family:Segoe UI,Arial,sans-serif;color:#152940;background:#edf3f7;font-size:17px;line-height:1.65}*{box-sizing:border-box}body{margin:0}main{max-width:1420px;margin:auto;padding:30px}nav{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px}a{color:#165e9e;text-underline-offset:3px}nav a,button{background:white;padding:8px 16px;border:1px solid #bdcbd8;border-radius:8px;font:inherit;color:#165e9e;cursor:pointer}article{background:white;border-radius:18px;padding:30px}h1{font-size:34px;line-height:1.25}h2{margin-top:42px;font-size:25px}table{width:100%;border-collapse:collapse;font-size:15px}th,td{padding:12px;text-align:left;border-bottom:1px solid #dce4ed;vertical-align:top}th{background:#eaf1f7}td:first-child{font-weight:600}code{background:#eaf1f7;padding:2px 5px;border-radius:4px}.table-scroll{overflow:auto}.scheme{width:100%;display:block;background:#edf3f7;border-radius:15px}.scheme-link{display:block;margin:18px 0}.hint{background:#ffedcd;padding:15px;border-radius:10px}.filter{width:100%;padding:12px;font:inherit;margin:16px 0;border:1px solid #9ab1c5;border-radius:8px}@media(max-width:650px){main{padding:14px}article{padding:17px}h1{font-size:27px}table{min-width:650px}}@media print{nav,.filter,.no-print{display:none}main{padding:0}article{padding:0}h2{break-after:avoid}tr{break-inside:avoid}.scheme-link{break-after:page}body{background:white}}`;
const nav='<nav><a href="assembly-shopping.html">Інструменти та монтаж</a><a href="wiring-overview.html">Загальна схема — все одразу</a><a href="visual-wiring.html">Усі деталі та дроти · P2</a><a href="index.html">3D модуля</a><a href="pin-wiring.html">Схема і піни</a><a href="pin-purchases.html">Покупки P2</a><a href="arduino-library.html">Бібліотека Arduino</a><button onclick="window.print()">Друк</button></nav>';
for(const [source,file,title] of [['docs/camera-module/PIN-WIRING.md','pin-wiring.html','Схема підключення пінами'],['docs/camera-module/PIN-PURCHASES.md','pin-purchases.html','Список закупівлі'],['docs/knowledge/arduino/README.md','arduino-library.html','Бібліотека Arduino']]){
 const visual=file==='pin-wiring.html'?'<p class="hint">Схема для стенда. Натисніть зображення, щоб відкрити його у повному розмірі. Під ним — кожен провід, обтиск, перевірка X2 і порядок складання.</p><a class="scheme-link" href="pin-wiring.svg"><img class="scheme" src="pin-wiring.svg" alt="Підключення Nano, ULN2003, DM556, HOME, двигуна й Canon R50"></a>':'';
 fs.writeFileSync(root+file,`<!doctype html><html lang="uk"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${title} · Фотобудка</title><style>${style}</style><main>${nav}${visual}<article><input class="filter" type="search" placeholder="Фільтр таблиць: D2, HOME, CNCPROM…" aria-label="Фільтр рядків таблиць">${md(fs.readFileSync(source,'utf8'))}</article></main><script>document.querySelector('.filter').addEventListener('input',e=>{const q=e.target.value.toLocaleLowerCase();document.querySelectorAll('tbody tr').forEach(r=>r.hidden=!r.textContent.toLocaleLowerCase().includes(q));});</script></html>`);
}
fs.copyFileSync('docs/camera-module/pin-wiring.svg',root+'pin-wiring.svg');
console.log('Built pin-wiring, purchases and Arduino library pages.');
