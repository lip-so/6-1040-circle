import {POSES,PALETTE,figureMarkup,illustrationSvg} from './motion.js';
const data=await(await fetch('./rigs.json')).json();
const blobs=Object.fromEntries(await Promise.all(Object.entries(data.rigs).map(async([k,r])=>{const b=await(await fetch(r.atlas)).blob();const s=await new Promise(resolve=>{const f=new FileReader();f.onload=()=>resolve(f.result);f.readAsDataURL(b)});return[k,s]})));
const stage=document.querySelector('#stage'),poseEl=document.querySelector('#pose'),figureEl=document.querySelector('#figure'),playEl=document.querySelector('#play');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let playing=false,motionWeight=0,current={...POSES.welcome,name:'welcome'},transition=null,raf=null,last=performance.now(),active=0;
const keys=()=>figureEl.value==='all'?Object.keys(data.rigs):[figureEl.value];
const slots={lilt:[255,190,.64],gather:[600,210,.62],lean:[935,185,.64]};
poseEl.innerHTML=Object.keys(POSES).map(p=>`<option value="${p}">${p[0].toUpperCase()+p.slice(1)}</option>`).join('');poseEl.value='welcome';
function render(){let markup='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 650" role="img" aria-label="Circle cut-paper figures"><title>Circle figures · '+poseEl.value+'</title><path d="M 250 420 C 450 180 770 625 945 350" fill="none" stroke="#DCE7F3" stroke-width="2"/><path d="M 506 140 C 470 89 550 69 578 113 C 610 154 536 192 507 142" fill="none" stroke="#E74735" stroke-width="3"/><circle cx="1075" cy="420" r="8" fill="#2455A4"/><circle cx="141" cy="315" r="5" fill="#E74735"/>';
 keys().forEach(key=>{const[x,y,scale]=keys().length===1?[600,195,.66]:slots[key];markup+=`<g id="rig-${key}" transform="translate(${x} ${y}) scale(${scale})">${figureMarkup(data.rigs[key],blobs[key],{pose:current,color:key==='gather'?PALETTE.vermilion:PALETTE.ultramarine,id:'stage-'+key})}</g>`});stage.innerHTML=markup+'</svg>';}
function draw(){keys().forEach((key,i)=>figureMarkup(data.rigs[key],'',{pose:current,time:active+i*.4,animate:motionWeight>0,motionWeight,target:document.querySelector('#rig-'+key)}));}
const mix=(a,b,t)=>a+(b-a)*t;
function frame(now){raf=null;if(document.hidden)return;const dt=Math.min(50,now-last);last=now;active+=dt/1000;
 if(transition){const u=Math.min(1,(now-transition.start)/380),e=u*u*(3-2*u),a=transition.from,b=transition.to;current={name:b.name,open:b.open,body:mix(a.body,b.body,e),head:mix(a.head,b.head,e),arms:a.arms.map((v,i)=>mix(v,b.arms[i],e)),legs:a.legs.map((v,i)=>mix(v,b.legs[i],e))};if(u===1)transition=null;}
 const goal=playing&&!reduced.matches?1:0;motionWeight+=Math.sign(goal-motionWeight)*Math.min(Math.abs(goal-motionWeight),dt/400);draw();
 if(transition||playing||Math.abs(goal-motionWeight)>.001)raf=requestAnimationFrame(frame);
}
function schedule(){if(!raf){last=performance.now();raf=requestAnimationFrame(frame);}}
function changePose(){const to={...POSES[poseEl.value],name:poseEl.value};if(reduced.matches){current=to;transition=null;}else{transition={from:current,to,start:performance.now()};current={...current,open:to.open};}render();schedule();}
function stop(){playing=false;playEl.textContent='Play motion';playEl.setAttribute('aria-pressed','false');schedule();}
playEl.onclick=()=>{if(playing)stop();else if(!reduced.matches){playing=true;playEl.textContent='Pause motion';playEl.setAttribute('aria-pressed','true');schedule();}};
document.addEventListener('visibilitychange',()=>{if(document.hidden){playing=false;motionWeight=0;cancelAnimationFrame(raf);raf=null;playEl.textContent='Play motion';playEl.setAttribute('aria-pressed','false');}else{render();schedule();}});
reduced.addEventListener('change',()=>{if(reduced.matches){motionWeight=0;transition=null;current={...POSES[poseEl.value],name:poseEl.value};stop();render();}});
poseEl.onchange=changePose;figureEl.onchange=()=>{render();schedule();};
document.querySelector('#poses').innerHTML=Object.keys(POSES).map((pose,i)=>{const key=i%3===1?'gather':'lilt';return `<div class="pose" tabindex="0" role="button" aria-label="Preview ${pose}" data-pose="${pose}">${illustrationSvg(data.rigs[key],blobs[key],{pose,color:key==='gather'?PALETTE.vermilion:PALETTE.ultramarine,id:'pose-'+pose})}<p>${pose[0].toUpperCase()+pose.slice(1)} <small>0${i+1}</small></p></div>`}).join('');
document.querySelectorAll('[data-pose]').forEach(el=>{const change=()=>{poseEl.value=el.dataset.pose;changePose();stage.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'nearest'});};el.onclick=change;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();change();}}});
document.querySelector('#swatches').innerHTML=Object.entries(PALETTE).map(([name,color])=>`<div class="swatch"><i style="background:${color}"></i>${name.replace(/([A-Z])/g,' $1')}<span>${color}</span></div>`).join('');
document.querySelector('#download').onclick=()=>{const key=figureEl.value==='all'?'lilt':figureEl.value;const svg=illustrationSvg(data.rigs[key],blobs[key],{pose:poseEl.value,color:key==='gather'?PALETTE.vermilion:PALETTE.ultramarine,id:'export'});const u=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));const a=document.createElement('a');a.href=u;a.download=`circle-${key}-${poseEl.value}.svg`;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);};render();
