import { SectionHead } from '../primitives.jsx'

const TEAM = [
  {
    name: 'Md Kashfi Or Rashid Pranta',
    role: 'Creative Director \u00b7 3D Environment Modeler \u00b7 Immersive Sound Engineer',
    contribution:
      'Held the creative direction across the film. Modeled both environments (Lumaland and The Dims). Designed the sound, including the unseen wolf antagonist and the atmospheric layers across The Dims.',
  },
  {
    name: 'Semyon Kuznetsov',
    role: 'Post Production \u00b7 UX/UI \u00b7 Storyboard',
    contribution:
      'Drove post production. Built the team website on Framer. Contributed to storyboard work that shaped how the script translated to frame.',
  },
  {
    name: 'Benjamin Nichiporik',
    role: 'Cinematic Story \u00b7 Character Animation',
    contribution:
      'Carried cinematic storytelling and character animation. The duckling reads emotionally because of his pass.',
  },
  {
    name: 'Abdul Aziz Hamoui',
    role: 'Production Coordination \u00b7 Rigging',
    contribution:
      'Coordinated production across the team. Built the rigs the character animators worked against.',
  },
  {
    name: 'Cohen Jasper ter Heide',
    role: 'Animation \u00b7 Lighting \u00b7 3D Asset Modeling \u00b7 Camera \u00b7 Look Development',
    contribution:
      'Wide contribution across animation, lighting, asset work, camera, and look development. Multiple craft surfaces of the film carry his pass.',
  },
  {
    name: 'Eric Gabriel Cheng Li',
    role: '3D Asset Modeling \u00b7 Animation \u00b7 Camera \u00b7 Lighting',
    contribution:
      'Modeled assets across both worlds, contributed to animation, camera, and lighting passes.',
  },
]

export default function Credits() {
  return (
    <section id="credits" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="CREDITS" title="Team and attribution." />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((member) => (
          <div key={member.name}>
            <h3 className="font-[family-name:var(--font-display)] text-[20px] font-normal text-white">
              {member.name}
            </h3>
            <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-zinc-400">
              {member.role}
            </p>
            <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {member.contribution}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
        Team site: iat343blu.framer.website
      </p>
      <p className="mt-2 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
        CG Animation &#xB7; SFU SIAT &#xB7; Summer 2025
      </p>
    </section>
  )
}
