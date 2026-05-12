# Cowork Kickoff Prompt

> The exact prompt to paste into Cowork after you point it at `/portfolio-2026/00-brief/`.
> Copy the block in Section 1 verbatim.

---

## 1. The prompt (copy this into Cowork)

```
I'm starting a multi-file task to produce a brand book for my portfolio website rebuild.

All the inputs you need are in this folder: /portfolio-2026/00-brief/

Read in this exact sequence before producing anything:

1. cowork-brief.md — your operating instructions, read this first
2. chat-transcript.md — the full conversation that produced the brief, with all the nuance
3. kash-fact-sheet.md — facts about me, fact-check everything you write against this
4. questions-for-kash.md — my answers to the open questions, honor them as decisions
5. references-annotated.md — borrow/reject decisions for each reference, don't relitigate
6. /refs/ folder — glance at the directory structure so you know what media exists

After reading, do NOT start producing files. First, write me a plan:
- Which files you'll produce (per cowork-brief.md Section 4)
- The order you'll produce them in
- Any conflicts or gaps you noticed across the inputs
- Anything you need from me before you start

I'll approve or redirect. Then you produce the 10 files inside /portfolio-2026/01-brand-book/.

Hard rules — do not break these:
- Voice is warm, reflective, slightly understated. Tazwar Tarik adjacent. Not corporate. Not sweetly-friendly. Read the LinkedIn post in /refs/voice/ for calibration.
- "Ambitious but executioneery" is the tagline candidate. Do not soften it. Do not replace it with something more "professional-sounding." That instinct is exactly what we're rejecting.
- Every claim about me must trace to a real moment, named person, or specific project. No generic filler. No "passionate multidisciplinary designer" energy.
- If you don't have a fact, write [NEEDS KASH INPUT: specific question] — never fabricate.
- Length follows substance. Don't pad sections. Don't skip sections that have substance.
- The site is not a CV. It's a brand to explore. Treat it that way structurally.

When all 10 files exist, write README.md last. It should summarize what's in each file and list every [NEEDS KASH INPUT] callout in one place so I know what to answer to unblock the next phase.

Acknowledge that you've read the brief before starting. If anything is unclear or contradictory across the inputs, ask before assuming.
```

---

## 2. When to paste this

Paste this prompt only after:

- ✅ All four `.md` files saved in `/00-brief/`: `cowork-brief.md`, `kash-fact-sheet.md`, `questions-for-kash.md`, `references-annotated.md`
- ✅ Chat transcript exported and saved as `/00-brief/chat-transcript.md`
- ✅ Section A of `questions-for-kash.md` answered (BLOCKING — personal world + LinkedIn post text)
- ✅ At least some media dropped in `/00-brief/refs/` (more is better, but Cowork can run with screenshots of the reference sites alone)

You don't need everything filled in. The other sections of `questions-for-kash.md` can be answered later — Cowork will leave `[NEEDS KASH INPUT]` placeholders and flag them in the README.

---

## 3. What to expect after pasting

1. **Cowork acknowledges** and tells you it's read the inputs
2. **Cowork writes you a plan** — file order, gaps it noticed, anything blocking
3. **You approve or redirect** — if the plan looks wrong, push back here, not after files are written
4. **Cowork produces the 10 files** — this takes a while; it's substantial work, plan for it to run for an hour or more
5. **Cowork writes README.md last** with the open-questions list
6. **You redline v1** — read the files, mark what's wrong, what's missing, what to cut
7. **Strategic forks come back to chat (here)** — don't iterate strategy in Cowork, iterate in chat with me

---

## 4. If Cowork goes sideways

Common failure modes and how to push back:

| Symptom | What to say |
|---------|-------------|
| Tagline gets "professionalized" | "Read brief Section 5 again. *Ambitious but executioneery* is the tagline. Do not replace it." |
| Generic copy ("passionate," "multidisciplinary," "delightful") | "Read brief Section 6 voice anti-patterns. Rewrite without those phrases." |
| Fabricates a fact (date, role, project specific) | "That's not in `kash-fact-sheet.md`. Replace with `[NEEDS KASH INPUT: ...]` and continue." |
| Skips a section | "Length follows substance, but don't skip. If thin, flag thin and ask me what to add." |
| Pads a section with filler | "Cut everything that isn't traceable to source material." |
| Treats the companion as a chatbot | "Companion is contextual, not interactive. Visitors don't type to it. Re-read brief Section 9." |
| Loses the Tazwar voice | "Re-read `/refs/voice/linkedin-post-01.txt`. Match that register, not corporate." |
| Treats the site like a CV | "Re-read brief Section 5 — site is a brand to explore, not a CV to scan. Restructure." |

If any of these happen more than once on the same issue, stop the run and bring it back to chat (here) so we can fix the root issue.

---

## 5. After v1 lands — what happens next

Read all 10 files in order:

1. `README.md` first (so you see the open-questions list up front)
2. `00-overview.md` — does the framing land? Does it feel like *you*?
3. `01-voice.md` — do the sample sentences sound like you? Are the do/don'ts right?
4. `02-content-well.md` — is anything missing? Is anything wrong?
5. `03-architecture.md` — do the sections feel right? Any merges or splits?
6. `04-companion-spec.md` — do the bubbles read in your voice?
7. `05-wow-mechanics.md` — do the three layers compose well?
8. `06-visual-direction.md` — does the personal world choice feel right rendered out?
9. `07-hall-of-fame-spec.md` — does the curation flow make sense for your time?
10. `08-tool-delegation.md` — is the tool map accurate?
11. `09-execution-roadmap.md` — does the phased plan match your reality?

Bring concerns to chat (here). We iterate strategy in chat, not in Cowork.

---

## 6. After the brand book is locked

Phase 2 begins:

- **Wireframes** — low-fi sketches of all sections (Figma or pen-and-paper, your call)
- **Visual exploration** — Stitch + Gemini for first-pass mood
- **Hi-fi design** — Figma, refined manually
- **Build** — Antigravity (React + Tailwind + framer-motion)
- **Companion logic** — Claude API integration, prompted from `04-companion-spec.md`
- **Hall of Fame backend** — Claude Code (Supabase or similar)

Each phase has its own kickoff prompt, written when we get there. Don't worry about those yet.

---

## 7. One more thing

You wrote in chat: *"freedom is yours."* That trust matters and it's why this brief stack is as deep as it is. The kickoff prompt above tells Cowork to operate the same way — read deeply, think first, ask before assuming.

If Cowork tries to operate without that discipline, redirect it. The brief stack is your insurance against generic output.

---

*End of kickoff prompt file. Save in `/portfolio-2026/00-brief/cowork-kickoff-prompt.md` for reference. Paste Section 1 verbatim into Cowork when you're ready to start.*
