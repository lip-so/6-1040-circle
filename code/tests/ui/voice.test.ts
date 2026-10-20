import { afterEach, expect, test } from "bun:test";
import { VoiceCapture } from "../../frontend/src/voice.ts";

const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, "navigator");
const originalRecorder = Object.getOwnPropertyDescriptor(globalThis, "MediaRecorder");
const originalReader = Object.getOwnPropertyDescriptor(globalThis, "FileReader");
afterEach(() => {
  for (const [name, descriptor] of [["navigator", originalNavigator], ["MediaRecorder", originalRecorder], ["FileReader", originalReader]] as const) {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else Reflect.deleteProperty(globalThis, name);
  }
});
function install(getUserMedia: () => Promise<unknown>) {
  class Recorder extends EventTarget {
    static isTypeSupported(type: string) { return type === "audio/webm"; }
    state = "inactive";
    mimeType = "audio/webm";
    start() { this.state = "recording"; }
    stop() {
      this.state = "inactive";
      this.dispatchEvent(Object.assign(new Event("dataavailable"), { data: new Blob(["recorded audio"]) }));
      this.dispatchEvent(new Event("stop"));
    }
  }
  class Reader {
    result: string | null = null;
    onload?: () => void;
    async readAsDataURL(blob: Blob) {
      this.result = `data:audio/webm;base64,${Buffer.from(await blob.arrayBuffer()).toString("base64")}`;
      this.onload?.();
    }
  }
  Object.defineProperty(globalThis, "navigator", { configurable: true, value: { mediaDevices: { getUserMedia } } });
  Object.defineProperty(globalThis, "MediaRecorder", { configurable: true, value: Recorder });
  Object.defineProperty(globalThis, "FileReader", { configurable: true, value: Reader });
}
test("cancelling while microphone permission is pending stops the late stream and never starts capture", async () => {
  let givePermission!: (value: unknown) => void;
  let stopped = false;
  install(() => new Promise(resolve => { givePermission = resolve; }));
  const capture = new VoiceCapture();
  const opening = capture.start(() => {});
  capture.cancel();
  givePermission({ getTracks: () => [{ stop() { stopped = true; } }] });
  expect(await opening).toBe(false);
  expect(stopped).toBe(true);
  expect(await capture.finish()).toBeNull();
});
test("finishing produces bounded recording data and stops microphone tracks; cancellation discards a later recording", async () => {
  let stops = 0;
  install(async () => ({ getTracks: () => [{ stop() { stops++; } }] }));
  const capture = new VoiceCapture();
  expect(await capture.start(() => {})).toBe(true);
  const recording = await capture.finish();
  expect(recording?.mediaType).toBe("audio/webm");
  expect(Buffer.from(recording!.audio, "base64").toString()).toBe("recorded audio");
  expect(stops).toBeGreaterThan(0);
  await capture.start(() => {});
  capture.cancel();
  expect(await capture.finish()).toBeNull();
});
