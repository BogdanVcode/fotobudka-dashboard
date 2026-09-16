import json, pathlib, math, html
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import A3,landscape
root=pathlib.Path(__file__).resolve().parent.parent;out=root/'drawings/revision-08';(out/'parts').mkdir(exist_ok=True)
data=json.loads((out/'design.json').read_text(encoding='utf-8'));parts=data['parts'];panels=[p for p in parts if p['fabrication']]
pdfdir=root/'output/pdf';pdfdir.mkdir(parents=True,exist_ok=True)
pdfmetrics.registerFont(TTFont('UA','C:/Windows/Fonts/arial.ttf'));pdfmetrics.registerFont(TTFont('UAB','C:/Windows/Fonts/arialbd.ttf'))
W,H=landscape(A3);pdf=canvas.Canvas(str(pdfdir/'Фотобудка-08-креслення.pdf'),pagesize=(W,H));pdf.setTitle('Фотобудка Славутич — авторська геометрія, ревізія 08')
sv=[];sheets=[];dxf=['0','SECTION','2','HEADER','9','$INSUNITS','70','4','0','ENDSEC','0','SECTION','2','ENTITIES']
def n(v):return f'{v:.2f}'.rstrip('0').rstrip('.')
def contour_edges(p):
    vs=p['localVertices'];normals=[];adj={}
    for face in p['faces']:
        a,b,c=[vs[i] for i in face[:3]];u=[b[i]-a[i] for i in range(3)];v=[c[i]-a[i] for i in range(3)];nn=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];length=math.sqrt(sum(x*x for x in nn));nn=[x/max(length,1e-9) for x in nn];normals.append(nn)
        for i,a in enumerate(face):adj.setdefault(tuple(sorted((a,face[(i+1)%len(face)]))),[]).append(len(normals)-1)
    return [e for e in p['edges'] if len(adj.get(tuple(sorted(e)),[]))!=2 or abs(sum(normals[adj[tuple(sorted(e))][0]][i]*normals[adj[tuple(sorted(e))][1]][i] for i in range(3)))<.9999]
def line(x1,y1,x2,y2,color='#354657',width=.65):
    pdf.setStrokeColor(color);pdf.setLineWidth(width);pdf.line(x1,H-y1,x2,H-y2);sv.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{width}"/>')
def text(x,y,s,size=9,bold=False,color='#21354a'):
    pdf.setFillColor(color);pdf.setFont('UAB' if bold else 'UA',size);pdf.drawString(x,H-y,str(s));sv.append(f'<text x="{x}" y="{y}" font-family="Arial" font-size="{size}" font-weight="{700 if bold else 400}" fill="{color}">{html.escape(str(s))}</text>')
def rect(x,y,w,h,color='#657789'):
    for a,b in [((x,y),(x+w,y)),((x+w,y),(x+w,y+h)),((x+w,y+h),(x,y+h)),((x,y+h),(x,y))]:line(*a,*b,color)
def page(title,code,note):
    global sv;sv=[];rect(22,22,W-44,H-44);text(38,48,title,17,True);text(38,69,note,9)
    rect(22,H-84,W-44,62);line(W-345,H-84,W-345,H-22);text(38,H-62,'ФОТОБУДКА · СЛАВУТИЧ',12,True);text(38,H-43,'Ревізія 08 · 16.09.2026 · розміри в мм · не масштабувати з екрана',9);text(W-330,H-62,code,12,True);text(W-330,H-43,'Перевірка перед виготовленням',9)
def save(file):
    (out/file).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="100%" height="100%" fill="white"/>'+''.join(sv)+'</svg>',encoding='utf-8');pdf.showPage();sheets.append(file)
def dim(x,y,w,label):
    line(x,y-8,x,y+8);line(x+w,y-8,x+w,y+8);line(x,y,x+w,y);line(x,y,x+5,y-2);line(x+w,y,x+w-5,y+2);text(x+w/2-15,y-5,label,9)
page('01 · Авторська модель: габарити й орієнтація','A-01','Джерело: БУДКА.blend. Відображено контури реальних мешів, а не замінені прямокутні оболонки.')
shell=[p for p in parts if p['authorGeometry'] and p['group'] in ('walls','roof','front','floor')]
for title,axes,origin,maxwh in [('Фасад із дзеркалом',(0,2),(80,110),(600,570)),('Права сервісна стіна',(1,2),(750,110),(340,570))]:
    points=[v for p in shell for v in p['vertices']];mins=[min(v[a] for v in points) for a in axes];maxs=[max(v[a] for v in points) for a in axes];scale=min(maxwh[i]/(maxs[i]-mins[i]) for i in range(2));x0,y0=origin;text(x0,y0-15,title,12,True)
    for p in shell:
        for a,b in p['edges']:
            v,q=p['vertices'][a],p['vertices'][b];line(x0+(v[axes[0]]-mins[0])*scale,y0+(maxs[1]-v[axes[1]])*scale,x0+(q[axes[0]]-mins[0])*scale,y0+(maxs[1]-q[axes[1]])*scale,width=.5)
    dim(x0,y0+(maxs[1]-mins[1])*scale+25,(maxs[0]-mins[0])*scale,n(maxs[0]-mins[0]))
    text(x0,y0+maxwh[1]+52,'Висота із дахом: '+n(maxs[1]-mins[1]),9)
save('01-overview.svg')
page('02 · Послідовність складання й контроль','A-02','Спочатку перевірка деталей, потім каркас і внутрішні вузли, після цього обшивка.')
steps=[('1. Звірити авторські панелі','Звірити Dimensions із відомістю. Дверцята 8,87 мм та похилі плити перевірити до замовлення матеріалу.'),('2. Зібрати нижню раму й стійки','Виставити прямокутність, однакові діагоналі та вертикальність. Присадка силових вузлів потребує узгодження.'),('3. Приміряти полиці з реальним обладнанням','Перевірити завантаження паперу, відкриття кришок, виймання принтерів і простір для кабельних роз’ємів.'),('4. Встановити ліфт і вертикальну камеру','Перевірити весь хід без контакту з панелями. Переднє скло та адаптери не повинні торкатися каркаса.'),('5. Обшивка й сервісні дверцята','Не дублювати боковини модуля. Петлі й замок розмітити за паспортом фактично придбаної фурнітури.'),('6. Опалові панелі й захисне вікно','Притиск через пружні прокладки. Не свердлити оптичне скло. Передбачити знімання для обслуговування.'),('7. Лавка, м’яке сидіння, шторка','Перевірити опирання сидіння, доступ до речей і ширину проходу. Випробувати посадку та дотягування до екрана.'),('8. Приймання до запуску','Перевірити силові з’єднання, електрозахист, вентиляцію, повний хід ліфта, світло та всі тракти друку.')]
for i,(t,s) in enumerate(steps):text(50,120+i*72,t,12,True);text(65,144+i*72,s,9)
save('02-assembly.svg')
rows=[]
for index,p in enumerate(panels):
    dims=p['dimensionsMm'];thin=min(range(3),key=lambda i:dims[i]);axes=[i for i in range(3) if i!=thin];w,h=[dims[i] for i in axes];t=dims[thin]
    page(f'{p["id"]} · {p["name"]}',p['id'],f'Dimensions Blender: {" × ".join(n(v) for v in dims)} мм. Осі головного виду: {"XYZ"[axes[0]]} / {"XYZ"[axes[1]]}.')
    vs=p['localVertices'];sc=min(520/w,485/h);ox,oy=85,120;text(ox,oy-15,'ГОЛОВНИЙ ВИД · локальні осі об’єкта',10,True)
    unique={}
    for v in vs:unique[(round(v[axes[0]],2),round(v[axes[1]],2))]=v
    coords=sorted(unique);labels={q:i+1 for i,q in enumerate(coords)}
    projected=set()
    for a,b in contour_edges(p):
        va,vb=vs[a],vs[b];aa=(round(va[axes[0]],2),round(va[axes[1]],2));bb=(round(vb[axes[0]],2),round(vb[axes[1]],2));key=tuple(sorted((aa,bb)))
        if key in projected or aa==bb:continue
        projected.add(key);line(ox+aa[0]*sc,oy+(h-aa[1])*sc,ox+bb[0]*sc,oy+(h-bb[1])*sc,width=.85)
        dxf.extend(['0','LINE','8',p['id'],'10',str(index*3500+aa[0]),'20',str(aa[1]),'11',str(index*3500+bb[0]),'21',str(bb[1])])
    dim(ox,oy+h*sc+22,w*sc,n(w));text(ox-45,oy+h*sc/2,n(h),10,True)
    for (u,v),i in labels.items():text(ox+u*sc+4,oy+(h-v)*sc-4,str(i),7,color='#aa4933')
    text(ox,oy+h*sc+46,'База 0;0 — нижній лівий кут. Числа біля вершин — номери таблиці.',8)
    text(660,106,'ТОРЕЦЬ / ТОВЩИНА',10,True);rect(670,128,max(t*4,3),170);text(710,160,n(t)+' мм',10)
    text(815,106,'ІЗОМЕТРІЯ',10,True)
    iso=lambda v:(v[axes[0]]*.7-v[thin]*.5, -v[axes[1]]*.7+v[thin]*.3+v[axes[0]]*.18)
    pts=[iso(v) for v in vs];xmin=min(x for x,y in pts);ymin=min(y for x,y in pts);xmax=max(x for x,y in pts);ymax=max(y for x,y in pts);ss=min(280/max(xmax-xmin,1),235/max(ymax-ymin,1))
    for a,b in contour_edges(p):line(820+(pts[a][0]-xmin)*ss,125+(pts[a][1]-ymin)*ss,820+(pts[b][0]-xmin)*ss,125+(pts[b][1]-ymin)*ss,width=.5)
    text(660,398,'КООРДИНАТИ КОНТУРУ ВІД БАЗИ',10,True)
    for i,(u,v) in enumerate(coords):
        col=i//15;row=i%15;text(660+col*170,422+row*17,f'{i+1:02}   U {n(u)}   V {n(v)}',8)
    text(40,710,'Крайка: тип, товщину та видимі торці погодити перед розкроєм. Розміри тут — габарити автора, без віднімання крайки.',8)
    text(40,730,'Монтажні отвори не задані у вихідній моделі. Не свердлити за довільними точками; потрібна присадка вибраної фурнітури.',8)
    save('parts/'+p['id']+'.svg');rows.append({'id':p['id'],'name':p['name'],'dimensionsMm':dims,'thicknessMm':t,'coordinates':coords,'edges':[list(e) for e in projected]})
page('03 · Відомість профілів авторського каркаса','A-03','Наведені саме Dimensions, незалежно від повороту профілю. Тип перерізу і спосіб з’єднання потребують підтвердження.')
frames=[p for p in parts if p['group']=='frame'];
for i,p in enumerate(frames):
    col=i//22;row=i%22;x=45+col*560;y=108+row*27;text(x,y,p['id']+' · '+p['name'],9);text(x+175,y,' × '.join(n(v) for v in p['dimensionsMm'])+' мм',9)
save('03-frame.svg');pdf.save();dxf.extend(['0','ENDSEC','0','EOF']);(out/'panels.dxf').write_text('\n'.join(dxf),encoding='ascii');(out/'panel-schedule.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
doc='<!doctype html><html lang="uk"><meta charset="utf-8"><title>Креслення 08</title><style>body{font:16px Arial;margin:28px;background:#eef1f5;color:#21354a}main{max-width:1250px;margin:auto}img{width:100%;background:white;border:1px solid #bac7d2;margin:16px 0}a{color:#245a80}@media print{img{break-after:page}header{display:none}body{margin:0}}</style><main><header><h1>Авторська модель · креслення 08</h1><p>Креслення взяті з мешів БУДКА.blend. Це комплект для узгодження з меблярем; присадка кріплення ще не випущена.</p><p><a href="../../output/pdf/Фотобудка-08-креслення.pdf">PDF А3</a> · <a href="panels.dxf">DXF</a> · <a href="panel-schedule.json">Розміри й координати</a></p></header>'
doc+=''.join(f'<a href="{s}"><img src="{s}" loading="lazy" alt="Креслення {s}"></a>' for s in sheets)+'</main></html>';(out/'index.html').write_text(doc,encoding='utf-8')
print(len(sheets),'sheets;',len(panels),'author panel drawings')
