import { Component } from 'react'

/**
 * ErrorBoundary — catches render / lifecycle errors in its subtree so that
 * one crashing component cannot tear the whole site down to a black screen.
 *
 * React only unmounts the tree on errors thrown during *rendering*; that is
 * exactly the failure mode behind the "screen goes black until I reload"
 * bug. An error boundary intercepts that.
 *
 * Two usages in App.jsx:
 *   - Around <Companion/> with `fallback={null}` — a SILENT boundary. If the
 *     autonomous character / idle-cycle system throws, the companion subtree
 *     simply disappears and the rest of the site keeps working. The visitor
 *     most likely won't even notice.
 *   - Around the whole app with the default fallback — a last-resort net for
 *     a crash anywhere else: a small message + reload button instead of a
 *     dead black screen.
 *
 * Every caught error is logged to the console with its component stack, so
 * the exact throwing component is always recoverable for diagnosis.
 *
 * Props:
 *   - children
 *   - label    — string, tags the console log (e.g. "companion", "app")
 *   - fallback — node to render after a crash. Pass `null` for a silent
 *                boundary. Omit entirely to use the default reload screen.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Surfaced so the exact throwing component is always diagnosable —
    // the component stack names the file that crashed.
    const tag = this.props.label ? ` · ${this.props.label}` : ''
    // eslint-disable-next-line no-console
    console.error(
      `[ErrorBoundary${tag}] caught a render error:`,
      error,
      info?.componentStack,
    )
  }

  render() {
    if (!this.state.hasError) return this.props.children

    // `fallback` provided (including `null`) → render it verbatim. `null`
    // makes a silent boundary: the subtree just vanishes.
    if (this.props.fallback !== undefined) return this.props.fallback

    // Default last-resort fallback — a crash somewhere outside the
    // companion. Better than a black screen: a message, the error, a way out.
    return (
      <div
        role="alert"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          padding: '24px',
          textAlign: 'center',
          backgroundColor: '#0F1112',
          color: '#E8E6E1',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <p style={{ fontSize: '15px', opacity: 0.85, margin: 0 }}>
          Something hiccuped — the page hit an error.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: '#E8B86A',
            background: 'transparent',
            border: '1px solid rgba(232, 184, 106, 0.4)',
            borderRadius: '4px',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Reload
        </button>
        {this.state.error ? (
          <pre
            style={{
              marginTop: '8px',
              maxWidth: '90vw',
              overflowX: 'auto',
              fontSize: '11px',
              lineHeight: 1.5,
              color: 'rgba(232, 230, 225, 0.5)',
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            }}
          >
            {String(this.state.error?.message || this.state.error)}
          </pre>
        ) : null}
      </div>
    )
  }
}
