/* Circle cut-paper rig renderer. Angles are degrees clockwise from down. */
export const PALETTE = {ultramarine:'#2455A4',vermilion:'#E74735',ivory:'#F8F6F0',ink:'#252525',dustyBlue:'#DCE7F3',paleCoral:'#F9DFD8'};
export const POSES = {
  rest: {body:-3,head:8,arms:[14,-9,-14,8],legs:[8,-4,-8,4]},
  welcome: {body:-6,head:9,arms:[43,-34,-126,-24],legs:[12,-6,-12,5],open:true},
  reach: {body:8,head:-10,arms:[-67,-23,-102,6],legs:[23,-17,-17,9],open:true},
  listen: {body:-7,head:17,arms:[20,-80,-17,15],legs:[9,-3,-8,3]},
  remember: {body:6,head:-13,arms:[-32,-75,26,65],legs:[8,-8,-11,5]},
  walk: {body:4,head:-6,arms:[-32,8,32,-18],legs:[-25,35,26,-15]},
  celebrate: {body:-8,head:12,arms:[132,16,-132,-18],legs:[29,-13,-22,15],open:true},
  connect: {body:-5,head:10,arms:[94,-5,-94,5],legs:[16,-7,-14,9],open:true}
};
const rad = d => d*Math.PI/180;
const rotate = (x,y,a) => [x*Math.cos(rad(a))-y*Math.sin(rad(a)),x*Math.sin(rad(a))+y*Math.cos(rad(a))];
const n = x => Number(x.toFixed(3));
export function colorFilter(id,color) {
 const rgb = color.replace('#','').match(/../g).map(c=>parseInt(c,16)/255);
 return `<filter id="${id}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 ${rgb[0]} 0 0 0 0 ${rgb[1]} 0 0 0 0 ${rgb[2]} 0 0 0 1 0"/></filter>`;
}
export function partMarkup(rig,key,href,x=0,y=0,angle=0,length=null) {
 const p=rig.parts[key], [fx,fy,fw,fh]=p.frame, [px,py]=p.pivot;
 const s=length ? length/Math.max(1,p.end[1]-py) : 1;
 const local=rotate((p.end[0]-px)*s,(p.end[1]-py)*s,angle);
 return {end:[x+local[0],y+local[1]],markup:`<g data-part="${key}" transform="translate(${n(x)} ${n(y)}) rotate(${n(angle)})"><svg x="${n(-px*s)}" y="${n(-py*s)}" width="${n(fw*s)}" height="${n(fh*s)}" viewBox="${fx} ${fy} ${fw} ${fh}" overflow="hidden"><image href="${href}" width="${rig.size[0]}" height="${rig.size[1]}"/></svg></g>`};
}
export function figureMarkup(rig,href,{pose='rest',time=0,animate=false,motionWeight=1,color=PALETTE.ultramarine,id='figure',target=null}={}) {
 const base=typeof pose==='object'?pose:(POSES[pose]||POSES.rest);
 const p={...base,arms:[...base.arms],legs:[...base.legs]};
 const s=Math.sin(time*2*Math.PI/3.8), c=Math.cos(time*2*Math.PI/3.8);
 if(animate){
  p.body+=s*1.7*motionWeight; p.head+=c*2*motionWeight;
  const name=typeof pose==='object'?pose.name:pose;
  if(name==='walk') {const aa=[s*29,8,-s*29,-18],ll=[s*27,Math.max(0,-s)*38,-s*27,Math.max(0,s)*38];p.arms=p.arms.map((v,i)=>v+(aa[i]-v)*motionWeight);p.legs=p.legs.map((v,i)=>v+(ll[i]-v)*motionWeight);}
  else if(name==='welcome') p.arms[3]+=Math.sin(time*3)*8*motionWeight;
  else if(name==='celebrate') {p.arms[1]+=s*6*motionWeight;p.arms[3]-=s*6*motionWeight;}
  else {p.arms[0]+=s*2*motionWeight;p.arms[2]-=s*2*motionWeight;}
 }
 const sz=rig.proportions, torso=rig.parts.torso;
 const scale=sz.torso/torso.frame[3];
 const [tx,ty,tw,th]=torso.frame;
 let chunks=[];
 function segment(key,x,y,angle,length){
  if(target){const el=target.querySelector(`[data-part="${key}"]`);if(el)el.setAttribute('transform',`translate(${n(x)} ${n(y)}) rotate(${n(angle)})`);const pt=rig.parts[key],sc=length/(pt.end[1]-pt.pivot[1]);const e=rotate((pt.end[0]-pt.pivot[0])*sc,length,angle);return[x+e[0],y+e[1]];}
  const q=partMarkup(rig,key,href,x,y,angle,length);chunks.push(q.markup);return q.end;
 }
 function limb(upper,lower,x,y,a,b,l1,l2){const e=segment(upper,x,y,a,l1);
  if(target){const joint=target.querySelector(`[data-joint="${upper}"]`);joint?.setAttribute('cx',n(e[0]));joint?.setAttribute('cy',n(e[1]));}
  else chunks.push(`<circle data-joint="${upper}" cx="${n(e[0])}" cy="${n(e[1])}" r="8" fill="${color}"/>`);
  segment(lower,...e,a+b,l2);
 }
 // Back limbs, torso, then foreground limbs: every joint has deliberate overlap.
 limb('thighR','shinR',26,sz.torso-67,p.legs[2],p.legs[3],sz.thigh,sz.shin);
 limb('upperArmR',p.open?'openForearmR':'forearmR',rig.shoulders?.[1]??45,30,p.arms[2],p.arms[3],sz.upperArm,sz.forearm);
 limb('thighL','shinL',-26,sz.torso-67,p.legs[0],p.legs[1],sz.thigh,sz.shin);
 if(!target)chunks.push(`<g data-part="torso"><svg x="${n(-tw*scale/2)}" y="-12" width="${n(tw*scale)}" height="${sz.torso}" viewBox="${tx} ${ty} ${tw} ${th}" overflow="hidden"><image href="${href}" width="${rig.size[0]}" height="${rig.size[1]}"/></svg></g>`);
 const head=rig.parts.head, hs=sz.head/head.frame[3];
 const [hx,hy,hw,hh]=head.frame;
 if(target)target.querySelector('[data-part="head"]').setAttribute('transform',`translate(0 14) rotate(${n(p.head)})`);
 else chunks.push(`<g data-part="head" transform="translate(0 14) rotate(${n(p.head)})"><svg x="${n(-head.pivot[0]*hs)}" y="${n(-head.pivot[1]*hs)}" width="${n(hw*hs)}" height="${n(hh*hs)}" viewBox="${hx} ${hy} ${hw} ${hh}" overflow="hidden"><image href="${href}" width="${rig.size[0]}" height="${rig.size[1]}"/></svg></g>`);
 limb('upperArmL',p.open?'openForearmL':'forearmL',rig.shoulders?.[0]??-45,30,p.arms[0],p.arms[1],sz.upperArm,sz.forearm);
 const transform=`translate(0 ${animate?s*3*motionWeight:0}) rotate(${n(p.body)})`;
 if(target){target.querySelector('[data-body]').setAttribute('transform',transform);return '';}
 return `<defs>${colorFilter(id,color)}</defs><g data-body="true" filter="url(#${id})" transform="${transform}">${chunks.join('')}</g>`;
}
export function illustrationSvg(rig,href,opts={}) {
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-380 -250 760 1000" width="760" height="1000" role="img" aria-label="${opts.pose||'rest'} cut-paper figure"><title>Circle · ${opts.pose||'rest'}</title>${figureMarkup(rig,href,opts)}</svg>`;
}
