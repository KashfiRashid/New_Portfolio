/** @type {import('tailwindcss').Config} */

// Color tokens pulled from /01-brand-book/06-visual-direction.md.
// 2am studio palette — dark surfaces, monitor-glow accent, restrained.
// Visitor color palette is exposed for cursor and accent use.

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 2am studio surface tokens
        surface: {
          deep: '#0F1112',     // page background, the deepest dark
          mid: '#16191B',      // card backgrounds, mid-elevation
          raised: '#1E2225',   // hover / focused / raised surfaces
        },
        text: {
          primary: '#E8E6E1',  // main body text
          muted: '#9C9A95',    // secondary text, captions
          faint: '#6B6963',    // dates, metadata, very low contrast lines
        },
        accent: {
          glow: '#E8B86A',     // monitor-glow warm accent — focus rings, active states
        },
        // Visitor palette (8 colors, deterministic-from-name-hash assignment)
        // Hex values from /01-brand-book/06-visual-direction.md
        visitor: {
          crimson: '#D9536F',
          amber: '#D9A03B',
          olive: '#7F8C4D',
          teal: '#3F8C8C',
          slate: '#6B7B8C',
          plum: '#8C5F8C',
          rose: '#D98CA0',
          sand: '#BFAA82',
        },
      },
      fontFamily: {
        // [NEEDS KASH INPUT] confirm picks. v1 ships Inter (body), system serif
        // stack for display, JetBrains Mono (monospace), Hind Siliguri (Bangla).
        // Reckless Neue / Editorial New are paid — system serif fallback in their place.
        sans: ['Inter', 'Söhne', 'Geist Sans', 'system-ui', 'sans-serif'],
        display: ['Editorial New', 'Reckless Neue', 'Georgia', 'ui-serif', 'serif'],
        mono: ['JetBrains Mono', 'Geist Mono', 'ui-monospace', 'monospace'],
        bangla: ['Hind Siliguri', 'Tiro Bangla', 'Noto Sans Bengali', 'serif'],
      },
      fontSize: {
        // Body sits at 16px; display scales generously
        'display-xl': ['clamp(3rem, 7vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.2' }],
      },
      transitionTimingFunction: {
        // Locked easing per /01-brand-book/06-visual-direction.md motion principles
        'kash-out': 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },
      keyframes: {
        // Companion bubble fade-and-rise
        bubbleIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bubbleOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-4px)' },
        },
      },
      animation: {
        bubbleIn: 'bubbleIn 250ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards',
        bubbleOut: 'bubbleOut 180ms ease-in forwards',
      },
    },
  },
  plugins: [],
}
