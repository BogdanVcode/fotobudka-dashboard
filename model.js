/* Engineering layout revision 07. All coordinates in millimetres. */
window.createBoothViewer=function(host){
 const T=window.THREE;let renderer;try{renderer=new T.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true,logarithmicDepthBuffer:true});}catch(e){host.innerHTML='<p id="model-error">Не вдалося запустити 3D. Увімкніть апаратне прискорення браузера. <a href="revision-02.svg">Відкрити схему фасаду</a>.</p>';return null;}
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0xf0f1f3);renderer.shadowMap.enabled=false;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;host.prepend(renderer.domElement);
 const scene=new T.Scene(),booth=new T.Group();booth.name='Фотобудка — ревізія 07';booth.scale.z=-1;scene.add(booth);
 const camera=new T.PerspectiveCamera(36,1,50,12000);const ortho=new T.OrthographicCamera(-900,900,700,-700,10,20000);let target=new T.Vector3(800,1060,-470),az=-.55,el=.15,radius=3800,view='inside';
 const groups={};for(const name of ['walls','roof','front','bench','module','curtain','floor','frame','fasteners','equipment','cables','doors']){groups[name]=new T.Group();groups[name].name=name;booth.add(groups[name]);}
 const inventory=[];let serial=0;const mat={white:new T.MeshStandardMaterial({color:0xffffff,roughness:.55,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1}),edge:new T.MeshStandardMaterial({color:0xd5d9d2,metalness:.45,roughness:.45}),black:new T.MeshStandardMaterial({color:0x202a2c,roughness:.45}),cushion:new T.MeshStandardMaterial({color:0xfafafa,roughness:.95}),light:new T.MeshStandardMaterial({color:0xfffaf0,emissive:0xffe9a8,emissiveIntensity:.9,roughness:.4,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1}),floor:new T.MeshStandardMaterial({color:0xabb3b4,metalness:.55,roughness:.5}),mirror:new T.MeshStandardMaterial({color:0xa9c0bd,metalness:.6,roughness:.12}),screen:new T.MeshStandardMaterial({color:0xffffff,emissive:0xf2f4f6,emissiveIntensity:.08,roughness:.4,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1})};
 const loc=(x,y,z)=>new T.Vector3(x,z,y);
 function add(geo,material,name,group='module'){const m=new T.Mesh(geo,material);m.name=name;m.userData.partId='Д-'+String(++serial).padStart(4,'0');m.castShadow=true;m.receiveShadow=true;groups[group].add(m);return m;}
 function box(x,y,z,w,d,h,material,name,group){const m=add(new T.BoxGeometry(w,h,d),material,name,group);m.position.copy(loc(x+w/2,y+d/2,z+h/2));m.userData.sizeMm=[w,d,h];if(!name.includes('Рифлі')&&group!=='cables')inventory.push({id:m.userData.partId,name,material:Object.keys(mat).find(k=>mat[k]===material),group:group||'module',sizeMm:[w,d,h],positionMm:[x,y,z]});return m;}
 function shape(points,y,depth,material,name,group='module',bevel=0){const s=new T.Shape();points.forEach(([x,z],i)=>i?s.lineTo(x,z):s.moveTo(x,z));s.closePath();const g=new T.ExtrudeGeometry(s,{depth,bevelEnabled:bevel>0,bevelSegments:3,steps:1,bevelSize:bevel,bevelThickness:bevel,curveSegments:12});g.translate(0,0,y);const mesh=add(g,material,name,group);mesh.userData.outlineMm=points;mesh.userData.thicknessMm=depth;inventory.push({id:mesh.userData.partId,name,material:Object.keys(mat).find(k=>mat[k]===material),group,outlineMm:points,thicknessMm:depth});return mesh;}
 function rounded(x,y,z,w,d,h,r,material,name,group='module'){const s=new T.Shape();s.moveTo(r,0);s.lineTo(w-r,0);s.quadraticCurveTo(w,0,w,r);s.lineTo(w,h-r);s.quadraticCurveTo(w,h,w-r,h);s.lineTo(r,h);s.quadraticCurveTo(0,h,0,h-r);s.lineTo(0,r);s.quadraticCurveTo(0,0,r,0);const g=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSize:Math.min(2,r/2),bevelThickness:2,bevelSegments:3,curveSegments:10});g.translate(x,z,y);return add(g,material,name,group);}
 function panel(x1,z1,x2,z2,y,d,t,material,name){const dx=x2-x1,dz=z2-z1,l=Math.hypot(dx,dz),nx=-dz/l*t,nz=dx/l*t;const mesh=shape([[x1,z1],[x2,z2],[x2+nx,z2+nz],[x1+nx,z1+nz]],y,d,material,name);inventory.at(-1).panelCut={length:l,width:d,thickness:t};return mesh;}
 function cylinder(x,y,z,r,len,material,name,axis='x',group='module'){const m=add(new T.CylinderGeometry(r,r,len,48),material,name,group);if(axis==='x')m.rotation.z=Math.PI/2;if(axis==='depth')m.rotation.x=Math.PI/2;m.position.copy(loc(x,y,z));inventory.push({id:m.userData.partId,name,group,kind:'cylinder',diameterMm:2*r,lengthMm:len});return m;}

 mat.glass=new T.MeshPhysicalMaterial({color:0x344047,transparent:true,opacity:.58,roughness:.08,depthWrite:true,side:T.DoubleSide});
 for(const m of Object.values(mat))m.side=T.DoubleSide;
 const moving=new T.Group();groups.equipment.add(moving);const doorPivot=new T.Group();groups.doors.add(doorPivot);
 const design=window.BOOTH_DESIGN;
 if(design.serviceDoorPivotMm)doorPivot.position.copy(loc(design.serviceDoorPivotMm[0],design.serviceDoorPivotMm[1],0));
 function prism(p){
  const axes=p.kind==='tube'?[0,1,2].filter(i=>i!==p.sizeMm.indexOf(Math.max(...p.sizeMm))):[0,1,2].filter(i=>i!==p.sizeMm.indexOf(Math.min(...p.sizeMm)));
  const a=axes[0],b=axes[1],c=[0,1,2].find(i=>!axes.includes(i)),w=p.sizeMm[a],h=p.sizeMm[b],th=p.sizeMm[c];
  const s=new T.Shape();s.moveTo(0,0);s.lineTo(w,0);s.lineTo(w,h);s.lineTo(0,h);s.closePath();
  const holes=p.kind==='tube'?[{u:2,v:2,w:w-4,h:h-4}]:(p.holes||[]);
  for(const q of holes){const hole=new T.Path();hole.moveTo(q.u,q.v);hole.lineTo(q.u,q.v+q.h);hole.lineTo(q.u+q.w,q.v+q.h);hole.lineTo(q.u+q.w,q.v);hole.closePath();s.holes.push(hole);}
  const g=new T.ExtrudeGeometry(s,{depth:th,bevelEnabled:false,steps:1}),u=[0,0,0],v=[0,0,0],n=[0,0,0];u[a]=1;v[b]=1;n[c]=1;
  g.applyMatrix4(new T.Matrix4().makeBasis(loc(...u),loc(...v),loc(...n)));g.translate(...loc(...p.positionMm).toArray());return add(g,mat[p.material],p.name,p.group);
 }
 function sloped(p){
  const [[x1,z1],[x2,z2]]=p.ends,dx=x2-x1,dz=z2-z1,L=Math.hypot(dx,dz),s=new T.Shape();s.moveTo(0,0);s.lineTo(L,0);s.lineTo(L,p.depth);s.lineTo(0,p.depth);s.closePath();
  for(const q of p.holes||[]){const h=new T.Path();h.moveTo(q.u,q.v);h.lineTo(q.u,q.v+q.h);h.lineTo(q.u+q.w,q.v+q.h);h.lineTo(q.u+q.w,q.v);h.closePath();s.holes.push(h);}
  const g=new T.ExtrudeGeometry(s,{depth:p.thickness,bevelEnabled:false});g.applyMatrix4(new T.Matrix4().makeBasis(loc(dx/L,0,dz/L),loc(0,1,0),loc(-dz/L,0,dx/L)));g.translate(...loc(x1,p.y,z1).toArray());return add(g,mat[p.material],p.name,p.group);
 }
 for(const p of design.parts){if(p.kind==='display')continue;let m;const invStart=inventory.length;
  if(p.kind==='plate'||p.kind==='tube')m=prism(p);
  else if(p.kind==='slope')m=sloped(p);
  else if(p.kind==='wet'){
   const s=new T.Shape();s.moveTo(p.y,p.z);s.lineTo(p.y+p.d,p.z+p.rise);s.lineTo(p.y+p.d,p.z+p.rise-p.thickness);s.lineTo(p.y,p.z-p.thickness);s.closePath();
   const g=new T.ExtrudeGeometry(s,{depth:p.w,bevelEnabled:false});g.applyMatrix4(new T.Matrix4().makeBasis(loc(0,1,0),loc(0,0,1),loc(1,0,0)));g.translate(...loc(p.x,0,0).toArray());m=add(g,mat.floor,p.name,'floor');
   for(let y=p.y+20;y<p.y+p.d-20;y+=65)for(let x=p.x+20;x<p.x+p.w-20;x+=65){const z=p.z+(y-p.y)*p.rise/p.d+.7;const r=box(x,y,z,20,3,1,mat.edge,'Рифлі настилу','floor');r.rotation.y=.5;}
  }else if(p.kind==='cylinder'&&p.innerRadius){const g=new T.LatheGeometry([new T.Vector2(p.innerRadius,-p.length/2),new T.Vector2(p.radius,-p.length/2),new T.Vector2(p.radius,p.length/2),new T.Vector2(p.innerRadius,p.length/2),new T.Vector2(p.innerRadius,-p.length/2)],p.segments||24);m=add(g,mat[p.material],p.name,p.group);if(p.axis==='x')m.rotation.z=Math.PI/2;if(p.axis==='y')m.rotation.x=Math.PI/2;m.position.copy(loc(...p.positionMm));}else if(p.kind==='cylinder')m=cylinder(...p.positionMm,p.radius,p.length,mat[p.material],p.name,p.axis==='y'?'depth':p.axis==='z'?'vertical':'x',p.group);
  else if(p.kind==='cushion')m=rounded(...p.positionMm,...p.sizeMm,8,mat[p.material],p.name,p.group);
  else m=box(...p.positionMm,...p.sizeMm,mat[p.material],p.name,p.group);
  inventory.splice(invStart);inventory.push(p);m.userData.partId=p.id;m.userData.sizeMm=p.sizeMm;m.userData.design=p;
  if(p.moving)moving.add(m);
  if(p.group==='doors'){m.position.sub(doorPivot.position);doorPivot.add(m);}
 }
 function setDoors(open){doorPivot.rotation.y=open?Math.PI*.55:0;document.getElementById('open-doors').checked=open;}
 const wireM=[0x2f3438,0x2f3438,0x2f3438].map(color=>new T.MeshStandardMaterial({color,roughness:.8}));let dynamic=[];
 function wire(points,i,name){return add(new T.TubeGeometry(new T.CatmullRomCurve3(points.map(p=>loc(...p))),50,2.5,8,false),wireM[i],name,'cables');}
 function setLift(height){const lo=(design.liftTravelMm?design.liftTravelMm[0]:1000)+60,hi=(design.liftTravelMm?design.liftTravelMm[1]:1500)-60,base=design.cameraNeutralZMm||1260;height=Math.max(lo,Math.min(hi,height));moving.position.y=height-base;for(const m of dynamic){groups.cables.remove(m);m.geometry.dispose();}dynamic=[];
  for(let i=0;i<3;i++){const x=1524+i*8;dynamic.push(wire([[x,600,980],[x,610,850],[x,690,850],[x,700,height+60],[1517,565,height+60]],i,['USB до камери','Контакт синхронізації камери','Низьковольтне живлення камери'][i]));}
  document.getElementById('lift-value').textContent=height+' мм';
 }
 wire([[1524,600,980],[1540,600,620],[1460,592,420]],0,'USB → комп’ютер; для висування полиці потрібен сервісний запас');
 wire([[1532,600,980],[1540,810,950],[1480,810,800]],1,'Нерухомий SYNC → MS200V');
 wire([[1540,600,980],[1540,580,200],[1480,450,200]],2,'Нерухоме низьковольтне живлення');
 wire([[1180,250,480],[1480,250,480],[1540,500,700]],0,'HDMI / USB сенсора → ПК, у внутрішньому коробі');
 wire([[1200,330,400],[1480,330,400],[1540,500,500]],1,'USB/Ethernet DS-RX1HS + HL-L5210DN + duplex-сканер → ПК, у технічному коробі');
 wire([[1540,500,600],[1560,500,2050],[1100,980,2150],[200,980,2150]],2,'24 В LED → стельова порожнина, вздовж правої стіни та заднього краю');
 wire([[1500,700,900],[1540,780,850],[1540,600,700]],1,'PC-sync → MS200V 3,5 мм у правому технічному коробі');
 wire([[760,50,2080],[1100,20,2120],[1540,200,2060]],0,'Imou Cue 2 → LAN/БЖ під вивіскою та в правому коробі');
 // Screen artwork follows the same console basis and lies inside its opening.
 const ui=document.createElement('canvas');ui.width=720;ui.height=480;const ctx=ui.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,720,480);ctx.fillStyle='#365b48';ctx.font='bold 38px Arial';ctx.fillText('Оберіть послугу',35,68);
 for(const [i,label] of ['Документи','Фото','Текст','Копія'].entries()){ctx.fillStyle=['#dce8d5','#e8dfcc','#d5e4e4','#e4dce8'][i];ctx.fillRect(18+i*174,120,164,270);ctx.fillStyle='#365b48';ctx.font='bold 24px Arial';ctx.fillText(label,28+i*174,348);ctx.strokeStyle='#708c79';ctx.lineWidth=4;ctx.strokeRect(44+i*174,168,88,108);}
 const tx=new T.CanvasTexture(ui);tx.colorSpace=T.SRGBColorSpace;tx.center.set(.5,.5);tx.rotation=-Math.PI/2;const display=design.parts.find(p=>p.kind==='display'),L=Math.hypot(display.ends[1][0]-display.ends[0][0],display.ends[1][1]-display.ends[0][1]),dx=(display.ends[1][0]-display.ends[0][0])/L,dz=(display.ends[1][1]-display.ends[0][1])/L;
 const screenGeometry=new T.PlaneGeometry(L-4,display.depth-4);screenGeometry.applyMatrix4(new T.Matrix4().makeBasis(loc(dx,0,dz),loc(0,1,0),loc(-dz,0,dx)));screenGeometry.translate(...loc((display.ends[0][0]+display.ends[1][0])/2-dz*18,display.y+display.depth/2,(display.ends[0][1]+display.ends[1][1])/2+dx*18).toArray());
 const screenMesh=add(screenGeometry,new T.MeshBasicMaterial({map:tx,side:T.DoubleSide}),'Екран вибору послуги','module');screenMesh.userData.partId=display.id;screenMesh.userData.design=display;inventory.push(display);

 const signCanvas=document.createElement('canvas');signCanvas.width=1600;signCanvas.height=164;const sc=signCanvas.getContext('2d');sc.fillStyle='white';sc.fillRect(0,0,1600,164);sc.fillStyle='#202020';sc.font='bold 100px Arial';sc.textAlign='center';sc.textBaseline='middle';sc.fillText('ФОТОБУДКА',800,88);
 const st=new T.CanvasTexture(signCanvas);st.colorSpace=T.SRGBColorSpace;
 const sm=add(new T.PlaneGeometry(1500,140),new T.MeshBasicMaterial({map:st,side:T.DoubleSide}),'Напис ФОТОБУДКА на білій вивісці','front');sm.position.copy(loc(800,-1,2102));
 const roofEl=document.getElementById('roof');if(roofEl){roofEl.checked=true;roofEl.dispatchEvent(new Event('change'));} setLift(1260);
 // Pleated curtain is a real double-sided folded surface, not intersecting flat polygons.
 groups.curtain.visible=false;
 const ambient=new T.HemisphereLight(0xffffff,0xbfc3ca,2.3);scene.add(ambient);const sun=new T.DirectionalLight(0xffffff,3.1);sun.position.set(-1300,3300,1700);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-2500,right:2500,top:2600,bottom:-2600,near:50,far:7000});sun.shadow.bias=-.0003;scene.add(sun);const fill=new T.DirectionalLight(0xe3f0ff,1.5);fill.position.set(2400,1800,-1800);scene.add(fill);
 const ground=new T.Mesh(new T.PlaneGeometry(15000,15000),new T.MeshStandardMaterial({color:0xe5e8de,roughness:1}));ground.rotation.x=-Math.PI/2;ground.position.y=0;ground.receiveShadow=true;scene.add(ground);
 function resize(){const w=host.clientWidth,h=host.clientHeight;if(w<1||h<1)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();render();}
 function render(){
  if(view==='top'){
   const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight),span=900;
   ortho.left=-span;ortho.right=span;ortho.top=span*h/w;ortho.bottom=-span*h/w;
   ortho.position.set(800,5000,-500);ortho.up.set(0,0,-1);ortho.lookAt(800,0,-500);ortho.updateProjectionMatrix();
   renderer.render(scene,ortho);return;
  }
  camera.position.set(target.x+radius*Math.sin(az)*Math.cos(el),target.y+radius*Math.sin(el),target.z+radius*Math.cos(az)*Math.cos(el));if(el>1.2)camera.up.set(0,0,-1);else camera.up.set(0,1,0);camera.lookAt(target);renderer.render(scene,camera);
 }
 function setView(v){
  view=v;
  const specs={
   inside:{t:[650,900,-536],az:-1.3,el:.34,r:2400,cap:'Погляд через вхід у повну кабіну. Жодна деталь не прихована кнопкою ракурсу.'},
   outside:{t:[800,1050,-180],az:-.28,el:.16,r:4500,cap:'Чистий зовнішній корпус. Каркас, кабелі й кріплення залишаються всередині оболонки.'},
   module:{t:[1155,650,-536],az:-1.35,el:.42,r:1300,cap:'Гостьовий фасад консолі: екран на похилій панелі, слот сканера й кишеня видачі на рівні ніг. Камера на ліфті — вище, над консоллю, а не крізь екран.'},
   top:{t:[800,0,-500],az:0,el:1.56,r:2100,cap:'Повна збірка зверху. Для огляду внутрішніх деталей увімкніть «Прозора оболонка».'},
   service:{t:[1480,1080,-500],az:2.45,el:.16,r:3000,cap:'Ракурс сервісної сторони. Люк відкривається лише окремим перемикачем.'},
   frame:{t:[800,1100,-500],az:-.55,el:.28,r:4300,cap:'Технічний ракурс тієї самої збірки. Увімкніть прозору оболонку, щоб побачити каркас і кабелі.'}
  };
  const s=specs[v]||specs.inside;
  target.set(...s.t);az=s.az;el=s.el;radius=s.r;
  camera.fov=v==='top'?48:36;camera.updateProjectionMatrix();
  const cap=document.querySelector('.model-caption');if(cap)cap.textContent=s.cap;
  const explain=document.getElementById('view-explain');if(explain)explain.textContent=s.cap;
  document.querySelectorAll('[data-view]').forEach(n=>n.classList.toggle('active',n.dataset.view===v));
  resize();
 }
 function setShellTransparent(on){
  for(const key of ['walls','roof','front','module','bench','floor','curtain','doors'])groups[key].traverse(o=>{
   if(!o.isMesh)return;
   if(!o.userData.opaqueMaterial)o.userData.opaqueMaterial=o.material;
   if(on){
    const m=o.userData.opaqueMaterial.clone();m.transparent=true;m.opacity=.14;m.depthWrite=false;o.material=m;
   }else o.material=o.userData.opaqueMaterial;
  });
  render();
 }
 let drag=null,dist=0;renderer.domElement.addEventListener('pointerdown',e=>{drag=[e.clientX,e.clientY];dist=0;renderer.domElement.setPointerCapture(e.pointerId);});renderer.domElement.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag[0],dy=e.clientY-drag[1];dist+=Math.abs(dx)+Math.abs(dy);az-=dx*.007;el=Math.max(-.15,Math.min(1.53,el+dy*.005));drag=[e.clientX,e.clientY];render();});renderer.domElement.addEventListener('pointerup',e=>{drag=null;if(dist>5)return;const r=renderer.domElement.getBoundingClientRect(),pointer=new T.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),ray=new T.Raycaster();ray.setFromCamera(pointer,view==='top'?ortho:camera);const visible=[];booth.traverseVisible(o=>{if(o.isMesh)visible.push(o);});const hit=ray.intersectObjects(visible,false)[0];if(hit)document.getElementById('part-info').textContent=hit.object.userData.partId+' · '+hit.object.name+(hit.object.userData.sizeMm?' · '+hit.object.userData.sizeMm.map(n=>Math.round(n*10)/10).join(' × ')+' мм':'');});renderer.domElement.addEventListener('pointercancel',()=>drag=null);renderer.domElement.addEventListener('wheel',e=>{e.preventDefault();radius=Math.max(1200,Math.min(6500,radius*Math.exp(e.deltaY*.001)));render();},{passive:false});
 document.getElementById('transparent-shell').onchange=e=>setShellTransparent(e.target.checked);
 document.getElementById('curtain').onchange=e=>{groups.curtain.visible=e.target.checked;render();};
 document.getElementById('reset-view').onclick=()=>setView(view);
 document.getElementById('open-doors').onchange=e=>{if(e.target.checked)groups.doors.visible=true;setDoors(e.target.checked);render();};
 document.getElementById('lift-height').oninput=e=>{setLift(+e.target.value);render();};
 function exportOBJ(){booth.updateMatrixWorld(true);let result='# Photobooth revision 07; millimetres; Y up. Layout model, not manufacturing drawing.\n',offset=1;booth.traverse(o=>{if(!o.isMesh)return;const g=o.geometry.index?o.geometry.toNonIndexed():o.geometry,p=g.getAttribute('position'),v=new T.Vector3();result+='o '+o.id+'\n';for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).applyMatrix4(o.matrixWorld);result+=`v ${v.x} ${v.y} ${v.z}\n`;}for(let i=0;i<p.count;i+=3)result+=`f ${offset+i} ${offset+i+2} ${offset+i+1}\n`;offset+=p.count;});return result;}
 document.getElementById('export-model').onclick=()=>{const url=URL.createObjectURL(new Blob([exportOBJ()],{type:'text/plain'})),a=document.createElement('a');a.href=url;a.download='photobooth-revision-07.obj';a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);};
 new ResizeObserver(resize).observe(host);setView('inside');window.boothViewer={scene,booth,renderer,camera,groups,setView,render,exportOBJ,inventory,setDoors,setLift,version:7,inspectPart(id){
  const p=design.parts.find(p=>p.id===id);if(!p)return;setView('outside');
  Object.values(groups).forEach(g=>g.visible=true);booth.traverse(o=>{if(o.isMesh)o.visible=o.userData.partId===id||o.userData.design?.host===id||o.userData.partId===p.support;});
  const selected=[];booth.traverse(o=>{if(o.userData.partId===id)selected.push(o);});booth.updateMatrixWorld(true);const b=new T.Box3();selected.forEach(o=>b.expandByObject(o));if(!b.isEmpty()){b.getCenter(target);radius=Math.max(600,b.getSize(new T.Vector3()).length()*1.8);az=-.8;el=.25;}render();
 },restore(){booth.traverse(o=>{if(o.isMesh)o.visible=true;});setView('inside');render();}};return window.boothViewer;
};


