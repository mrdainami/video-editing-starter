---
name: first-cut
description: Make a YouTube first cut (yt-cut) in Borumi. Finds repeated takes, false starts and dead air with an accurate piece-by-piece transcript, cuts them through Borumi's MCP, checks the result and shows it for review.
---

# YouTube first cut

All output paths are inside the selected `videos/<video-name>/` folder.

1. **Folder.** Follow [new-video](../new-video/SKILL.md) to create
   or select the video folder. Read its `BRIEF.md` and `project/STATUS.md`.
2. **Working copy.** Read the current Borumi MCP guides (project edits, editing,
   transcripts, trimming). Duplicate the source project and work only on the copy.
   If the project has no transcript, call `request_transcriptions` and wait.
3. **Pass 1: dead air.** Use Borumi's `detect_speech` on the microphone. Shorten
   pauses longer than about 0.45 s to about 0.3 s (keep 0.15 s each side). Cut all
   synced layers together. Commit.
4. **Pass 2: repeats (the accurate transcript method).** Borumi's transcript often
   writes a quickly repeated line only once, so do not use it to find repeats.
   - Export the cut (720p is enough) to `exports/first-cut-v1-preview.mp4`.
   - Split its audio at every pause: `ffmpeg -i <export> -af silencedetect=noise=-38dB:d=0.08 -f null -`.
   - Transcribe **each piece on its own** with
     `npx hyperframes transcribe <piece>.wav -m medium.en -l en`, so every piece
     has exact edges. Save the list to `project/first-cut/retranscribe/islands/islands-text.json`.
   - Any line said more than once: keep the **last complete take**. Remove false
     starts ("I just… I just…") and abandoned tries.
   - When a cut falls inside a piece, use that piece's word times and cut at the
     quietest point between the two words (lowest 10 ms energy within ±0.15 s).
   - The export starts at project time 0, so its times are project times. Apply
     all ranges in one `trim_timeline` call. Commit.
5. **Check.** Export again (`first-cut-v2-preview.mp4`) and transcribe it. Every
   line must appear once, in order. If not, repeat pass 2 on what's left.
6. **Show.** Send the preview. Save `project/first-cut/report.md`: duration before
   and after each pass, each take choice, the final text, and any joins to listen
   to. Update `project/STATUS.md`.

If timestamps, transcript or playback are still not enough, say exactly what is
missing rather than guessing.

Only change layouts when asked. After the cut is approved, continue with
[the edit recipe](../../_system/recipes/edit-video.md) for graphics.
