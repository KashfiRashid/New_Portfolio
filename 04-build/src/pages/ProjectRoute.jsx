import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProject } from './projects.js'

/**
 * ProjectRoute — renders the case study for /projects/<slug>.
 *
 * One route for every project. Looks the slug up in the project registry
 * (pages/projects.js). If that project has a real case study component,
 * render it. If the slug exists but has no page yet, show a graceful
 * "coming soon." If the slug is not a real project, show a not-found.
 *
 * This replaces the old hardcoded per-project URL conditionals in App.jsx.
 */
export default function ProjectRoute() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (project && project.component) {
    const CaseStudy = project.component
    return <CaseStudy />
  }

  return (
    <div className="section-page text-center py-32">
      <motion.h1
        className="text-display-lg font-display mb-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {project ? project.name : 'Project'}
      </motion.h1>
      <motion.p
        className="text-text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {project
          ? 'case study coming soon. the work shipped, the write-up is next.'
          : "that project doesn't exist. it might never have."}
      </motion.p>
    </div>
  )
}
