import { SectionHead } from '../primitives.jsx'

const TEAM = [
  {
    label: 'KASHFI RASHID',
    name: 'Md Kashfi Or Rashid Pranta',
    role: 'Creative Director · 3D Environment Modeler · Immersive Sound Engineer',
    contribution:
      'Held the creative direction across the film. Modeled both environments (Lumaland and The Dims). Designed the sound, including the unseen wolf antagonist and the atmospheric layers across The Dims.',
  },
  {
    label: 'SEMYON KUZNETSOV',
    name: 'Semyon Kuznetsov',
    role: 'Post Production · UX/UI · Storyboard',
    contribution:
      'Drove post production. Built the team website on Framer. Contributed to storyboard work that shaped how the script translated to frame.',
  },
  {
    label: 'BENJAMIN NICHIPORIK',
    name: 'Benjamin Nichiporik',
    role: 'Cinematic Story · Character Animation',
    contribution:
      'Carried cinematic storytelling and character animation. The duckling reads emotionally because of his pass.',
  },
  {
    label: 'ABDUL AZIZ HAMOUI',
    name: 'Abdul Aziz Hamoui',
    role: 'Production Coordination · Rigging',
    contribution:
      'Coordinated production across the team. Built the rigs the character animators worked against.',
  },
  {
    label: 'COHEN JASPER TER HEIDE',
    name: 'Cohen Jasper ter Heide',
    role: 'Animation · Lighting · 3D Asset Modeling · Camera · Look Development',
    contribution:
      'Wide contribution across animation, lighting, asset work, camera, and look development. Multiple craft surfaces of the film carry his pass.',
  },
  {
    label: 'ERIC GABRIEL CHENG LI',
    name: 'Eric Gabriel Cheng Li',
    role: '3D Asset Modeling · Animation · Camera · Lighting',
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
          <div key={member.label}>
            <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#4FC3F7]">
              {member.label}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-[20px] font-normal text-white">
              {member.name}
            </h3>
            <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-zinc-400">
              {member.role}
            </p>
            <p className="mt-2 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {member.contribution}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
        Team site: iat343blu.framer.website
      </p>
      <p className="mt-2 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
        CG Animation · SFU SIAT · Summer 2025
      </p>
    </section>
  )
}
