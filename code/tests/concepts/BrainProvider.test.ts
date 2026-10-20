import { expect, test } from "bun:test";
import { OpenAIProvider, BrainUnavailable, InvalidModelOutput } from "../../src/concepts/brain-provider.ts";
const card = { name: "Mira", nameQuote: "Met Mira.", facts: [{kind:"discussion" as const,value:"ocean sensors",quote:"We discussed ocean sensors."}] };
const answer = (value: unknown) => Response.json({ status: "completed", output: [{type:"message",role:"assistant",content:[{type:"output_text",text:JSON.stringify(value)}]}] });
test("OpenAI requests strict stateless source-linked JSON without account credentials in model input", async () => {
  const requests: any[] = [];
  const provider = new OpenAIProvider({ apiKey: "server-only-test-key", fetch: (async (url: string | URL | Request, init?: RequestInit) => {
    requests.push({ url, init, body:JSON.parse(init!.body as string) }); return answer(requests.length === 1 ? card : { matches:[{source:"source-1",facts:[0]}] });
  }) as unknown as typeof fetch });
  expect(await provider.extract("Met Mira. We discussed ocean sensors.")).toEqual(card);
  expect(await provider.select("ocean sensors",[{source:"source-1",card}])).toEqual({matches:[{source:"source-1",facts:[0]}]});
  for (const {body,init} of requests) {
    expect(body.store).toBe(false); expect(body.text.format.strict).toBe(true); expect(body.text.format.type).toBe("json_schema");
    expect(body).not.toHaveProperty("conversation"); expect(body).not.toHaveProperty("previous_response_id");
    expect(JSON.stringify(body)).not.toContain("server-only-test-key"); expect(init.headers.Authorization).toBe("Bearer server-only-test-key");
  }
  expect(requests[1].body.text.format.schema.properties.matches.items.properties.source.enum).toEqual(["source-1"]);
  expect(JSON.parse(requests[1].body.input)).toEqual({need:"ocean sensors",memory:[{source:"source-1",card}]});
});
test("provider rejects malformed, incomplete and refusal responses without retry or local fallback", async () => {
  for (const response of [Response.json({status:"incomplete",output:[]}), Response.json({status:"completed",output:[{type:"message",role:"assistant",content:[{type:"refusal",refusal:"no"}]}]}), Response.json({status:"completed",output:[{type:"message",role:"assistant",content:[{type:"output_text",text:"invalid"}]}]})]) {
    let calls=0; const provider=new OpenAIProvider({apiKey:"test",fetch:(async()=>{calls++;return response;}) as unknown as typeof fetch});
    await expect(provider.extract("note")).rejects.toThrow(InvalidModelOutput); expect(calls).toBe(1);
  }
  for (const fault of [async()=>Response.json({error:{message:"private provider body"}},{status:429}),async()=>{throw new Error("secret transport error");}]) {
    let calls=0;const provider=new OpenAIProvider({apiKey:"test",fetch:(async()=>{calls++;return fault();}) as unknown as typeof fetch});
    await expect(provider.extract("note")).rejects.toThrow(BrainUnavailable);expect(calls).toBe(1);
  }
});
test("transcription uploads only ephemeral audio and returns bounded editable text",async()=>{
  let uploaded:FormData|undefined;
  const provider=new OpenAIProvider({apiKey:"test",fetch:(async(url: string | URL | Request,init?: RequestInit)=>{
    expect(String(url)).toEndWith("/audio/transcriptions");uploaded=init!.body as FormData;return Response.json({text:"Met Mira."});
  }) as unknown as typeof fetch});
  expect(await provider.transcribe(new Uint8Array([1,2,3]),"audio/webm")).toBe("Met Mira.");
  expect([...uploaded!.keys()].sort()).toEqual(["file","model"]);
  expect((uploaded!.get("file") as File).name).toBe("note.webm");
});
