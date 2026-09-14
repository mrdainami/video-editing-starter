---
name: yt-first-cut
description: Make a YouTube first cut (yt-cut) directly in Borumi using its MCP timeline and transcript. Remove repeated takes, false starts and dead air, then show the cut for review.
---

# YouTube first cut

1. Follow [video-project-init](../video-project-init/SKILL.md) to create or select
   the video folder. Read its `BRIEF.md` and `project/STATUS.md`.
2. Read the current Borumi MCP guides for project, transcript and trimming tools.
   Identify the intended working project and inspect its timeline and transcript.
   Preserve the original; a fresh edit needs a separate working project.
3. Use the transcript and available Borumi playback to choose cuts. Keep the final
   complete clean take, or an earlier complete take if the last is incomplete.
   Remove clear repeats, abandoned starts and dead air while preserving meaning,
   natural pauses and complete words. Leave uncertain joins for review.
4. Apply cuts through Borumi MCP to all synchronized picture/audio layers. Use the
   API's documented timing units and source/timeline mapping. Re-read the timeline
   inside the transaction; if it changed, recompute the affected ranges before
   applying them. Review joins and preserve a recoverable original.
5. Show the resulting cut in Borumi for the user's review. Save a short
   `project/first-cut/report.md` with duration before/after, key take choices and
   any uncertain joins. Update `project/STATUS.md`.

All output paths are inside the selected `videos/<video-name>/` folder.
Use Borumi's transcript directly; do not run Python, extract source audio or add
external transcription. If timestamps, transcript or playback are insufficient,
explain the specific missing input rather than guessing or creating a pipeline.

Only change layouts when requested. After first-cut review, continue with
[the edit recipe](../../recipes/edit-video.md) for graphics. No export is needed
for this stage unless the user asks for one.
