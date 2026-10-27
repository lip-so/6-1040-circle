/** Invented fixtures only: never read real contact notes or app databases. */
import type { ContactCard } from "../src/providers/brain-provider.ts";
export const recallQualityCases: {id:string;content:string;name:string;required:{kind:ContactCard["facts"][number]["kind"];terms:RegExp[]}[]}[] = [
  {id:"niko",name:"Niko",content:"Met Niko, works at an AI-chip startup. They are looking for interns for spring'29.",required:[
    {kind:"role",terms:[/AI[ -]chip/iu]}, {kind:"offer",terms:[/intern/iu,/spring/iu,/2029/u]},
  ]},
  {id:"lana",name:"Lana",content:"Met Lana, PhD student at Cedar Lab. Discussed: will be looking for UROP students Summer'28, robotics, cinnamon buns.",required:[
    {kind:"role",terms:[/PhD/iu,/Cedar/iu]}, {kind:"offer",terms:[/UROP/iu,/2028/u,/summer/iu, /plan|will|future/iu]}, {kind:"discussion",terms:[/robotics/iu,/cinnamon buns/iu]},
  ]},
  {id:"elise",name:"Elise",content:"Person: Elise\nWhen: 10/20/2026\nDoes: Writes for The Beacon\nDiscussed: Interested in robotics, chips, finance, and baking\nContact: 2025550184\nNotes: Knows people in Boston who are looking for interns for summer 2027.",required:[
    {kind:"role",terms:[/Beacon/iu]}, {kind:"offer",terms:[/Boston/iu,/2027/u,/summer/iu,/contact|know|connect|intro/iu]}, {kind:"contact",terms:[/2025550184/u]}, {kind:"discussion",terms:[/robotics/iu,/chips/iu,/finance/iu,/baking/iu]},
  ]},
  {id:"tessa",name:"Tessa",content:"Met Tessa, she does food eng at Google. I found the role interesting to consider for this summer.",required:[
    {kind:"role",terms:[/food/iu,/engineer/iu,/Google/u]},
  ]},
  {id:"omar",name:"Omar",content:"Met Omar. Omar works at an AI-chip startup. Omar is not hiring interns.",required:[
    {kind:"role",terms:[/AI[ -]chip/iu]},
  ]},
  {id:"jae",name:"Jae",content:"Met Jae. Jae designs battery control systems for electric vehicles.",required:[
    {kind:"role",terms:[/batter/iu,/control/iu,/electric vehicles/iu]},
  ]},
];
export const recallQualityQueries = [
  {description:"Who could help me find an internship at an AI semiconductor startup in spring 2029?",sources:["niko"]},
  {description:"Who is hiring interns for spring 2029?",sources:["niko"]},
  {description:"Who plans to recruit undergraduate research students in summer 2028?",sources:["lana"]},
  {description:"Who could introduce me to internship contacts in Boston for summer 2027?",sources:["elise"]},
  {description:"Who is hiring interns in Boston for summer 2027? I want the person hiring, not a referral.",sources:[]},
  {description:"Who is hiring interns for spring 2030?",sources:[]},
  {description:"Who does food engineering at Google?",sources:["tessa"]},
  {description:"Who did I discuss cinnamon buns with?",sources:["lana"]},
  {description:"Who is a robotics expert?",sources:[]},
  {description:"Who works on battery controls for EVs?",sources:["jae"]},
  {description:"Elise",sources:["elise"]},
];
