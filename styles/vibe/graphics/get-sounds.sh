#!/bin/sh
# The vibe pack uses 5 sounds from HyperFrames' bundled library (Pixabay licence: free to use in videos,
# but the loose files can't be re-shared). This copies them from your HyperFrames install.
here="$(cd "$(dirname "$0")" && pwd)"
root="$(cd "$here/../../.." && pwd)"
# Skills installed in this folder (what /setup does) first, then skills installed for the whole computer.
for d in "$root/.claude/skills/media-use/audio/assets/sfx" "$root/.agents/skills/media-use/audio/assets/sfx" \
         "$HOME/.claude/skills/media-use/audio/assets/sfx" "$HOME/.agents/skills/media-use/audio/assets/sfx" "$HOME/.codex/skills/media-use/audio/assets/sfx"; do
  [ -f "$d/pop.mp3" ] && src="$d" && break
done
[ -z "$src" ] && { echo "HyperFrames skills not found. Install them first: npx -y skills add heygen-com/hyperframes --skill '*' -a claude-code -a codex -a cursor -y --copy"; exit 1; }
command -v ffmpeg >/dev/null 2>&1 || { echo "FFmpeg not found. Install it first (Mac: brew install ffmpeg, Windows: winget install --id Gyan.FFmpeg -e)."; exit 1; }
for s in pop whoosh whoosh-short click-soft impact-bass-1; do
  ffmpeg -v error -y -i "$src/$s.mp3" -ar 48000 -ac 2 "$here/assets/vibe/sfx/$s.wav" && cp "$here/assets/vibe/sfx/$s.wav" "$here/../sounds/$s.wav"
done
echo "sounds ready"
