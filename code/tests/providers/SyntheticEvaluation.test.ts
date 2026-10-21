import { expect, test } from "bun:test";
import { syntheticCases } from "../../scripts/synthetic-brain-cases.ts";
import { OpenAIProvider, validateCard, validateSelection, InvalidModelOutput } from "../../src/providers/brain-provider.ts";

for (const example of syntheticCases) test(`deterministic synthetic transport/validation: ${example.id}`,async()=>{
  const requests:any[]=[];
  const provider=new OpenAIProvider({apiKey:"synthetic-test-key",fetch:(async(_url:unknown,init:RequestInit)=>{
    const body=JSON.parse(init.body as string);requests.push(body);
    return Response.json({status:"completed",output:[{type:"message",role:"assistant",content:[{type:"output_text",text:JSON.stringify(example.card)}]}]});
  }) as typeof fetch});
  const output=await provider.extract(example.content,{referenceDate:example.referenceDate});
  const validated=validateCard(output,example.content,example.referenceDate);
  expect(validated).toEqual(example.card);
  expect(requests).toHaveLength(1);expect(requests[0].store).toBe(false);
  expect(JSON.parse(requests[0].input)).toEqual({note:example.content,referenceDate:example.referenceDate});
  if(example.id==="ambiguous-name") expect(validated.name).toBeNull();
  if(example.id==="relative-date") expect(validated.facts.find(f=>f.kind==="date")?.value).toBe("2026-10-19");
  if(example.id==="discussion-not-expertise") expect(validated.facts.filter(f=>f.kind==="role").every(f=>!f.value.includes("Quantum"))).toBe(true);
  if(example.id==="negation") {
    const bad={...example.card,facts:[{kind:"offer",value:"is hiring",quote:"Nia is not hiring."}]};
    expect(validateCard(bad,example.content).facts).toEqual([]);
    expect(()=>validateSelection({matches:[{source:"synthetic",facts:[0]}]},[{source:"synthetic",card:validated}],"Who is hiring?")).toThrow(InvalidModelOutput);
  }
});
// These tests verify deterministic adapter contracts with authored outputs, not live model quality.
