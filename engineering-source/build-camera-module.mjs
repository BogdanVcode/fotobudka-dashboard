import fs from 'node:fs';
const base='dashboard/camera-module/';
let report=fs.readFileSync('docs/camera-module/review-fragment.html','utf8').replace('Зниження напруги від регенерації','Підвищення напруги від регенерації');
fs.writeFileSync('docs/camera-module/review-fragment.html',report);
const vendor='https://cncprom.ua/ua/';
const rows=[
 ['TBD45-700, хід 700 мм',1,4939,'Ціна магазину; готовий до відправки',vendor+'p1089226920-linejnyj-modul-tbd45.html','verified'],
 ['57BYG250C-8, 3 А',1,943,'Ціна магазину; готовий до відправки',vendor+'p1312688446-dvigatel-shagovyj-57byg250c.html','verified'],
 ['LJZ8-DS45-57',1,314,'Ціна магазину; посадку муфти уточнити',vendor+'p1470346846-kronshtejn-shagovogo-dvigatelya.html','verified'],
 ['Муфта 8×12, D25 L30',1,382,'Ціна магазину; готова до відправки',vendor+'p914622727-gibkaya-silfonnaya-mufta.html','verified'],
 ['S-250-36, 36 В / 250 Вт',1,1347,'Ціна каталогу; готовий до відправки',vendor+'g117125721-impulsnye-bloki-pitaniya','verified'],
 ['DM542E V3 або узгоджений аналог',1,2300,'Плановий резерв, не пропозиція продавця; DM542 за 1796 грн відсутній',vendor+'p1398812654-drajver-leadshine-dm542.html','estimate'],
 ['HOME TL-Q5MC1-Z',1,439,'Ціна з ТЗ, актуальність не підтверджена','https://www.ia.omron.com/products/family/462/','brief'],
 ['Raspberry Pi Pico / RP2040',1,350,'Плановий резерв, артикул не обраний','','estimate'],
 ['DC/DC 36→12 В, вхід до 60 В',1,400,'Плановий резерв','','estimate'],
 ['Буфери STEP/DIR, опторозв’язка HOME, плата',1,350,'Плановий резерв на комплект','','estimate'],
 ['Кабелеукладач 20×30, R≥60, 1 м з кінцями',1,800,'Плановий резерв; точний артикул не обраний',vendor+'g1372753-gibkij-kabel-kanal','estimate'],
 ['L-кронштейн, перехідна пластина, затискачі Canon',1,1000,'Плановий резерв на виготовлення','','estimate'],
 ['Опорні профілі, поперечини, кріплення',1,1500,'Плановий резерв; остаточний розкрій не затверджений','','estimate'],
 ['Динамічні кабелі USB та живлення Canon',1,1000,'Плановий резерв, довжини після компонування','','estimate'],
 ['Дроти, клеми, запобіжники, корпус електроніки',1,1500,'Плановий резерв','','estimate'],
 ['E-STOP, кінцевий захист, апаратний watchdog',1,1500,'Плановий резерв; схема залежить від утримання','','estimate'],
 ['Механічне утримання / страхування каретки',1,6000,'Умовний резерв, рішення та комерційна ціна невідомі','','estimate']
].map(([name,qty,price,status,url,kind])=>({name,qty,price,status,url,kind}));
fs.writeFileSync(base+'bom.json',JSON.stringify({date:'2026-09-20',currency:'UAH',rows},null,2));
const num=n=>n.toLocaleString('uk-UA');
const known=rows.filter(r=>r.kind==='verified').reduce((a,r)=>a+r.qty*r.price,0),total=rows.reduce((a,r)=>a+r.qty*r.price,0);
const table='<div class="notice">Підтверджені ціни п’яти позицій: <strong>'+num(known)+' грн</strong>. Разом із непідтвердженими цінами й плановими резервами: <strong>'+num(total)+' грн</strong>; із запасом 10%: <strong>'+num(Math.ceil(total*1.1))+' грн</strong>. Це орієнтир, не остаточна ціна готової осі; доставка, робота та випробування не включені.</div><div class="scroll"><table><thead><tr><th>Компонент / комплект</th><th>Кількість</th><th>Сума, грн</th><th>Статус ціни</th></tr></thead><tbody>'+rows.map(r=>'<tr><td>'+(r.url?'<a href="'+r.url+'" target="_blank" rel="noopener">'+r.name+'</a>':r.name)+'</td><td>'+r.qty+'</td><td>'+num(r.qty*r.price)+'</td><td>'+r.status+'</td></tr>').join('')+'</tbody></table></div>';
report=report.replace('<div id="module-bom"></div>',table);
fs.writeFileSync(base+'engineering.js','document.getElementById("engineering").innerHTML='+JSON.stringify(report)+';\n');
fs.writeFileSync(base+'review.html','<!doctype html><html lang="uk"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Інженерний огляд модуля Canon R50</title><link rel="stylesheet" href="module.css"><main><a href="index.html">← Інтерактивна 3D-модель</a><h1>Canon R50 · вертикальний модуль 700 мм</h1><p>20.09.2026 · версія для узгодження · друк через Ctrl+P</p>'+report+'</main></html>');
let model=fs.readFileSync(base+'model.js','utf8');
model=model.replace('let cable;','let cable;const cableMaterial=new T.LineBasicMaterial({color:0x228479});').replace('new T.LineBasicMaterial({color:0x228479}));scene.add(cable);','cableMaterial);scene.add(cable);');
fs.writeFileSync(base+'model.js',model);
let index=fs.readFileSync(base+'index.html','utf8').replace('Натисніть деталь,','Двічі натисніть деталь,');
if(!index.includes('href="review.html"'))index=index.replace('<div id="engineering">','<p><a href="review.html">Відкрити інженерний огляд для друку</a> · <a href="bom.json" download>Завантажити кошик JSON</a></p><div id="engineering">');
fs.writeFileSync(base+'index.html',index);
console.log(JSON.stringify({verified:known,planning:total,withReserve:Math.ceil(total*1.1)}));
