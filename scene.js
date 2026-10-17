'use strict';
// The title is a live, code-drawn library, rather than a cover image.
const lobby=$('lobby'),lobbyContext=lobby.getContext('2d');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let lastFrame=0,lastStep=0,lastRoom=state.room;
function archWindow(x,y,w,h){ctx.save();ctx.beginPath();ctx.moveTo(x-w/2,y+h);ctx.lineTo(x-w/2,y+w/2);ctx.arc(x,y+w/2,w/2,Math.PI,0);ctx.lineTo(x+w/2,y+h);ctx.closePath();ctx.fillStyle='#152d47';ctx.fill();ctx.strokeStyle='#907653';ctx.lineWidth=9;ctx.stroke();ctx.clip();for(let i=0;i<20;i++){const sx=x-w/2+(i*53%w),sy=y+20+(i*71%(h-20));circle(sx,sy,i%3===0?2:1,'#e8bb6390');}circle(x+18,y+80,26,'#e8d5a0');circle(x+29,y+72,24,'#152d47');rect(x-3,y,6,h,'#907653');rect(x-w/2,y+h*.64,w,5,'#907653');ctx.restore();}
function lantern(x,y,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);const sway=reducedMotion.matches?0:Math.sin(animationTime*.75+x)*.035;ctx.rotate(sway);rect(-1,-100,2,98,'#a38859');glow(0,10,C.gold,145);rect(-18,-12,36,46,'#b3915d');rect(-12,-6,24,32,'#ffdb8c');rect(-3,-6,6,32,'#fff1c7');rect(-22,-17,44,6,'#7d5d3e');rect(-22,33,44,6,'#7d5d3e');ctx.restore();}
function bookcase(x,y,w,h,seed){rect(x-9,y-12,w+18,h+25,'#211e2b');rect(x,y,w,h,'#3c2d30');rect(x-12,y-15,w+24,14,'#805940');for(let row=0;row<5;row++){const yy=y+row*h/5;for(let b=0;b<Math.floor(w/19);b++){const bh=32+((b*13+row*23+seed)%32),bx=x+8+b*19;const colors=['#ad7860','#386c6b','#a66c84','#b59a65','#58697d'];rect(bx,yy+h/5-bh-9,13,bh,colors[(b+row+seed)%5]);rect(bx+2,yy+h/5-bh-2,9,2,'#e8bb6380');rect(bx+2,yy+h/5-18,9,1,'#fff4df50');}rect(x-5,yy+h/5-9,w+10,10,'#89634b');rect(x,yy+h/5+1,w,4,'#1b1720');}rect(x-8,y,10,h+12,'#73513e');rect(x+w-2,y,10,h+12,'#73513e');}
function floatingPage(x,y,phase){ctx.save();const t=reducedMotion.matches?0:animationTime;ctx.translate(x+Math.sin(t*.6+phase)*14,y+Math.sin(t*.9+phase)*15);ctx.rotate(Math.sin(t*.7+phase)*.13);glow(0,0,C.gold,65);rect(-17,-23,34,46,C.cream);rect(-12,-16,24,2,C.gold);for(let i=0;i<4;i++)rect(-12,-7+i*7,20-(i%2)*5,1,'#a78b69');ctx.restore();}
function drawLobby(){const previous=ctx;ctx=lobbyContext;const w=1600,h=1000;rect(0,0,w,h,'#18243a');const bg=ctx.createLinearGradient(0,0,0,h);bg.addColorStop(0,'#122035');bg.addColorStop(.57,'#354047');bg.addColorStop(1,'#6c5144');ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
 // Tall windows and shelves frame an open central aisle.
 for(const x of [220,800,1380])archWindow(x,85,155,390);
 for(const [x,y,bw,bh,seed]of [[-20,190,180,460,1],[330,215,170,410,3],[1100,215,170,410,2],[1440,190,180,460,4]])bookcase(x,y,bw,bh,seed);
 rect(0,650,w,7,'#ab835c');const floor=ctx.createLinearGradient(0,650,0,1000);floor.addColorStop(0,'#75604d');floor.addColorStop(1,'#3a3336');ctx.fillStyle=floor;ctx.fillRect(0,657,w,343);ctx.strokeStyle='#b28b5830';ctx.lineWidth=2;for(let i=-8;i<=8;i++){ctx.beginPath();ctx.moveTo(800+i*62,657);ctx.lineTo(800+i*190,1000);ctx.stroke();}for(const yy of [705,770,860,980]){ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(w,yy);ctx.stroke();}
 ctx.fillStyle='#234c51';ctx.beginPath();ctx.moveTo(650,657);ctx.lineTo(950,657);ctx.lineTo(1130,1000);ctx.lineTo(470,1000);ctx.closePath();ctx.fill();ctx.strokeStyle='#ba996a';ctx.lineWidth=3;ctx.stroke();for(let i=0;i<5;i++)label('✧',800,710+i*66,24,'#d4b27855');
 lantern(170,215,1.15);lantern(1430,215,1.15);lantern(510,120,.8);lantern(1090,120,.8);
 // A pedestal and open book at the end of the aisle.
 glow(800,610,C.gold,180);rect(760,620,80,80,'#71513e');rect(741,612,118,15,'#a58057');ctx.save();ctx.translate(800,593);ctx.rotate(-.04);rect(-63,-17,126,38,'#a98155');rect(-59,-22,118,37,C.cream);rect(-2,-22,4,37,C.gold);for(let i=0;i<4;i++){rect(-49,-14+i*7,36,1,'#ae9270');rect(12,-14+i*7,36,1,'#ae9270');}ctx.restore();
 for(const [x,y,p]of [[580,480,0],[1010,445,1.7],[1155,610,3],[405,660,4.5]])floatingPage(x,y,p);
 for(let i=0;i<36;i++){const t=reducedMotion.matches?0:animationTime;const x=(i*137.1+Math.sin(t*.3+i)*16)%1600,y=120+((i*97+t*7)%790);circle(x,y,1.3+i%2,i%3?'#e8bb6360':'#d98fa880');}
 // Reuse the same character renderer as gameplay, preserving start.ng appearance.
 ctx.save();ctx.translate(800,850);ctx.scale(2.6,2.6);avatar({x:-.5,y:-.5});ctx.restore();
 for(const x of [87,1510]){rect(x-24,865,48,47,'#90604d');for(let i=0;i<5;i++){rect(x-15+i*8,824,2,42,'#467b6d');circle(x-15+i*8,819+(i%2)*12,12,C.pink);circle(x-15+i*8,819+(i%2)*12,4,C.gold);}}
 const vignette=ctx.createRadialGradient(800,510,180,800,510,1000);vignette.addColorStop(0,'#0b142300');vignette.addColorStop(1,'#080f24a0');ctx.fillStyle=vignette;ctx.fillRect(0,0,w,h);ctx=previous;}
function animate(now){requestAnimationFrame(animate);if(document.hidden||now-lastFrame<32)return;const dt=Math.min((now-lastFrame)/1000,.08);lastFrame=now;animationTime=reducedMotion.matches?0:now/1000;
 if(playing){if(lastRoom!==state.room||Math.abs(visualPosition.x-state.position.x)+Math.abs(visualPosition.y-state.position.y)>14){visualPosition={...state.position};lastRoom=state.room;}
 if(!modal.open&&walkRoute.length&&now-lastStep>145){const next=walkRoute.shift();if(!wall(next.x,next.y)){state.position=next;save();updateNearby();}else walkRoute=[];lastStep=now;}
 const ease=reducedMotion.matches?1:1-Math.exp(-dt*19);visualPosition.x+=(state.position.x-visualPosition.x)*ease;visualPosition.y+=(state.position.y-visualPosition.y)*ease;
 if(!modal.open){draw();if(!reducedMotion.matches){for(let i=0;i<13;i++){const x=80+(i*71)%810,y=90+(i*47+animationTime*8)%480;circle(x,y,1.2,'#e8bb6360');}}}
 }else drawLobby();}
drawLobby();requestAnimationFrame(animate);
