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
    await route.fulfill({status:answer?.error ? (answer.error==="CONFLICT"?409:500) : 200,json:answer});
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
  await expect(dialog.getByLabel("Does",{exact:true})).toHaveValue("Develops solar panels");
  await expect(dialog.getByLabel("Person",{exact:true})).toBeFocused();
  await dialog.getByLabel("Person",{exact:true}).fill("Unsent change");
  await dialog.getByRole("button",{name:"Cancel",exact:true}).click();
  await expect(edit).toBeFocused();expect(state.calls.filter(c=>c.path==="/memories/edit")).toHaveLength(0);
  await edit.click();await expect(dialog).toBeVisible();await page.keyboard.press("Escape");await expect(dialog).toHaveCount(0);await expect(edit).toBeFocused();
  state.handlers["/memories/edit"]=()=>({error:"CONFLICT"});
  await edit.click();await dialog.getByRole("button",{name:"Save changes",exact:true}).click();
  await expect(dialog.getByRole("alert")).toContainText("changed elsewhere");
  await dialog.getByRole("button",{name:"Cancel",exact:true}).click();
  state.rows[0].revision=1;state.rows[0].card.facts[0].value="Builds sensors";
  state.handlers["/memories/edit"]=(input)=>{expect(input.revision).toBe(1);expect(input.content).toContain("Builds sensors");return {memory:row.memory};};
  await edit.click();await expect(dialog.getByLabel("Does",{exact:true})).toHaveValue("Builds sensors");
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
  state.rows[0].card.facts.push({kind:"date", value:"2026-10-24", quote:"Met Mira Chen."}, {kind:"context", value:"At the workshop", quote:"Met Mira Chen."});
  await page.getByRole("button", {name:"Edit Mira Chen", exact:true}).click();
  const dialog = page.getByRole("dialog", {name:"Edit encounter"});
  const date = dialog.getByLabel("Date (MM/DD/YYYY)", {exact:true});
  await expect(date).toHaveValue("10/24/2026");
  await expect(dialog.getByLabel("Notes", {exact:true})).toHaveValue("At the workshop");
  await date.fill("04/31/2026");
  await dialog.getByRole("button", {name:"Save changes", exact:true}).click();
  expect(await date.evaluate(input => input.checkValidity())).toBe(false);
  expect(state.calls.filter(c => c.path === "/memories/edit")).toHaveLength(0);
  await date.fill("04/30/2026");
  await dialog.getByRole("button", {name:"Save changes", exact:true}).click();
  await expect(dialog).toHaveCount(0);
  expect(state.calls.find(c => c.path === "/memories/edit").input.content).toContain("When: 04/30/2026");
});
