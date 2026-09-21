(() => {
  const data = JSON.parse(document.getElementById('shopping-data').textContent);
  const key = 'fotobudka-assembly-choices-v1';
  const valid = ['buy', 'borrow', 'skip', 'later'];
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch {}
  const selected = Object.fromEntries(data.items.map(r => [r.id, valid.includes(saved[r.id]) ? saved[r.id] : r.defaultChoice]));
  const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
  const money = n => n.toLocaleString('uk-UA',{minimumFractionDigits:2,maximumFractionDigits:2})+' грн';
  const cost = r => Math.round(r.price * 100) * r.qty;
  const sum = rows => rows.reduce((s,r) => s + cost(r),0)/100;
  const minOrders = {'Електроконтроль':500,'E-COMPS':1000};
  let orderText = '';
  function render() {
    const buying = data.items.filter(r => selected[r.id] === 'buy');
    document.getElementById('buy-total').textContent = money(sum(buying));
    document.getElementById('tools-total').textContent = money(sum(buying.filter(r => r.group === 'tools')));
    const borrowed = data.items.filter(r => selected[r.id] === 'borrow');
    document.getElementById('borrow-total').textContent = borrowed.length + ' поз. / ' + money(sum(borrowed));
    document.querySelectorAll('[data-total]').forEach(el => el.textContent = 'Купуємо: '+money(sum(buying.filter(r => r.group === el.dataset.total))));
    document.querySelectorAll('[data-item]').forEach(card => {
      card.dataset.state = selected[card.dataset.item];
      card.querySelectorAll('[data-choice]').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.choice === card.dataset.state)));
    });
    const shops = [...new Set(buying.map(r => r.shop))];
    orderText = 'Інструменти та монтаж — план покупки\nБез доставки та роботи. Ціни: '+data.checkedAt+'\n';
    document.getElementById('order-tables').innerHTML = shops.map(shop => {
      const rows = buying.filter(r => r.shop === shop), total = sum(rows);
      const warning = minOrders[shop] && total < minOrders[shop] ? 'Мінімальне замовлення '+money(minOrders[shop])+': цей список нижче порогу. Об’єднайте з іншими потрібними позиціями або уточніть можливість купити у продавця тримачів.' : '';
      orderText += '\n'+shop+' — '+money(total)+'\n'+rows.map((r,i) => `${i+1}. ${r.name} — ${r.qty} ${r.unit||'шт.'} × ${money(r.price)} = ${money(cost(r)/100)}\n${r.url}`).join('\n')+'\n'+(warning?warning+'\n':'');
      return `<div class="order"><h3>${esc(shop)} — ${money(total)}</h3>${warning?`<p class="notice">${esc(warning)}</p>`:''}<div class="scroll"><table><thead><tr><th>Позиція</th><th>Кількість</th><th>Ціна</th><th>Разом</th></tr></thead><tbody>${rows.map(r=>`<tr><td><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.name)}</a><br><small>${esc(r.stock)}</small></td><td>${r.qty} ${esc(r.unit||'шт.')}</td><td>${money(r.price)}</td><td>${money(cost(r)/100)}</td></tr>`).join('')}</tbody></table></div></div>`;
    }).join('') || '<p>Поки немає позицій до покупки. Позначте потрібні вище.</p>';
    orderText += '\nРазом: '+money(sum(buying))+'\nОптоплати з P2 не замовляти вдруге. Монтажна частина ще потребує завершення; це не готовий комплект до ввімкнення.';
    document.getElementById('order-copy').value = orderText;
  }
  document.querySelectorAll('[data-choice]').forEach(b => b.addEventListener('click', () => {
    selected[b.closest('[data-item]').dataset.item] = b.dataset.choice;
    try { localStorage.setItem(key,JSON.stringify(selected)); } catch { document.getElementById('storage-note').textContent='Браузер не дозволив зберегти вибір. Завантажте список перед закриттям.'; }
    render();
  }));
  document.getElementById('copy').addEventListener('click',async () => {
    try { await navigator.clipboard.writeText(orderText); document.getElementById('feedback').textContent='Замовлення скопійовано.'; }
    catch { const box=document.getElementById('order-copy');box.hidden=false;box.focus();box.select();document.getElementById('feedback').textContent='Скопіюйте виділений текст вручну.'; }
  });
  document.getElementById('download').addEventListener('click',() => {
    const url=URL.createObjectURL(new Blob(['\ufeff'+orderText],{type:'text/plain;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='fotobudka-zamovlennia.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  render();
})();
