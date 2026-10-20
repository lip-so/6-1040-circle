/** A recording stays in memory and is discarded when its capture is cancelled. */
export class VoiceCapture {
  private revision = 0;
  private stream?: MediaStream;
  private recorder?: MediaRecorder;
  private timer?: ReturnType<typeof setTimeout>;
  private chunks: Blob[] = [];
  private bytes = 0;

  async start(onLimit: () => void) {
    this.cancel();
    const revision = this.revision;
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") throw new Error("unsupported");
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (revision !== this.revision) { stream.getTracks().forEach(track => track.stop()); return false; }
    this.stream = stream;
    const mediaType = ["audio/webm", "audio/mp4"].find(type => MediaRecorder.isTypeSupported(type));
    if (!mediaType) { this.cancel(); throw new Error("unsupported"); }
    try { this.recorder = new MediaRecorder(stream, { mimeType: mediaType }); }
    catch (error) { this.cancel(); throw error; }
    this.recorder.addEventListener("dataavailable", event => {
      if (revision !== this.revision) return;
      this.chunks.push(event.data);
      this.bytes += event.data.size;
      if (this.bytes > 4 * 1024 * 1024) { this.cancel(); onLimit(); }
    });
    this.recorder.addEventListener("error", () => {
      if (revision !== this.revision) return;
      this.cancel(); onLimit();
    });
    this.recorder.start(1_000);
    this.timer = setTimeout(() => { this.cancel(); onLimit(); }, 120_000);
    return true;
  }

  async finish(): Promise<{ audio: string; mediaType: string } | null> {
    const recorder = this.recorder;
    if (!recorder || recorder.state === "inactive") return null;
    const revision = this.revision;
    clearTimeout(this.timer);
    await new Promise<void>((resolve, reject) => {
      recorder.addEventListener("stop", () => resolve(), { once: true });
      recorder.addEventListener("error", () => reject(new Error("recording")), { once: true });
      recorder.stop();
    });
    this.stream?.getTracks().forEach(track => track.stop());
    if (revision !== this.revision) return null;
    const blob = new Blob(this.chunks, { type: recorder.mimeType });
    this.cancel();
    if (!blob.size || blob.size > 4 * 1024 * 1024) throw new Error("size");
    const data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(",")[1]!);
      reader.onerror = () => reject(new Error("recording"));
      reader.readAsDataURL(blob);
    });
    return { audio: data, mediaType: recorder.mimeType.split(";")[0]! };
  }

  cancel() {
    this.revision += 1;
    clearTimeout(this.timer);
    if (this.recorder?.state === "recording") this.recorder.stop();
    this.stream?.getTracks().forEach(track => track.stop());
    this.recorder = undefined;
    this.stream = undefined;
    this.chunks = [];
    this.bytes = 0;
  }
}
