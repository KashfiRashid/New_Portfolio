# Brand Book — Kash 2026 Portfolio

> The source-of-truth document for the new portfolio site. Read this file first. It maps the brand book and lists every open question in one place, grouped by which phase each one blocks.

---

## How to use this folder

**If you're Kash:** scroll to the *Open questions* section. Every `[NEEDS KASH INPUT]` marker scattered across the 10 files is consolidated below, ordered by which downstream phase it blocks. Resolve the Phase 2 questions to unblock wireframes; resolve Phase 3+ as you move through the build.

**If you're a tool (Cowork, Antigravity, Claude Code, Figma):** the 10 files below are ground truth. Don't fabricate. Don't soften. Voice rules in `01-voice.md` are not suggestions. The locked decisions section is locked.

**If you're a designer or developer Kash brings in later:** start with `00-overview.md`, then `01-voice.md`, then the file that matches your scope (architecture / companion / visual / hall of fame / build).

---

## What's locked (do not re-litigate)

These were decided in the chat that produced the brief, or answered directly by Kash in the brand-book kickoff. They're the constants every other decision is built on.

- **The line:** "Ambitious but executioneery." Never softened. Never rewritten as "ambitious and executes." If a tool tries to "professionalize" this, push back.
- **Core feeling for visitors:** *"this guy actually thinks about people."*
- **Personal world:** 2am studio. Dark surfaces, monitor-glow accent lights, restrained motion. (See `06-visual-direction.md`.)
- **Companion identity:** No name. The cursor is Kash. (See `04-companion-spec.md`.)
- **Companion frequency:** Rare. 5–8 bubbles per visit, 8s cooldown, never twice on the same element. The magic is restraint.
- **Languages:** English primary, Bangla selective. Section headers / pull-quotes only — never decorative.
- **Voice register:** Tazwar-adjacent. Warm, reflective, slightly understated. Lowercase where it fits. Specifics over adjectives. People over abstractions.
- **The companion is NOT a chatbot.** No Q&A interface. No textarea. Contextual triggers only.
- **Hall of Fame replaces the contact form.** Public log of shipped suggestions. Launches empty. Never seeded.
- **Stack:** React + Tailwind + framer-motion frontend (Antigravity builds). Supabase-style backend (Claude Code builds).

---

## The 10 files

| # | File | What's in it |
|---|------|---------------|
| 0 | [`00-overview.md`](./00-overview.md) **v1.1** | Executive summary. The line, the feeling, the world, the audiences, the 8 differentiators, the core principles. Read this first. *Patched: companion framing now reads "quiet recognition" not "the layer of intimacy."* |
| 1 | [`01-voice.md`](./01-voice.md) **v1.1** | Voice principles, anti-patterns, sample hero lines, About openers, project descriptions, calibration bubbles, do's/don'ts cheat sheet. The voice file every other file defers to. *Patched: leads with direct-first register; new Kash signatures section; new misdirect openers; new "name + role + contribution" team-credit pattern; 5 sample lines de-hedged.* |
| 2 | [`02-content-well.md`](./02-content-well.md) **v1.1** | The raw material pool. Identity facts, projects, named people, obsessions, helping moments, design opinions, references, quirks. The thing every section curates from. *Patched: Kash signatures section added; People extended with name + role + contribution pattern (Eric / Kentaro / Michael / Hamzah / Naomi added); BLU story line and Opinions list inherit the direct register.* |
| 3 | [`03-architecture.md`](./03-architecture.md) | The 8 sections (Home / Voice / Eye / Work / Process / People / Origin / Hall of Fame), nav logic, footer, route map, possible merges. |
| 4 | [`04-companion-spec.md`](./04-companion-spec.md) **v1.1** | The 60-bubble library across 7 triggers. Form factor, frequency rules, voice anti-patterns, edge cases. The spec Antigravity wires into the React app. *Patched: voice section reordered to direct-first; misdirect-opener pattern added; Kash-signatures reference added; 3 bubbles de-hedged (#9 BLU title, #21 Origin header, #47 idle).* |
| 5 | [`05-wow-mechanics.md`](./05-wow-mechanics.md) | The four interactive layers integrated end-to-end: visitor identity, companion, personal world, return reward. Typed-out first-visit and returning-visit timelines. |
| 6 | [`06-visual-direction.md`](./06-visual-direction.md) | The 2am studio rendered out. Color tokens, 8-color visitor palette, type stack candidates, motion principles, annotated borrow/reject for all 5 references. |
| 7 | [`07-hall-of-fame-spec.md`](./07-hall-of-fame-spec.md) | Submission flow with Lego-brick prompts, curation flow, data model, API endpoints, edge cases, launch state (empty). |
| 8 | [`08-tool-delegation.md`](./08-tool-delegation.md) | Which tool runs which job. Per-tool detail, anti-patterns, routing question framework, sample weekly cadence. |
| 9 | [`09-execution-roadmap.md`](./09-execution-roadmap.md) | The 6-phase plan (brand book → wireframes → visual exploration → hi-fi → build → polish). Critical path, definition of done per phase, what compresses/extends timeline. |

---

## Open questions, grouped by phase

There are **41** open questions across the brand book. Most are non-blocking — they're substance gaps that get filled as Kash gathers raw material. The blocking ones are flagged.

### Blocking Phase 2 (wireframes)

These need answers before low-fi wireframes can land. They shape structure.

1. **(Architecture) Section merges — confirm both Voice and Eye stay separate, or pick a merge** (Voice+Eye → Studio, or People+Origin → World). Recommendation in `03-architecture.md` is to keep all four separate. — *03-architecture.md L176*
2. **(Architecture) Which 5–6 projects are featured in v1 Work** — the candidate list is BLU · Spectral Bloom · Something Lurking · BC Connect · PitchFlow · ForeSee · Us Among AI (7). Pick the cut. — *03-architecture.md L84*
3. **(Architecture) Old-portfolio projects** — Documentor App, Parpro, Trucking Academy. Which carry over, which retire, which get fresh case studies? — *03-architecture.md L88, 02-content-well.md L142*
4. **(Architecture) Route slugs** — confirm the working set or pick poetic alternates (e.g. `/studio` instead of `/process` if any merges happen). — *03-architecture.md L250*

### Blocking Phase 3 (visual exploration / hi-fi)

These need answers before Figma work begins.

5. **(Visual) Seido + Spendy reference URLs and 2–3 specific moves to borrow from each.** References-annotated.md sections 6 and 7 are blank — the restraint bar is held loosely without these. — *06-visual-direction.md L97, L244, 02-content-well.md L232–233*
6. **(Visual) Confirm 8-color visitor palette** — hex values in `06-visual-direction.md` are starting points; principle (desaturated, dark-surface-friendly, distinguishable from accent.glow) is what matters. — *06-visual-direction.md L81*
7. **(Visual) Type stack — pick body, display, mono, Bangla.** Candidates listed; Kash's strong opinions override. — *06-visual-direction.md L112, L114*
8. **(Visual) Bangla typeface pick** — Hind Siliguri, Tiro Bangla, or Noto Sans Bengali. Visual restraint principle applies. — *06-visual-direction.md L112*
9. **(Voice / About) Pronouns — fact sheet has [VERIFY] on he/him.** — *02-content-well.md L32*
10. **(Voice) Full text of the LinkedIn post** that begins *"I always thought having the answers was the..."* — paste in `/refs/voice/linkedin-post-01.txt` or in `questions-for-kash.md` A2. Without it, the voice file is calibrated on Tazwar reference + chat transcript only. — *01-voice.md L13, 02-content-well.md L171, L223*

### Blocking Phase 4 (build)

These need answers before Antigravity / Claude Code begin shipping features.

11. **(Companion) Confirm v1 is scripted from the bubble library** (no LLM call) or LLM-powered with the library as voice anchor. The brief implied LLM-powered; recommendation in spec is scripted-first, LLM-powered as v2. — *04-companion-spec.md L214*
12. **(Companion) Mobile companion behavior** — confirm the toast pattern at the bottom of the screen, or specify a different mobile UX. — *04-companion-spec.md L239, 05-wow-mechanics.md L214*
13. **(Visitor identity persistence)** — Q B3 not yet answered. Recommendation: *Persists with reset option* — localStorage stores name + color, footer "reset" link lets visitors start fresh. — *05-wow-mechanics.md L57*
14. **(Hall of Fame) Curation cadence** — Q E2: weekly / monthly / on-the-fly. Recommendation: monthly batched review session for v1. — *07-hall-of-fame-spec.md L96*
15. **(Hall of Fame) Filter scope on `/hall-of-fame`** — v1 ships with default-sort only, or also Recent / By section / By visitor at launch. — *07-hall-of-fame-spec.md L176*
16. **(Build infra) Hosting, domain registrar, repo platform** — Vercel / Netlify / other. — *02-content-well.md L214*
17. **(Build) Confirm preferred frontend stack** — React + Tailwind + framer-motion is the working assumption. — *02-content-well.md L208*

### Blocking content (substance gaps that don't block scaffolding)

These are the things that, if left blank, leave sections feeling generic. Site can be built and styled around them; the substance fills in over time.

18. **(People consent — Q D)** — fill in public name / anonymous / ask first for each person: Sazzad, Tarif, Tazwar, Sadab, Tawheed, Brett, IT Squad, Father. — *02-content-well.md L150*
19. **(People — projects)** — verify consent for public credit on Open Ground / BC Connect team: Sadab Khan, Tawheed Sarker Aakash, Brett Rodrigues. — *02-content-well.md L130*
20. **(IT Squad) Verify exact title and scope.** — *02-content-well.md L160*
21. **(Helping moment — Q C2)** — the most recent specific helping-someone story. If it's the LinkedIn post, write "see A2." Otherwise paste the story raw. — *02-content-well.md L176*
22. **(Voice page — Q C1)** — full 5–10 design opinions in Kash's words. The Voice page is published from this. Without it, Voice ships using starter takes. — *02-content-well.md L191, 03-architecture.md L57*
23. **(Voice page) Longer pieces** — which longer reflections (LinkedIn-post-style or new) does Kash want on the Voice page? — *03-architecture.md L58*
24. **(Origin) 2–3 specific Dhaka memories** Kash wants surfaced. Origin needs at least one moment that's actually Kash's, not generic-diaspora-template. — *02-content-well.md L72, 03-architecture.md L127*
25. **(Origin) Bangla phrases / words to use** — title-level only or full pull-quotes? — *02-content-well.md L74, 03-architecture.md L129*
26. **(Eye) 5–10 references** ("things I find beautiful" subsection) Kash wants featured. — *03-architecture.md L74*
27. **(Process) "First chair" AI tool** — Antigravity is implied but the specific roles in the orchestra need confirmation. — *02-content-well.md L58*
28. **(Work — ForeSee)** — brief description of what ForeSee actually does. *"hears futures"* is a placeholder line. — *02-content-well.md L133*
29. **(Work — Us Among AI)** — verify Kash's role: designer, dev, both? — *02-content-well.md L138*
30. **(Work — Open Ground vs Living Lattice)** — which is the name that ships, or are they distinct things? — *02-content-well.md L54, L117, L119*
31. **(Home) "Currently at..." status line phrasing** — confirm exact wording. Working: *"Currently at FIC IT Squad · graduating SFU SIAT June 10 · Delta, BC."* — *03-architecture.md L39*
32. **(Footer secret)** — Caleb-borrowed pattern. Working candidates: late-night confession, helping thread, writing voice. Pick one. — *03-architecture.md L197, 06-visual-direction.md L192*
33. **(Footer) Land acknowledgment wording** — verify exact phrasing for Delta-area context. Working: xʷməθkʷəy̓əm, Sḵwx̱wú7mesh, Səlilwətaɬ Nations. — *03-architecture.md L199*
34. **(Idle layer) Which clips exist already, which need to be made** — Q F territory. Playlist is empty until raw material lands. Candidates: BLU 0:42, desk recording, Antigravity build session, sketch scan, Spectral Bloom audio-reactive, football clip, convocation (post–June 10), voice notes. — *05-wow-mechanics.md L141*
35. **(Photo strip)** — convocation, hackathon team, sound studio, 2am desk, Dhaka shots if available. Q F + Section D consent. — *03-architecture.md L115*
36. **(Glimpses — Q G)** — anything Kash wants a stranger to glimpse but never put on a portfolio because it didn't fit. The companion bubbles get more interesting the rawer this is. — *02-content-well.md L256*
37. **(Raw material inventory — Q F)** — full asset inventory: what exists, what needs creating. — *02-content-well.md L271, L286, L288*
38. **(Out of scope — Q F)** — anything Kash has explicitly decided is not going on the site. — *02-content-well.md L306*

### Roadmap-level

39. **(Phase 1 timing)** — confirm raw material gathering starts now. — *09-execution-roadmap.md L259*
40. **(Phase boundaries)** — which blocking markers (above) Kash treats as truly blocking vs. fill-as-you-go. The roadmap assumes a few are unblocked before phase 2; Kash chooses which. — *09-execution-roadmap.md L51, L63, L111*
41. **(Refs folder)** — `/portfolio-2026/00-brief/refs/` is currently empty. Build phase will need real assets (voice samples, photos, video clips, design refs, sound bites) to lock visual and content decisions. — *06-visual-direction.md L313*

---

## What Kash needs to provide next (the short list)

If Kash only does five things this week, these five unblock the most:

1. **Paste the LinkedIn post text** that begins *"I always thought having the answers was the..."* into `/refs/voice/linkedin-post-01.txt`. Unblocks voice calibration. (Q A2)
2. **Write or paste the full 5–10 design opinions** in Kash's words. Unblocks the Voice page. (Q C1)
3. **Write 2–3 Dhaka memories** Kash wants on the site. Unblocks Origin. (Q B / C)
4. **Lock the Seido + Spendy URLs** plus 2–3 borrowable moves from each. Unblocks the visual restraint bar. (Section 6/7 of `references-annotated.md`)
5. **Run the people-consent pass.** For each named person (Sazzad, Tarif, Tazwar, Sadab, Tawheed, Brett, IT Squad, Father), mark public-name / anonymous / ask-first. (Q D)

Everything else can fill in progressively.

---

## Voice guardrails for everyone (including future tools)

If a tool — Cowork, Antigravity, an LLM call, a copy editor, anyone — produces output for this site, these are the guardrails it must respect:

- **Don't soften "ambitious but executioneery."** It's the line. It's deliberate. It's not a typo.
- **The companion is not a chatbot.** No Q&A. No "ask me anything." Contextual bubbles only.
- **Lowercase where it fits.** Bubbles, microcopy, casual moments. Not section headers or headlines (those use sentence case).
- **No portfolio-bro voice.** No "passionate about pixel-perfect experiences," no "designer + developer + dreamer," no rocket emojis, no "let's build something amazing together."
- **Specifics over adjectives.** Name the project, the person, the moment. Generic = wrong.
- **No fabrication.** If a fact about Kash isn't in `02-content-well.md` and isn't in the chat transcript, it gets a `[NEEDS KASH INPUT]` marker — never invented.
- **Bangla is selective.** Section headers / pull-quotes / the convocation moment. Never decorative, never "for flavor."

Tools that violate these get pushed back on. The brand is the brand because it doesn't bend on these.

---

## Cross-reference map

How the files reference each other:

```
00-overview ────► everything (it's the executive summary)
01-voice ◄──── 02 / 03 / 04 / 05 / 06 / 07 (every section defers to voice)
02-content-well ◄──── 03 / 04 / 05 / 06 / 07 (every section curates from it)
03-architecture ◄──► 04 / 05 / 06 (sections need companion + wow + visual)
04-companion-spec ◄──► 05 (companion drives idle layer + identity flow)
05-wow-mechanics ◄──► 04 / 06 (composition of companion + visual world)
06-visual-direction ◄──► 03 / 04 / 05 / 07 (everyone renders against this)
07-hall-of-fame-spec ◄──► 06 / 08 (visual register + Claude Code backend)
08-tool-delegation ────► 04 / 06 / 07 / 09 (which tool builds what)
09-execution-roadmap ────► all (phased plan ties tools to deliverables)
```

If a file contradicts another file, the rule is: **`00-overview.md` and `01-voice.md` win.** Everything else is downstream of them.

---

## Status

- **Brand book v1:** ✅ shipped (you're reading it)
- **Open questions:** 41, mostly non-blocking
- **Phase 2 (wireframes):** ready to start once questions 1–4 are answered
- **Phase 3 (visual exploration):** ready to start once questions 5–10 are answered
- **Phase 4 (build):** ready to start once Phase 3 produces the Figma file and questions 11–17 are answered

---

## What to ping Kash with after reading

> Brand book v1 ready in `/portfolio-2026/01-brand-book/`. 41 open questions to unblock downstream phases — see this README. The 5 highest-leverage answers are listed under *What Kash needs to provide next*.

---

*End of README. Start with `00-overview.md`.*
