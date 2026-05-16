# Parpro · competitor audit assets

The Research section in the case study renders six asset slots. Each
slot is currently a dashed amber `AssetPlaceholder` rendered inline on
the page so you cannot miss what is missing during local verification.

The Cowork sandbox where this build ran cannot capture screenshots or
screen recordings of live websites: there is no headless browser
available, and direct `curl` to external sites is blocked by the
sandbox proxy. The two findings below are written from a live web
fetch of `shashaconsulting.ca` (which the sandbox could read) and from
your own audit notes for `hrsbs.ca` (which returned 403 to the
sandbox). The copy is real, the captures need you.

## Files the case study expects

Drop these into `04-build/public/parpro/`. The `Research.jsx` section
picks them up by name and the placeholders disappear.

### Shasha Consulting (https://shashaconsulting.ca/)

What the captures need to prove: the consultation funnel is singular
and relentless on a generic template.

| Filename | What it shows | Specs |
|----------|---------------|-------|
| `shasha-audit-scroll.mp4` | Slow scroll-through, 10–20s, of the live homepage showing the consultation CTA reappearing in the top bar, navigation, hero, Special Offer block, and footer. Recurrence is the evidence. | 1280 × 720 or larger · muted · no cursor trails needed |
| `shasha-audit-fullpage.png` | Full-page homepage screenshot. | 1440px viewport width · full-page capture |
| `shasha-audit-trust.png` | The Why Choose Us grid, the named testimonials, and the FAQ shown together. Trust as a stack. | 1440px viewport width · single cluster |

### HRSBS / Homeroom (https://www.hrsbs.ca/)

What the captures need to prove: identity and voice carry trust where
a template cannot, with no stock photography.

| Filename | What it shows | Specs |
|----------|---------------|-------|
| `hrsbs-audit-fullpage.png` | Full-page homepage screenshot showing the brand-voice hero. | 1440px viewport width · full-page capture |
| `hrsbs-audit-identity.png` | About-page section showing the named character personas and brand identity. | 1440px viewport width · brand identity section |
| `hrsbs-audit-process.png` | The four-step intake: submit info, receive a plan, sign off, setup call. | 1440px viewport width · process section |

## Caption rules (already baked into Research.jsx)

Captions are written in the present tense as captured for this audit.
No claim of frozen historical state. No metric or result attached.
This framing is accurate: the redesign was done during the hackathon,
the captures represent the category as it stands now.

## What was already removed from the public folder

Nothing in this folder will be deleted. The previous build references
to `SHasha_Website.png` and `Hrsbs_Website.png` pulled images from
Kashfi's live portfolio at `kashfirashid.com/media/static_Images/`. The
new build does not reuse those old static images per the brief; the
section is wired to the six fresh-capture filenames listed above.
