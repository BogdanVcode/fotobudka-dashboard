import fs from 'node:fs';
const dir=fs.existsSync('dashboard/index.html')&&!fs.existsSync('index.html')?'dashboard/':'';
const data=JSON.parse(fs.readFileSync('docs/budget/current.json','utf8'));
const ids=new Set();
for(const row of data.rows){if(ids.has(row.id))throw Error('Duplicate '+row.id);ids.add(row.id);if(row.amount!==null&&(!Number.isFinite(row.amount)||row.amount<0))throw Error('Invalid price '+row.id);}
data.categories=[...new Set(data.rows.map(r=>r.category))].map(name=>({name,rows:data.rows.filter(r=>r.category===name)}));
data.remainingKnown=data.rows.filter(r=>r.paymentStatus==='PLANNED').reduce((s,r)=>s+(r.amount||0),0);
data.subtotal=data.spent+data.remainingKnown;data.reserve=data.remainingKnown*.1;data.fullTotal=data.subtotal+data.reserve;
fs.writeFileSync(dir+'budget10.js','window.BUDGET10='+JSON.stringify(data)+';\n');
console.log('Budget built from docs/budget/current.json:',data.rows.length,'rows');
