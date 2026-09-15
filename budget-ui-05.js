window.renderBudget=function(host){
 const data=PROJECT_BUDGET;
 const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
 const money=n=>n===null||n===''||Number.isNaN(+n)?'Ціни ще немає':(+n).toLocaleString('uk-UA',{maximumFractionDigits:2})+' грн';
 const storeKey='booth-budget-v5';
 const load=()=>{try{return JSON.parse(localStorage.getItem(storeKey))||{};}catch{return{};}};
 const save=s=>localStorage.setItem(storeKey,JSON.stringify(s));
 const store=Object.assign({choice:{},extra:{},picked:{},bought:{}},load());
 const optionsOf=r=>[...r.options,...(store.extra[r.id]||[])];
 const choice=new Map(data.rows.map(r=>{
  const n=optionsOf(r).length;
  const saved=store.choice[r.id];
  return [r.id,saved>=0&&saved<n?saved:0];
 }));
 const picked=id=>store.picked[id]!==false;
 const bought=id=>!!store.bought[id];
 const persist=()=>{store.choice=Object.fromEntries(choice);save(store);window.dispatchEvent(new CustomEvent('booth-budget-changed'));};
 const lineTotal=r=>{
  const o=optionsOf(r)[choice.get(r.id)];
  if(!o||r.qty===null||o.unitPrice===null||o.unitPrice==='')return null;
  return r.qty*(+o.unitPrice);
 };

 host.innerHTML=`<p class="lead">Ревізія ${String(data.version).padStart(2,'0')}. Фото й посилання з магазину. Картка <b>обрана</b> входить у суму закупівлі; <b>куплена</b> — уже оплачена. ПЗ кіоска пишемо самі в Cursor / Codex, окремої позиції «бот 8000 грн» немає.</p>
 <div class="cards three" id="budget-summary">
  <article><h2 id="budget-total"></h2><p>Сума обраних (ще не куплених).</p></article>
  <article><h2 id="budget-bought"></h2><p>Уже позначено як куплені.</p></article>
  <article><h2 id="budget-missing"></h2><p>Без ціни, пропущені або з кількістю «уточнити».</p></article>
 </div>
 <article class="wide"><h3>Де купувати</h3>
  <p><b>Славутич:</b> <a href="https://www.sniezka.ua/dje-kupiti/vena" target="_blank" rel="noopener">Вена, площа Привокзальна, 7</a> — плита, порізка не підтверджені.</p>
  <p><b>Чернігів:</b> Епіцентр (Новоселівка, Шевченка 57) — труба 20×20, ДСП; <a href="https://meblyar.ua/ua/raskroy/services/services" target="_blank" rel="noopener">Мебляр</a> — порізка 18 грн/м.</p>
 </article>
 <div class="budget-filters">
  <input id="budget-search" type="search" placeholder="Знайти деталь, магазин, артикул…">
  <select id="budget-category" aria-label="Категорія">
   <option value="all">Усі категорії</option>
   ${(data.categories||[]).map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join('')}
  </select>
  <select id="budget-sort" aria-label="Сортування ціни">
   <option value="price-desc">Ціна: від дорого до дешевого</option>
   <option value="price-asc">Ціна: від дешевого до дорогого</option>
   <option value="category">За категоріями</option>
  </select>
  <select id="budget-pick" aria-label="Обрані"><option value="all">Усі позиції</option><option value="on">Лише обрані</option><option value="off">Лише не обрані</option></select>
  <select id="budget-buy" aria-label="Куплені"><option value="all">Усі за статусом купівлі</option><option value="bought">Куплені</option><option value="open">Не куплені</option></select>
  <label><input type="checkbox" id="budget-unpriced"> Без ціни</label>
 </div>
 <p id="budget-count" class="muted"></p>
 <div id="budget-rows" class="budget-grid"></div>`;

 function totals(){
  let need=0,done=0,gap=0;
  for(const r of data.rows){
   const t=lineTotal(r);
   if(t===null){if(picked(r.id)&&!bought(r.id))gap++;continue;}
   if(bought(r.id))done+=t;
   else if(picked(r.id))need+=t;
   else gap++;
  }
  host.querySelector('#budget-total').textContent=money(need);
  host.querySelector('#budget-bought').textContent=money(done);
  host.querySelector('#budget-missing').textContent=gap+' відкритих';
 }

 function media(r){
  const o=optionsOf(r)[choice.get(r.id)]||{};
  const src=o.photo||r.drawing||'';
  const img=src?`<img class="cost-photo" src="${esc(src)}" alt="${esc(o.name||r.name)}" onerror="this.onerror=null;this.src='${esc(r.drawing||'')}'">`:'';
  const link=o.url?`<a class="shop-link" href="${esc(o.url)}" target="_blank" rel="noopener">Товар у магазині →</a>`:`<span class="muted">Немає посилання</span>`;
  return `<div class="cost-media">${img}<small class="media-kind">${o.photo?'Фото зі сторінки товару':'Технічний ескіз — фото продавця не підтверджене'}</small>${link}</div>`;
 }

 function optionCard(r,o,i){
  const on=choice.get(r.id)===i;
  const shop=o.url?`<a href="${esc(o.url)}" target="_blank" rel="noopener">Посилання</a>`:'';
  const remove=o.custom?` <button type="button" class="text-button" data-drop="${esc(r.id)}" data-drop-i="${i}">Прибрати</button>`:'';
  return `<label class="cost-option${on?' is-on':''}"><input type="radio" data-cost="${esc(r.id)}" name="cost-${esc(r.id)}" value="${i}" ${on?'checked':''}> <span>${esc(o.name)}</span>
   <b>${money(o.unitPrice==null||o.unitPrice===''?null:+o.unitPrice)}</b>
   ${shop}${remove}</label>`;
 }

 function render(){
  const q=(host.querySelector('#budget-search').value||'').toLowerCase();
  const category=host.querySelector('#budget-category').value;
  const sort=host.querySelector('#budget-sort').value;
  const pick=host.querySelector('#budget-pick').value;
  const buy=host.querySelector('#budget-buy').value;
  const onlyOpen=host.querySelector('#budget-unpriced').checked;
  const shown=data.rows.filter(r=>{
   const o=optionsOf(r)[choice.get(r.id)];
   const t=lineTotal(r);
   const hit=JSON.stringify({...r,options:optionsOf(r)}).toLowerCase().includes(q);
   if(!hit)return false;
   if(category!=='all'&&r.category!==category)return false;
   if(pick==='on'&&!picked(r.id))return false;
   if(pick==='off'&&picked(r.id))return false;
   if(buy==='bought'&&!bought(r.id))return false;
   if(buy==='open'&&bought(r.id))return false;
   if(onlyOpen&&t!==null)return false;
   return true;
  }).sort((a,b)=>{
   const ap=lineTotal(a),bp=lineTotal(b);
   if(sort==='category'){
    const ai=(data.categories||[]).indexOf(a.category),bi=(data.categories||[]).indexOf(b.category);
    return ai-bi||(bp??-Infinity)-(ap??-Infinity);
   }
   if(ap===null)return 1;
   if(bp===null)return -1;
   return sort==='price-asc'?ap-bp:bp-ap;
  });
  host.querySelector('#budget-count').textContent=`Показано ${shown.length} із ${data.rows.length}`;
  host.querySelector('#budget-rows').innerHTML=shown.map(r=>{
   const t=lineTotal(r);
   const on=picked(r.id), got=bought(r.id);
   const klass=['cost-card',on?'is-picked':'is-skipped',got?'is-bought':'is-open'].join(' ');
   return `<article class="${klass}" data-row="${esc(r.id)}">
    <div class="cost-flags">
     <span class="pill category">${esc(r.category)}</span>
     <span class="pill ${on?'chosen':'pending'}">${on?'Обрано':'Не обрано'}</span>
     <span class="pill ${got?'chosen':'pending'}">${got?'Куплено':'Не куплено'}</span>
    </div>
    ${media(r)}
    <h3>${esc(r.id)}. ${esc(r.name)}</h3>
    <p class="cost-meta"><b>${r.qty??'?'} ${esc(r.unit)}</b> · ${esc(r.vendor||'')}${t!==null?' · '+money(t):''}</p>
    <p class="muted">${esc(r.note)}</p>
    <div class="cost-options">${optionsOf(r).map((o,i)=>optionCard(r,o,i)).join('')}</div>
    <div class="cost-actions">
     <label><input type="checkbox" data-pick="${esc(r.id)}" ${on?'checked':''}> Обрати до закупівлі</label>
     <label><input type="checkbox" data-bought="${esc(r.id)}" ${got?'checked':''}> Куплено</label>
    </div>
    <details class="replace-box"><summary>Замінити іншим товаром</summary>
     <label>Назва <input data-f="name" placeholder="Як у магазині"></label>
     <label>Ціна, грн <input data-f="price" type="number" min="0" step="0.01"></label>
     <label>Посилання <input data-f="url" type="url" placeholder="https://"></label>
     <label>Фото (URL) <input data-f="photo" type="url"></label>
     <button type="button" class="primary" data-add="${esc(r.id)}">Додати і вибрати</button>
    </details>
   </article>`;
  }).join('');
 }

 host.addEventListener('change',e=>{
  if(e.target.dataset.cost){
   choice.set(e.target.dataset.cost,+e.target.value);
   persist();totals();render();
  }
  if(e.target.dataset.pick){
   store.picked[e.target.dataset.pick]=e.target.checked;
   persist();totals();render();
  }
  if(e.target.dataset.bought){
   store.bought[e.target.dataset.bought]=e.target.checked;
   persist();totals();render();
  }
  if(['budget-category','budget-sort','budget-pick','budget-buy','budget-unpriced'].includes(e.target.id))render();
 });
 host.querySelector('#budget-search').oninput=render;
 host.addEventListener('click',e=>{
  const add=e.target.closest('[data-add]');
  if(add){
   const id=add.dataset.add;
   const box=add.closest('.replace-box');
   const val=f=>box.querySelector(`[data-f="${f}"]`)?.value.trim()||'';
   const unitPrice=val('price')===''?null:+val('price');
   const url=val('url')||null;
   if(!url&&unitPrice===null){add.textContent='Потрібні посилання або ціна';return;}
   store.extra[id]=store.extra[id]||[];
   store.extra[id].push({name:val('name')||'Заміна з магазину',unitPrice,url,photo:val('photo')||null,city:'Заміна',availability:'Додано в цьому браузері',custom:true,kind:'Заміна користувача',date:new Date().toISOString().slice(0,10)});
   store.picked[id]=true;
   choice.set(id,optionsOf(data.rows.find(r=>r.id===id)).length-1);
   persist();totals();render();
   return;
  }
  const drop=e.target.closest('[data-drop]');
  if(drop){
   const id=drop.dataset.drop,i=+drop.dataset.dropI;
   const extraI=i-data.rows.find(r=>r.id===id).options.length;
   if(extraI>=0)store.extra[id].splice(extraI,1);
   choice.set(id,0);persist();totals();render();
  }
 });
 render();
 totals();
};
