import pathlib,json,math,html,collections
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
root=pathlib.Path(__file__).resolve().parent.parent;out=root/'drawings/revision-10';d=json.loads((out/'design.json').read_text(encoding='utf8'));parts=d['parts']
pdfmetrics.registerFont(TTFont('UA','C:/Windows/Fonts/arial.ttf'));pdfmetrics.registerFont(TTFont('UAB','C:/Windows/Fonts/arialbd.ttf'))
W,H=2383.94,1683.78;pdf=canvas.Canvas(str(root/'output/pdf/Фотобудка-10-креслення.pdf'),pagesize=(W,H));pdf.setTitle('Фотобудка Славутич — зведені креслення 10');svg=[];sheets=[]
def fmt(v):return f'{v:.2f}'.rstrip('0').rstrip('.')
def line(x,y,X,Y,color='#263647',width=.8):
 pdf.setStrokeColor(color);pdf.setLineWidth(width);pdf.line(x,H-y,X,H-Y);svg.append(f'<line x1="{x}" y1="{y}" x2="{X}" y2="{Y}" stroke="{color}" stroke-width="{width}"/>')
def text(x,y,s,size=12,bold=False,color='#263647'):
 pdf.setFillColor(color);pdf.setFont('UAB' if bold else 'UA',size);pdf.drawString(x,H-y,str(s));svg.append(f'<text x="{x}" y="{y}" font-family="Arial" font-size="{size}" font-weight="{700 if bold else 400}" fill="{color}">{html.escape(str(s))}</text>')
def rect(x,y,w,h):
 for a,b in [((x,y),(x+w,y)),((x+w,y),(x+w,y+h)),((x+w,y+h),(x,y+h)),((x,y+h),(x,y))]:line(*a,*b,color='#abb5bf',width=.5)
def page(title,note):
 global svg;svg=[];rect(20,20,W-40,H-40);text(45,55,title,25,True);text(45,82,note,13);line(20,H-68,W-20,H-68);text(40,H-40,'ФОТОБУДКА СЛАВУТИЧ · 10 · 17.09.2026 · мм · А1 · не масштабувати з екрана',13);text(W-650,H-40,'Автор: Богдан · комплект для узгодження з майстром',13)
def save(name):
 (out/name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="100%" height="100%" fill="white"/>'+''.join(svg)+'</svg>',encoding='utf8');pdf.showPage();sheets.append(name)
def dim(x,y,X,Y,label,vertical=False,size=11):
 line(x,y,X,Y,color='#526e88',width=.5)
 if vertical:
  line(x-5,y,x+5,y);line(X-5,Y,X+5,Y);text(x-45,(y+Y)/2,label,size)
 else:
  line(x,y-5,x,y+5);line(X,Y-5,X,Y+5);text((x+X)/2-18,y-5,label,size)
def outline(p):
 vs=p['localVertices'];thin=min(range(3),key=lambda a:p['dimensionsMm'][a]);axes=[i for i in range(3) if i!=thin]
 groups={}
 for face in p['faces']:
  z=[vs[i][thin] for i in face]
  if max(z)-min(z)<.02:
   key=round(sum(z)/len(z),1);groups.setdefault(key,[]).append(face)
 def area(faces):
  return sum(abs(sum(vs[f[i]][axes[0]]*vs[f[(i+1)%len(f)]][axes[1]]-vs[f[(i+1)%len(f)]][axes[0]]*vs[f[i]][axes[1]] for i in range(len(f))))/2 for f in faces)
 faces=max(groups.values(),key=area) if groups else p['faces']
 counts=collections.Counter(tuple(sorted((f[i],f[(i+1)%len(f)]))) for f in faces for i in range(len(f)))
 edges=[e for e,c in counts.items() if c==1]
 # A deformed slab may have no single planar broad face: retain physical crease edges, not triangles.
 if not edges:edges=p['edges']
 return axes,edges
def crease_edges(p):
 vs=p['localVertices'];adj={};norm=[]
 for f in p['faces']:
  a,b,c=[vs[i] for i in f[:3]];u=[b[i]-a[i] for i in range(3)];v=[c[i]-a[i] for i in range(3)];nn=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];L=math.sqrt(sum(t*t for t in nn));norm.append([t/max(L,1e-9) for t in nn])
  for i,a in enumerate(f):adj.setdefault(tuple(sorted((a,f[(i+1)%len(f)]))),[]).append(len(norm)-1)
 return [e for e in p['edges'] if len(adj.get(tuple(sorted(e)),[]))!=2 or abs(sum(norm[adj[tuple(sorted(e))][0]][i]*norm[adj[tuple(sorted(e))][1]][i] for i in range(3)))<.9999]
def panel(p,x,y,cw,ch,details=True):
 axes,edges=outline(p);vs=p['localVertices'];w,h=[p['dimensionsMm'][i] for i in axes];thin=min(p['dimensionsMm']);sc=min((cw-120)/w,(ch-150)/h);ox=x+60;oy=y+61
 text(x+10,y+20,p['id']+' · '+p['name'][:64],12,True);text(x+10,y+39,'Dimensions: '+' × '.join(fmt(v) for v in p['dimensionsMm'])+' мм',11)
 for a,b in edges:
  v,q=vs[a],vs[b];line(ox+v[axes[0]]*sc,oy+(h-v[axes[1]])*sc,ox+q[axes[0]]*sc,oy+(h-q[axes[1]])*sc)
 dim(ox,oy+h*sc+18,ox+w*sc,oy+h*sc+18,fmt(w));dim(ox-14,oy,ox-14,oy+h*sc,fmt(h),True)
 if details:
  used={i for e in edges for i in e};coords=[[vs[i][a] for i in used] for a in axes];unique=[sorted(set(round(t,2) for t in c)) for c in coords]
  for axis,u in enumerate(unique):
   # Dimension straight cutout stations; dense vent-slot contours are covered on the detail sheet.
   if 2<len(u)<=8:
    if axis==0:
     if p.get("sourceObject")=="ДСП перед":
      dim(ox+404*sc,oy+h*sc+43,ox+1004*sc,oy+h*sc+43,"600",size=10)
      continue
     for a,b in zip(u,u[1:]):
      if b-a>5:dim(ox+a*sc,oy+h*sc+43,ox+b*sc,oy+h*sc+43,fmt(b-a),size=9)
    else:
     for a,b in zip(u,u[1:]):
      if b-a>5:dim(ox+w*sc+20,oy+(h-b)*sc,ox+w*sc+20,oy+(h-a)*sc,fmt(b-a),True,size=9)
 text(x+10,y+ch-10,'Вузол з кишенями; '+fmt(thin)+' мм — глибина.' if p.get('assembly') else 'Товщина / габарит торця: '+fmt(thin)+' мм',10)
 return {'id':p['id'],'name':p['name'],'dimensionsMm':p['dimensionsMm'],'axes':axes,'edges':edges}
panels=[p for p in parts if p.get('fabrication')];rows=[]
page('01 · Усі деталі ДСП на одному аркуші','Суцільні контури актуальних деталей. Показані габарити, товщина та основні розміри вирізів; сітка меша прихована.')
cols=4;nr=math.ceil(len(panels)/cols);cw=(W-70)/cols;ch=(H-185)/nr
for i,p in enumerate(panels):
 x=35+i%cols*cw;y=110+i//cols*ch;rect(x,y,cw,ch);rows.append(panel(p,x,y,cw,ch))
save('01-all-dsp.svg');(out/'panel-schedule.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf8')
frames=[p for p in parts if p['group']=='frame'];total=sum(max(p['dimensionsMm']) for p in frames)/1000
page('02 · Усі деталі каркаса: алюмінієвий профіль 20×20','Колекція «Каркас» у Blender. Кожен Cube — окремий профіль. Довжина за Dimensions, не за світовим габаритом.')
for i,p in enumerate(frames):
 col=i//22;row=i%22;x=55+col*1150;y=125+row*62;L=max(p['dimensionsMm']);text(x,y,p['id']+' · '+p['sourceObject'],13,True);rect(x+210,y-13,650*L/2200,12);text(x+880,y,'L = '+fmt(L)+' мм',13);text(x+210,y+18,'20 × 20 мм',10)
text(55,H-100,f'{len(frames)} деталей · загальна довжина: {fmt(total)} м. Торці похилих елементів різати за кутом їхніх стиків; кріплення узгоджує майстер.',13)
save('02-all-frame.svg')
page('03 · Загальне компонування та висоти','Напрямок «ліворуч / праворуч» визначено з місця людини, яка дивиться на монітор.')
for axes,x,y,bw,bh,title in [((0,2),80,180,950,1170,'Вид збоку: лавка → модуль'),((1,2),1280,180,950,1170,'Вид на модуль: сканер у верхньому вирізі')]:
 text(x,y-35,title,19,True);shown=[p for p in parts if p['group'] not in ('walls','roof','doors','cables')];vs=[v for p in shown for v in p['vertices']];lo=[min(v[a] for v in vs) for a in axes];hi=[max(v[a] for v in vs) for a in axes];sc=min(bw/(hi[0]-lo[0]),bh/(hi[1]-lo[1]))
 for p in shown:
  for a,b in crease_edges(p):
   v,q=p['vertices'][a],p['vertices'][b];line(x+(v[axes[0]]-lo[0])*sc,y+(hi[1]-v[axes[1]])*sc,x+(q[axes[0]]-lo[0])*sc,y+(hi[1]-q[axes[1]])*sc,width=.45)
 dim(x,y+bh+30,x+(hi[0]-lo[0])*sc,y+bh+30,fmt(hi[0]-lo[0]))
text(80,1490,'Полиця принтерів: верх 524 мм від авторської площини Z=0. Принтери стоять на ній; EcoFlow і ПК — на нижній основі Z=8.',14)
text(80,1520,'Кишеня A4 ліворуч, фото по центру — авторська геометрія. Тракти видачі від принтерів до кишень ще потрібно виготовити й перевірити.',14)
text(80,1560,'Прохід фасаду: 600 мм між X = −436 та +164 мм. Рифлений лист: 600 × 1000 мм (Dimensions автора).',14)
save('03-layout.svg')
special=[p for p in parts if p['authorGeometry'] and ('віконцями' in p['name'] or 'монітора' in p['name'] or 'люк' in p['name'])]
page('04 · Вирізи, кишеньки й сервісний люк','Збільшені головні види. Передній вузол має кишені; їхня глибина не є товщиною ДСП. Вентиляційні прорізи збережені з моделі.')
cutouts=[]
for i,p in enumerate(special):
 x=45+i*770;panel(p,x,130,760,1000)
 axes,edges=outline(p);vs=p['localVertices'];adj={}
 for a,b in edges:adj.setdefault(a,set()).add(b);adj.setdefault(b,set()).add(a)
 seen=set();loops=[]
 for a in adj:
  if a in seen:continue
  todo=[a];group=[]
  while todo:
   b=todo.pop()
   if b in seen:continue
   seen.add(b);group.append(b);todo.extend(adj[b]-seen)
  us=[vs[k][axes[0]] for k in group];vv=[vs[k][axes[1]] for k in group];loops.append((min(us),min(vv),max(us)-min(us),max(vv)-min(vv)))
 loops.sort(key=lambda z:z[2]*z[3],reverse=True)
 text(x+15,1180,'ВИРІЗИ: X / Y від нижнього лівого кута; ширина × висота',13,True)
 for j,(u,v,w,h) in enumerate(sorted(loops[1:],key=lambda r:(-r[1],r[0]))):
  tag=p['id']+'-'+str(j+1);pw,ph=[p['dimensionsMm'][a] for a in axes]
  sc=min((760-120)/pw,(1000-150)/ph)
  text(x+60+(u+w/2)*sc,191+(ph-v-h/2)*sc,str(j+1),12,True,color='#b33b21')
  text(x+15,1210+j*36,f'{j+1}. Ліворуч {fmt(u)}; знизу {fmt(v)}; виріз {fmt(w)} × {fmt(h)} мм',12)
  cutouts.append(dict(tag=tag,name=p['name'],left=u,bottom=v,width=w,height=h,right=pw-u-w,top=ph-v-h))
save('04-openings.svg')
lights=[p for p in parts if p['authorGeometry'] and p['group']=='light']
page('05 · Опалові панелі та захисне скло','Монтаж на приховані опорні профілі через пружні прокладки; знімання з сервісного боку. Геометрія автора незмінна.')
for i,p in enumerate(lights):panel(p,45+(i%3)*770,130+(i//3)*710,755,700)
save('05-light.svg')
page('06 · Завдання майстру: складання та прихований монтаж','Видимі зовнішні площини без наскрізних головок гвинтів. Спосіб прихованого кріплення узгодити перед свердлінням.')
steps=[('1. Перевірка заготовок','Звірити відомості ДСП і профілю з Blender. Передню деталь з кишенями деталізувати як збірний вузол.'),('2. Каркас 20×20','Виставити основу, стійки та перемички. Перевірити діагоналі й жорсткість. З’єднання розміщувати зсередини.'),('3. Пуфік і полиці','Закріпити пуфік у каркасі, опору сидіння й авторську полицю принтерів; перевірити навантаження.'),('4. Обшивка ДСП','З’єднати стінки прихованими стяжками та закріпити до каркаса внутрішніми кронштейнами. Погодити крайку й зазори.'),('5. Екран, сканер і опалові панелі','Виконати вирізи, знімні кріплення екрана, панелей та сканера. Усередині модуля допустимі технологічні вирізи.'),('6. Сервіс і кишеньки','Забезпечити доступ до принтерів, ПК і EcoFlow. Узгодити відкривання люка й вихід паперу в обидві кишені.'),('7. Кабелі й приймання','Передбачити муфти та місця для фіксації кабелів. Перевірити гострі краї, міцність і можливість обслуговування.'),('Відповідальність автора','Богдан окремо закуповує обладнання, виконує електроніку та програмне забезпечення. Потрібна допомога зі складанням корпусу.')]
for i,(a,b) in enumerate(steps):text(80,170+i*165,a,23,True);text(100,210+i*165,b,17)
save('06-assembly.svg')
page('07 · Прив’язки кожного вирізу до країв деталі','Усі розміри в мм. Вид і нумерація як на аркуші 04. Схеми прив’язки не в масштабі; нуль — нижній лівий кут деталі.')
for i,c in enumerate(cutouts):
 x=35+(i%4)*585;y=115+(i//4)*470
 rect(x,y,570,450);text(x+15,y+25,c['tag']+' · '+c['name'][:43],12,True)
 # Datum corner, cutout and four independent dimensions; schematic spacing avoids overlapping dimension lines.
 ox=x+90;by=y+325;hx=x+245;hy=y+110;hw=170;hh=100
 line(ox,y+70,ox,by);line(ox,by,x+460,by);text(ox-25,by+18,'0',12,True)
 rect(hx,hy,hw,hh);text(hx+45,hy+55,'ВИРІЗ '+c['tag'].split('-')[-1],13,True)
 for a,b,X,Y in [(ox,by,ox,by+32),(hx,hy+hh,hx,by+32),(hx,hy,hx,hy-25),(hx+hw,hy,hx+hw,hy-25),(hx,hy+hh,x+150,hy+hh),(ox,by,x+150,by),(hx+hw,hy,hx+hw+38,hy),(hx+hw,hy+hh,hx+hw+38,hy+hh)]:line(a,b,X,Y,color='#94a3af',width=.5)
 dim(ox,by+30,hx,by+30,fmt(c['left']),size=13)
 dim(x+150,hy+hh,x+150,by,fmt(c['bottom']),True,size=13)
 dim(hx,hy-23,hx+hw,hy-23,fmt(c['width']),size=13)
 dim(hx+hw+36,hy,hx+hw+36,hy+hh,fmt(c['height']),True,size=13)
 text(x+15,y+400,'До правого краю: '+fmt(c['right'])+'; до верхнього: '+fmt(c['top'])+' мм',12)
 text(x+15,y+425,'Ліворуч / знизу — від зовнішніх країв цієї деталі.',11)
save('07-cutout-dimensions.svg');pdf.save()
(out/'cutout-dimensions.json').write_text(json.dumps(cutouts,ensure_ascii=False,indent=2),encoding='utf8')
(out/'index.html').write_text('<!doctype html><html lang="uk"><meta charset="utf-8"><title>Зведені креслення 10</title><style>body{font:18px Arial;background:#eef1f5;padding:25px}img{width:100%;background:white;margin:20px 0}a{color:#235474}@media print{img{break-after:page}header{display:none}}</style><header><h1>Зведені креслення · 10</h1><p>Усі ДСП — аркуш 01. Увесь каркас — аркуш 02. Далі компонування, вирізи, світлові панелі й монтаж.</p><a href="../../output/pdf/Фотобудка-10-креслення.pdf">Завантажити PDF А1</a></header>'+''.join(f'<a href="{s}"><img src="{s}" alt="{s}"></a>' for s in sheets),encoding='utf8')
print('DRAWINGS10:',len(panels),'DSP objects;',len(frames),'frame parts;',len(sheets),'A1 sheets;',total,'m profile')
