import fs from 'node:fs';
import path from 'node:path';
const destination=path.resolve('.publish/fotobudka-dashboard');
if(!fs.existsSync(path.join(destination,'.git')))throw Error('Publication checkout missing');
function copy(from,to=from){const dest=path.join(destination,to);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(from,dest);}
function write(to,text){const dest=path.join(destination,to);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,text);}
for(const f of ['index.html','current.css','current.js','author-viewer.js','design08.js','data.js','budget.js']){
 let text=fs.readFileSync('dashboard/'+f,'utf8');
 if(['index.html','current.js'].includes(f))text=text.replaceAll('../drawings/','drawings/').replaceAll('../output/','output/').replaceAll('../docs/','docs/');
 write(f,text);
}
const base='drawings/revision-08';
for(const f of ['design.json','source-inspection.json','index.html','panel-schedule.json','panels.dxf','01-overview.svg','02-assembly.svg','03-frame.svg','БУДКА-доповнена-08.blend'])copy(base+'/'+f);
for(const f of fs.readdirSync(base+'/parts'))if(f.endsWith('.svg'))copy(base+'/parts/'+f);
copy('output/pdf/Фотобудка-08-креслення.pdf');
for(const f of ['REVISION-08','CUTLIST-08','BUDGET-08'])copy('docs/design/'+f+'.md');
copy('БУДКА.blend','source/БУДКА.blend');
for(const f of ['blender/build-author-model.py','inspect-user-blend.py','draw-author-panels.py','register-author-revision.mjs','build-dashboard-08.mjs','verify-author-dashboard.mjs','prepare-publication-08.mjs','update-knowledge.ps1'])copy('scripts/'+f,'engineering-source/'+f);
const d=JSON.parse(fs.readFileSync(base+'/design.json'));
write('docs/MASTER-SPEC.md','# Поточний стан · ревізія 08\n\n[Специфікація](design/REVISION-08.md) · [Відомість панелей](design/CUTLIST-08.md) · [Стан кошторису](design/BUDGET-08.md)\n\nАвторський файл є джерелом геометрії. Попередні ревізії зберігаються як історія; вони не є поточними кресленнями. Повний локальний реєстр синхронізовано з ревізією 08.\n');
write('README.md',`# Фотобудка Славутич\n\n[Відкрити дашборд](https://bogdanvcode.github.io/fotobudka-dashboard/)\n\n## Поточна ревізія 08\n\nГеометрія: source/БУДКА.blend. ${d.parts.filter(p=>p.authorGeometry).length} авторських об’єкти перенесені без зміни Dimensions і вершин. ${d.parts.filter(p=>!p.authorGeometry).length} доданих монтажних вузлів позначені окремо.\n\nПереглядач: author-viewer.js; дані: design08.js; інтерфейс: current.js, current.css. Попередні app.js/model.js/design.js залишаються історичними файлами й не завантажуються головною сторінкою.\n\n[Специфікація](docs/design/REVISION-08.md) · [Креслення](drawings/revision-08/index.html) · [PDF](output/pdf/Фотобудка-08-креслення.pdf)\n\nКреслення для узгодження. Присадка, кріплення, сервісні зазори й остаточні товщини ще не випущені у виробництво.\n\nПапка engineering-source містить копії сценаріїв локального інженерного проєкту для аудиту. Це не автономний збірник цього статичного сайту: повний реєстр та інструменти залишаються в робочому проєкті.\n`);
write('DEPLOY-MANIFEST.json',JSON.stringify({revision:8,date:'2026-09-16',sourceSHA256:d.sourceSHA256,authorObjects:62,addedObjects:d.parts.length-62,productionReleased:false,entry:'index.html',geometry:'drawings/revision-08/design.json',drawings:'drawings/revision-08/index.html',pdf:'output/pdf/Фотобудка-08-креслення.pdf'},null,2));
write('docs/VERIFICATION-08.md','# Перевірка 08\n\n- SHA256 оригіналу звірено; вихідний файл не перезаписувався.\n- 62 авторські меші: усі вершини і Dimensions звірено з Blender, допуск порівняння 0,001 мм.\n- Переглядач перевірено в Edge на ширині 1500 і 390 px: режими, ізоляція деталей, чотири розділи, помилки JavaScript і горизонтальне переповнення.\n- PDF: 16 аркушів A3, включно з 13 авторськими панелями; вибрані аркуші відрендерено та оглянуто.\n- Перевірка не є розрахунком міцності, повною перевіркою колізій, фотометрією або підтвердженням обслуговування обладнання.\n');
console.log('Prepared static publication:',destination);
