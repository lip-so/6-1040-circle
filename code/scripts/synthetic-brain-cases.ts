/** Hand-authored synthetic evaluation inputs. Never load app databases or user notes here. */
import type { ContactCard } from "../src/providers/brain-provider.ts";
export const syntheticCases: {id:string;content:string;referenceDate:string;card:ContactCard;queries:{description:string;match:boolean}[]}[] = [
  {id:"ambiguous-name",content:"Met Alex or Alexis; I am unsure which name is correct. They develop acoustic sensors.",referenceDate:"2026-10-20",
    card:{name:null,nameQuote:null,facts:[{kind:"role",value:"Develops acoustic sensors",quote:"They develop acoustic sensors."}]},
    queries:[{description:"Who works on acoustic sensors?",match:true}]},
  {id:"negation",content:"Met Nia. Nia develops solar panels. Nia is not hiring.",referenceDate:"2026-10-20",
    card:{name:"Nia",nameQuote:"Met Nia.",facts:[{kind:"role",value:"Develops solar panels",quote:"Nia develops solar panels."}]},
    queries:[{description:"Who is hiring?",match:false},{description:"Who works on solar panels?",match:true}]},
  {id:"relative-date",content:"Met Mira yesterday. Mira develops solar panels.",referenceDate:"2026-10-20",
    card:{name:"Mira",nameQuote:"Met Mira yesterday.",facts:[{kind:"date",value:"2026-10-19",quote:"Met Mira yesterday."},{kind:"role",value:"Develops solar panels",quote:"Mira develops solar panels."}]},
    queries:[{description:"Who develops solar panels?",match:true}]},
  {id:"discussion-not-expertise",content:"Met Leo. We discussed quantum computing. Leo works in graphic design.",referenceDate:"2026-10-20",
    card:{name:"Leo",nameQuote:"Met Leo.",facts:[{kind:"discussion",value:"Quantum computing",quote:"We discussed quantum computing."},{kind:"role",value:"Graphic design",quote:"Leo works in graphic design."}]},
    queries:[{description:"Who is an expert in quantum computing?",match:false},{description:"Who did I discuss quantum computing with?",match:true}]},
];
