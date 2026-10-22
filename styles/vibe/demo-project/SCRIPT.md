# vibe demo script (AI presenter "Maya", fictional)

Every line cues one vibe element. The voice is made first; each graphic is then placed on the
exact time its cue word is spoken (from the transcript), the same way add-graphics works
on a real video.

| # | Line (spoken) | Cue word | Element | Fill-ins |
|---|---|---|---|---|
| 1 | Okay, so here's my whole editing setup. Raw clips go on this side, finished edits go on that side. | "Raw" | vibe-side-pair | RAW CLIPS 34 / FINAL EDITS 19 |
| 2 | And the trick? You design your style once. | "design" | vibe-folder-storm → vibe-title-card | Design / your / style / once. |
| 3 | Since I started doing this, my edits are ten times faster. Forty-eight minutes, down to five. | "ten" | vibe-stat-pair | 10× FASTER EDITS · 48 → 5 min |
| 4 | It's all about style. I'm Maya, by the way. | "style" / "Maya" | vibe-behind-word + vibe-lower-third | STYLE · Maya Reyes |
| 5 | Open the pack, and you get title cards, stat pops, block wipes, and a sound for every single one. | "Open" | vibe-block-wipe → vibe-pack-folder → vibe-block-wipe (reveal) | your style pack |
| 6 | It does screen recordings too, and it highlights exactly what the agent is doing. | "screen" | vibe-screen-window | highlight = agent panel |
| 7 | And it works on any screen. Laptop, phone, whatever. | "any" | vibe-device-mockups | works on any screen |
| 8 | So every video comes out faster. Like, ten times faster. | "every" | vibe-ring-behind → vibe-iris → vibe-big-stat → vibe-iris (open) | every video, faster · 10× |
| 9 | Grab the pack, and make it yours. | — | captions only | |

Captions (vibe-captions) run under the whole thing.

## Voice text (sent to ElevenLabs)

Okay, so here's my whole editing setup. Raw clips go on this side... finished edits go on that side.
And the trick? You design your style once.
Since I started doing this, my edits are ten times faster. Forty-eight minutes... down to five.
It's all about style. I'm Maya, by the way.
Open the pack, and you get title cards, stat pops, block wipes, and a sound for every single one.
It does screen recordings too, and it highlights exactly what the agent is doing.
And it works on any screen. Laptop, phone, whatever.
So every video comes out faster. Like... ten times faster.
Grab the pack, and make it yours.

## How it was made (Seedance 2.0 Mini, native voice)

ElevenLabs on KIE was down (4 server errors, no charge), so the whole presenter clip is made by
Seedance 2.0 Mini, which generates the voice and lip-sync itself. Max 15s per clip, so 3 clips:

- Clip 1 (lines 1–3): first frame = presenter photo.
- Clip 2 (lines 3b–5): reference = presenter photo + clip 1 voice, so face and voice match.
- Clip 3 (lines 6–9): same references.
- Joins sit under full-screen graphics (stat cards / pack folder / screen window) so they don't show.

### Clip 3 line as generated (trimmed to fit 14s / credits)

"It does screen recordings too, and highlights exactly what the agent is doing. And it works on any screen, laptop or phone. So every video comes out ten times faster. Grab the pack, and make it yours."
