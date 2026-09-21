const d=AUTHOR_DESIGN,esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;'),mm=n=>n===null?'Очікуємо ціну':n.toLocaleString('uk-UA',{maximumFractionDigits:2}),viewer=createAuthorViewer(document.getElementById('viewport'));let selected=null;
const select=document.getElementById('part-select');for(const p of d.parts)select.insertAdjacentHTML('beforeend',`<option value="${p.id}">${p.id} · ${esc(p.name)}</option>`);
window.showAuthorPart=id=>{const p=d.parts.find(p=>p.id===id);if(!p)return;selected=id;select.value=id;document.getElementById('part-info').innerHTML=`<p><span class="pill">${p.authorGeometry?'ВАША ДЕТАЛЬ':'ДОДАНО'}</span></p><h3>${esc(p.name)}</h3><strong>Розміри X / Y / Z</strong><p>${p.dimensionsMm.map(mm).join(' × ')} мм</p><strong>Положення нижнього світового кута</strong><p>${p.positionMm.map(mm).join(' / ')} мм</p><p>${esc(p.status)}</p>${p.fabrication?`<a href="drawings/revision-10/01-all-dsp.svg" target="_blank">Аркуш деталі →</a>`:''}`;};select.onchange=()=>showAuthorPart(select.value);document.getElementById('isolate').onclick=()=>selected&&viewer.isolate(selected);document.getElementById('explode').oninput=e=>viewer.explode(+e.target.value);
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{viewer.setView(b.dataset.view);document.querySelectorAll('[data-view]').forEach(x=>x.classList.toggle('active',x===b));});
function page(){let id=location.hash.slice(1)||'model';if(['references','presentation'].includes(id))id='model';if(id==='equipment')id='budget';if(!['model','drawings','equipment','decisions','budget','profit'].includes(id))id='model';document.querySelectorAll('section').forEach(s=>s.classList.toggle('active',s.id===id));document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+id));if(id==='model')viewer.render();requestAnimationFrame(()=>window.scrollTo(0,0));}addEventListener('hashchange',page);page();
document.getElementById('panel-list').innerHTML='<table><tr><th>Деталь</th><th>Назва у Blender</th><th>Розміри, мм</th><th>Креслення</th></tr>'+d.parts.filter(p=>p.fabrication).map(p=>`<tr><td>${p.id}</td><td>${esc(p.name)}</td><td>${p.dimensionsMm.map(mm).join(' × ')}</td><td><a href="drawings/revision-10/01-all-dsp.svg" target="_blank">Відкрити</a></td></tr>`).join('')+'</table>';
const issues=[['Модуль камери: запит CNCPROM надіслано','TBD45-700, DM556, Arduino Nano, один механічний HOME. Очікуємо сумісність, кріплення, підготовку БЖ та відповідь про опускання каретки без струму. Окрема 3D-модель оновлена; інтеграція в авторську кабінку ще не виконана.'],['Вхід 600 мм','Актуальний виріз у ДСП перед: 600 мм між X = −436 та +164 мм. Рифлений лист автора: 600×1000 мм. Нові назви та геометрія перенесені з файла о 13:44.'],['Сканер у верхньому вирізі','Brother DS-740D встановлено за верхнім вирізом передньої ДСП, над кишенею. Потрібно перевірити на реальному сканері напрям подачі та виходу A4: автоматичне падіння документа в кишеню ще не підтверджене.'],['Авторські розміри','73 об’єкти перенесено з оновленого файла без зміни Розміри. Камера, ліфт і термінал у вихідному файлі мають умовні габарити; перевірити розміри реального обладнання перед монтажем.'],['ДСП і передній вузол','Дверцята: 16 мм. Похила консоль: габарит 15,86 мм. Передня деталь має кишені й глибину 200,58 мм — це не товщина плити.'],['Принтери й видача','Куплено Citizen CY-02. Геометрія попереднього фотопринтера ще не оновлена; посадку Citizen на авторській полиці необхідно перевірити. Потрібно опрацювати лотки від їхніх виходів до авторських кишень: A4 зліва, фото по центру.'],['Проводка','Показано маршрути камери, термінала, сканера, принтерів і живлення, додано муфту. Роз’єми, інтерфейс Nayax, довжини та рухому ділянку кабелю перевіряє автор електроніки.']];document.getElementById('issues').innerHTML=issues.map(([t,s])=>'<article class="issue"><h3>'+t+'</h3><p>'+s+'</p></article>').join('');


const b=BUDGET10;
const purchased=b.rows.filter(r=>r.purchase);
const priorityKey='fotobudka-buy-now-v1';
let priority={};
try{const saved=JSON.parse(localStorage.getItem(priorityKey)||'{}');if(saved && typeof saved==='object' && !Array.isArray(saved))priority=saved;}catch{}
const buyNow=r=>!r.purchase&&!r.owned&&(typeof priority[r.id]==='boolean'?priority[r.id]:r.buyNowDefault!==false);
const remainingWithReserve=Math.round((b.remainingKnown+b.reserve)*100)/100;
const purchaseDetail=r=>r.purchase?'<p>'+esc(r.purchase.order.store)+'</p><p class="budget-meta">Замовлення №'+esc(r.purchase.orderId)+' · '+esc(r.purchase.order.documentStatus)+'</p><span>Оригінал підтвердження збережено локально</span>':'';
function budgetCard(r){
  const status=r.purchase?'bought':r.owned?'owned':!buyNow(r)?'deferred':r.amount===null?'unpriced':'planned';
  const label=r.purchase?'✓ Куплено':r.owned?'✓ Уже є':!buyNow(r)?'Пізніше':r.amount===null?'? Ціну уточнюємо':'○ Купуємо зараз';
  return '<article class="budget-row budget-'+status+'"><span class="budget-status">'+label+'</span><h4>'+esc(r.name)+'</h4>'+
    (r.owned?'<p class="budget-price">Купувати не потрібно</p>':r.amount===null?'<p class="budget-price">Ціна ще невідома</p>':'<p class="budget-price">'+mm(r.amount)+' грн</p>')+
    '<p class="budget-meta">'+mm(r.qty)+' '+esc(r.unit)+(r.amount!==null?' × '+mm(r.unitPrice)+' грн':'')+'</p>'+purchaseDetail(r)+
    '<p class="budget-meta">'+esc(r.kind)+' · '+esc(r.date)+(r.range?' · діапазон за одиницю: '+r.range.map(mm).join('–')+' грн':'')+'</p><p>'+esc(r.note)+'</p>'+
    (!r.purchase&&!r.owned?'<label class="budget-priority"><input type="checkbox" data-buy-now="'+esc(r.id)+'" '+(buyNow(r)?'checked':'')+'> Купуємо зараз</label>':'')+
    (r.url?'<a href="'+r.url+'" target="_blank" rel="noopener">Джерело / орієнтир ціни →</a>':'')+'</article>';
}
document.getElementById('budget-summary').innerHTML=
  '<article class="budget-kpi budget-required"><h3>Обов’язково до покупки</h3><h2 id="required-total" aria-live="polite"></h2><p id="required-detail"></p><p>Зніми галочку «Купуємо зараз» біля того, що відкладаємо. Куплене та наявне не входить у цю суму. Резерв 10% тут не додається.</p><p id="priority-save-note">Вибір зберігається лише в цьому браузері.</p></article><div class="budget-kpis"><article class="budget-kpi budget-bought"><span class="budget-status">✓ Вже куплено</span><h2>'+mm(b.spent)+' грн</h2><p>'+purchased.length+' товарів · '+b.purchases.orders.length+' замовлень</p><p>Фактичні витрати за твоїм підтвердженням. Доставка в ці суми не входить.</p></article>'+
  '<article class="budget-kpi budget-planned"><span class="budget-status">○ Усі майбутні покупки — оцінка</span><h2>'+mm(remainingWithReserve)+' грн</h2><p>Позиції з відомою ціною: '+mm(b.remainingKnown)+' грн<br>Резерв '+b.reservePercent+'%: '+mm(b.reserve)+' грн</p><p><strong>Додатково '+b.unpriced+' позицій без ціни.</strong> Вони не включені в суму; остаточний залишок буде більшим.</p></article></div>'+
  '<p class="budget-total">Загальний оцінений бюджет: <strong>'+mm(b.fullTotal)+' грн</strong> — куплене + заплановане з резервом. <a href="#profit">Розрахувати окупність →</a></p>'+
  '<details class="budget-group purchase-summary"><summary>Загальний чек — уже куплене <strong>'+mm(b.spent)+' грн</strong></summary><div class="budget-group-content">'+purchased.map(budgetCard).join('')+'</div><p class="receipt-note">Реєстр витрат, не фіскальний чек. Скріншоти зберігають статус замовлення на момент знімка; оригінали доступні лише локально.</p></details>';
document.getElementById('budget-categories').innerHTML=b.categories.map(c=>{
  const spent=c.rows.filter(r=>r.purchase).reduce((s,r)=>s+r.amount,0);
  const unknown=c.rows.filter(r=>r.amount===null).length;
  return '<details class="budget-group"><summary><span>'+esc(c.name)+'</span><strong>'+mm(c.amount)+' грн</strong><small>'+c.rows.length+' позицій · Куплено: '+mm(spent)+' грн · Ще придбати: '+mm(Math.round((c.amount-spent)*100)/100)+' грн'+(unknown?' · Без ціни: '+unknown:'')+'</small></summary><div class="budget-group-content">'+c.rows.map(budgetCard).join('')+'</div></details>';
}).join('')+'<h3>Як читати кошторис</h3><ul>'+b.notes.map(n=>'<li>'+esc(n)+'</li>').join('')+'</ul>';
function refreshPriority(){
 const selected=b.rows.filter(buyNow),unknown=selected.filter(r=>r.amount===null).length;
 const total=selected.reduce((s,r)=>s+Math.round((r.amount||0)*100),0)/100;
 document.getElementById('required-total').textContent=mm(total)+' грн';
 document.getElementById('required-detail').textContent=selected.length+' позицій вибрано.'+(unknown?' Ще '+unknown+' без ціни — вони не включені в суму.':'')+' Відкладено: '+b.rows.filter(r=>!r.purchase&&!r.owned&&!buyNow(r)).length+' позицій.';
 document.querySelectorAll('[data-buy-now]').forEach(input=>{
  const row=b.rows.find(r=>r.id===input.dataset.buyNow),card=input.closest('article');
  input.checked=buyNow(row);
  card.classList.toggle('budget-deferred',!input.checked);
  card.classList.toggle('budget-planned',input.checked&&row.amount!==null);
  card.classList.toggle('budget-unpriced',input.checked&&row.amount===null);
  card.querySelector('.budget-status').textContent=!input.checked?'Пізніше':row.amount===null?'? Ціну уточнюємо':'○ Купуємо зараз';
 });
}
document.getElementById('budget-categories').addEventListener('change',event=>{
 const input=event.target;if(!input.matches('[data-buy-now]'))return;
 priority[input.dataset.buyNow]=input.checked;
 try{localStorage.setItem(priorityKey,JSON.stringify(priority));}catch{document.getElementById('priority-save-note').textContent='Браузер не дозволив збереження. Вибір діє до закриття сторінки.';}
 refreshPriority();
});
refreshPriority();
window.dashboardReady=true;
