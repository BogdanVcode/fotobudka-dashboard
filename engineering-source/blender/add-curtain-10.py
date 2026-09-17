import bpy,json,pathlib,math
from mathutils import Vector
root=pathlib.Path.cwd();out=root/'drawings/revision-10';d=json.loads((out/'design.json').read_text(encoding='utf8'));off=d['offsetMm']
d['parts']=[p for p in d['parts'] if p.get('group')!='curtain']
for c in list(bpy.data.collections):
 if c.name.startswith('Вхід — штора та кріплення'):
  for o in list(c.objects):bpy.data.objects.remove(o,do_unlink=True)
  bpy.data.collections.remove(c)
coll=bpy.data.collections.new('Вхід — штора та кріплення');bpy.context.scene.collection.children.link(coll)
def add(name,verts,faces,material='white'):
 me=bpy.data.meshes.new(name);me.from_pydata([[a/1000 for a in v] for v in verts],[],faces);me.update();o=bpy.data.objects.new(name,me);coll.objects.link(o);mat=bpy.data.materials.new(name);mat.diffuse_color=(.96,.96,.94,1) if material=='white' else (.65,.68,.72,1);o.data.materials.append(mat);bpy.context.view_layer.update();me.calc_loop_triangles();mins=[min(v[i] for v in verts) for i in range(3)];sz=[max(v[i] for v in verts)-mins[i] for i in range(3)];p={'id':'C'+str(len(d['parts'])+1),'name':name,'authorGeometry':False,'sourceObject':None,'group':'curtain','material':material,'dimensionsMm':sz,'positionMm':[mins[i]+off[i] for i in range(3)],'worldSizeMm':sz,'vertices':[[v[i]+off[i] for i in range(3)] for v in verts],'localVertices':[[v[i]-mins[i] for i in range(3)] for v in verts],'edges':[list(e.vertices) for e in me.edges],'faces':faces,'triangles':[list(t.vertices) for t in me.loop_triangles],'fabrication':False,'provisional':True,'status':'Монтажна пропозиція: біла штора 140×200 см, підшити до 181 см; карниз 100 см. Кріплення узгодити з майстром.'};d['parts'].append(p)
def box(name,pos,size):
 verts=[[pos[0]+x*size[0],pos[1]+y*size[1],pos[2]+z*size[2]] for x,y,z in [(0,0,0),(1,0,0),(1,1,0),(0,1,0),(0,0,1),(1,0,1),(1,1,1),(0,1,1)]];add(name,verts,[[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]],'edge')
# Closed curtain overlaps 600 mm entrance by 50 mm on both sides. Raised hem clears floor.
vs=[]
for i in range(81):
 x=-486+700*i/80;y=-494+12*math.sin(i/80*math.pi*20)
 vs.extend([[x,y,50],[x,y,1860]])
add('Біла штора входу · 700×1810 мм у складках',vs,[[2*i,2*i+2,2*i+3,2*i+1] for i in range(80)])
box('Карниз однорядний · 1000 мм',[-736,-505,1880],[1000,24,18])
for i in range(12):box('Бігунок з гачком штори '+str(i+1),[-486+i*700/11,-498,1858],[8,8,25])
for i,x in enumerate([-700,-260,240]):
 box('Кронштейн карниза '+str(i+1),[x,-522,1880],[20,42,70])
 box('Приховане кріплення кронштейна '+str(i+1),[x+6,-536,1930],[8,30,8])
for x in [-734,256]:box('Стопор карниза',[x,-505,1880],[6,24,18])
(out/'design.json').write_text(json.dumps(d,ensure_ascii=False),encoding='utf8');(root/'dashboard/design10.js').write_text('window.AUTHOR_DESIGN='+json.dumps(d,ensure_ascii=False)+';',encoding='utf8');bpy.ops.wm.save_as_mainfile(filepath=str(out/'БУДКА-доповнена-10.blend'));print('Curtain parts added',len(d['parts']))
