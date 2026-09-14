# Generate B-roll

Use `skills/storyboard-method/SKILL.md` when the shot needs a connected sequence. For a single shot, follow the selected model's current guide through KIE.

Locate the exact spoken anchor and duration in the selected video's cut. Read its brief and brand. Use only the owner's supplied references; ask for missing materials.

Read current model fields and prices, propose the shot and quote it before generating. Keep approval consistent with the user's existing instructions. Record provider, model, approved inputs, task ID, state and relative output path in `project/generations.json` immediately after submission. Do not store authorization headers or credentials.

If a submission times out with no task ID, treat its outcome as unknown. Check provider history before retrying. Resume recorded jobs after interruptions. Download successful results into `assets/broll/`; keep final composition playback media in `project/work/<segment>/media/`.

Review likeness, motion, text and timing through HyperFrames. Add precise changing text in the graphics layer. Resolve the spoken anchor again before inserting an approved result in Borumi.
