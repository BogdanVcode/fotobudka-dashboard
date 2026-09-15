window.renderFinance=function(host){
 const budget=window.PROJECT_BUDGET;
 const storeKey='booth-finance-v1';
 const defaults={
  period:'year',workDays:300,
  photo1Price:100,photo1Day:3,photo2Price:200,photo2Day:8,photo3Price:300,photo3Day:4,
  a4Price:3,a4Day:100,
  photoMediaPrice:11626.42,photoMediaYield:1400,
  printerPreset:'brother-oem',a4SupplyPrice:11131,a4SupplyYield:11000,
  drumPrice:14072,drumYield:75000,paperPrice:194.75,paperSheets:500,wastePercent:5,
  taxMode:'group3',incomeTaxPercent:5,militaryPercent:1,esvMonthly:1902.34,
  group2TaxMonthly:1729.4,group2MilitaryMonthly:864.7,acquiringPercent:2,
  rentMonthly:0,utilitiesMonthly:2000,serviceMonthly:3000,salaryMonthly:0,
  capitalMode:'budget',customCapital:300000,capitalReservePercent:15
 };
 const load=()=>{try{return JSON.parse(localStorage.getItem(storeKey))||{};}catch{return{};}};
 let state=Object.assign({},defaults,load());
 const save=()=>localStorage.setItem(storeKey,JSON.stringify(state));
 const val=(key,fallback=0)=>{const n=Number(state[key]);return Number.isFinite(n)&&n>=0?n:fallback;};
 const money=n=>Number.isFinite(n)?n.toLocaleString('uk-UA',{maximumFractionDigits:0})+' грн':'—';
 const unit=n=>Number.isFinite(n)?n.toLocaleString('uk-UA',{minimumFractionDigits:2,maximumFractionDigits:2})+' грн':'—';
 const pct=n=>Number.isFinite(n)?n.toLocaleString('uk-UA',{maximumFractionDigits:1})+'%':'—';
 const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
 const numberField=(key,label,suffix,step='1')=>`<label class="finance-field"><span>${label}</span><span class="finance-input"><input type="number" min="0" step="${step}" data-fin="${key}" value="${esc(state[key])}"><small>${suffix}</small></span></label>`;
 const selectField=(key,label,options)=>`<label class="finance-field"><span>${label}</span><select data-fin="${key}">${options.map(([v,t])=>`<option value="${v}" ${state[key]===v?'selected':''}>${t}</option>`).join('')}</select></label>`;

 function budgetCapital(){
  let saved={};try{saved=JSON.parse(localStorage.getItem('booth-budget-v5'))||{};}catch{}
  const extra=saved.extra||{},choice=saved.choice||{},picked=saved.picked||{};
  let total=0,missing=0;
  for(const row of budget.rows){
   if(picked[row.id]===false)continue;
   const options=[...row.options,...(extra[row.id]||[])];
   const selected=options[Number.isInteger(choice[row.id])?choice[row.id]:0]||options[0];
   if(row.qty==null||selected?.unitPrice==null||selected.unitPrice===''){missing++;continue;}
   total+=Number(row.qty)*Number(selected.unitPrice);
  }
  return {total,missing};
 }

 function calculate(){
  const months=state.period==='year'?12:1;
  const days=val('workDays');
  const photoCount=days*(val('photo1Day')+val('photo2Day')+val('photo3Day'));
  const photoRevenue=days*(val('photo1Day')*val('photo1Price')+val('photo2Day')*val('photo2Price')+val('photo3Day')*val('photo3Price'));
  const a4Count=days*val('a4Day');
  const a4Revenue=a4Count*val('a4Price');
  const revenue=photoRevenue+a4Revenue;
  const waste=1+val('wastePercent')/100;
  const photoUnitCost=(val('photoMediaPrice')/Math.max(1,val('photoMediaYield',1)))*waste;
  const a4UnitCost=(val('a4SupplyPrice')/Math.max(1,val('a4SupplyYield',1))+val('drumPrice')/Math.max(1,val('drumYield',1))+val('paperPrice')/Math.max(1,val('paperSheets',1)))*waste;
  const consumables=photoCount*photoUnitCost+a4Count*a4UnitCost;
  const tax=state.taxMode==='group3'
   ?revenue*(val('incomeTaxPercent')+val('militaryPercent'))/100+val('esvMonthly')*months
   :(val('group2TaxMonthly')+val('group2MilitaryMonthly')+val('esvMonthly'))*months;
  const acquiring=revenue*val('acquiringPercent')/100;
  const fixed=(val('rentMonthly')+val('utilitiesMonthly')+val('serviceMonthly')+val('salaryMonthly'))*months;
  const net=revenue-consumables-tax-acquiring-fixed;
  const annualNet=state.period==='year'?net:net*12;
  const baseCapital=state.capitalMode==='budget'?budgetCapital().total:val('customCapital');
  const capital=baseCapital*(1+val('capitalReservePercent')/100);
  const paybackMonths=annualNet>0?capital/annualNet*12:Infinity;
  const roi=capital>0?annualNet/capital*100:Infinity;
  const variableTax=state.taxMode==='group3'?(val('incomeTaxPercent')+val('militaryPercent'))/100:0;
  const a4Margin=val('a4Price')*(1-variableTax-val('acquiringPercent')/100)-a4UnitCost;
  return {months,days,photoCount,photoRevenue,a4Count,a4Revenue,revenue,photoUnitCost,a4UnitCost,consumables,tax,acquiring,fixed,net,annualNet,capital,paybackMonths,roi,a4Margin};
 }

 host.innerHTML=`<p class="lead">Калькулятор використовує обрані позиції кошторису, але дозволяє замінити кожну ціну, ресурс, тариф, податок і постійну витрату. Значення зберігаються у цьому браузері.</p>
 <div class="finance-toolbar">
  ${selectField('period','Горизонт сценарію',[['month','Один місяць'],['year','Один рік']])}
  ${numberField('workDays','Робочих днів у сценарії','днів')}
  ${selectField('taxMode','Податковий режим',[['group3','ФОП 3 група'],['group2','ФОП 2 група']])}
  <button type="button" class="text-button" id="finance-reset">Скинути до базового сценарію</button>
 </div>
 <div id="finance-results"></div>
 <div class="finance-layout">
  <div>
   <article class="wide finance-section"><h2>Продажі</h2>
    <p class="muted">Для кожної фотопослуги задайте власну ціну та середню кількість продажів на день.</p>
    <div class="finance-pairs">
     ${numberField('photo1Price','Фото · тариф 1','грн','0.01')}${numberField('photo1Day','Продажів тарифу 1','на день','0.1')}
     ${numberField('photo2Price','Фото · тариф 2','грн','0.01')}${numberField('photo2Day','Продажів тарифу 2','на день','0.1')}
     ${numberField('photo3Price','Фото · тариф 3','грн','0.01')}${numberField('photo3Day','Продажів тарифу 3','на день','0.1')}
     ${numberField('a4Price','Друк або копія A4','грн/стор.','0.01')}${numberField('a4Day','Сторінок A4','на день','1')}
    </div>
   </article>
   <article class="wide finance-section"><h2>Витратні матеріали</h2>
    ${selectField('printerPreset','Пресет принтера A4',[['brother-oem','Brother + оригінальний TN3600XXL'],['brother-compatible','Brother + сумісний TN3600XXL'],['epson-m1170','Epson M1170 + Epson 110'],['custom','Власні параметри']])}
    <div class="finance-pairs">
     ${numberField('photoMediaPrice','Комплект DNP RX1HS','грн','0.01')}${numberField('photoMediaYield','Відбитків із комплекту','шт.')}
     ${numberField('a4SupplyPrice','Тонер або чорнило','грн','0.01')}${numberField('a4SupplyYield','Ресурс тонера/чорнила','стор.')}
     ${numberField('drumPrice','Фотобарабан / резерв вузла','грн','0.01')}${numberField('drumYield','Ресурс барабана/вузла','стор.')}
     ${numberField('paperPrice','Пачка паперу A4','грн','0.01')}${numberField('paperSheets','Аркушів у пачці','шт.')}
     ${numberField('wastePercent','Брак і технічний запас','%','0.1')}
    </div>
   </article>
  </div>
  <div>
   <article class="wide finance-section"><h2>Податки й щомісячні витрати</h2>
    <div class="finance-pairs">
     ${numberField('incomeTaxPercent','Єдиний податок групи 3','% виторгу','0.1')}${numberField('militaryPercent','Військовий збір групи 3','% виторгу','0.1')}
     ${numberField('group2TaxMonthly','Єдиний податок групи 2','грн/міс.','0.01')}${numberField('group2MilitaryMonthly','Військовий збір групи 2','грн/міс.','0.01')}
     ${numberField('esvMonthly','ЄСВ','грн/міс.','0.01')}${numberField('acquiringPercent','Еквайринг/термінал','% виторгу','0.1')}
     ${numberField('rentMonthly','Оренда','грн/міс.','0.01')}${numberField('utilitiesMonthly','Електрика та інтернет','грн/міс.','0.01')}
     ${numberField('serviceMonthly','Сервіс, ПЗ та ремонтний резерв','грн/міс.','0.01')}${numberField('salaryMonthly','Зарплата/обслуговування','грн/міс.','0.01')}
    </div>
   </article>
   <article class="wide finance-section"><h2>Вартість і окупність проєкту</h2>
    ${selectField('capitalMode','База інвестиції',[['budget','Поточні обрані позиції кошторису'],['custom','Власна повна сума']])}
    <div class="finance-pairs">
     ${numberField('customCapital','Власна сума проєкту','грн','0.01')}${numberField('capitalReservePercent','Резерв на непрораховане','%','0.1')}
    </div>
    <p id="finance-capital-note" class="muted"></p>
   </article>
  </div>
 </div>
 <article class="wide finance-printer-advice">
  <span class="pill chosen">Рекомендація</span><h2>Brother HL-L5210DN залишити, A4 підняти до 3 грн</h2>
  <p>Заміна самого принтера не обов’язкова. Найбільша різниця виникає від витратника: сумісний TN3600XXL може знизити собівартість сильніше, ніж заміна лазерного принтера. Спочатку працюйте на оригінальному тонері під час приймання та гарантії; сумісний картридж перевіряйте окремою партією на 500–1000 сторінок.</p>
  <div id="printer-comparison"></div>
  <p class="muted">Epson M1170 має нижчу собівартість, але для автономного кіоску додає ризик простою/прочищення сопел. Його варто розглядати лише за стабільного щоденного потоку A4. Pantum BP5100DN дешевший при купівлі, але повна ціна барабана й локальна сервісна підтримка ще не підтверджені.</p>
  <p><a href="https://kartridg.com.ua/kartridzh-tm-es-dlya-brother-tn-3600xxl-chorniy-11000-st" target="_blank" rel="noopener">Сумісний TN3600XXL · 841,51 грн ↗</a> · <a href="https://itshnik.com.ua/01-se413a-ua" target="_blank" rel="noopener">Epson 110 · 778,50 грн ↗</a> · <a href="https://brain.com.ua/ukr/Lazerniy_printer_Pantum_BP5100DN-p1006267.html" target="_blank" rel="noopener">Pantum BP5100DN · 9 555 грн ↗</a></p>
 </article>`;

 function renderResults(){
  const r=calculate(),cap=budgetCapital();
  const horizon=state.period==='year'?'за рік':'за місяць';
  const payback=Number.isFinite(r.paybackMonths)?(r.paybackMonths<24?r.paybackMonths.toLocaleString('uk-UA',{maximumFractionDigits:1})+' міс.':(r.paybackMonths/12).toLocaleString('uk-UA',{maximumFractionDigits:1})+' року'):'Не окупається';
  const paybackDate=Number.isFinite(r.paybackMonths)?new Intl.DateTimeFormat('uk-UA',{month:'long',year:'numeric'}).format(new Date(new Date().setMonth(new Date().getMonth()+Math.ceil(r.paybackMonths)))):'';
  host.querySelector('#finance-results').innerHTML=`<div class="cards four finance-summary">
   <article><span class="eyebrow">ЧИСТИЙ РЕЗУЛЬТАТ ${horizon.toUpperCase()}</span><h2>${money(r.net)}</h2><p>Після матеріалів, податків, еквайрингу й указаних постійних витрат.</p></article>
   <article><span class="eyebrow">РІЧНИЙ РЕЗУЛЬТАТ</span><h2>${money(r.annualNet)}</h2><p>Для порівняння сценаріїв та окупності.</p></article>
   <article><span class="eyebrow">ОКУПНІСТЬ</span><h2>${payback}</h2><p>${paybackDate?'Орієнтовний місяць окупності: '+paybackDate:'Змініть збитковий сценарій.'}</p></article>
   <article><span class="eyebrow">ROI ЗА РІК</span><h2>${pct(r.roi)}</h2><p>Річний результат / інвестиція ${money(r.capital)}.</p></article>
  </div>
  <article class="wide"><h2>Структура сценарію</h2><div class="finance-breakdown">
   <div><span>Виторг</span><b>${money(r.revenue)}</b><small>Фото ${money(r.photoRevenue)} · A4 ${money(r.a4Revenue)}</small></div>
   <div><span>Витратні матеріали</span><b>−${money(r.consumables)}</b><small>Фото ${unit(r.photoUnitCost)}/відбиток · A4 ${unit(r.a4UnitCost)}/стор.</small></div>
   <div><span>Податки та ЄСВ</span><b>−${money(r.tax)}</b><small>${state.taxMode==='group3'?'Відсоток із виторгу + ЄСВ':'Фіксовані платежі + ЄСВ'}</small></div>
   <div><span>Еквайринг</span><b>−${money(r.acquiring)}</b><small>${pct(val('acquiringPercent'))} виторгу</small></div>
   <div><span>Постійні витрати</span><b>−${money(r.fixed)}</b><small>Оренда, комунальні, сервіс, зарплата</small></div>
  </div></article>
  ${r.net<0?'<div class="callout">Сценарій збитковий: окупність не розраховується.</div>':''}`;
  host.querySelector('#finance-capital-note').textContent=state.capitalMode==='budget'
   ?`Відомі обрані позиції: ${money(cap.total)}; без ціни: ${cap.missing}. Для окупності застосовано резерв ${val('capitalReservePercent')}%.`
   :`Використано власну суму ${money(val('customCapital'))} та резерв ${val('capitalReservePercent')}%.`;
  const waste=1+val('wastePercent')/100,paper=val('paperPrice')/Math.max(1,val('paperSheets',1));
  const original=(11131/11000+14072/75000+paper)*waste;
  const compatible=(841.51/11000+14072/75000+paper)*waste;
  const epson=(778.5/6000+paper)*waste;
  const variableTax=state.taxMode==='group3'?(val('incomeTaxPercent')+val('militaryPercent'))/100:0;
  const fee=val('acquiringPercent')/100,price=val('a4Price');
  const margin=cost=>price*(1-variableTax-fee)-cost;
  host.querySelector('#printer-comparison').innerHTML=`<div class="finance-table"><div class="finance-table-head"><span>Варіант</span><span>Матеріали A4</span><span>Маржа при ${unit(price)}</span></div>
   <div><span>Brother + оригінальний TN3600XXL</span><b>${unit(original)}</b><b>${unit(margin(original))}</b></div>
   <div><span>Brother + сумісний TN3600XXL</span><b>${unit(compatible)}</b><b>${unit(margin(compatible))}</b></div>
   <div><span>Epson M1170 + Epson 110</span><b>${unit(epson)}</b><b>${unit(margin(epson))}</b></div></div>`;
 }

 function applyPreset(preset){
  if(preset==='brother-oem')Object.assign(state,{a4SupplyPrice:11131,a4SupplyYield:11000,drumPrice:14072,drumYield:75000});
  if(preset==='brother-compatible')Object.assign(state,{a4SupplyPrice:841.51,a4SupplyYield:11000,drumPrice:14072,drumYield:75000});
  if(preset==='epson-m1170')Object.assign(state,{a4SupplyPrice:778.5,a4SupplyYield:6000,drumPrice:0,drumYield:1});
 }
 function syncInputs(){for(const el of host.querySelectorAll('[data-fin]'))el.value=state[el.dataset.fin];}
 host.addEventListener('input',e=>{
  const el=e.target.closest('[data-fin]');if(!el||el.tagName==='SELECT')return;
  state[el.dataset.fin]=el.value;save();renderResults();
 });
 host.addEventListener('change',e=>{
  const el=e.target.closest('[data-fin]');if(!el)return;
  state[el.dataset.fin]=el.value;
  if(el.dataset.fin==='period'){state.workDays=el.value==='year'?300:30;syncInputs();}
  if(el.dataset.fin==='printerPreset'&&el.value!=='custom'){applyPreset(el.value);syncInputs();}
  save();renderResults();
 });
 host.querySelector('#finance-reset').onclick=()=>{state={...defaults};save();syncInputs();renderResults();};
 window.addEventListener('booth-budget-changed',renderResults);
 renderResults();
};
