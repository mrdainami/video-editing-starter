"""Place every vibe element on the exact moment its cue word is spoken.
Reads transcript.json (hyperframes transcribe) and writes index.html.
Cue = (word to find, which occurrence, offset seconds before the word)."""
import json, html, pathlib, re
here = pathlib.Path(__file__).parent
W = json.load(open(here / "transcript.json"))
words = [{"t": w["text"], "s": round(w["start"], 2), "e": round(w["end"], 2)} for w in W]
norm = lambda t: re.sub(r"[^a-z0-9]", "", t.lower())

def at(word, n=1, after=0.0):
    """Start time of the n-th spoken `word` after time `after`."""
    k = 0
    for w in words:
        if w["s"] >= after and norm(w["t"]) == norm(word):
            k += 1
            if k == n: return w["s"]
    raise SystemExit(f"cue word not found: {word} #{n} after {after}")

def end_of(word, n=1, after=0.0):
    s = at(word, n, after)
    return next(w["e"] for w in words if w["s"] == s)

import subprocess
vid_len = float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",str(here/"assets/talk.mp4")],capture_output=True,text=True).stdout)
total = round(min(vid_len - 0.03, words[-1]["e"] + 1.2), 2)
T = {}
T["side"] = at("raw") - 0.6                       # folders pop as "Raw clips" lands
T["storm"] = at("design") - 1.1                   # storm lands the title on "design"
T["title"] = T["storm"] + 1.3
T["stat"] = at("48") - 0.7                        # counter runs 48 -> 5 while she says it
T["behind"] = at("style", 1, T["stat"]) - 0.25    # "It's all about style"
T["lt"] = at("maya") - 0.35                       # "I'm Maya"
T["wipe_in"] = at("pack", 1) - 0.1                # "Open the pack"
T["pack"] = T["wipe_in"] + 0.55                   # cards fan out on "title cards"
T["screen"] = at("screen", 1) - 0.5               # "screen recordings"
T["wipe_out"] = T["screen"] - 0.05
T["mock"] = at("any") - 0.45                      # "any screen"
T["wipe_big"] = at("so", 1, T["mock"]) - 0.05     # "So every video..."
T["big"] = T["wipe_big"] + 0.5
T["iris_open"] = at("grab") - 0.45                # back to her for "Grab the pack"
T["ring"] = T["iris_open"] + 0.2                  # ring of words behind her head to close
T = {k: round(v, 2) for k, v in T.items()}

def dur(a, b, cap): return round(min(cap, max(0.5, b - a)), 2)
def host(cid, start, d, z, vals=None, src=None, track=2):
    vv = ""
    if vals:
        vv = " data-variable-values='" + html.escape(json.dumps(vals, ensure_ascii=False), quote=False).replace("'", "&#39;") + "'"
    return (f'      <div class="clip" style="z-index:{z}" data-composition-id="{cid}" data-composition-src="compositions/{src or cid}.html" '
            f'data-start="{start}" data-duration="{d}" data-track-index="{track}" data-width="1920" data-height="1080"{vv}></div>')

face = {"cx": 960, "cy": 300}  # filled in from the subject map below
sm = here / "subject.json"
if sm.exists(): face.update(json.load(open(sm)))
rows = [
 host("vibe-side-pair", T["side"], 5.0, 4, {"leftLabel": "FINAL EDITS", "leftCount": "19", "rightLabel": "RAW CLIPS", "rightCount": "34"}),  # match her gestures: raw = her right hand (screen right)
 host("vibe-folder-storm", T["storm"], 1.3, 4),
 host("vibe-title-card", T["title"], 4.6, 4, {"w1": "Design", "w2": "your", "w3": "style", "w4": "once.", "subtitle": "one style pack · every video"}),
 host("vibe-stat-pair", T["stat"], dur(T["stat"], T["behind"], 4.9), 4),
 host("vibe-behind-word", T["behind"], dur(T["behind"], T["wipe_in"], 5.6), 2, {"word": "STYLE", "offsetX": face["cx"] - 1000}),
 host("vibe-lower-third", T["lt"], dur(T["lt"], T["wipe_in"], 4.8), 4, {"kicker": "VIBE PACK · DEMO", "name": "Maya", "highlight": "Reyes"}),
 host("vibe-block-wipe", T["wipe_in"], 0.6, 5, {"mode": "cover"}),
 host("vibe-pack-folder", T["pack"], round(T["wipe_out"] + 0.1 - T["pack"], 2), 4),
 host("vibe-block-wipe-2", T["wipe_out"], 0.7, 6, {"mode": "reveal"}),
 host("vibe-screen-window", T["screen"], round(T["mock"] - T["screen"], 2), 4, {"enter": "instant", "pipMediaStart": T["screen"], "tag": "the agent does the research"}),
 host("vibe-device-mockups", T["mock"], round(T["wipe_big"] + 0.5 - T["mock"], 2), 4, {"exitX": face["cx"], "exitY": face["cy"], "mediaStart": 6}),
 host("vibe-block-wipe-3", T["wipe_big"], 0.6, 6, {"mode": "cover", "bg": "#f4f1ea"}),
 host("vibe-big-stat", T["big"], round(T["iris_open"] + 0.1 - T["big"], 2), 5),
 host("vibe-iris-2", T["iris_open"], 0.7, 6, {"mode": "open", "cx": face["cx"], "cy": face["cy"], "text": "the vibe style"}),
 host("vibe-ring-behind", T["ring"], round(total - T["ring"], 2), 2, {"cx": face["cx"], "cy": face["cy"], "text": "make it yours"}),
 host("vibe-captions", 0, total, 9, {"words": json.dumps(words)}, track=9),
]
doc = f'''<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="assets/gsap.min.js"></script>
    <style>
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{ width: 1920px; height: 1080px; overflow: hidden; background: #000; }}
      .clip {{ position: absolute; inset: 0; width: 1920px; height: 1080px; overflow: hidden; }}
      .vid {{ object-fit: cover; }}
    </style>
  </head>
  <body>
    <!-- vibe demo on an AI presenter (fictional "Maya"). Generated by place.py from transcript.json: every element starts on its spoken cue. -->
    <div id="main" data-composition-id="main" data-start="0" data-duration="{total}" data-width="1920" data-height="1080">
      <video id="vtalk" class="clip vid" style="z-index:1" src="assets/talk.mp4" data-start="0" data-duration="{total}" data-media-start="0" muted playsinline></video>
      <audio id="atalk" src="assets/talk.mp4" data-start="0" data-duration="{total}" data-media-start="0"></audio>
      <video id="vcut" class="clip vid" style="z-index:3" src="assets/talk-cutout.webm" data-start="0" data-duration="{total}" data-media-start="0" muted playsinline></video>
{chr(10).join(rows)}
    </div>
    <script>
      window.__timelines = window.__timelines || {{}};
      window.__timelines["main"] = gsap.timeline({{ paused: true }});
    </script>
  </body>
</html>
'''
(here / "index.html").write_text(doc)
json.dump(T, open(here / "cues.json", "w"), indent=1)
print(json.dumps(T, indent=1)); print("total", total)
