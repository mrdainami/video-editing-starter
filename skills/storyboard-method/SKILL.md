---
name: storyboard-method
description: Plan and generate a storyboard strip, then animate it into a directed multi-beat B-roll sequence. Use when a video needs connected generated scenes.
---

# Storyboard to animation

Use the selected video folder, its brief, brand direction and exact spoken anchor. Read `recipes/generate-broll.md` for job records and placement.

1. Plan a few distinct pictures with one clear action each and a consistent visual direction.
2. Use a suitable image model to generate a storyboard strip. Reference only assets supplied by this user. Keep text short; put changing text in HyperFrames.
3. Show the strip for review before animation.
4. Use a video model that supports storyboard references, such as the current Seedance option. Check its current documentation, input fields, aspect ratio, duration, audio options and price. Keep model choice in the video brief rather than a fixed workspace default.
5. Pass the approved strip as a reference and prompt successive timed shots. Request flowing full-frame scenes without the grid or panel borders. Do not replace the approved method with separate panel jobs unless the user requests that change.
6. Quote still and animation jobs separately before submission. Record each task ID immediately and resume it after interruptions.
7. Download outputs into this video's assets. Review the whole result before placing it at a freshly resolved timeline anchor.

Prompt outline:

```text
One flowing [duration] second, [aspect ratio] sequence.
[Reference 1] is the approved storyboard; follow its pictures in reading order.
[Additional references] control [their specific roles].
[Time range]: [framing, action and transition].
Preserve [approved palette, subjects and objects].
Full-frame scenes without storyboard borders. Audio [on/off].
```
