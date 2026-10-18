import * as THREE from './vendor/three.module.js';

// A real WebGL library diorama. Word discoveries restore its lights and pages;
// the explorer is built from the same start.ng appearance data as the profile.
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const host=document.createElement('section');host.className='three-library';host.setAttribute('aria-label','Your living library');
const caption=document.createElement('p');caption.textContent='Your living library · drag to look around';host.append(caption);
const home=document.createElement('div');home.className='home-three';document.querySelector('#home').append(home);home.append(host);
let renderer;
try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{host.remove();home.remove();window.Library3D={available:false,reason:'WebGL unavailable'};}
if(renderer){
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label','Interactive 3D library. Drag or use arrow keys to turn. Tap the Great Book for a hint.');host.prepend(renderer.domElement);
 const scene=new THREE.Scene(),world=new THREE.Group();scene.add(world);const camera=new THREE.PerspectiveCamera(37,1,.1,80);camera.position.set(7,6.5,9);camera.lookAt(0,1.3,0);
 scene.add(new THREE.HemisphereLight(0xfff4df,0x35455a,2));const sun=new THREE.DirectionalLight(0xffe1ad,3);sun.position.set(3,8,4);scene.add(sun);
 const mats=new Map();function mat(color){if(!mats.has(color))mats.set(color,new THREE.MeshStandardMaterial({color,roughness:.75}));return mats.get(color);}
 function box(parent,w,h,d,color,x=0,y=0,z=0){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color));mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
 function ball(parent,r,color,x,y,z,sx=1,sy=1,sz=1){const m=new THREE.Mesh(new THREE.SphereGeometry(r,18,12),mat(color));m.scale.set(sx,sy,sz);m.position.set(x,y,z);parent.add(m);return m;}
 function cylinder(parent,rt,rb,h,color,x,y,z){const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,20),mat(color));m.position.set(x,y,z);parent.add(m);return m;}
 box(world,7,.25,5.6,'#795548',0,-.16,0);box(world,7,.14,.13,'#e8bb63',0,-.02,2.8);box(world,7,3.8,.22,'#243449',0,1.65,-2.7);box(world,.2,3.8,5.6,'#243449',-3.5,1.65,0);box(world,3.2,.025,3.3,'#247c78',0,.01,.3);box(world,3.4,.015,3.5,'#b99059',0,0,.3);
 function shelf(x,z,rotation=0){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rotation;world.add(g);box(g,1.6,3.2,.38,'#563e35',0,1.6,0);for(const xx of [-.8,.8])box(g,.12,3.3,.58,'#a47a52',xx,1.65,.1);for(let row=0;row<4;row++){box(g,1.7,.1,.62,'#9d7650',0,.16+row*.8,.1);for(let i=0;i<7;i++){const h=.4+((i+row)%3)*.09;box(g,.14,h,.34,['#247c78','#d98fa8','#e8bb63','#596d8d'][(i+row)%4],-.65+i*.21,.24+row*.8+h/2,.15);}}}
 shelf(-2.4,-2.35);shelf(-.45,-2.35);shelf(1.5,-2.35);shelf(-3.1,-1,Math.PI/2);shelf(-3.1,1,Math.PI/2);
 // Golden lanterns gain warmth as the player's collection grows.
 const lanterns=[];for(const [x,z]of [[-2.6,2],[2.8,-1.6]]){cylinder(world,.11,.15,2.3,'#997148',x,1.15,z);const bulb=new THREE.Mesh(new THREE.SphereGeometry(.22,16,12),new THREE.MeshStandardMaterial({color:0xffdfa0,emissive:0xffbc56,emissiveIntensity:.15}));bulb.position.set(x,2.5,z);world.add(bulb);const light=new THREE.PointLight(0xffc87b,.6,7);light.position.copy(bulb.position);world.add(light);lanterns.push({bulb,light});cylinder(world,.34,.18,.12,'#b68f4c',x,2.78,z);}
 const pedestal=new THREE.Group();pedestal.position.set(.9,0,.55);world.add(pedestal);box(pedestal,.75,.9,.8,'#795548',0,.45,0);box(pedestal,1.5,.12,1.05,'#a27a4f',0,.96,0);
 const book=new THREE.Group();book.position.set(0,1.1,0);pedestal.add(book);const left=box(book,.65,.09,.86,'#fff4df',-.34,0,0),right=box(book,.65,.09,.86,'#fff4df',.34,0,0);left.rotation.z=.1;right.rotation.z=-.1;box(book,.07,.11,.9,'#e8bb63',0,0,0);for(let i=0;i<5;i++){box(book,.42,.012,.015,'#a88f69',-.33,.06,-.27+i*.13);box(book,.42,.012,.015,'#a88f69',.33,.06,-.27+i*.13);}book.userData.action='hint';book.traverse(m=>{if(m.isMesh)m.userData.action='hint';});
 const pages=[];for(let i=0;i<12;i++){const p=box(world,.24,.025,.32,'#fff4df',1+Math.sin(i*1.3)*1.1,1.6+i*.1,.2+Math.cos(i)*.9);p.visible=false;p.userData.base=p.position.clone();pages.push(p);}
 const stars=new THREE.Group();world.add(stars);for(let i=0;i<16;i++){const s=new THREE.Mesh(new THREE.OctahedronGeometry(.035+(i%3)*.01),new THREE.MeshBasicMaterial({color:i%3?0xe8bb63:0xd98fa8}));s.position.set(Math.sin(i*2.1)*3,1+(i%6)*.4,Math.cos(i*1.7)*2.4);stars.add(s);}
 let explorer=new THREE.Group(),appearance='';world.add(explorer);const safe=(v,f)=>/^#[0-9a-f]{6}$/i.test(v||'')?v:f;
 function rebuildCharacter(s={}){world.remove(explorer);explorer.traverse(o=>{if(o.geometry)o.geometry.dispose();});explorer=new THREE.Group();explorer.position.set(-.85,0,1);world.add(explorer);const skin=safe(s.skinColor,'#b97d56'),hair=safe(s.hairColor,'#302839'),top=safe(s.primaryColor,'#247c78'),bottom=safe(s.secondaryColor,'#39445f');
  if(s.body==='female')cylinder(explorer,.2,.34,.42,bottom,0,.49,0);else box(explorer,.4,.4,.25,bottom,0,.5,0);
  for(const x of [-.12,.12]){box(explorer,.13,.3,.14,skin,x,.19,0);box(explorer,.17,.11,.25,'#18243a',x,.055,.04);}box(explorer,.5,.48,.3,top,0,.9,0);ball(explorer,.3,skin,0,1.4,0,1,1.12,1);for(const x of [-.35,.35]){const arm=cylinder(explorer,.07,.07,.5,skin,x,.85,0);arm.rotation.z=x<0?-.18:.18;ball(explorer,.08,skin,x,.6,0);}
  for(const x of [-.11,.11])ball(explorer,.035,'#18243a',x,1.43,.274);
  if(s.hair!=='bald'){ball(explorer,s.hair==='afro'?.38:.31,hair,0,1.59,-.03,1,.72,1);if(['braids','dreads','ponytail'].includes(s.hair))for(const x of [-.27,.27])cylinder(explorer,.055,.05,.6,hair,x,1.23,-.06);if(s.hair==='bun')ball(explorer,.15,hair,.15,1.85,-.1);}
  if(s.hat==='crown'){cylinder(explorer,.32,.31,.12,'#e8bb63',0,1.81,0);for(let i=0;i<5;i++){const p=new THREE.Mesh(new THREE.ConeGeometry(.055,.18,5),mat('#e8bb63'));p.position.set(Math.sin(i*Math.PI*2/5)*.25,1.95,Math.cos(i*Math.PI*2/5)*.25);explorer.add(p);}}
  if(['cap','beanie','tophat'].includes(s.hat)){cylinder(explorer,.29,.32,s.hat==='tophat'?.4:.18,top,0,s.hat==='tophat'?1.99:1.85,0);if(s.hat!=='beanie')cylinder(explorer,.4,.4,.045,top,0,1.78,.035);}
  if(s.accessory==='glasses')for(const x of [-.115,.115]){const ring=new THREE.Mesh(new THREE.TorusGeometry(.09,.014,6,18),mat('#e8bb63'));ring.position.set(x,1.43,.294);explorer.add(ring);}if(s.accessory==='earrings')for(const x of [-.3,.3])ball(explorer,.045,'#e8bb63',x,1.3,.05);
  if(s.accessory==='scarf'){cylinder(explorer,.24,.24,.1,'#d98fa8',0,1.12,0);box(explorer,.13,.3,.03,'#d98fa8',.1,.95,.18);}if(s.accessory==='beard')ball(explorer,.2,hair,0,1.23,.17,1,.7,.6);if(s.accessory==='backpack')box(explorer,.42,.45,.2,'#e8bb63',0,.88,-.22);
 }
 rebuildCharacter(style);
 let count=0,flash=0,targetRotation=0,pointer=null,expanded=false;
 function sync(){count=completed().length;const words=journalWords();pages.forEach((p,i)=>p.visible=i<count);lanterns.forEach(({bulb,light})=>{bulb.material.emissiveIntensity=.2+words.length*.025;light.intensity=.65+Math.min(words.length,30)*.04;});}
 function discover(){sync();flash=1;}
 addEventListener('library:progress',sync);addEventListener('library:word',discover);sync();
 function relocate(){if(expanded)return;if(inLevel){document.querySelector('.explorer').prepend(host);document.querySelector('#character').hidden=true;host.classList.add('mini-library');}else{home.append(host);host.classList.remove('mini-library');}}
 const observer=new MutationObserver(relocate);observer.observe(document.querySelector('#home'),{attributes:true,attributeFilter:['hidden']});relocate();
 function expand(){expanded=true;const wrap=document.createElement('div');wrap.className='library-tour';wrap.append(host);host.classList.add('expanded-library');show('Your living library.',[wrap,text('p','Drag to turn the room. Tap the open Great Book for a word clue. Each completed level adds a floating page, and your discoveries brighten the lanterns.')],[button('Back to the words',close,true)],'A LITTLE MAGIC, BROUGHT TO LIFE');}
 const tourButton=button('✧ Visit the library',expand);tourButton.id='visit-library';document.querySelector('.helper-actions').append(tourButton);
 document.querySelector('#modal').addEventListener('close',()=>{if(expanded){expanded=false;host.classList.remove('expanded-library');relocate();}});
 const ray=new THREE.Raycaster();renderer.domElement.addEventListener('pointerdown',e=>{pointer={x:e.clientX,y:e.clientY,last:e.clientX,moved:false};renderer.domElement.setPointerCapture(e.pointerId);});renderer.domElement.addEventListener('pointermove',e=>{if(!pointer)return;targetRotation+=(e.clientX-pointer.last)*.009;pointer.moved||=Math.abs(e.clientX-pointer.x)>5;pointer.last=e.clientX;});renderer.domElement.addEventListener('pointerup',e=>{if(!pointer)return;const moved=pointer.moved;pointer=null;if(moved)return;const r=renderer.domElement.getBoundingClientRect();ray.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera);if(ray.intersectObjects(world.children,true).some(hit=>hit.object.userData.action==='hint')){if(expanded)close();if(inLevel)document.querySelector('#hint').click();else toast('Every word restores a little magic. Choose a difficulty to begin.');flash=1;}});renderer.domElement.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();e.stopPropagation();targetRotation+=e.key==='ArrowLeft'?-.2:.2;}});
 let width=0,height=0,last=0;function render(now){requestAnimationFrame(render);if(document.hidden||now-last<40)return;last=now;const r=host.getBoundingClientRect(),h=Math.max(1,r.height-24);if(r.width<1||h<1)return;if(width!==Math.round(r.width)||height!==Math.round(h)){width=Math.round(r.width);height=Math.round(h);renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();}const signature=JSON.stringify(style);if(signature!==appearance){appearance=signature;rebuildCharacter(style);}const t=reduced.matches?0:now/1000;world.rotation.y+=(targetRotation-world.rotation.y)*.12;book.rotation.y=Math.sin(t*.4)*.06;book.position.y=1.1+Math.sin(t*1.5)*.025;explorer.rotation.y=Math.sin(t*.5)*.13;stars.rotation.y=t*.045;pages.forEach((p,i)=>{p.position.y=p.userData.base.y+Math.sin(t+i)*.08;p.rotation.y=t*.2+i;});flash*=.92;sun.intensity=3+flash*2;renderer.render(scene,camera);}
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();host.hidden=true;document.querySelector('#character').hidden=false;});
 window.Library3D={available:true,revision:THREE.REVISION,renderer,scene,world,book,pages,lanterns,get explorer(){return explorer;},get completedPages(){return count;}};
 requestAnimationFrame(render);
}

