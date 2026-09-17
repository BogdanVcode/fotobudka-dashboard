import bpy, json, pathlib
from mathutils import Vector
root=pathlib.Path(__file__).resolve().parent.parent
out=root/'drawings'/'revision-10';out.mkdir(parents=True,exist_ok=True)
scene=bpy.context.scene
data={'units':{'system':scene.unit_settings.system,'scale_length':scene.unit_settings.scale_length,'length_unit':scene.unit_settings.length_unit},'objects':[]}
for o in scene.objects:
    item={'name':o.name,'type':o.type,'dimensions':list(o.dimensions),'location':list(o.location),'rotation':list(o.rotation_euler),'scale':list(o.scale),'matrix_world':[list(r) for r in o.matrix_world],'collections':[c.name for c in o.users_collection]}
    if o.type=='MESH':
        item['vertices']=[list(o.matrix_world@v.co) for v in o.data.vertices]
        item['faces']=[list(p.vertices) for p in o.data.polygons]
        item['bounds']=[list(o.matrix_world@Vector(v)) for v in o.bound_box]
        item['materials']=[m.name if m else None for m in o.data.materials]
        item['modifiers']=[{'name':m.name,'type':m.type} for m in o.modifiers]
    data['objects'].append(item)
(out/'source-inspection.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'units':data['units'],'objects':[{k:v for k,v in o.items() if k in ['name','type','dimensions','location','rotation','scale','modifiers']} for o in data['objects']]},ensure_ascii=False))
