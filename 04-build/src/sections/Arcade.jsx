import { motion } from 'framer-motion'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'
import ArcadeGame from '../components/ArcadeGame.jsx'

export default function Arcade() {
  return (
    <div className="section-page">
      <Reveal><Breadcrumb section="arcade" /></Reveal>
      <header className="section-header">
        <motion.h1
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          The Last Stand
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-prose"
        >
          An endless space shooter I built in my first year, in p5.js. Click in, fly, and survive as long as you can. Top scores stick around.
        </motion.p>
      </header>
      <ArcadeGame />
    </div>
  )
}
// end Arcade.jsx
