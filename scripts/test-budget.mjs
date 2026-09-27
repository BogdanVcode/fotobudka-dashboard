import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const base=fs.existsSync('index.html')?'':'dashboard/';
const data=JSON.parse(fs.readFileSync('docs/budget/current.json','utf8'));
const ledger=JSON.parse(fs.readFileSync('docs/purchases/2026-09-25.json','utf8'));
const elements=new Map();const element=id=>{if(!elements.has(id))elements.set(id,{innerHTML:'',value:'',focus(){}});return elements.get(id)};
const document={getElementById:element,querySelectorAll:()=>[]};
function boot(saved={}){const ctx={window:{BUDGET10:data},document,localStorage:{getItem:()=>JSON.stringify(saved),setItem(){}},console};vm.runInNewContext(fs.readFileSync(base+'budget-view.js','utf8'),ctx);return ctx.window.prototypeBudget;}
const expected=ledger.orders.filter(o=>o.paymentStatus==='PAID').reduce((sum,o)=>sum+o.goodsSubtotal+(o.shipping||0)+(o.fees||0),0);
const api=boot(),t=api.totals();assert.ok(Math.abs(t.spent-expected)<.01);assert.ok(Math.abs(t.spent-106932.34)<.01);assert.ok(Math.abs(t.shipping-1248.67)<.01);assert.ok(Math.abs(t.waiting-57543.65)<.01);
const deferred=boot({hidden:{'01':true},buyNow:{dsp:false}}).totals();assert.equal(deferred.spent,t.spent);assert.ok(Math.abs(t.need-deferred.need-18963.78)<.01);
const received=boot({orderOverrides:{'22899':{deliveryStatus:'RECEIVED'}}}).totals();assert.equal(received.spent,t.spent);assert.ok(Math.abs(t.waiting-received.waiting-55775)<.01);
assert.equal(new Set(data.rows.map(r=>r.id)).size,data.rows.length);assert.equal(data.rows.some(r=>r.paymentStatus==='PLANNED'&&r.category==='Інструменти'),false);
assert.equal(data.rows.find(r=>r.id==='48').unitPrice,null);assert.equal(data.rows.some(r=>r.id==='p2-assembly-25'),false);
const html=fs.readFileSync(base+'index.html','utf8');for(const match of html.matchAll(/(?:src|href)="([^"#?]+)(?:\?[^"#]*)?(?:#[^"]*)?"/g)){const url=match[1];if(/^(https?:|mailto:)/.test(url))continue;assert.ok(fs.existsSync(base+url),'Missing asset: '+url);}
console.log('PASS: ledger, statuses, deferred totals, no double shipping, tools excluded, assets.');console.log(JSON.stringify(t,null,2));
