# 07 — Hall of Fame Spec

> Public log of visitor design feedback Kash has actually implemented. Replaces the contact form. Replaces the testimonial wall. The structural proof that Kash thinks about people.

---

## Why Hall of Fame exists

The site claims Kash is a people's person. The Hall of Fame is the structural way that claim is proven.

A contact form would say *"want to talk?"* A testimonial wall would say *"here's what people thought."* Hall of Fame says something different: *"here's what visitors suggested, here's what I actually changed because of it, here's their name on it."*

It's a small public commitment to keep getting better, attached to specific people. Caleb Wu's site has a changelog that does part of this. Hall of Fame goes further — every changelog entry is attributed to whoever shaped it.

It also solves the *"any questions for us?"* moment Kash mentioned in the chat. Visitors who want to leave something can. Visitors who don't can scroll past. There's no pressure, no scary blank textarea, no faux interactivity.

---

## What's in the Hall of Fame (visitor-facing)

The page is a public, append-only log. Each entry has:

- **The suggestion.** What the visitor wrote.
- **Who left it.** Their name and color (the same name and color from their visitor identity flow). With consent — see below.
- **What changed.** Kash's note on what he actually shipped because of the suggestion.
- **When.** The date the change went live.
- **Section affected.** Which part of the site got better — Voice, Eye, Work, Process, etc.

A possible entry looks like:

```
Section: Work
Suggested by: Maya (slate)
Suggestion: "BLU should have the sound timestamp inline, not just in the companion."
Change: Added 0:42 timestamp directly on the BLU project card.
Shipped: 2026-04-12
```

The tone of "Change" notes is in Kash's voice — short, honest, occasionally self-deprecating.

---

## Submission flow (visitor side)

### Where submission happens

Two entry points:

1. **Bottom of any section.** A small persistent affordance — *"think this could be better? leave a note."* Click reveals the submission flow.
2. **Dedicated `/hall-of-fame` page.** The full log lives here, with a "submit" button at the top.

### The submission UI — Lego-brick prompts

This came directly from Kash's chat. Instead of a scary blank textarea, visitors get a structured set of prompt-bricks that scaffold their suggestion.

A first-pass at the prompt structure:

```
What section?
[Voice] [Eye] [Work] [Process] [People] [Origin] [Hall of Fame] [Other]

What's the issue?
[Hard to find] [Reads off] [Visual feels off] [Missing something]
[Slow / sluggish] [Doesn't work right] [Other]

What would you change?
[free text, ~280 char limit]

How should I credit you if I ship it?
[your name, prefilled] [your color, prefilled]
[ ] just credit my color, not my name
[ ] don't credit me at all
```

The Lego framing is the affordance: visitors aren't writing essays; they're building a small structured suggestion from blocks. Lower friction, higher signal.

### Submission constraints

- **Character limit:** 280 chars on the free-text "what would you change" field. Keeps suggestions punchy and reviewable.
- **Rate limit:** one submission per visitor identity per 24 hours. Prevents spam.
- **No file uploads in v1.** Text only. Reduces moderation complexity.
- **No images / no markdown.** Plain text. The Hall of Fame design is part of the restraint principle.

### After submission

- **Thank-you confirmation.** Companion bubble fires: *"got it. i read every one. only the ones i ship show up here."*
- **Pending state for visitor.** The visitor doesn't see a public version of their submission until Kash curates it. (See curation flow below.)
- **Email to Kash.** Kash receives an email with the submission for review. (See backend implementation in `08-tool-delegation.md`.)

---

## Curation flow (Kash side)

### Cadence

> `[NEEDS KASH INPUT: Q E2 — weekly / monthly / on-the-fly / other. Recommend "monthly batched review session" for v1 — captures rhythm without weekly pressure. Easy to upgrade to weekly later if submissions volume warrants.]`

### Curation steps

1. **Review queue.** Kash sees all pending submissions in a private admin view (or via email). Sorted by section, date, and visitor.
2. **Triage.**
   - **Ship** — implement the change, write the change-note, publish.
   - **Park** — keep the suggestion but don't ship yet (longer-term work).
   - **Pass** — don't ship, don't publish. (This is fine — visitors aren't promised every suggestion lands.)
3. **For shipped items:**
   - Implement the change.
   - Write the change-note in Kash's voice — short, honest. *"Maya was right. moved the 0:42 timestamp inline. it's tighter now."*
   - Confirm credit preference (full name + color / color only / anonymous).
   - Publish entry to Hall of Fame.
4. **Mark the changelog.** Site footer / Hall of Fame top shows last-updated date.
5. **Optional:** companion mentions the new entry to returning visitors who left it. *"hey [name], i shipped your suggestion. it's in the hall of fame."*

### Curation principle

**Only ship what's actually been shipped.** No "we'll consider this" entries. No "thanks for the suggestion" placeholder cards. The Hall of Fame is real or it's nothing.

### Curation guardrails

- **Reject submissions that name third parties unfavorably.** Anything that punches at someone other than Kash and the site doesn't make it through.
- **Reject offensive submissions silently.** No moderation messages — just don't ship.
- **Don't ship cosmetic-only changes that weren't actually requested.** If a visitor said "the hero feels heavy" and Kash changed three other things, the entry credits only the hero change.
- **Don't fabricate suggestions to seed the wall.** v1 launches with zero entries and grows from real input. Empty is honest.

---

## Public display

### The /hall-of-fame page layout

Restrained. Same visual register as the rest of the site (`06-visual-direction.md` — 2am studio world). 

```
[Top of page]

  Hall of Fame
  the site got better because these people showed up.

[Filter / sort affordance — small, low-contrast]
  Recent · By section · By visitor

[Entry list — each entry as a small card]

  [Visitor color dot] Maya
  Section: Work · Shipped 2026-04-12
  
  "BLU should have the sound timestamp inline,
   not just in the companion."
  
  → Maya was right. moved the 0:42 timestamp inline.
    it's tighter now.

  ─────────────────

  [next entry, same pattern]

[At bottom]
  
  Want to add to this? [Submit a suggestion]
```

Each entry is small. The visual emphasis is on the change-note (Kash's voice) and the visitor's color dot + name. The suggestion text is supporting evidence.

### What visitors do here

- **Read** the log.
- **Recognize patterns** — what kinds of suggestions land, what direction the site has moved.
- **Submit** their own suggestion if they want.
- **Find their own entry** if they've contributed before.

### Sort and filter

- **Default sort:** most recent first.
- **By section:** filter to see all changes to a particular section.
- **By visitor:** rare but useful — a visitor sees their own entries.

> `[NEEDS KASH INPUT: confirm filter scope. v1 might ship with default-sort only and add filters in v2 once entry count justifies them.]`

---

## Data model — sketch for the build phase

Used to inform `08-tool-delegation.md` (Claude Code handles the backend).

### Tables (Supabase or equivalent)

```
visitors
  id              uuid (primary)
  name            text
  color           text
  first_visit     timestamp
  last_visit      timestamp
  visit_count     int
  
submissions
  id              uuid (primary)
  visitor_id      uuid (foreign)
  section         enum  (voice, eye, work, process, people, origin, hall_of_fame, other)
  issue           enum  (hard_to_find, reads_off, visual_off, missing, slow, broken, other)
  body            text  (max 280 chars)
  credit_pref     enum  (full, color_only, anonymous)
  status          enum  (pending, shipped, parked, passed)
  created_at      timestamp
  
shipped_changes
  id              uuid (primary)
  submission_id   uuid (foreign, nullable — some changes aren't from submissions)
  change_note     text  (Kash's voice, ~280 chars)
  affected_section enum
  shipped_at      timestamp
  visitor_credit  text  (name + color, or color only, or "anonymous")
```

### API endpoints

```
POST  /api/submit                Submit a suggestion (rate-limited)
GET   /api/hall-of-fame          Get public log (paginated)
GET   /api/hall-of-fame/:section Filter by section
POST  /api/admin/triage          Kash-only — triage pending submissions (auth-gated)
POST  /api/admin/ship            Kash-only — mark as shipped, attach change-note
GET   /api/admin/queue           Kash-only — view pending queue
```

### Security / privacy

- **Visitor identity** is client-side primary (localStorage) but mirrored server-side on submission so the visitor's submitted name + color lock to the entry even if they clear localStorage later.
- **Email is not collected.** Visitors aren't asked for an email. Kash can't reply to specific submissions; the public ship-note IS the reply.
- **Rate limiting** by visitor ID + IP. One submission per 24h per visitor.
- **Admin endpoints auth-gated.** Kash only.
- **No public personally identifiable information beyond what visitors choose to share** (their entered name + assigned color).

---

## Edge cases

- **Visitor submits something offensive.** Kash passes (doesn't ship). No public-facing message; the suggestion just doesn't appear.
- **Visitor submits the same suggestion twice.** Rate limit prevents within 24h. After 24h, allowed but Kash can deduplicate at curation.
- **Two visitors submit the same suggestion.** Both get credit if Kash ships. The entry credits both: *"Maya (slate) and Aaron (teal) both flagged this. moved the 0:42 timestamp inline."*
- **Visitor submits something unactionable** ("the site sucks"). Kash passes silently.
- **Visitor wants to retract a submission.** v1: no self-retract UI. They can email Kash. v2 might add a retraction flow.
- **Submission that requires Kash to add new content (not a redesign)** — like *"add a section about your music taste."* Kash decides whether to ship and adds the new content. The Hall of Fame entry credits the suggestion.

---

## Hall of Fame as the closer

The site doesn't end with *"let's grab coffee."* It ends with the Hall of Fame.

The closing rhythm of a typical visit:

```
Visitor scrolls through Origin → reaches Hall of Fame.
Sees ~5–15 prior entries (depending on site age).
Reads a few. Recognizes that real people shaped this site.
Either submits their own suggestion, or doesn't.
Companion bubble (exit-intent if they're heading out):
  "the hall of fame's at the bottom if you have ten more seconds.
   it's where the site evolves."
Visitor leaves with: this site is alive, and it's alive because of people.
```

That's the people's-person feeling expressed structurally, not in copy.

---

## v1 launch state

The Hall of Fame launches **empty.** Zero entries.

This is intentional. Don't seed it with fake suggestions. Don't pre-write entries. Don't have Kash submit suggestions to himself.

A blank Hall of Fame on day one says: *the site is real, the mechanism is real, and any entry you see in the future was earned.* That's stronger than ten faked starter entries.

The first real entry — whoever lands it — gets a small extra companion bubble:
> *"first entry. that's a first. thanks."*

---

## Build dependencies (cross-reference `08-tool-delegation.md`)

- **Frontend:** part of the React app. Submission form + Lego-brick prompt UI lives in the Hall of Fame route.
- **Backend:** Claude Code builds the API + DB layer. Supabase is the suggested DB (low overhead, built-in auth for admin endpoints).
- **Admin UI:** lightweight web view or CLI for Kash to triage and ship. v1 can be a single password-protected page or a Notion-style interface; v2 might evolve.
- **Email notifications:** Kash receives an email per submission for review. Lightweight (Resend / SendGrid / equivalent).

---

## What can go wrong (and how to handle it)

| Failure mode | What it looks like | The fix |
|--------------|--------------------|---------|
| Spam submissions | Hundreds of low-quality entries | Tighten rate limits, add captcha if persistent |
| Hall of Fame stays empty for 60+ days | Suggests the discovery affordance isn't visible enough | Tune submission entry points; companion mentions Hall of Fame in exit-intent |
| Visitors submit but never see their entry | Curation cadence too slow | Ship cadence weekly; or add a "queued" state visible to the submitter only |
| Submissions skew to cosmetic ("change the color") | Site invites surface-level feedback | Tune Lego prompts to ask about utility, not aesthetic alone |
| Returning visitor checks for their entry, doesn't find it | Disappointed | Companion message on return: "i'm reviewing recent submissions monthly. yours is in the queue." (only if persistence + submission tracking is wired) |

---

*End of Hall of Fame spec. Continue with `08-tool-delegation.md`.*
