#!/bin/sh
# The vibe pack uses 5 sounds from HyperFrames' bundled library (Pixabay licence: free to use in videos,
# but the loose files can't be re-shared). This copies them from your HyperFrames install.
here="$(cd "$(dirname "$0")" && pwd)"
for d in "$HOME/.claude/skills/media-use/audio/assets/sfx" "$HOME/.agents/skills/media-use/audio/assets/sfx" "$HOME/.codex/skills/media-use/audio/assets/sfx"; do
  [ -f "$d/pop.mp3" ] && src="$d" && break
done
[ -z "$src" ] && { echo "HyperFrames media-use skill not found. Run: npx hyperframes skills update media-use"; exit 1; }
for s in pop whoosh whoosh-short click-soft impact-bass-1; do
  ffmpeg -v error -y -i "$src/$s.mp3" -ar 48000 -ac 2 "$here/assets/vibe/sfx/$s.wav" && cp "$here/assets/vibe/sfx/$s.wav" "$here/../sounds/$s.wav"
done
echo "sounds ready"
