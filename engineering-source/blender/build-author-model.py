"""Non-destructive source mesh import, revision 08. Original file is never saved."""
import bpy, json, pathlib, hashlib, math
from mathutils import Vector, Matrix
root=pathlib.Path(__file__).resolve().parents[2]
out=root/'drawings/revision-08';out.mkdir(parents=True,exist_ok=True)
source=root/'БУДКА.blend'
old=json.loads((root/'drawings/revision-07/design.json').read_text(encoding='utf-8'))
source_objects=list(bpy.context.scene.objects)
byname={p.get('sourceObject'):p for p in old['parts'] if p.get('sourceObject')}
off=Vector((.856,.536,.008))
added=bpy.data.collections.new('08 — додані вузли; компонування на перевірку');bpy.context.scene.collection.children.link(added)
materials={}
for name,color in {'white':(1,1,1,1),'black':(.05,.06,.075,1),'edge':(.6,.65,.69,1),'light':(1,1,1,1),'cushion':(.95,.95,.95,1),'glass':(.7,.85,.9,.2),'screen':(.1,.2,.25,1),'mirror':(.7,.8,.85,1),'floor':(.5,.55,.6,1)}.items():
    m=bpy.data.materials.new('08 '+name);m.diffuse_color=color;materials[name]=m
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
    if o.type!='MESH':continue
    if o.name=='людина':o.hide_render=True;continue
    meta=dict(byname.get(o.name,{}))
    if o.name.startswith('Cube'):meta.update(group='frame',material='edge')
    if o.name=='лівий 3 мм, опал, полікарбонат монолітний.001':meta.update(material='glass')
    if not meta:meta={'group':'module','material':'white'}
    o.data.materials.clear();o.data.materials.append(materials.get(meta['material'],materials['white']))
    record(o,meta,True)
def newmesh(name,verts,faces,meta):
    me=bpy.data.meshes.new(name);me.from_pydata(verts,[],faces);me.update();o=bpy.data.objects.new(name,me);added.objects.link(o);o.data.materials.append(materials.get(meta.get('material'),materials['white']));bpy.context.view_layer.update();record(o,meta);return o
def addbox(p):
    pos=Vector(p['positionMm'])/1000-off;s=Vector(p['sizeMm'])/1000
    vs=[list(pos+Vector((x*s.x,y*s.y,z*s.z))) for x,y,z in [(0,0,0),(1,0,0),(1,1,0),(0,1,0),(0,0,1),(1,0,1),(1,1,1),(0,1,1)]]
    return newmesh(p['name'],vs,[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],p)
led_index=0
for raw in old['parts']:
    if raw.get('sourceObject'):continue
    p=dict(raw)
    # Reuse equipment choices, not unsupported falling-paper tunnels from the old sketch.
    if p['group'] in ('walls','doors','curtain') or any(k in p['name'] for k in ['Лоток-жолоб','Кишеня видачі','Кабельна муфта']):continue
    if 'Camera Canon' in p['name']:
        p.update(name='Canon EOS R50 — вертикально, монтажний габарит',positionMm=[1340,493.25,1171.85],sizeMm=[68.8,85.5,116.3],moving=True)
    if p['name']=='Об’єктив у зборі':p.update(positionMm=[1307,536,1230],length=62,radius=34.8,moving=True)
    if 'TBD45' in p['name']:p.update(positionMm=[1470,513.5,920],sizeMm=[45,45,620])
    if 'Спалах Godox' in p['name']:p.update(positionMm=[1331,461,920])
    if 'Металева опора спалаху' in p['name']:p.update(positionMm=[1326,451,912])
    if 'Термінал оплати' in p['name']:p.update(positionMm=[1228,860,1300],sizeMm=[45,85,105])
    if 'LED-стрічка 24 В' in p['name']:
        p.update(positionMm=[60,100+led_index*250,2213],sizeMm=[900,10,3]);led_index+=1
    if 'Живлення LED' in p['name']:p.update(positionMm=[1100,800,2181],sizeMm=[200,60,35])
    if 'NEMA23' in p['name']:p.update(positionMm=[1464,498,860])
    if 'Кронштейн камери' in p['name']:p.update(positionMm=[1340,478,1163.85],sizeMm=[130,116,8],moving=True)
    if 'Canon AD-E1' in p['name']:p.update(positionMm=[1350,579,1200],sizeMm=[40,42,22],moving=True)
    if 'PC-sync адаптер' in p['name']:p.update(positionMm=[1352,621,1200],sizeMm=[36,20,20],moving=True)
    if 'DNP DS-RX1HS' in p['name']:p.update(positionMm=[1280,65,260])
    if 'Brother HL-L5210DN' in p['name']:p.update(positionMm=[1240,642,40])
    if 'EcoFlow DELTA' in p['name']:p.update(positionMm=[1420,390,610],sizeMm=[211,400,281])
    if 'Мініпк' in p['name']:p.update(positionMm=[1220,435,300])
    if 'Фіксатор мінікомп’ютера' in p['name']:p.update(positionMm=[1300,445,300])
    if p.get('sizeMm'):addbox(p)
    elif p.get('kind')=='cylinder':
        bpy.ops.mesh.primitive_cylinder_add(vertices=32,radius=p['radius']/1000,depth=p['length']/1000,location=Vector(p['positionMm'])/1000-off)
        o=bpy.context.object;o.name=p['name'];axis=p.get('axis','z')
        if axis=='x':o.rotation_euler.y=math.pi/2
        if axis=='y':o.rotation_euler.x=math.pi/2
        for c in list(o.users_collection):c.objects.unlink(o)
        added.objects.link(o);o.data.materials.append(materials.get(p['material'],materials['black']));bpy.context.view_layer.update();record(o,p)
# Supported equipment shelves; separate source envelope from fabrication proposals.
for name,pos,size in [
 ('Полиця DNP на бічних опорах',[1260,45,244],[390,360,16]),
 ('Полиця A4 на основі',[1220,622,24],[430,410,16]),
 ('Полиця EcoFlow на опорах',[1400,370,594],[245,440,16]),
 ('Монтажна сталева пластина ліфта',[1515,470,900],[4,130,660]),
 ('Опора мініпк',[1200,420,284],[180,205,16])]:addbox({'name':name,'positionMm':pos,'sizeMm':size,'group':'equipment','material':'edge','fabricationCandidate':True})
# Acrylic is retained exactly. Mounting ledges sit behind it and are proposals, not duplicate panels.
for y in (16,1036):
    addbox({'name':'Опорний кутник стельового розсіювача','positionMm':[30,y,1936],'sizeMm':[985,16,3],'group':'fasteners','material':'edge'})
for y in (470,586):
    addbox({'name':'Притиск оптичної вставки: монтажна пропозиція','positionMm':[1277,y,945],'sizeMm':[2,10,560],'group':'fasteners','material':'white'})
# Independent feet carry shelves to the floor, not through the thin cladding.
for label,xx,yy,top in [('DNP',(1260,1630),(45,385),244),('EcoFlow',(1400,1625),(410,600),594),('мініпк',(1200,1360),(420,605),284)]:
    for x in xx:
        for y in yy:addbox({'name':'Опора полиці '+label+' — труба 20×20, монтажна пропозиція','positionMm':[x,y,16],'sizeMm':[20,20,top-16],'group':'equipment','material':'edge'})
# Source bench is an open box: complete its top with bearing ledges, retaining source walls.
for x in (36,384):addbox({'name':'Опорна планка сидіння на боковині лавки','positionMm':[x,39,396],'sizeMm':[16,992,20],'group':'bench','material':'white'})
# Cable routes indicate endpoint connections. They are not a certified moving cable chain.
for name,pts in [('USB камера → комп’ютер',[(1400,570,1230),(1450,570,900),(1450,610,500),(1300,530,400)]),('SYNC камера → Godox',[(1390,640,1230),(1450,680,1150),(1450,680,970),(1396,526,970)]),('USB принтер A4 → комп’ютер',[(1590,990,180),(1590,620,180),(1300,620,400),(1300,530,400)]),('USB DNP → комп’ютер',[(1590,365,400),(1520,410,430),(1300,410,400),(1300,530,400)])]:
    cu=bpy.data.curves.new(name,'CURVE');cu.dimensions='3D';cu.bevel_depth=.002;cu.bevel_resolution=2;sp=cu.splines.new('POLY');sp.points.add(len(pts)-1)
    for q,v in zip(sp.points,pts):q.co=(*list(Vector(v)/1000-off),1)
    o=bpy.data.objects.new(name,cu);added.objects.link(o);bpy.context.view_layer.objects.active=o;o.select_set(True);bpy.ops.object.convert(target='MESH');o=bpy.context.object;o.data.materials.append(materials['black']);record(o,{'group':'cables','material':'black'});o.select_set(False)
data={'version':8,'date':'2026-09-16','source':'БУДКА.blend','sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'sourceUnitScale':bpy.context.scene.unit_settings.scale_length,'offsetMm':list(off*1000),'parts':records,'productionReleased':False,'notes':['Dimensions вихідних об’єктів збережені без округлення вгору.','Розміри в таблицях округлено лише для відображення до 0,01 мм.','Додані вузли потребують перевірки монтажу та обслуговування.','Лотки падіння паперу з ревізії 07 не вважаються підтвердженим механізмом.']}
(out/'design.json').write_text(json.dumps(data,ensure_ascii=False),encoding='utf-8')
(root/'dashboard/design08.js').write_text('window.AUTHOR_DESIGN='+json.dumps(data,ensure_ascii=False)+';',encoding='utf-8')
bpy.ops.wm.save_as_mainfile(filepath=str(out/'БУДКА-доповнена-08.blend'))
print('AUTHOR MODEL:',len(records),'parts;',sum(p['authorGeometry'] for p in records),'unchanged author objects')
