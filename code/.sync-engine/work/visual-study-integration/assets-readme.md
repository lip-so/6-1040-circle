# Circle motion assets

Three original Matisse-inspired paper-cut human rigs, revised to combine flowing asymmetric contours with occasional clipped ends. Built-in image_gen produced the artwork; the SVG renderer assembles and animates it.

## Files

- `assets/lilt-atlas.png`, `gather-atlas.png`, `lean-atlas.png`: transparent original 3 × 4 PNG part atlases, 1086 × 1448 px each. Twelve parts per figure, including alternate open-hand forearms.
- `parts/{figure}/`: 36 individual, self-contained SVG wrappers around the generated raster artwork. Each wrapper embeds its original atlas and clips to the measured region. These are **not vector-traced outlines**. Pivot coordinates are included as attributes.
- `poses/{figure}/`: 24 self-contained SVG illustrations: rest, welcome, reach, listen, remember, walk, celebrate, connect. Transparency is preserved.
- `rigs.json`: measured source rectangles, pivot and endpoint coordinates, shoulder placements, proportions, palette, and font choices.
- `motion.js`: dependency-free SVG assembly, pose presets, and independent joint transforms.
- `preview.js`, `styles.css`, `index.html`: interactive preview with play/pause, pose selection, figure selection, and SVG download. Gesture changes ease over 380 ms; motion fades in/out over 400 ms. Reduced-motion disables decorative looping. Animation pauses when the document is hidden.
- `assets/motifs.svg`: reusable person mark, memory ring, discovery loop, connecting curve, and encounter line, using `currentColor` symbols.
- `PROMPTS.json`: final prompt set and built-in generation mode.

## Palette and typography

| Token | Value |
| --- | --- |
| Ultramarine | `#2455A4` |
| Vermilion | `#E74735` |
| Warm ivory | `#F8F6F0` |
| Ink | `#252525` |
| Dusty blue | `#DCE7F3` |
| Pale coral | `#F9DFD8` |

SVG output normalizes the artwork to exact palette values; the original generated PNGs retain their original ink rendering. Blue is the default; vermilion is the accent. Change the renderer's `color` option to any palette token.

Titles: **MadInk**. Body, labels and controls: **Urbanist**. Urbanist and its OFL license are bundled from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/urbanist). **MadInk is not bundled because its font file was not supplied.** The stylesheet uses locally installed MadInk if present and falls back to Urbanist for this preview. To use a supplied licensed webfont, add its file and update the MadInk `@font-face` source in `styles.css`. Do not describe the fallback as MadInk.

## Preview

Serve this folder with a local static server, then open `index.html`. The preview loads the manifest with fetch, so opening it directly as a file may be blocked by the browser. The exported SVG parts and poses open directly without a server.

The preview is an asset viewer. No Circle application flows or backend behavior have been changed.

## Integration

```js
import { figureMarkup, PALETTE } from './motion.js';
// data is rigs.json, href points to an atlas relative to the consuming page.
svg.innerHTML = figureMarkup(data.rigs.lilt, './assets/lilt-atlas.png', {
  pose: 'welcome', color: PALETTE.ultramarine, id: 'welcome-lilt'
});
// Retain the SVG structure; update transforms on each animation frame.
figureMarkup(data.rigs.lilt, '', {
  pose: 'welcome', animate: true, time: elapsedSeconds,
  motionWeight: 1, target: svg
});
```

Use a unique filter `id` for every inline figure. `time` is seconds. Angles are degrees clockwise from downward; forearm/shin angles are relative to their upper segment. Source `frame` is `[x,y,width,height]`; `pivot` and `end` are local to that frame. The head pivot is at the neck. Torso is one part including pelvis. Hands/feet are integrated into forearms/shins, so no detached tiny pieces are required.

The renderer accepts either a named pose or an object with `body`, `head`, `arms`, `legs`, `open`, and optional `name`. The preview demonstrates smooth interpolation between those pose objects. A walking preset is a decorative walk cycle, not a physically accurate locomotion simulation.

To regenerate exported SVG files after changing proportions or poses, run `bun build-assets.mjs` from this folder. Atlas PNGs remain unchanged.

## Verification

The three source images were checked for true RGBA transparency. All 36 part regions were measured from their principal alpha components. The assembled browser preview was visually inspected; play/pause and gesture selection were exercised. MadInk rendering remains pending receipt of its font file.
