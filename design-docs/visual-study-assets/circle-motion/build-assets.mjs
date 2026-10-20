import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {POSES,PALETTE,illustrationSvg,colorFilter} from './motion.js';
const root=path.dirname(fileURLToPath(import.meta.url));
const data=JSON.parse(await fs.readFile(path.join(root,'rigs.json'),'utf8'));
for(const [key,rig] of Object.entries(data.rigs)){
 const href='data:image/png;base64,'+(await fs.readFile(path.join(root,rig.atlas))).toString('base64');
 const color=key==='gather'?PALETTE.vermilion:PALETTE.ultramarine;
 await fs.mkdir(path.join(root,'poses',key),{recursive:true});
 await fs.mkdir(path.join(root,'parts',key),{recursive:true});
 for(const pose of Object.keys(POSES))await fs.writeFile(path.join(root,'poses',key,`${pose}.svg`),illustrationSvg(rig,href,{pose,color,id:`${key}-${pose}`}));
 for(const [name,p] of Object.entries(rig.parts)){
  const[x,y,w,h]=p.frame,id=`${key}-${name}`;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${w} ${h}" width="${w}" height="${h}" data-pivot-x="${p.pivot[0]}" data-pivot-y="${p.pivot[1]}" role="img" aria-label="${key} ${name}"><title>Circle · ${key} · ${name}</title><defs>${colorFilter(id,color)}</defs><image href="${href}" width="${rig.size[0]}" height="${rig.size[1]}" filter="url(#${id})"/></svg>`;
  await fs.writeFile(path.join(root,'parts',key,`${name}.svg`),svg);
 }
}
console.log('Exported 36 individual SVG part wrappers and 24 standalone assembled poses.');
