# Critique email draft

A draft to send yourself or use as your own internal review pass before
this case study goes live. Written as a colleague taking the case study
apart in good faith, not as a marketing read.

---

**Subject:** Something Lurking case study — critique pass before it ships

Kash,

Read it through twice. Specific notes by section, then the bigger
positioning question at the end.

**Hero.** The subtitle does the job — declares the team shape and your
role in two sentences. The YouTube embed is the right call for now;
swap to a local mp4 only if the YouTube version drags. The MetaBlock
order (Team → My roles → Stack → Course) is correct.

**Overview.** Strong. The "three engineers and one design conscience"
line carries weight without sounding self-congratulatory. The StatBlock
mixes scope and craft (4 people, 16 weeks, 3 scales, 3 acts, 7 zones,
0 menus) which gives a non-technical reader something to hold onto.

**The Premise.** The three-paragraph setup works; the figure with the
three scales side-by-side is the iconic visual of the project and it
earns its place near the top. The ThreeActStructure diagram below
shows the spine you drafted. Two things worth flagging:
- The act descriptions inside the SVG use foreignObject for the prose
  blocks. In every modern browser this renders fine. If you ever want
  to be paranoid about cross-browser, those could be re-flowed as
  multi-line SVG `<text>` instead.
- Captain Harry's first name is treated as canon in the case study
  because the report calls him "Captain Harry." If he gets a different
  name in the comic, swap globally.

**What I Did.** This is the spine. Four ACTION blocks. Read each one
in your own voice to verify:
- ACTION 01 (story arc) — backed by the report's own line "Based on
  the story arc provided by Kashfi." This is the strongest claim and
  it's verifiable. Defend it.
- ACTION 02 (A1/A2 translation) — the report has individual A1/A2
  sections for each teammate. Mine is specifically about purposeful
  scaling and pipe/valve mechanics. This is documented. Defend it.
- ACTION 03 (sound) — the report mentions Eleven Labs voicelines and
  environmental sound but doesn't name a sound owner. You named
  yourself as sound owner in the brief. The case study honors that
  but it is your word against silence. If a teammate also worked on
  sound, the section needs a "we" softening on whichever piece. If
  it was entirely you, leave it.
- ACTION 04 (iteration) — fine as written.

**Coursework to Puzzle.** Hardest evidence in the whole case study.
The CourseworkToPuzzleTranslation diagram makes the line from A1/A2
to fusebox/chip-space/vent-valves explicit. The hardest add I want
from you here: a scan or photo of one A1 or A2 page next to the
in-game screenshot of the same mechanic. That side-by-side is the
"prove it" moment. Optional but high-value.

**Sound as Architecture.** The two-pipeline diagram is clean. The
Act I / Act III sound brief boxes give it texture without padding.
What's missing: numbers. Even rough ones. "Around 12 character voice
lines, two dozen environmental cues" beats "character voices and
environmental cues."

**The Diegetic UI Decision.** The honest framing is here. "This was
a team decision, not my individual call. I want to be clear about
that." Good. The follow-on lesson ("Removing the menus is the easy
part. Replacing what they did is the harder part.") is the right
take-away and it carries the section.

**P1 to Final.** The structured-feedback grid is one of the strongest
pieces of evidence the case study has, because every quote is named
and every response is concrete. Steven, Issac, the professor,
Abhishek. Four critiques. Four shipped responses. This is what
"iterative process" looks like when it's real, not when it's marketing.
Don't trim it.

**Results.** Three highlight cards plus the full art collage. Works.
The "See the SFU SIAT showcase entry" link sends a hiring manager
straight to the third-party validation, which is the right move.

**Reflection.** Four paragraphs, verbatim per your approved brief.
The cliffhanger-as-craft-and-constraint paragraph is the most honest
piece of writing in the whole portfolio. Don't soften it. The pattern-
across-three-teams paragraph is the positioning bet you're making.

**Credits.** Eric, Michael, Kento, Kashfi. Cards plus tools plus
inspirations plus links. Reads right. Note: Kento's contribution
card credits him with the murder-mystery and isolation atmosphere
instincts from his A1/A2. The report explicitly says that. If he
wants more credit (mechanics co-build with Michael is in there
already), tell me and I'll bump the contribution copy.

**Positioning question.** The Reflection's last paragraph claims the
pattern: design conscience on engineering teams, three projects deep.
I want you to sit with this for one more day before this goes public.
Two questions:
1. Is "design conscience" the framing you want to lead with, or is
   it "creative director with technical fluency"? The first is more
   honest. The second is more recruitable. Both are defensible.
2. The growth-edge line ("knowing when to stop being the conscience
   and start being a peer who pushes back on technical scope") is the
   part that prevents the pattern claim from sounding like self-
   congratulation. If you cut that line, the whole positioning collapses.
   So if you ever feel pressured to trim Reflection for length, cut
   anywhere else first.

Three things still pending that aren't in the build:
- A1/A2 artifact scan or photo, for the Coursework to Puzzle slot.
- Voice line counts in Sound.jsx.
- Optional whiteboard/sketch of the original three-act spine, for the
  Premise. Adds texture, not required.

Verify locally at `localhost:5173/projects/something-lurking` before
you commit. The build is registered, the route resolves, the figures
are wired up. Nothing is pushed to git.

Cowork
