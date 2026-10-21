/** WCAG sRGB relative luminance; solid token pairs, not a complete accessibility audit. */
const luminance=(hex:string)=>{
  const values=hex.replace("#","").match(/../gu)!.map(x=>parseInt(x,16)/255).map(x=>x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4);
  return values[0]!*0.2126+values[1]!*0.7152+values[2]!*0.0722;
};
for(const [role,foreground,background] of [
  ["Body on cream","#252525","#f6f2e9"],["Card text on white","#20231f","#ffffff"],
  ["Muted on cream","#62615d","#f6f2e9"],["Blue status/focus on cream","#2455a4","#f6f2e9"],
  ["White on primary action","#ffffff","#b83225"],["White on action hover","#ffffff","#97271d"],
  ["Selected toggle","#fffefa","#2455a4"],["Placeholder on warm input","#73716a","#fffdf8"],
  ["Decorative vermilion on cream","#e74735","#f6f2e9"],["Quiet border on white","#d9d6ce","#ffffff"],
]) {
  const a=luminance(foreground!),b=luminance(background!);console.log(`${role}: ${foreground} / ${background} = ${((Math.max(a,b)+0.05)/(Math.min(a,b)+0.05)).toFixed(2)}:1`);
}
