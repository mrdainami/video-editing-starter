---
name: setup-brand
description: Collect and save the workspace owner's brand, visual references and tone on first use, or update them when requested. Reuse existing preferences for later videos.
---

# Set up the owner's brand

Read root `brand/BRAND.md` and `brand/TONE.md`. If already configured, use them and ask only about changes the user requested. Do not repeat onboarding for every video.

Ask for an existing brand guide, logo, tone guide or example content. Read only supplied files and links. Put authorized reusable assets in root `brand/assets/` and record their relative paths.

If there is no guide, ask briefly:

- Who are the videos for and what do they cover?
- What visual feel do you like, and do you have colours, fonts or references in mind?
- How should the writing sound, and in which language?
- Is there anything to avoid?

Skip questions the user already answered. If they have no visual preferences, offer a simple readable starting direction for their approval. Use the owner's chosen direction and supplied assets.

Save a concise proposed brand and tone, show the choices, and record approved preferences with `status: configured`. Record supplied asset sources. A request to skip branding can be saved as `status: deferred`; proceed with the cut and revisit visual direction when graphics are requested.

New videos inherit approved workspace preferences. Video-specific changes belong in the selected video's `brand/STYLE.md`; change the shared brand only when requested. Tone guides new copy and preserves the speaker's meaning during edits.
