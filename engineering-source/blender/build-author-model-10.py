"""Non-destructive source mesh import, revision 08. Original file is never saved."""
import bpy, json, pathlib, hashlib, math
from mathutils import Vector, Matrix
root=pathlib.Path(__file__).resolve().parents[2]
out=root/'drawings/revision-10';out.mkdir(parents=True,exist_ok=True)
source=root/'БУДКА.blend'
old=json.loads((root/'drawings/revision-07/design.json').read_text(encoding='utf-8'))
source_objects=list(bpy.context.scene.objects)
byname={p.get('sourceObject'):p for p in old['parts'] if p.get('sourceObject')}
off=Vector((.856,.536,.008))
added=bpy.data.collections.new('10 — додані вузли; компонування на перевірку');bpy.context.scene.collection.children.link(added)
materials={}
for name,color in {'white':(1,1,1,1),'black':(.05,.06,.075,1),'edge':(.6,.65,.69,1),'light':(1,1,1,1),'cushion':(.95,.95,.95,1),'glass':(.7,.85,.9,.2),'screen':(.1,.2,.25,1),'mirror':(.7,.8,.85,1),'floor':(.5,.55,.6,1)}.items():
    m=bpy.data.materials.new('10 '+name);m.diffuse_color=color;materials[name]=m
records=[]
def record(o,meta,author=False):
    mesh=o.data;mesh.calc_loop_triangles()
    world=[o.matrix_world@v.co for v in mesh.vertices]
    # Local scaled coordinates retain Dimensions axes, independent of object rotation.
    scale=o.matrix_world.to_scale();local=[Vector((v.co.x*abs(scale.x),v.co.y*abs(scale.y),v.co.z*abs(scale.z))) for v in mesh.vertices]
    mins=[min(v[i] for v in local) for i in range(3)]
    dims=[float(v)*1000 for v in o.dimensions]
    rec={'id':('B' if author else 'A')+str(len(records)+1).zfill(3),'name':o.name,'sourceObject':o.name if author else None,'authorGeometry':author,'group':meta.get('group','equipment'),'material':meta.get('material','white'),'dimensionsMm':dims,'positionMm':[min(v[i] for v in world)*1000+off[i]*1000 for i in range(3)],'worldSizeMm':[(max(v[i] for v in world)-min(v[i] for v in world))*1000 for i in range(3)],'vertices':[[float(v[i]+off[i])*1000 for i in range(3)] for v in world],'localVertices':[[float(v[i]-mins[i])*1000 for i in range(3)] for v in local],'edges':[list(e.vertices) for e in mesh.edges],'triangles':[list(t.vertices) for t in mesh.loop_triangles],'faces':[list(p.vertices) for p in mesh.polygons],'provisional':not author,'moving':meta.get('moving',False),'sourceRevisionPart':meta.get('id')}
    rec['fabrication']=author and (meta.get('material')=='white' or o.name.startswith('дсп'))
    rec['status']='Авторська геометрія: збережено без зміни розмірів' if author else 'Доданий вузол: монтажна пропозиція'
    records.append(rec);o['part_id']=rec['id'];o['origin']='БУДКА.blend / незмінна геометрія' if author else 'Додано / потребує перевірки'
    return rec
for o in source_objects:
    if o.type!='MESH' or o.name=='людина':
        if o.name=='людина':o.hide_render=True
        continue
    cols=[c.name for c in o.users_collection];name=o.name.lower()
    group='equipment';material='black'
    if 'Каркас' in cols or name.startswith(('cube','куб')):group='frame';material='edge'
    elif 'опал' in name:group='light';material='light'
    elif 'скло' in name:group='light';material='glass'
    elif 'дзеркало' in name:group='front';material='mirror'
    elif 'рифлен' in name:group='floor';material='floor'
    elif 'м’яка' in name or "м'яка" in name:group='bench';material='cushion'
    elif 'ДСП зовнішнє' in cols:group='walls';material='white'
    elif 'ДСП внутріннє' in cols:group='module';material='white'
    elif 'elo' in name:material='screen'
    if name in ['верх','дсп верх']:group='roof'
    if name=='підлога':group='floor'
    if 'люк' in name:group='doors'
    o.data.materials.clear();o.data.materials.append(materials[material]);r=record(o,{'group':group,'material':material},True)
    r['collections']=cols;r['fabrication']=material=='white' and group!='frame'
    if group=='frame':r['name']='Профіль 20×20 · '+o.name
    r['assembly']=('віконцями' in name);r['status']='Авторська геометрія та Dimensions від 17.09.2026'
def box(name,pos,size,group='equipment',material='black'):
    pos=Vector(pos)/1000-off;s=Vector(size)/1000
    vs=[list(pos+Vector((x*s.x,y*s.y,z*s.z))) for x,y,z in [(0,0,0),(1,0,0),(1,1,0),(0,1,0),(0,0,1),(1,0,1),(1,1,1),(0,1,1)]]
    me=bpy.data.meshes.new(name);me.from_pydata(vs,[],[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]);me.update();o=bpy.data.objects.new(name,me);added.objects.link(o);o.data.materials.append(materials[material]);bpy.context.view_layer.update();return record(o,{'group':group,'material':material})
# Positions below use the model coordinate system in mm; no author object is moved.
def worldbox(name,pos,size,**kw):return box(name,[pos[i]+off[i]*1000 for i in range(3)],size,**kw)
shelf=next(p for p in records if p.get('sourceObject')=='ДСП для принтерів всередині');shelf_top=shelf['positionMm'][2]+shelf['worldSizeMm'][2]-off[2]*1000
worldbox('DNP DS-RX1HS · фотопринтер на авторській полиці',[425,-430,shelf_top],[351,322,281])
worldbox('Brother HL-L5210DN · A4 на авторській полиці',[412,80,shelf_top],[373,388,257])
worldbox('EcoFlow DELTA 2 · нижній відсік',[400,65,8],[400,211,281])
worldbox('Мінікомп’ютер · нижній відсік',[580,-290,8],[180,80,180])
worldbox('Godox MS200V · ліворуч від камери, спрямований угору',[535,205,1140],[130,130,220])
worldbox('Кронштейн спалаху · полиця',[515,190,1132],[285,160,8],material='edge')
worldbox('Кронштейн спалаху · вертикальна опора',[780,190,951],[20,160,181],material='edge')
scanner=next(p for p in records if 'ds-740d' in p['name'].lower())
scanner_world=[scanner['positionMm'][i]-off[i]*1000 for i in range(3)]
worldbox('Опора сканера · знімний кронштейн',[scanner_world[0],scanner_world[1]-4,scanner_world[2]-8],[80,310,8],material='edge')
worldbox('USB-концентратор · нижній відсік',[650,-155,18],[100,40,25])
worldbox('Розподілювач живлення · нижній відсік',[470,-80,18],[250,50,40])
# Lens stops behind protective window; Canon body in source is a size placeholder.
def cylinder(name,pos,radius,length,axis='x',group='equipment',material='black'):
    bpy.ops.mesh.primitive_cylinder_add(vertices=32,radius=radius/1000,depth=length/1000,location=Vector(pos)/1000)
    o=bpy.context.object;o.name=name
    if axis=='x':o.rotation_euler.y=math.pi/2
    if axis=='y':o.rotation_euler.x=math.pi/2
    for c in list(o.users_collection):c.objects.unlink(o)
    added.objects.link(o);o.data.materials.append(materials[material]);bpy.context.view_layer.update();record(o,{'group':group,'material':material})
cylinder('Canon RF-S 14–30 PZ · габарит об’єктива',[502,13,1314],34.8,62)
cylinder('Муфта кабельна · на внутрішній опорі',[763,0,943],9,22,axis='x',group='cables')
worldbox('Кабельна монтажна пластина муфти',[761,-20,923],[2,40,40],material='edge')
worldbox('Canon AD-E1 і контактний адаптер · монтажний габарит',[553,55,1300],[45,45,25])
routes=[
 ('USB · фотопринтер → концентратор',[(773,-250,660),(788,-250,480),(788,-150,250),(700,-135,40)]),
 ('USB · принтер A4 → концентратор',[(782,260,650),(790,260,480),(790,-150,250),(700,-135,40)]),
 ('USB · сканер → концентратор',[(scanner_world[0]+55,scanner_world[1]+150,scanner_world[2]+22),(385,-480,450),(770,-480,250),(700,-135,40)]),
 ('USB · монітор → комп’ютер',[(410,0,690),(765,0,690),(770,-250,300),(700,-250,130)]),
 ('Камера → муфта → USB-концентратор',[(610,25,1320),(720,25,1450),(750,25,1100),(763,0,943),(775,0,300),(700,-135,40)]),
 ('SYNC · Canon → Godox',[(575,95,1310),(720,95,1380),(735,270,1380),(650,270,1230)]),
 ('Термінал → кабельний канал → живлення/контролер',[(310,-395,670),(385,-490,670),(760,-490,300),(680,-60,50)]),
 ('Живлення · EcoFlow → розподілювач',[(740,70,170),(770,10,170),(700,-60,50)]),
 ('Живлення · розподілювач → фотопринтер',[(700,-60,50),(785,-350,300),(773,-350,600)]),
 ('Живлення · розподілювач → принтер A4',[(680,-60,50),(788,430,300),(782,430,600)]),
 ('Живлення · розподілювач → спалах',[(650,-60,50),(790,380,350),(790,380,1200),(650,300,1200)]),
 ('Живлення · розподілювач → комп’ютер',[(610,-60,50),(620,-250,80)]),
 ('USB · концентратор → комп’ютер',[(680,-135,30),(670,-230,100)]),
 ('Камера спостереження → верхній канал → комп’ютер',[(-785,456,1925),(-785,510,1960),(780,510,1960),(780,500,300),(700,-250,130)])]
for name,pts in routes:
    cu=bpy.data.curves.new(name,'CURVE');cu.dimensions='3D';cu.bevel_depth=.002;cu.bevel_resolution=1;sp=cu.splines.new('POLY');sp.points.add(len(pts)-1)
    for q,v in zip(sp.points,pts):q.co=(*[a/1000 for a in v],1)
    o=bpy.data.objects.new(name,cu);added.objects.link(o);bpy.ops.object.select_all(action='DESELECT');bpy.context.view_layer.objects.active=o;o.select_set(True);bpy.ops.object.convert(target='MESH');o=bpy.context.object;o.data.materials.append(materials['black']);record(o,{'group':'cables','material':'black'})
data={'version':10,'date':'2026-09-17','source':'БУДКА.blend','sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'offsetMm':list(off*1000),'parts':records,'productionReleased':False,'notes':['Авторська геометрія 17.09.2026 збережена без змін.','Принтери стоять на авторській полиці. Спалах ліворуч, якщо дивитися на монітор.','EcoFlow і ПК внизу. Сканер за верхнім вирізом сканера.','Дроти — маршрути, не електрична принципова схема.','Передня деталь з кишенями є об’ємним вузлом, не плитою 200,58 мм.']}
(out/'design.json').write_text(json.dumps(data,ensure_ascii=False),encoding='utf-8')
(root/'dashboard/design10.js').write_text('window.AUTHOR_DESIGN='+json.dumps(data,ensure_ascii=False)+';',encoding='utf-8')
bpy.ops.wm.save_as_mainfile(filepath=str(out/'БУДКА-доповнена-10.blend'))
print('REV10:',len(records),'parts;',sum(p['authorGeometry'] for p in records),'author objects')
