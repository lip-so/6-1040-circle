<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import ActionIcon from './ActionIcon.vue';
const props = defineProps<{ gesture?: number }>();
const root = ref<HTMLElement>();
const paused = ref(false);
const visible = ref(true);
const hidden = ref(document.hidden);
const reduced = ref(false);
const suspended = computed(() => paused.value || !visible.value || hidden.value || reduced.value);
let observer: IntersectionObserver | undefined;
let preference: MediaQueryList | undefined;
let frame = 0;
let mounted = false;
const elapsed = ref(0);
let lastTime = 0;
let waveStart = -10;
function visibility() { hidden.value = document.hidden; }
function motionPreference() { reduced.value = preference?.matches ?? false; }
type Point = readonly [number, number];
function normal(from: Point, to: Point): Point {
  const length = Math.hypot(to[0] - from[0], to[1] - from[1]) || 1;
  return [-(to[1] - from[1]) / length, (to[0] - from[0]) / length];
}
function offset(point: Point, axis: Point, width: number): string {
  return `${(point[0] + axis[0] * width).toFixed(2)} ${(point[1] + axis[1] * width).toFixed(2)}`;
}
// Each limb is one smooth, closed tapered silhouette. Its root stays inside
// the torso at every pose; there are no separate elbow/knee pieces to detach.
function limb(start: Point, bend: Point, end: Point, rootWidth: number, tipWidth: number, extension: number): string {
  const root = normal(start, bend), middle = normal(start, end), tip = normal(bend, end);
  const length = Math.hypot(end[0] - bend[0], end[1] - bend[1]) || 1;
  const cap: Point = [end[0] + (end[0] - bend[0]) / length * extension, end[1] + (end[1] - bend[1]) / length * extension];
  return `M${offset(start, root, rootWidth)} Q${offset(bend, middle, rootWidth * .8)} ${offset(end, tip, tipWidth)} Q${cap[0].toFixed(2)} ${cap[1].toFixed(2)} ${offset(end, tip, -tipWidth)} Q${offset(bend, middle, -rootWidth * .8)} ${offset(start, root, -rootWidth)} Z`;
}
const dancers = computed(() => [false, true].map(second => {
  const time = elapsed.value;
  const waveTime = time - waveStart - (second ? .14 : 0);
  const wave = waveTime >= 0 && waveTime < 2.5 ? Math.sin(Math.PI * waveTime / 2.5) ** .6 : 0;
  const breath = Math.sin(time * 1.4 + (second ? 1.6 : 0));
  const flutter = Math.sin(waveTime * 13) * 17 * wave;
  return {
    torso: `rotate(${(breath * 1.2).toFixed(2)} 0 85)`,
    leftArm: limb([-23, 25], [-78, second ? -17 : 20 + breath * 3], [-123, second ? -53 + breath * 4 : -10 + breath * 5], 13, 4.5, 13),
    rightArm: limb([23, 25], [69, -18 - wave * 27], [125 - wave * 15, -52 - wave * 59 + flutter + breath * 3], 13, 4.5, 15),
    leftLeg: limb([-10, 126], [-22 + breath * 2, 197], [-49 + breath * 3, 265], 17, 7, 21),
    rightLeg: limb([12, 126], [79 + breath * 3, 170], [second ? 104 : 36, 225 + breath * 3], 17, 7, 20),
  };
}));
function tick(time: number) {
  frame = 0;
  if (suspended.value || !mounted) return;
  if (lastTime) elapsed.value += Math.min((time - lastTime) / 1000, .08);
  lastTime = time;
  frame = requestAnimationFrame(tick);
}
function syncAnimation() {
  if (!mounted) return;
  cancelAnimationFrame(frame); frame = 0; lastTime = 0;
  if (!suspended.value) frame = requestAnimationFrame(tick);
}
watch(suspended, syncAnimation);
watch(() => props.gesture, () => { if (!suspended.value) waveStart = elapsed.value; });
onMounted(() => {
  preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionPreference(); preference.addEventListener('change', motionPreference);
  document.addEventListener('visibilitychange', visibility);
  observer = new IntersectionObserver(entries => { visible.value = entries[0]?.isIntersecting ?? false; });
  if (root.value) observer.observe(root.value);
  mounted = true; syncAnimation();
});
onBeforeUnmount(() => {
  mounted = false; cancelAnimationFrame(frame);
  observer?.disconnect(); preference?.removeEventListener('change', motionPreference);
  document.removeEventListener('visibilitychange', visibility);
});
</script>
<template>
  <div ref="root" class="animated-backdrop">
    <svg class="articulated-scene" viewBox="0 0 1000 650" fill="none" aria-hidden="true" focusable="false">
      <g class="scene-connections" stroke-width=".85">
        <path d="M30 360C180 30 410 90 540 220S870 420 990 100M90 590C270 540 350 340 620 390S890 600 960 430" stroke="#2455a4" />
        <path d="M120 100C350 140 370 600 690 565S810 200 930 145" stroke="#e74735" />
        <circle cx="500" cy="330" r="240" stroke="#2455a4" opacity=".3" />
      </g>
      <g class="scene-circles"><circle cx="105" cy="185" r="27" fill="#f6bda9" /><circle cx="845" cy="130" r="37" fill="#e74735" /><circle cx="875" cy="470" r="23" fill="#2455a4" /><circle cx="167" cy="530" r="13" fill="#e74735" /><circle cx="646" cy="72" r="9" fill="#2455a4" /><circle cx="934" cy="335" r="8" fill="#e74735" /><circle cx="365" cy="560" r="19" fill="#f6bda9" /></g>
      <g v-for="(dancer, index) in dancers" :key="index" :transform="index === 0 ? 'translate(230 210) rotate(19) scale(1.05)' : 'translate(780 222) rotate(-24) scale(1.02)'" :data-dancer="index">
        <g :transform="dancer.torso" fill="#2455a4">
          <path data-limb="left-leg" :d="dancer.leftLeg" /><path data-limb="right-leg" :d="dancer.rightLeg" />
          <path data-limb="right-arm" :d="dancer.rightArm" />
          <path data-silhouette="head-neck-torso" d="M-8-15C-32-17-38-48-18-59C0-74 22-55 20-38C17-27 7-21 4-13C11 0 26 4 30 26C36 51 16 71 20 88C25 106 37 116 24 134C14 147-11 148-20 133C-26 120-11 102-12 89C-13 72-33 52-31 29C-32 8-20 3-8-15Z" />
          <path data-limb="left-arm" :d="dancer.leftArm" />
        </g>
      </g>
    </svg>
    <button v-if="!reduced" class="icon-button motion-toggle" type="button" :aria-label="paused ? 'Play artwork animation' : 'Pause artwork animation'" :title="paused ? 'Play artwork animation' : 'Pause artwork animation'" :aria-pressed="paused" @click="paused = !paused"><ActionIcon :name="paused ? 'play' : 'pause'" /></button>
  </div>
</template>
