import { test, expect } from "@playwright/test";

const original = "Met Mira Chen. Mira develops solar panels. We discussed sensors.";
const card = {name:"Mira Chen", nameQuote:"Met Mira Chen.", facts:[{kind:"role",value:"Develops solar panels",quote:"Mira develops solar panels."},{kind:"discussion",value:"sensors",quote:"We discussed sensors."}]};
const row = {memory:"memory-one",content:original,original,revision:0,referenceDate:"2026-10-20",card};
function deferred(){let resolve;const promise=new Promise(done=>resolve=done);return {promise,resolve};}
async function setup(page, {long=false}={}) {
  const state={username:long ? "a".repeat(32) : "sam", rows:[structuredClone(row)], calls:[], handlers:{}};
  await page.addInitScript(() => {
    Object.defineProperty(navigator.mediaDevices,"getUserMedia",{value:async()=>({getTracks:()=>[{stop(){}}]})});
    window.MediaRecorder=class extends EventTarget {
      static isTypeSupported(){return true;} state="inactive";mimeType="audio/webm";
      start(){this.state="recording";}
      stop(){this.state="inactive";this.dispatchEvent(new MessageEvent("dataavailable",{data:new Blob(["synthetic-audio"])}));this.dispatchEvent(new Event("stop"));}
    };
  });
  await page.route("**/api/**", async route=>{
    if (!new URL(route.request().url()).pathname.startsWith("/api/")) return route.continue();
    const path=new URL(route.request().url()).pathname.slice(4), input=route.request().postDataJSON();
    state.calls.push({path,input});
    let answer;
    if(state.handlers[path]) answer=await state.handlers[path](input);
    else if(path==="/auth/me") answer={username:state.username};
    else if(path==="/memories/list") answer={memories:state.rows};
    else if(path==="/memories/prepare-edit") answer=state.rows[0];
    else if(path==="/memories/forget") {state.rows=[];answer={};}
    else if(path==="/memories/remember" || path==="/memories/edit") answer={memory:row.memory};
    else if(path==="/memories/transcribe") answer={content:"Synthetic transcript"};
    else if(path==="/needs/seek") answer={results:{need:"need",description:input.description,suggestions:[]}};
    else throw Error(`Unexpected endpoint ${path}`);
    if (answer?.abort) { await route.abort("failed"); return; }
    const errorStatus = {CONFLICT:409,INVALID_REQUEST:400,UNAUTHORIZED:401,FORBIDDEN:403,NOT_FOUND:404};
    await route.fulfill({status:answer?.error ? errorStatus[answer.error] ?? 500 : 200,json:answer});
  });
  await page.goto("/");
  await expect(page.getByRole("heading",{name:"Recent people"})).toBeVisible();
  await expect(page.getByRole("button",{name:"Edit Mira Chen",exact:true})).toBeVisible();
  return state;
}

test("Text, Voice, Form preserve independent drafts and are named, pressed and keyboard reachable",async({page})=>{
  const state=await setup(page);
  await page.getByRole("button",{name:"Remember",exact:true}).click();
  await page.getByLabel("Encounter note").fill("Unsent text draft");
  const voice=page.getByRole("button",{name:"Voice input"});
  await page.getByRole("button",{name:"Text input"}).focus();
  await page.keyboard.press("Tab");await expect(voice).toBeFocused();await page.keyboard.press("Enter");
  await expect(voice).toHaveAttribute("aria-pressed","true");
  await expect(voice).toHaveText("Voice");
  await page.screenshot({path:"../tests/output/browser-artifacts/input-choices.png"});
  await page.getByRole("button",{name:"Form input"}).click();
  await page.getByLabel("Person",{exact:true}).fill("Form draft");
  await page.getByRole("button",{name:"Text input"}).click();
  await expect(page.getByLabel("Encounter note")).toHaveValue("Unsent text draft");
  await page.getByRole("button",{name:"Form input"}).click();
  await expect(page.getByLabel("Person",{exact:true})).toHaveValue("Form draft");
  expect(state.calls.filter(c=>c.path==="/memories/remember")).toHaveLength(0);
});

test("search announces pending, success, empty and failure distinctly",async({page})=>{
  const state=await setup(page),gate=deferred();
  state.handlers["/needs/seek"]=()=>gate.promise;
  await page.getByLabel("Who could help?").fill("solar panels");
  await page.getByRole("button",{name:"Find connections",exact:true}).click();
  await expect(page.getByRole("status").filter({hasText:"Finding connections…"})).toBeVisible();
  gate.resolve({results:{need:"n",description:"solar panels",suggestions:[{...row,target:row.memory,source:row.memory,label:"Mira Chen",reason:"Develops solar panels"}]}});
  await expect(page.getByRole("status").filter({hasText:"Found 1 connection."})).toBeVisible();
  state.handlers["/needs/seek"]=()=>({results:{need:"n2",description:"ocean",suggestions:[]}});
  await page.getByLabel("Who could help?").fill("ocean");await page.getByRole("button",{name:"Find connections",exact:true}).click();
  await expect(page.getByText("No saved encounters matched this need.")).toBeVisible();
  state.handlers["/needs/seek"]=()=>({error:"INTERNAL_ERROR"});
  await page.getByLabel("Who could help?").fill("failure");await page.getByRole("button",{name:"Find connections",exact:true}).click();
  await expect(page.getByRole("alert")).toContainText("couldn't finish this search");
  await expect(page.getByText("Finding connections…")).toHaveCount(0);
  await expect(page.getByText("No saved encounters matched this need.")).toHaveCount(0);
});

test("edit prefills, cancels without writes, recovers a conflict and saves the fresh revision",async({page})=>{
  const state=await setup(page),edit=page.getByRole("button",{name:"Edit Mira Chen",exact:true});
  await edit.click();const dialog=page.getByRole("dialog",{name:"Edit encounter"});
  await expect(dialog.getByLabel("Person",{exact:true})).toHaveValue("Mira Chen");
  await expect(dialog.getByLabel("Does",{exact:true})).toHaveValue(original);
  await expect(dialog.getByLabel("Person",{exact:true})).toBeFocused();
  await dialog.getByLabel("Person",{exact:true}).fill("Unsent change");
  await dialog.getByRole("button",{name:"Cancel",exact:true}).click();
  await expect(edit).toBeFocused();expect(state.calls.filter(c=>c.path==="/memories/edit")).toHaveLength(0);
  await edit.click();await expect(dialog).toBeVisible();await page.keyboard.press("Escape");await expect(dialog).toHaveCount(0);await expect(edit).toBeFocused();
  state.handlers["/memories/edit"]=()=>({error:"CONFLICT"});
  await edit.click();await dialog.getByRole("button",{name:"Save changes",exact:true}).click();
  await expect(dialog.getByRole("alert")).toContainText("changed elsewhere");
  await dialog.getByRole("button",{name:"Cancel",exact:true}).click();
  state.rows[0].revision=1;state.rows[0].content="Met Mira Chen.\nMira builds sensors.\nWe discussed sensors.";state.rows[0].card.facts[0]={kind:"role",value:"Builds sensors",quote:"Mira builds sensors."};
  state.handlers["/memories/edit"]=(input)=>{expect(input.revision).toBe(1);expect(input.content).toContain("Mira builds sensors.");return {memory:row.memory};};
  await edit.click();await expect(dialog.getByLabel("Does",{exact:true})).toHaveValue("Mira builds sensors.");
  await dialog.getByRole("button",{name:"Save changes",exact:true}).click();
  await expect(dialog).toHaveCount(0);await expect(page.getByText("Encounter updated.")).toBeVisible();
  await expect(page.getByRole("heading",{name:"Recent people"})).toBeFocused();
});

test("removal names contact, Cancel and Escape restore focus, duplicate clicks make one request",async({page})=>{
  const state=await setup(page),remove=page.getByRole("button",{name:"Remove Mira Chen",exact:true});
  await remove.click();const dialog=page.getByRole("dialog",{name:"Remove Mira Chen?"});
  await expect(dialog.getByRole("button",{name:"Cancel",exact:true})).toBeFocused();
  await dialog.getByRole("button",{name:"Cancel",exact:true}).click();await expect(remove).toBeFocused();
  await remove.click();await page.keyboard.press("Escape");await expect(dialog).toHaveCount(0);await expect(remove).toBeFocused();
  expect(state.calls.filter(c=>c.path==="/memories/forget")).toHaveLength(0);
  await remove.click();await dialog.getByRole("button",{name:"Remove",exact:true}).evaluate(button=>{button.click();button.click();});
  await expect(page.getByText("Connection removed.")).toBeVisible();
  expect(state.calls.filter(c=>c.path==="/memories/forget")).toHaveLength(1);
  await expect(page.getByRole("heading",{name:"Recent people"})).toBeFocused();
  await expect(remove).toHaveCount(0);
});

for(const operation of ["save","edit","search","transcription"]) test(`account switch discards pending ${operation} and clears drafts`,async({page})=>{
  const state=await setup(page),gate=deferred();
  const path=operation==="edit"?"/memories/edit":operation==="save"?"/memories/remember":operation==="search"?"/needs/seek":"/memories/transcribe";
  state.handlers[path]=()=>gate.promise;
  if(operation==="edit") { await page.getByRole("button",{name:"Edit Mira Chen",exact:true}).click();await page.getByRole("dialog").getByRole("button",{name:"Save changes"}).click(); } else if(operation==="search") {
    await page.getByLabel("Who could help?").fill("old account query");await page.getByRole("button",{name:"Find connections",exact:true}).click();
  } else {
    await page.getByRole("button",{name:"Remember",exact:true}).click();await page.getByLabel("Encounter note").fill("old account draft");
    if(operation==="save") await page.getByRole("button",{name:"Save",exact:true}).click();
    else {await page.getByRole("button",{name:"Voice input"}).click();await page.getByRole("button",{name:"Start recording"}).click();await page.getByRole("button",{name:"Stop and transcribe"}).click();}
  }
  await expect.poll(()=>state.calls.filter(c=>c.path===path).length).toBe(1);
  state.username="leo";state.rows=[];
  await page.evaluate(()=>window.dispatchEvent(new Event("focus")));
  await expect(page.getByText("leo",{exact:true})).toBeVisible();
  const delivered=page.waitForResponse(response=>new URL(response.url()).pathname===`/api${path}`);
  gate.resolve(operation==="save" || operation==="edit"?{memory:"old"}:operation==="transcription"?{content:"Late private transcript"}:{results:{need:"old",description:"old",suggestions:[{...row,target:"old",source:"old",label:"Private result"}]}});
  await (await delivered).finished();
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  await expect.poll(()=>state.calls.filter(c=>c.path==="/auth/me").length).toBeGreaterThan(1);
  await expect(page.getByLabel("Who could help?")).toHaveValue("");
  await expect(page.getByText("Private result")).toHaveCount(0);
  await page.getByRole("button",{name:"Remember",exact:true}).click();await expect(page.getByLabel("Encounter note")).toHaveValue("");
  await expect(page.getByText("Late private transcript")).toHaveCount(0);await expect(page.getByText("Private result")).toHaveCount(0);
  await expect(page.getByText("Memory saved.")).toHaveCount(0);
});

for(const width of [320,390,640,1280]) test(`responsive layout ${width}px: long content, dialog scroll and focus remain usable`,async({page})=>{
  await page.setViewportSize({width,height:720});const state=await setup(page,{long:true});
  state.rows[0].card.name="Mira".repeat(50);state.rows[0].original="Long original note ".repeat(1200);
  await page.evaluate(()=>window.dispatchEvent(new Event("focus")));
  await expect(page.locator(".contact-name")).toContainText("MiraMira");
  await page.locator(".contact-name").click();await page.getByText("Personal notes",{exact:true}).click();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator(".edit-contact").click();const dialog=page.getByRole("dialog");
  await expect(dialog.getByLabel("Person",{exact:true})).toBeFocused();
  await dialog.getByLabel("Notes",{exact:true}).fill("Expanded notes ".repeat(100));
  await page.screenshot({path:`../tests/output/browser-artifacts/editor-${width}.png`});
  await dialog.getByRole("button",{name:"Cancel",exact:true}).focus();await expect(dialog.getByRole("button",{name:"Cancel",exact:true})).toBeInViewport();
  await page.keyboard.press("Tab");await expect(dialog.getByRole("button",{name:"Save changes",exact:true})).toBeFocused();
  await page.keyboard.press("Tab");await expect(dialog.getByLabel("Person",{exact:true})).toBeFocused();
  expect(await dialog.evaluate(el=>el.scrollWidth <= el.clientWidth)).toBe(true);
  await page.keyboard.press("Escape");await expect(dialog).toHaveCount(0);await expect(page.locator(".edit-contact")).toBeFocused();
  await page.screenshot({path:`../tests/output/browser-artifacts/responsive-${width}.png`,fullPage:false});
});


test("switching away from pending Voice preserves typed draft and ignores the late transcript",async({page})=>{
  const state=await setup(page),gate=deferred();state.handlers["/memories/transcribe"]=()=>gate.promise;
  await page.getByRole("button",{name:"Remember",exact:true}).click();await page.getByLabel("Encounter note").fill("Keep this typed draft");
  await page.getByRole("button",{name:"Voice input"}).click();await page.getByRole("button",{name:"Start recording"}).click();await page.getByRole("button",{name:"Stop and transcribe"}).click();
  await expect.poll(()=>state.calls.filter(c=>c.path==="/memories/transcribe").length).toBe(1);
  await page.getByRole("button",{name:"Form input"}).click();const delivered=page.waitForResponse(response=>new URL(response.url()).pathname==="/api/memories/transcribe");gate.resolve({content:"Late ignored transcript"});
  await (await delivered).finished();await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  await page.getByRole("button",{name:"Text input"}).click();await expect(page.getByLabel("Encounter note")).toHaveValue("Keep this typed draft");
  expect(state.calls.filter(c=>c.path==="/memories/remember")).toHaveLength(0);
});

for(const zoom of [2,4]) test(`enlarged ${zoom*100}% CSS zoom keeps forms and dialogs operable`,async({page})=>{
  await page.setViewportSize({width:1280,height:960});await setup(page);
  await page.evaluate(zoom=>document.documentElement.style.zoom=String(zoom),zoom);
  await page.getByRole("button",{name:"Remember",exact:true}).click();await page.getByRole("button",{name:"Form input"}).click();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByLabel("Person",{exact:true}).fill("Mira Chen");await page.getByLabel("Notes",{exact:true}).fill("Expanded note ".repeat(100));
  await page.getByRole("button",{name:"Edit Mira Chen",exact:true}).click();const dialog=page.getByRole("dialog");
  await dialog.getByRole("button",{name:"Cancel",exact:true}).focus();await expect(dialog.getByRole("button",{name:"Cancel",exact:true})).toBeInViewport();
  expect(await dialog.evaluate(el=>el.scrollWidth <= el.clientWidth)).toBe(true);
  await page.screenshot({path:`../tests/output/browser-artifacts/zoom-${zoom*100}.png`});
  await page.keyboard.press("Escape");await expect(dialog).toHaveCount(0);
});

test("long removal confirmation scrolls in a short viewport and traps keyboard focus",async({page})=>{
  await page.setViewportSize({width:320,height:240});const state=await setup(page);
  state.rows[0].card.name="Long name ".repeat(20);await page.evaluate(()=>window.dispatchEvent(new Event("focus")));
  await expect(page.locator(".contact-name")).toContainText("Long name");
  await page.locator(".remove-contact").click();const dialog=page.getByRole("dialog");
  await dialog.getByRole("button",{name:"Remove",exact:true}).focus();await expect(dialog.getByRole("button",{name:"Remove",exact:true})).toBeInViewport();
  await page.keyboard.press("Tab");await expect(dialog.getByRole("button",{name:"Cancel",exact:true})).toBeFocused();
  expect(await dialog.evaluate(el=>el.getBoundingClientRect().height <= innerHeight)).toBe(true);
  expect(await dialog.evaluate(el=>el.scrollWidth <= el.clientWidth)).toBe(true);
  await page.keyboard.press("Escape");await expect(dialog).toHaveCount(0);
});


test("new Form dates reject impossible dates and save MM/DD/YYYY", async ({page}) => {
  const state = await setup(page);
  await page.getByRole("button", {name:"Remember", exact:true}).click();
  await page.getByRole("button", {name:"Form input"}).click();
  await page.getByLabel("Person", {exact:true}).fill("Mira");
  const date = page.getByLabel("Date (MM/DD/YYYY)", {exact:true});
  for (const invalid of ["2/3/2026", "02/30/2026", "02/29/2026"]) {
    await date.fill(invalid);
    await page.getByRole("button", {name:"Save", exact:true}).click();
    expect(await date.evaluate(input => input.checkValidity())).toBe(false);
    expect(state.calls.filter(c => c.path === "/memories/remember")).toHaveLength(0);
  }
  await date.fill("02/29/2024");
  await page.getByRole("button", {name:"Save", exact:true}).click();
  await expect(page.getByText("Memory saved.")).toBeVisible();
  expect(state.calls.find(c => c.path === "/memories/remember").input.content).toContain("When: 02/29/2024");
});

test("editing converts ISO dates, preserves context and validates corrections", async ({page}) => {
  const state = await setup(page);
  state.rows[0].content="Person: Mira Chen\nWhen: after the workshop\nDoes: Builds solar panels\nDiscussed:\nNotes: Keep this note";
  state.rows[0].card.facts.push({kind:"date", value:"2026-10-24", quote:"Met Mira Chen."}, {kind:"context", value:"At the workshop", quote:"Met Mira Chen."});
  await page.getByRole("button", {name:"Edit Mira Chen", exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  const date = dialog.getByLabel("Date (MM/DD/YYYY)", {exact:true});
  await expect(date).toHaveValue("10/24/2026");
  await expect(dialog.getByLabel("Notes", {exact:true})).toHaveValue("Keep this note\nafter the workshop");
  await date.fill("04/31/2026");
  await dialog.getByRole("button", {name:"Save changes", exact:true}).click();
  expect(await date.evaluate(input => input.checkValidity())).toBe(false);
  expect(state.calls.filter(c => c.path === "/memories/edit")).toHaveLength(0);
  await date.fill("04/30/2026");
  await dialog.getByRole("button", {name:"Save changes", exact:true}).click();
  await expect(dialog).toHaveCount(0);
  expect(state.calls.find(c => c.path === "/memories/edit").input.content).toContain("When: 04/30/2026");
});

function persistEdits(state) {
  state.handlers["/memories/edit"] = input => {
    const current = state.rows.find(item => item.memory === input.memory);
    // The mock intentionally leaves the old shorter card and first original in
    // place, so reopen proves preparation reads the updated source fields.
    if (current.lastSubmission !== input.submission) {
      expect(input.revision).toBe(current.revision);
      current.content = input.content; current.revision += 1;
      current.lastSubmission = input.submission;
    }
    return {memory:input.memory};
  };
}
const outgoingEdits = state => state.calls.filter(call => call.path === "/memories/edit").map(call => call.input);
const losslessGuided = "Person: Mira Chen\nWhen: 10/24/2026\nDoes: Builds solar panels and designs batteries\n  Tests storage prototypes\nDiscussed: Ocean sensors\n  A workshop follow-up\nContact: mira@example.test\n  555-0100\nNotes: Send the battery paper\n  Bring the blue notebook";

test("A1 guided outgoing content retains full fields, multiline Contact, clearing and current-source reopening", async ({page}) => {
  const state = await setup(page); persistEdits(state);
  state.rows[0].content = losslessGuided; state.rows[0].original = "Immutable first original with stale work.";
  state.rows[0].card.facts[0].value = "Builds solar panels";
  const open = () => page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  await open();
  await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue("Builds solar panels and designs batteries\nTests storage prototypes");
  await expect(dialog.getByLabel("Contact", {exact:true})).toHaveValue("mira@example.test\n555-0100");
  expect(await dialog.getByLabel("Contact", {exact:true}).evaluate(field => field.tagName)).toBe("TEXTAREA");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click();
  await expect(dialog).toHaveCount(0); expect(outgoingEdits(state)[0].content).toBe(losslessGuided);
  await open(); const contact = dialog.getByLabel("Contact", {exact:true});
  await contact.fill("new@example.test");
  await expect(contact).toBeFocused(); expect(await contact.evaluate(field => field.tagName)).toBe("TEXTAREA");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click();
  await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)[1].content).toBe(losslessGuided.replace("mira@example.test\n  555-0100", "new@example.test"));
  await open();
  for (const name of ["Does", "Discussed", "Contact", "Notes"]) await dialog.getByLabel(name, {exact:true}).fill("");
  await dialog.getByLabel("Date (MM/DD/YYYY)", {exact:true}).fill("");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)[2].content).toBe("Person: Mira Chen\nWhen:\nDoes:\nDiscussed:");
  await open();
  for (const name of ["Does", "Discussed", "Contact", "Notes", "Date (MM/DD/YYYY)"]) await expect(dialog.getByLabel(name, {exact:true})).toHaveValue("");
  expect(state.rows[0].original).toBe("Immutable first original with stale work.");
});

test("A1 raw grouped outgoing content retains an omitted reminder once and replacing Does removes old work on reopen", async ({page}) => {
  const state = await setup(page); persistEdits(state);
  const source = "Met Mira Chen. Builds solar panels and designs batteries. Send the battery paper.";
  state.rows[0].content = source; state.rows[0].original = source;
  state.rows[0].card.facts = [{kind:"role",value:"Builds solar panels",quote:"Builds solar panels and designs batteries."}];
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  await expect(dialog.getByText("Some details from your note are kept together", {exact:false})).toBeVisible();
  await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue(source);
  await expect(dialog.getByLabel("Notes", {exact:true})).toHaveValue("");
  await dialog.getByLabel("Contact", {exact:true}).fill("new@example.test");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)[0].content).toBe(`Person: Mira Chen\nWhen:\nDoes: ${source}\nDiscussed:\nContact: new@example.test`);
  expect(outgoingEdits(state)[0].content.split("Send the battery paper")).toHaveLength(2);
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  await dialog.getByLabel("Does", {exact:true}).fill("Builds wind turbines. Send the battery paper.");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)[1].content).not.toContain("solar panels"); expect(outgoingEdits(state)[1].content).not.toContain("batteries");
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue("Builds wind turbines. Send the battery paper.");
  await expect(dialog.getByLabel("Notes", {exact:true})).toHaveValue("");
});

test("A1 cross-line and discussion/contact groups are visible once and stay together in outgoing content", async ({page}) => {
  const state = await setup(page); persistEdits(state);
  const lines = ["Met Mira Chen.", "Mira builds solar panels", "and designs batteries. Send the battery paper.", "We discussed sensors", "and email mira@example.test."];
  state.rows[0].content = lines.join("\n");
  state.rows[0].card.facts = [
    {kind:"role",value:"Builds solar panels",quote:lines.slice(1,3).join("\n")},
    {kind:"discussion",value:"sensors",quote:lines.slice(3).join("\n")},
    {kind:"contact",value:"mira@example.test",quote:lines[4]},
  ];
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  await expect(dialog.getByText("Review the whole field before replacing it", {exact:false})).toBeVisible();
  await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue(lines.slice(1,3).join("\n"));
  await expect(dialog.getByLabel("Discussed", {exact:true})).toHaveValue(lines.slice(3).join("\n"));
  await expect(dialog.getByLabel("Contact", {exact:true})).toHaveValue("");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)[0].content).toBe("Person: Mira Chen\nWhen:\nDoes: Mira builds solar panels\n  and designs batteries. Send the battery paper.\nDiscussed: We discussed sensors\n  and email mira@example.test.\nNotes: Met Mira Chen.");
});

test("A1 source-anchored relative dates survive processing retry, preserved anchor and second edit", async ({page}) => {
  const state = await setup(page); persistEdits(state);
  const persist = state.handlers["/memories/edit"]; let fail = true;
  state.handlers["/memories/edit"] = input => { const answer = persist(input); if (fail) {fail = false; return {error:"INTERNAL_ERROR"};} return answer; };
  state.rows[0].content = "Met Mira Chen today.\nMira develops solar panels yesterday.\nSend the battery paper today.";
  state.rows[0].referenceDate = "2026-10-24";
  state.rows[0].card.nameQuote = "Met Mira Chen today.";
  state.rows[0].card.facts = [{kind:"role",value:"Develops solar panels",quote:"Mira develops solar panels yesterday."}];
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue("Mira develops solar panels 10/23/2026.");
  await expect(dialog.getByLabel("Notes", {exact:true})).toHaveValue("Met Mira Chen 10/24/2026.\nSend the battery paper 10/24/2026.");
  await dialog.getByLabel("Contact", {exact:true}).fill("Email today");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click();
  await expect(dialog.getByRole("alert")).toContainText("explicit date"); expect(outgoingEdits(state)).toHaveLength(0);
  await dialog.getByLabel("Contact", {exact:true}).fill("");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click();
  await expect(dialog.getByRole("alert")).toContainText("Retry the same form");
  await expect(dialog.getByLabel("Notes", {exact:true})).toHaveValue("Met Mira Chen 10/24/2026.\nSend the battery paper 10/24/2026.");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)).toHaveLength(2); expect(outgoingEdits(state)[1]).toEqual(outgoingEdits(state)[0]);
  expect(state.rows[0].revision).toBe(1); expect(state.rows[0].referenceDate).toBe("2026-10-24");
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue("Mira develops solar panels 10/23/2026.");
  await dialog.getByLabel("Contact", {exact:true}).fill("new@example.test");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)[2].content).toContain("10/23/2026"); expect(outgoingEdits(state)[2].content).toContain("10/24/2026");
  expect(outgoingEdits(state)[2].content).not.toMatch(/\b(today|yesterday)\b/iu);
});

test("A1 missing-anchor date review preserves the full draft and sends no edit until explicitly corrected", async ({page}) => {
  const state = await setup(page); persistEdits(state);
  const source = "Met Mira Chen today. Builds solar panels yesterday. Send the battery paper.";
  state.rows[0].content = source; state.rows[0].referenceDate = "";
  state.rows[0].card.nameQuote = "Met Mira Chen today."; state.rows[0].card.facts = [];
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  await expect(dialog.getByRole("alert")).toContainText("explicit date");
  await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue(source);
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click();
  expect(outgoingEdits(state)).toHaveLength(0); await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue(source);
  await dialog.getByLabel("Does", {exact:true}).fill("Met Mira Chen 10/24/2026. Builds solar panels 10/23/2026. Send the battery paper.");
  state.handlers["/memories/edit"] = () => ({error:"INVALID_REQUEST"});
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click();
  await expect(dialog.getByRole("alert")).toContainText("couldn't be accepted");
  await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue("Met Mira Chen 10/24/2026. Builds solar panels 10/23/2026. Send the battery paper.");
  persistEdits(state);
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)[1]).toEqual(outgoingEdits(state)[0]);
});

test("A1 an edit connection failure preserves the reviewed draft and submission identity on retry", async ({page}) => {
  const state = await setup(page);
  state.rows[0].content = losslessGuided;
  state.handlers["/memories/edit"] = () => ({abort:true});
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click();
  await expect(dialog.getByRole("alert")).toContainText("connection failed");
  await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue("Builds solar panels and designs batteries\nTests storage prototypes");
  persistEdits(state);
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)[1]).toEqual(outgoingEdits(state)[0]);
  expect(outgoingEdits(state)[1].content).toBe(losslessGuided);
});

test("A1 literal Person, email and URL identifiers are preserved and do not trigger date gating", async ({page}) => {
  const state = await setup(page); persistEdits(state);
  const source = "Person: Today\nWhen:\nDoes: Builds batteries\nDiscussed:\nContact: today@example.test\n  today.example.com/profile\nNotes: Read https://example.test/yesterday and example.com/yesterday";
  state.rows[0].content = source; state.rows[0].referenceDate = "";
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  await expect(dialog.getByLabel("Person", {exact:true})).toHaveValue("Today");
  await expect(dialog.getByLabel("Contact", {exact:true})).toHaveValue("today@example.test\ntoday.example.com/profile");
  await expect(dialog.getByRole("alert")).toHaveCount(0);
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)[0].content).toBe(source);
});

for (const name of ["Today", "Yesterday"]) for (const anchor of ["", "2026-10-24"]) for (const fallback of [false, true]) {
  test(`A1-I01 ${name} survives ${fallback ? "fallback" : "allocation"} Contact edit, cancellation and guided reload with ${anchor || "missing"} anchor`, async ({page}) => {
    const state = await setup(page); persistEdits(state);
    const source = `Met ${name}.\nBuilds solar panels.`;
    state.rows[0].content = source; state.rows[0].original = source; state.rows[0].referenceDate = anchor;
    state.rows[0].card = {name, nameQuote:`Met ${name}.`, facts:fallback ? [] : [{kind:"role",value:"Builds solar panels",quote:"Builds solar panels."}]};
    await page.evaluate(() => window.dispatchEvent(new Event("focus")));
    const open = () => page.getByRole("button", {name:`Edit ${name}`,exact:true}).click();
    const dialog = page.getByRole("dialog", {name:"Edit encounter"});
    await open(); await expect(dialog.getByRole("alert")).toHaveCount(0);
    await dialog.getByLabel("Contact", {exact:true}).fill("cancelled@example.test");
    await dialog.getByRole("button", {name:"Cancel",exact:true}).click(); expect(outgoingEdits(state)).toHaveLength(0);
    await open(); await expect(dialog.getByLabel("Contact", {exact:true})).toHaveValue("");
    await expect(dialog.getByLabel(fallback ? "Does" : "Notes", {exact:true})).toHaveValue(fallback ? source : `Met ${name}.`);
    await dialog.getByLabel("Contact", {exact:true}).fill("new@example.test");
    const retry = name === "Today" && fallback && !anchor;
    if (retry) {
      const persist = state.handlers["/memories/edit"]; let fail = true;
      state.handlers["/memories/edit"] = input => { const answer = persist(input); if (fail) {fail = false; return {error:"INTERNAL_ERROR"};} return answer; };
    }
    await dialog.getByRole("button", {name:"Save changes",exact:true}).click();
    if (retry) {
      await expect(dialog.getByRole("alert")).toContainText("Retry the same form");
      await dialog.getByRole("button", {name:"Save changes",exact:true}).click();
    }
    await expect(dialog).toHaveCount(0);
    const expected = fallback ? `Person: ${name}\nWhen:\nDoes: Met ${name}.\n  Builds solar panels.\nDiscussed:\nContact: new@example.test` : `Person: ${name}\nWhen:\nDoes: Builds solar panels.\nDiscussed:\nContact: new@example.test\nNotes: Met ${name}.`;
    expect(outgoingEdits(state)[0].content).toBe(expected);
    if (retry) expect(outgoingEdits(state)[1]).toEqual(outgoingEdits(state)[0]);
    state.rows[0].card.nameQuote = `Person: ${name}`;
    await page.reload(); await open();
    await expect(dialog.getByRole("alert")).toHaveCount(0);
    await expect(dialog.getByLabel(fallback ? "Does" : "Notes", {exact:true})).toHaveValue(fallback ? source : `Met ${name}.`);
    await dialog.getByLabel("Contact", {exact:true}).fill("second@example.test");
    await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
    expect(outgoingEdits(state).at(-1).content).toBe(expected.replace("new@example.test", "second@example.test"));
    expect(state.rows[0].original).toBe(source);
  });
}

for (const name of ["Today", "Yesterday"]) for (const anchor of ["", "2026-10-24"]) {
  test(`A1-I01 evidenced ${name} remains literal while real relative dates are reviewed with ${anchor || "missing"} anchor`, async ({page}) => {
    const state = await setup(page); persistEdits(state);
    const source = `Met ${name}. Builds solar panels today. Send the paper yesterday.`;
    state.rows[0].content = source; state.rows[0].referenceDate = anchor;
    state.rows[0].card = {name, nameQuote:`Met ${name}.`, facts:[{kind:"role",value:"Builds solar panels",quote:"Builds solar panels today."}]};
    await page.evaluate(() => window.dispatchEvent(new Event("focus")));
    await page.getByRole("button", {name:`Edit ${name}`,exact:true}).click();
    const dialog = page.getByRole("dialog", {name:"Edit encounter"});
    const stable = `Met ${name}. Builds solar panels 10/24/2026. Send the paper 10/23/2026.`;
    await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue(anchor ? stable : source);
    if (!anchor) {
      await dialog.getByRole("button", {name:"Save changes",exact:true}).click();
      await expect(dialog.getByRole("alert")).toContainText("explicit date"); expect(outgoingEdits(state)).toHaveLength(0);
      await dialog.getByLabel("Does", {exact:true}).fill(stable);
    }
    await dialog.getByLabel("Contact", {exact:true}).fill("new@example.test");
    await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
    expect(outgoingEdits(state)[0].content).toBe(`Person: ${name}\nWhen:\nDoes: ${stable}\nDiscussed:\nContact: new@example.test`);
  });
}

test("A1-I01 ambiguous name/date evidence stays visible and requires explicit correction without an edit request", async ({page}) => {
  const state = await setup(page); persistEdits(state);
  const source = "Met Today today. Builds solar panels.";
  state.rows[0].content = source; state.rows[0].referenceDate = "2026-10-24";
  state.rows[0].card = {name:"Today", nameQuote:"Met Today today.", facts:[]};
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await page.getByRole("button", {name:"Edit Today",exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue(source);
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click();
  await expect(dialog.getByRole("alert")).toContainText("ambiguous wording"); expect(outgoingEdits(state)).toHaveLength(0);
  await dialog.getByLabel("Does", {exact:true}).fill("Met 10/24/2026. Builds solar panels.");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)[0].content).toBe("Person: Today\nWhen:\nDoes: Met 10/24/2026. Builds solar panels.\nDiscussed:");
});

for (const source of ["Someone works on ocean sensors.", "Met Dana or Daria; their name is uncertain. They may work on ocean sensors."]) {
  test(`A2 unnamed Contact edits preserve ${source.startsWith("Met") ? "ambiguous" : "unknown"} identity and reopen without inventing a name`, async ({page}) => {
    const state = await setup(page); persistEdits(state);
    state.rows[0].content = source; state.rows[0].original = source;
    state.rows[0].card = {name:null,nameQuote:null,facts:[]};
    await page.evaluate(() => window.dispatchEvent(new Event("focus")));
    const open = () => page.getByRole("button", {name:"Edit Unnamed encounter",exact:true}).click();
    const dialog = page.getByRole("dialog", {name:"Edit encounter"});
    await open();
    await expect(dialog.getByLabel("Person", {exact:true})).toHaveValue("");
    await expect(dialog.getByLabel("Person", {exact:true})).toHaveJSProperty("required", false);
    await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue(source);
    await dialog.getByLabel("Contact", {exact:true}).fill("new@example.test");
    await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
    expect(outgoingEdits(state)[0].content).toBe(`Person:\nWhen:\nDoes: ${source}\nDiscussed:\nContact: new@example.test`);
    await open();
    await expect(dialog.getByLabel("Person", {exact:true})).toHaveValue("");
    await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue(source);
    await dialog.getByLabel("Contact", {exact:true}).fill("second@example.test");
    await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
    expect(outgoingEdits(state)[1].content).toBe(outgoingEdits(state)[0].content.replace("new@example.test", "second@example.test"));
    expect(state.rows[0].original).toBe(source);
    await open();
    for (const label of ["Person","Does","Discussed","Contact","Notes","Date (MM/DD/YYYY)"]) await dialog.getByLabel(label, {exact:true}).fill("");
    await dialog.getByRole("button", {name:"Save changes",exact:true}).click();
    await expect(dialog.getByRole("alert")).toContainText("at least one encounter detail");
    expect(outgoingEdits(state)).toHaveLength(2);
    await dialog.getByRole("button", {name:"Cancel",exact:true}).click();
    await page.getByRole("button", {name:"Remember",exact:true}).click(); await page.getByRole("button", {name:"Form input"}).click();
    await expect(page.getByLabel("Person", {exact:true})).toHaveJSProperty("required", true);
    await page.getByLabel("Does", {exact:true}).fill("Creation still requires a name");
    await expect(page.getByRole("button", {name:"Save",exact:true})).toBeDisabled();
  });
}

test("A2 existing long fields have no creation caps and submit their complete edited content", async ({page}) => {
  const state = await setup(page); persistEdits(state);
  const values = {person:"Mira Chen " + "p".repeat(220), does:"a".repeat(5001), discussed:"b".repeat(4501), contact:"c".repeat(2501), notes:"d".repeat(4501)};
  state.rows[0].content = `Person: ${values.person}\nWhen:\nDoes: ${values.does}\nDiscussed: ${values.discussed}\nContact: ${values.contact}\nNotes: ${values.notes}`;
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  for (const [label,key] of [["Person","person"],["Does","does"],["Discussed","discussed"],["Contact","contact"],["Notes","notes"]]) {
    const field = dialog.getByLabel(label, {exact:true});
    await expect(field).toHaveValue(values[key]); expect(await field.getAttribute("maxlength")).toBeNull();
    await field.fill(values[key] + "z");
  }
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)[0].content).toBe(`Person: ${values.person}z\nWhen:\nDoes: ${values.does}z\nDiscussed: ${values.discussed}z\nContact: ${values.contact}z\nNotes: ${values.notes}z`);
});

test("A2 exact 20k conversion warns before writing, keeps invalid-date drafts visible, and saves only after explicit shortening", async ({page}) => {
  const state = await setup(page); persistEdits(state);
  const source = "x".repeat(20_000);
  state.rows[0].content = source; state.rows[0].original = source; state.rows[0].card = {name:null,nameQuote:null,facts:[]};
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await page.getByRole("button", {name:"Edit Unnamed encounter",exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue(source);
  await expect(dialog.getByRole("alert")).toContainText("31 characters over");
  await expect(dialog.getByRole("alert")).toContainText("No text will be shortened automatically");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); expect(outgoingEdits(state)).toHaveLength(0);
  await dialog.getByLabel("Date (MM/DD/YYYY)", {exact:true}).fill("bad");
  await expect(dialog.getByRole("alert")).toContainText("35 characters over");
  await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue(source);
  await dialog.getByLabel("Date (MM/DD/YYYY)", {exact:true}).fill("");
  await dialog.getByLabel("Does", {exact:true}).fill(source.slice(0,-31));
  await expect(dialog.getByRole("alert")).toHaveCount(0);
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)[0].content).toHaveLength(20_000);
  expect(outgoingEdits(state)[0].content).toBe(`Person:\nWhen:\nDoes: ${source.slice(0,-31)}\nDiscussed:`);
  expect(state.rows[0].original).toBe(source);
});

test("A2 multiline Person opens focused and retains the same control after its last newline is removed", async ({page}) => {
  const state = await setup(page); persistEdits(state);
  state.rows[0].content = "Person: Mira\n  Chen\nWhen:\nDoes: Builds sensors\nDiscussed:";
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"}), person = dialog.getByLabel("Person", {exact:true});
  await expect(person).toHaveValue("Mira\nChen"); await expect(person).toBeFocused();
  expect(await person.evaluate(field=>field.tagName)).toBe("TEXTAREA");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)[0].content).toBe("Person: Mira\n  Chen\nWhen:\nDoes: Builds sensors\nDiscussed:");
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  await person.fill("Mira Chen"); await expect(person).toBeFocused();
  expect(await person.evaluate(field=>field.tagName)).toBe("TEXTAREA");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)[1].content).toBe("Person: Mira Chen\nWhen:\nDoes: Builds sensors\nDiscussed:");
});

for (const anchor of ["2025-12-31", ""]) test(`A2 guided relative wording keeps its source-day interpretation and discloses ${anchor || "missing"} day`, async ({page}) => {
  const state = await setup(page); persistEdits(state);
  const source = "Person: Mira Chen\nWhen:\nDoes: Builds sensors\nDiscussed:\nNotes: Met yesterday. Send the paper today.";
  state.rows[0].content = source; state.rows[0].original = source; state.rows[0].referenceDate = anchor;
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  await expect(dialog.getByText(anchor ? "rather than the day you edit" : "reference day is unavailable", {exact:false})).toBeVisible();
  if (anchor) await expect(dialog.getByText("12/31/2025", {exact:false})).toBeVisible();
  await expect(dialog.getByLabel("Notes", {exact:true})).toHaveValue("Met yesterday. Send the paper today.");
  await dialog.getByLabel("Contact", {exact:true}).fill("new@example.test");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)[0].content).toBe(source.replace("\nNotes:", "\nContact: new@example.test\nNotes:"));
  expect(state.rows[0].referenceDate).toBe(anchor);
  await page.reload(); await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  await expect(dialog.getByText(anchor ? "12/31/2025" : "reference day is unavailable", {exact:false})).toBeVisible();
  await expect(dialog.getByLabel("Notes", {exact:true})).toHaveValue("Met yesterday. Send the paper today.");
});

test("A2 inferred summary stays visibly uncertain and is not inserted into reviewed source", async ({page}) => {
  const state = await setup(page); persistEdits(state);
  const source = "Met Mira Chen. She may work on ocean sensors; this is unconfirmed.";
  state.rows[0].content = source; state.rows[0].original = source;
  state.rows[0].card = {name:"Mira Chen",nameQuote:"Met Mira Chen.",facts:[{kind:"role",value:"Sensor engineer",quote:"She may work on ocean sensors; this is unconfirmed.",basis:"inferred"}]};
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue(source);
  await dialog.getByLabel("Contact", {exact:true}).fill("new@example.test");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click(); await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)[0].content).toContain("may work on ocean sensors; this is unconfirmed.");
  expect(outgoingEdits(state)[0].content).not.toContain("Sensor engineer");
  await page.locator(".contact-name").click();
  await expect(page.getByText("May be: Sensor engineer", {exact:true})).toBeVisible();
});

test("A2 an oversized draft after a processing failure makes no further write and does not misstate the prior save", async ({page}) => {
  const state = await setup(page); persistEdits(state);
  const persist = state.handlers["/memories/edit"]; let fail = true;
  state.handlers["/memories/edit"] = input => { const answer = persist(input); if (fail) { fail = false; return {error:"INTERNAL_ERROR"}; } return answer; };
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  await dialog.getByLabel("Contact", {exact:true}).fill("saved@example.test");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click();
  await expect(dialog.getByRole("alert")).toContainText("Retry the same form");
  expect(state.rows[0].content).toContain("saved@example.test");
  const priorContent = state.rows[0].content;
  await dialog.getByLabel("Does", {exact:true}).fill("x".repeat(20_000));
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click();
  await expect(dialog.getByRole("alert")).toContainText("No text will be shortened automatically");
  await expect(dialog.getByRole("alert")).not.toContainText("saved encounter has not changed");
  await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue("x".repeat(20_000));
  expect(outgoingEdits(state)).toHaveLength(1); expect(state.rows[0].content).toBe(priorContent);
});

test("A2 empty guided Person remains authoritative in recent and search labels despite a card name elsewhere", async ({page}) => {
  const state = await setup(page);
  const content = "Person:\nWhen:\nDoes: Met Dana at the workshop.\nDiscussed:";
  state.rows[0].content = content; state.rows[0].card = {name:"Dana",nameQuote:"Does: Met Dana at the workshop.",facts:[]};
  state.handlers["/needs/seek"] = input => ({results:{need:"n-a2",description:input.description,suggestions:[{...state.rows[0],target:row.memory,source:row.memory,label:"Dana",reason:"Workshop note"}]}});
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(page.getByRole("button", {name:"Edit Unnamed encounter",exact:true})).toBeVisible();
  await expect(page.getByRole("button", {name:"Edit Dana",exact:true})).toHaveCount(0);
  await page.getByLabel("Who could help?").fill("workshop"); await page.getByRole("button", {name:"Find connections",exact:true}).click();
  const results = page.getByRole("region", {name:"Suggestions"});
  await expect(results.getByRole("button", {name:"Edit Unnamed encounter",exact:true})).toBeVisible();
  await expect(results.getByRole("button", {name:"Edit Dana",exact:true})).toHaveCount(0);
});

test("A2-I01 oversized raw draft is refused promptly before date review and remains fully editable", async ({page}) => {
  test.setTimeout(12_000);
  const state = await setup(page);
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  // The default original is raw: this exercises the source-aware date path,
  // rather than a guided edit whose date review already returns immediately.
  await expect(dialog.getByText("Some details from your note are kept together", {exact:false})).toBeVisible();
  const oversized = "x".repeat(500_000), activity = dialog.getByLabel("Does", {exact:true});
  await activity.fill(oversized);
  await expect(dialog.getByRole("alert")).toContainText("characters over the 20,000-character limit");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click({timeout:4_000});
  // A further real interaction also proves that synchronous date scanning has
  // not blocked the page behind an already-visible size warning.
  await dialog.getByLabel("Contact", {exact:true}).fill("still-editable@example.test", {timeout:4_000});
  await expect(activity).toHaveValue(oversized, {timeout:4_000});
  await expect(dialog.getByRole("alert")).toContainText("No text will be shortened automatically");
  expect(outgoingEdits(state)).toHaveLength(0);
  expect(state.rows[0].content).toBe(original);
});

function paginationRows(count) {
  return Array.from({length:count}, (_, index) => {
    const name=`Contact ${index}`, content=`Person: ${name}\nWhen:\nDoes: Builds sensors\nDiscussed:`;
    return {memory:`page-${index}`,content,original:content,revision:0,referenceDate:"2026-10-20",card:{name,nameQuote:`Person: ${name}`,facts:[]}};
  });
}
const displayedNames = page => page.locator(".contact-list h3").allTextContents();

test("A3 actual Retry retains two loaded pages and resumes the failed cursor once", async ({page}) => {
  const state=await setup(page), rows=paginationRows(60), gate=deferred();
  let fail=true;
  state.handlers["/memories/list"]=async({after})=>{
    if(after==="page-39") {
      if(fail) return {abort:true};
      await gate.promise;
    }
    const start=after ? rows.findIndex(value=>value.memory===after)+1 : 0;
    return {memories:rows.slice(start,start+21)};
  };
  const start=state.calls.length;
  await page.getByRole("button",{name:"Reload from start",exact:true}).click();
  await expect(page.locator(".contact-list h3")).toHaveCount(20);
  await page.getByRole("button",{name:"Load more",exact:true}).click();
  await expect(page.locator(".contact-list h3")).toHaveCount(40);
  await page.getByRole("button",{name:"Load more",exact:true}).click();
  await expect(page.getByRole("alert")).toContainText("Couldn't load");
  expect(await displayedNames(page)).toEqual(rows.slice(0,40).map(value=>value.card.name));
  fail=false;
  await page.getByRole("button",{name:"Retry",exact:true}).evaluate(button=>{button.click();button.click();});
  await expect.poll(()=>state.calls.slice(start).filter(call=>call.path==="/memories/list"&&call.input.after==="page-39").length).toBe(2);
  try {
    await expect(page.locator(".recent-actions button")).toBeDisabled();
    await expect(page.getByRole("button",{name:"Reload from start",exact:true})).toBeDisabled();
  } finally { gate.resolve(); }
  await expect(page.locator(".contact-list h3")).toHaveCount(60);
  expect(await displayedNames(page)).toEqual(rows.map(value=>value.card.name));
  expect(state.calls.slice(start).filter(call=>call.path==="/memories/list").map(call=>call.input.after)).toEqual(["","page-19","page-39","page-39"]);
  await expect(page.getByRole("button",{name:"Load more",exact:true})).toHaveCount(0);
});

test("A3 Reload from start recovers older notes after another tab removes the paging anchor", async ({page}) => {
  const state=await setup(page), rows=paginationRows(45); let live=[...rows];
  state.handlers["/memories/list"]=async({after})=>{
    const anchor=live.findIndex(value=>value.memory===after);
    if(after&&anchor<0) return {memories:[]};
    const start=after ? anchor+1 : 0;
    return {memories:live.slice(start,start+21)};
  };
  const reload=page.getByRole("button",{name:"Reload from start",exact:true});
  await reload.click(); await expect(page.locator(".contact-list h3")).toHaveCount(20);
  await page.getByRole("button",{name:"Load more",exact:true}).click();
  await expect(page.locator(".contact-list h3")).toHaveCount(40);
  live=live.filter(value=>value.memory!=="page-39");
  await page.getByRole("button",{name:"Load more",exact:true}).click();
  await expect(page.getByRole("button",{name:"Load more",exact:true})).toHaveCount(0);
  await expect(reload).toBeEnabled(); expect(await displayedNames(page)).toHaveLength(40);
  await reload.click(); await expect(page.locator(".contact-list h3")).toHaveCount(20);
  await page.getByRole("button",{name:"Load more",exact:true}).click();
  await expect(page.locator(".contact-list h3")).toHaveCount(40);
  await page.getByRole("button",{name:"Load more",exact:true}).click();
  await expect(page.locator(".contact-list h3")).toHaveCount(44);
  expect(await displayedNames(page)).toEqual(live.map(value=>value.card.name));
  await expect(page.getByRole("heading",{name:"Contact 44",exact:true})).toBeVisible();
  await expect(page.getByRole("heading",{name:"Contact 39",exact:true})).toHaveCount(0);
});

test("A3 a failed explicit reload retains the list and Retry preserves replacement intent", async ({page}) => {
  const state=await setup(page), rows=paginationRows(45); let fail=false;
  state.handlers["/memories/list"]=async({after})=>{
    if(fail) return {abort:true};
    const start=after ? rows.findIndex(value=>value.memory===after)+1 : 0;
    return {memories:rows.slice(start,start+21)};
  };
  const reload=page.getByRole("button",{name:"Reload from start",exact:true});
  await reload.click(); await expect(page.locator(".contact-list h3")).toHaveCount(20);
  await page.getByRole("button",{name:"Load more",exact:true}).click();
  await expect(page.locator(".contact-list h3")).toHaveCount(40);
  fail=true; await reload.click(); await expect(page.getByRole("alert")).toContainText("Couldn't load");
  expect(await displayedNames(page)).toEqual(rows.slice(0,40).map(value=>value.card.name));
  fail=false; await page.getByRole("button",{name:"Retry",exact:true}).click();
  await expect(page.locator(".contact-list h3")).toHaveCount(20);
  expect(await displayedNames(page)).toEqual(rows.slice(0,20).map(value=>value.card.name));
  expect(state.calls.filter(call=>call.path==="/memories/list").slice(-2).map(call=>call.input.after)).toEqual(["",""]);
});

test("A5 search capacity, invalid input and partial processing have distinct next actions without automatic retries", async ({page}) => {
  const state = await setup(page), description = page.getByLabel("Who could help?");
  const find = page.getByRole("button", {name:"Find connections",exact:true});
  for (const [error, message] of [
    ["CONFLICT", "Your saved collection is too large to search together"],
    ["INVALID_REQUEST", "Check your description"],
    ["INTERNAL_ERROR", "note processing may still finish"],
  ]) {
    const previous = state.calls.filter(call => call.path === "/needs/seek").length;
    state.handlers["/needs/seek"] = () => ({error});
    await description.fill(`sensors ${error}`); await find.click();
    const alert = page.getByRole("alert");
    await expect(alert).toContainText(message);
    await expect(description).toHaveValue(`sensors ${error}`);
    await expect(page.getByRole("button", {name:"Edit Mira Chen",exact:true})).toBeVisible();
    expect(state.calls.filter(call => call.path === "/needs/seek")).toHaveLength(previous + 1);
    expect(state.calls.filter(call => call.path === "/memories/forget" || call.path === "/memories/edit")).toHaveLength(0);
    if (error === "CONFLICT") {
      await expect(alert).toContainText("shorten long notes or remove encounters you no longer need");
      await expect(alert).toContainText("Changing this description won't fix the limit");
      await expect(alert).toContainText("need may already be saved");
    } else await expect(alert).not.toContainText("too large to search together");
  }
});

for (const failure of ["processing", "network"]) test(`A5 ${failure} preparation failure permits shortening the full last-loaded unorganized source`, async ({page}) => {
  const state = await setup(page); persistEdits(state);
  const source = "x".repeat(20_000);
  state.rows[0] = {...state.rows[0], content:source, original:source, card:null};
  state.handlers["/memories/prepare-edit"] = () => failure === "network" ? {abort:true} : {error:"INTERNAL_ERROR"};
  await page.getByRole("button", {name:"Reload from start",exact:true}).click();
  await page.getByRole("button", {name:"Edit Unnamed encounter",exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue(source);
  await expect(dialog.getByLabel("Person", {exact:true})).toHaveValue("");
  await expect(dialog.getByRole("alert").filter({hasText:"last version loaded in Recent people"})).toContainText("may have changed since then");
  await expect(dialog.getByRole("alert").filter({hasText:"characters over"})).toContainText("No text will be shortened automatically");
  expect(outgoingEdits(state)).toHaveLength(0);
  await dialog.getByLabel("Does", {exact:true}).fill("Keep this shorter reminder.");
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click();
  await expect(dialog).toHaveCount(0);
  expect(outgoingEdits(state)).toHaveLength(1);
  expect(outgoingEdits(state)[0]).toMatchObject({memory:row.memory,revision:0});
  expect(outgoingEdits(state)[0].content).toContain("Does: Keep this shorter reminder.");
  expect(state.rows[0].original).toBe(source); expect(state.rows[0].revision).toBe(1);
});

test("A5 successful null-card preparation uses its fresh source and revision instead of the last-loaded row", async ({page}) => {
  const state = await setup(page);
  const content = "Person: Quinn\nWhen:\nDoes: Builds acoustic sensors\nDiscussed:\nNotes: Fresh source reminder";
  state.handlers["/memories/prepare-edit"] = () => ({...row, content, revision:7, referenceDate:"2026-10-25", card:null});
  state.handlers["/memories/edit"] = input => {
    expect(input.revision).toBe(7); expect(input.content).toBe(content);
    return {memory:row.memory};
  };
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  await expect(dialog.getByLabel("Person", {exact:true})).toHaveValue("Quinn");
  await expect(dialog.getByLabel("Does", {exact:true})).toHaveValue("Builds acoustic sensors");
  await expect(dialog.getByLabel("Notes", {exact:true})).toHaveValue("Fresh source reminder");
  await expect(dialog.getByText("10/25/2026", {exact:false})).toBeVisible();
  await expect(dialog.getByText("last version loaded in Recent people", {exact:false})).toHaveCount(0);
  await dialog.getByRole("button", {name:"Save changes",exact:true}).click();
  await expect(dialog).toHaveCount(0); expect(outgoingEdits(state)).toHaveLength(1);
});

for (const error of ["NOT_FOUND", "CONFLICT", "UNAUTHORIZED"]) test(`A5 ${error} preparation never falls back to the loaded source`, async ({page}) => {
  const state = await setup(page);
  state.handlers["/memories/prepare-edit"] = () => ({error});
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  const message = error === "NOT_FOUND" ? "This encounter was removed" : error === "CONFLICT" ? "This encounter changed elsewhere" : "Your session has ended";
  await expect(page.getByRole("alert")).toContainText(message);
  await expect(page.getByRole("dialog", {name:"Edit encounter"})).toHaveCount(0);
  expect(outgoingEdits(state)).toHaveLength(0);
});

test("A5 failed preparation without a matching loaded row keeps the retry path instead of inventing a source", async ({page}) => {
  const state = await setup(page); state.rows = [];
  await page.getByRole("button", {name:"Reload from start",exact:true}).click();
  await expect(page.locator(".contact-list h3")).toHaveCount(0);
  state.handlers["/needs/seek"] = () => ({results:{need:"fresh-need",description:"sensors",suggestions:[{...row,target:row.memory,source:row.memory,label:"Mira Chen",reason:"Develops sensors"}]}});
  state.handlers["/memories/prepare-edit"] = () => ({error:"INTERNAL_ERROR"});
  await page.getByLabel("Who could help?").fill("sensors");
  await page.getByRole("button", {name:"Find connections",exact:true}).click();
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  await expect(page.getByRole("alert")).toContainText("Reload Recent people and try again");
  await expect(page.getByRole("dialog", {name:"Edit encounter"})).toHaveCount(0);
  expect(outgoingEdits(state)).toHaveLength(0);
});

test("A5 account change discards a pending failed preparation and its previous-account snapshot", async ({page}) => {
  const state = await setup(page), gate = deferred();
  state.handlers["/memories/prepare-edit"] = () => gate.promise;
  await page.getByRole("button", {name:"Edit Mira Chen",exact:true}).click();
  await expect.poll(() => state.calls.filter(call => call.path === "/memories/prepare-edit").length).toBe(1);
  const delivered = page.waitForResponse(response => new URL(response.url()).pathname === "/api/memories/prepare-edit");
  try {
    state.username = "leo"; state.rows = [];
    await page.evaluate(() => window.dispatchEvent(new Event("focus")));
    await expect(page.getByText("leo", {exact:true})).toBeVisible();
  } finally { gate.resolve({error:"INTERNAL_ERROR"}); }
  await (await delivered).finished();
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await expect(page.getByRole("dialog", {name:"Edit encounter"})).toHaveCount(0);
  await expect(page.getByText("last version loaded in Recent people", {exact:false})).toHaveCount(0);
  await expect(page.getByRole("button", {name:"Edit Mira Chen",exact:true})).toHaveCount(0);
  expect(outgoingEdits(state)).toHaveLength(0);
});


test("grouped discussion details scan cleanly while the exact note stays in Personal notes",async({page})=>{
  const state=await setup(page);
  state.rows[0].card.facts.push(
    {kind:"discussion",value:"Discussed robotics",quote:"We discussed robotics."},
    {kind:"discussion",value:"Discussed cinnamon buns",quote:"We discussed cinnamon buns."},
  );
  await page.evaluate(()=>window.dispatchEvent(new Event("focus")));
  const contact=page.locator(".contact-row");
  await contact.locator(".contact-name").click();
  const discussion=contact.locator(".memory-details > div").filter({has:page.locator("dt",{hasText:"Discussed"})});
  await expect(discussion).toHaveCount(1);
  await expect(discussion.locator("dd")).toHaveText("sensors; robotics; cinnamon buns");
  await expect(contact.locator("blockquote")).not.toBeVisible();
  await contact.locator(".personal-notes summary").click();
  await expect(contact.locator("blockquote")).toHaveText(original);
});


test("blue reason compacts an older referral response and keeps its exact note collapsed", async({page})=>{
  const state=await setup(page);
  const source="Met Rowan. Knows people in Chicago who are looking for interns for this summer.";
  const quote="Knows people in Chicago who are looking for interns for this summer.";
  const referralCard={name:"Rowan",nameQuote:"Met Rowan.",facts:[{kind:"offer",value:quote,quote}]};
  state.handlers["/needs/seek"]=()=>({results:{need:"referral-need",description:"internship contacts",suggestions:[{target:"referral",source:"referral",label:"Rowan",content:source,original:source,revision:0,referenceDate:"2026-10-20",card:referralCard,reason:`${quote} — “${quote}”`}]}});
  await page.getByLabel("Who could help?").fill("internship contacts");
  await page.getByRole("button",{name:"Find connections",exact:true}).click();
  const result=page.locator(".contact-row").filter({has:page.getByRole("heading",{name:"Rowan",exact:true})});
  await result.locator(".contact-name").click();
  await expect(result.locator(".match-reason")).toHaveText("Chicago internship contacts · this summer");
  await expect(result.locator("blockquote")).not.toBeVisible();
  await result.locator(".personal-notes summary").click();
  await expect(result.locator("blockquote")).toHaveText(source);
});
