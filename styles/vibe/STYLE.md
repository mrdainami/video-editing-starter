---
status: approved
version: 2
updated: 2026-10-22
---
# Style: vibe

Playful kinetic-type collage. Off-white paper, ink black, one coral accent. Words mix four fonts, key words get a coral text-selection box with handles, Mac-style folders fly around, chunky block wipes and a camera-iris ring. Every graphic carries its own sound.

- Made from: Pinterest reference "Focus transition" (see `references/NOTES.md`), designed on a talking-head clip.
- Formats: 16:9 (1920×1080). 9:16 not designed yet.
- Example style bundled with the starter. Make it your default in `brand/BRAND.md`, change it with `skills/new-style/SKILL.md`, or design your own.

## Tokens

- Colours: paper `#f2f2f0` · cream `#f4f1ea` · ink `#111111` · coral `#fc6467` · coral deep `#d8403f` (small coral text on light) · coral tint `#ffd6d4` (selection box)
- Fonts (all SIL Open Font License, in `graphics/assets/vibe/fonts/`): Archivo Black (heavy), Instrument Serif Italic (serif), Inter Tight 800 (tight), Silkscreen 700 (pixel)
- Type collage order: heavy → serif → tight (selected / font-swap) → pixel
- Easing: entrances `back.out(1.4–1.8)` or `power4.out`; exits `power3.in`; 0.3–0.5s moves
- Pace: fast. New beat every 0.1–0.4s inside an element; elements hold 3–5s
- Safe zones: see "Where things go" below
- Sound feel: whooshes for every move and transition, soft clicks for selections, at most one pop per graphic. No beepy or 8-bit sounds.
- Effect gain: 0.55–0.88 (sits about 4–8 dB under the voice)
- Music: dark cinematic piano (slow, ~75 BPM, soft pads, deep sub-bass, almost no drums), mixed about 15 dB under the voice (~ -31 LUFS)

## Rules

Read before every use. Newest last. What picture to show for which words is in `skills/add-graphics/VISUAL-IDEAS.md` (same for every style).

| Rule | Why / where it came from | Added |
| --- | --- | --- |
| Side graphics come in pairs: same size, mirrored left and right. | Creator feedback while designing | 2026-10-22 |
| Takeover titles are always centred, and fit inside the frame with even margins (about 1500px wide at most). | Creator feedback while designing | 2026-10-22 |
| Coral is the only accent colour. No blue. | Creator feedback while designing | 2026-10-22 |
| Lower thirds go on the left. | Creator feedback while designing | 2026-10-22 |
| Captions: 3 words at a time, key word in the coral selection box. | Creator request | 2026-10-22 |
| "With me" graphics never cover the face. Map the person first (cut-out + free zones). | Creator feedback while designing | 2026-10-22 |
| Show the idea, not the words. Each key line gets a picture of what is said (a chase for "chasing tools", a bullseye for "outcome"). Never a name card or lower third unless asked. | Creator feedback on a test video | 2026-10-22 |
| Big idea = full-screen takeover. When the speaker talks about themselves ("I've…", "my…"), cut back to them. | Creator feedback on a test video | 2026-10-22 |
| Graphics never overlap each other. One leaves before the next arrives. | Creator feedback on a test video | 2026-10-22 |
| One takeover can change with the speech (e.g. come & go → outcome → just the tool) instead of cutting away and back. | Creator feedback on a test video | 2026-10-22 |
| The main graphic sits centred. When a second idea arrives, the first slides aside and an arrow points at the new thing. | Creator feedback on a test video | 2026-10-22 |
| No filler transitions (rings, irises) that do not carry meaning. | Creator feedback on a test video | 2026-10-22 |
| Nothing below y 880: that strip belongs to the captions. | Creator feedback on a test video | 2026-10-22 |
| Sound: whooshes for moves and transitions, at most one pop per graphic, no beepy sounds. | Creator feedback on a test video | 2026-10-22 |
| Music: dark cinematic piano bed, about 15 dB under the voice. | Creator feedback on a test video | 2026-10-22 |

## Elements

Each element is a HyperFrames component in `graphics/compositions/` (source in `graphics/src/`), with its own sounds built in. Fill-in fields are listed in each file's `data-composition-variables`.

| Element | Kind | Where | Length | Fill-ins | Sounds |
| --- | --- | --- | --- | --- | --- |
| vibe-side-pair | with me | both top free zones, mirrored | 5.0s | labels, badge numbers, top, inset | pop |
| vibe-stat-pair | with me | both top free zones, mirrored | 4.9s | big number, bars, counter from→to, unit, labels, note | stat-slide-count |
| vibe-lower-third | with me | bottom-left, above captions | 4.8s | kicker, name, selected part | lowerthird-snap, select-click |
| vibe-behind-word | behind me | full width, under the cut-out | 5.6s | word, size, top, nudge | behind-thud |
| vibe-ring-behind | behind me | around the head, under the cut-out | 2.1s | text, head x/y, size | — |
| vibe-captions | with me | bottom centre, whole video | any | word timings JSON, words per caption | — |
| vibe-folder-storm | transition in | full frame | 1.3s | background, folder count | storm-flutter |
| vibe-title-card | takeover | full frame, centred | 4.6s | 4 words, subtitle, size | title-whoosh, swap-glitch, select-click |
| vibe-block-wipe | transition | full frame | 0.6–0.8s | mode cover/reveal, colour | block-wipe |
| vibe-pack-folder | takeover (big graphic) | full frame | 4.4s | heading, folder label, 4 cards | select-click, folder-open-fan |
| vibe-screen-window | takeover (screen recording) | full frame | 6.3s | title, highlight box, label, bubble on/off, entry | window-swoosh-pop, pop, select-click |
| vibe-device-mockups | takeover | full frame | 6.0s | heading, laptop clip start, phone rows, exit point | mockup-thump-swoosh, select-click |
| vibe-iris | transition | on the face | 0.85s / 0.7s | mode close/open, ring text, face x/y | ring-iris-shutter |
| vibe-big-stat | takeover (big graphic) | full frame | 4.2s | heading, big number, bar values, axis label | select-click, stat-slide-count |
| vibe-chase | takeover | full frame | ~2.7s | heading, runner label, bar label, resetAt, logos | whoosh, whoosh-short |
| vibe-few-things | takeover | full frame | ~1.5s | heading, 3 items, noise words, lockAt | click-soft |
| vibe-tools-outcome | takeover (opens from the head) | full frame | ~8.3s | part headings, target tag, tool label, tools, logos, outcomeAt, toolAt, pathAt | whoosh, impact-bass-1, pop, click-soft, whoosh-short |
| vibe-marketer | takeover | full frame | ~3.6s | heading, channel name, role, subscribers from→to, 4 ideas, ideasAt | click-soft, pop |
| vibe-gauge | with me | top free zone (right/left) | ~1.2s | question, from/to labels, swingAt, outAt | pop, select-click |
| vibe-before-after | with me | both top free zones, mirrored | ~6.3s | leftAt, rightAt | pop ×2, stat-slide-count |
| vibe-logo-orbit | behind me | around the head, under the cut-out | ~2s | logos, head x/y, radius, outAt (burst outward) | pop, whoosh-short |
| vibe-problem-vs-tool | with me | both top free zones, mirrored | ~4.7s | rightAt, checkAt | pop, select-click |

### Good combos

- block-wipe cover → any takeover → block-wipe reveal (back to the speaker)
- logo-orbit (outAt) → tools-outcome (opens as a circle from the head)
- gauge (outAt) → behind-word (one after the other, never together)

- folder-storm → title-card (title ends with its own iris back to video)
- block-wipe cover → pack-folder → block-wipe reveal
- block-wipe reveal → screen-window (enter: instant) → device-mockups (exits onto the face)
- ring-behind → iris close → big-stat → iris open

### Where things go

From the subject map of the video being edited (`project/subject-map.md`). Defaults assume a centred talking head: face x 640–1280, y 40–560; free zones top-left x 60–600, top-right x 1300–1860, y 60–500.

## How to use in a video

1. Copy `graphics/compositions/` and `graphics/assets/vibe/` into the video's HyperFrames project (`compositions/`, `assets/vibe/`).
2. Mount each element with a host `<div data-composition-id="vibe-…" data-composition-src="compositions/vibe-….html" data-start data-duration data-variable-values='{…}'>`. See `graphics/index.html` for every element placed on a timeline.
3. Using an element twice in one video: `python3 build.py --instance vibe-iris vibe-iris-2` and mount the copy under its new id.
4. Behind-me elements sit under the person cut-out (`hyperframes remove-background`); everything else sits above it.
5. Screen-window and device-mockups play `assets/screen.mp4`; the bubble plays `assets/talk.mp4`.
6. Editing the look: change `graphics/src/*.html` or `graphics/assets/vibe/vibe.css`, then run `python3 graphics/build.py`.

## Sounds

Files in `sounds/` (also copied to `graphics/assets/vibe/sfx/`). Start each sound so its hit lands on the visual moment: start = moment − hit time.

| File | Used for | Hit / length | Source | Job ID |
| --- | --- | --- | --- | --- |
| sounds/side-pop.wav | retired (sounded too 8-bit); replaced by pop.wav | 0.29s / 0.5s | AI-generated (KIE Suno Sounds V6) | — |
| sounds/storm-flutter.wav | folder storm | 0.57s / 1.4s | AI-generated (KIE Suno Sounds V6) | — |
| sounds/title-whoosh.wav | title words | 0.56s / 0.8s | AI-generated (KIE Suno Sounds V6) | — |
| sounds/swap-glitch.wav | font swap | 0.29s / 0.45s | AI-generated (KIE Suno Sounds V6) | — |
| sounds/select-click.wav | every selection box | 0.04s / 0.3s | AI-generated (KIE Suno Sounds V6) | — |
| sounds/stat-slide-count.wav | stat cards, big chart | 0.25s / 1.6s | AI-generated (KIE Suno Sounds V6) | — |
| sounds/behind-thud.wav | big word behind you | 0.32s / 1.5s | AI-generated (KIE Suno Sounds V6) | — |
| sounds/lowerthird-snap.wav | lower third | 0.29s / 0.6s | AI-generated (KIE Suno Sounds V6) | — |
| sounds/block-wipe.wav | retired; block wipe now uses whoosh.wav | 0.30s / 0.75s | AI-generated (KIE Suno Sounds V6) | — |
| sounds/folder-open-fan.wav | big folder | 0.48s / 0.75s | AI-generated (KIE Suno Sounds V6) | — |
| sounds/window-swoosh-pop.wav | screen window | 0.40s / 1.0s | AI-generated (KIE Suno Sounds V6) | — |
| sounds/mockup-thump-swoosh.wav | laptop + phone | 0.28s / 1.3s | AI-generated (KIE Suno Sounds V6) | — |
| sounds/pop.wav | one key thing appearing (max one per graphic) | 0.12s / 0.72s | HyperFrames bundled library (Pixabay licence; run graphics/get-sounds.sh) | — |
| sounds/whoosh.wav | transitions, block wipe, takeover entrances | 0.16s / 0.57s | HyperFrames bundled library (Pixabay licence; run graphics/get-sounds.sh) | — |
| sounds/whoosh-short.wav | fast moves, slides, logos flying off | 0.16s / 0.57s | HyperFrames bundled library (Pixabay licence; run graphics/get-sounds.sh) | — |
| sounds/click-soft.wav | focus lock, arrow label, small selections | 0.05s / 0.37s | HyperFrames bundled library (Pixabay licence; run graphics/get-sounds.sh) | — |
| sounds/impact-bass-1.wav | the one big hit (arrow into bullseye), low volume | 0.14s / 2.1s | HyperFrames bundled library (Pixabay licence; run graphics/get-sounds.sh) | — |
| sounds/ring-iris-shutter.wav | iris close / open | 0.10s whirl, shutter ~0.9s / 1.4s | AI-generated (KIE Suno Sounds V6) | — |

## References

| File | Source and permission |
| --- | --- |
| references/NOTES.md | Notes on the Pinterest reference (link only is shared) |

## Previews

- `demo.mp4` — demo on a fictional AI presenter, every element on its spoken cue (no real person).
- `graphics/index.html` — every element on one timeline; add your own clip to try it.
