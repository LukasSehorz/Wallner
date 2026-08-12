/** Einheitliches SVG-Icon-Set — 1.6px Strichstärke, 24×24 Grid. */
type P = { className?: string }

const base = 'h-full w-full'
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const IconArrow = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <path {...stroke} d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />
  </svg>
)

export const IconInnenausbau = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <path {...stroke} d="M3 20h18M5 20V9l7-5 7 5v11" />
    <path {...stroke} d="M10 20v-6h4v6" />
  </svg>
)

export const IconSanierung = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <path {...stroke} d="M14.5 5.5a3.5 3.5 0 0 0 4.6 4.6l-8 8a2.3 2.3 0 0 1-3.2-3.2z" />
    <path {...stroke} d="m5 19 1.5-1.5" />
  </svg>
)

export const IconBad = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <path {...stroke} d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
    <path {...stroke} d="M7 12V6a2 2 0 0 1 4 0M6.5 19 6 21m11.5-2 .5 2" />
  </svg>
)

export const IconGarten = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <path {...stroke} d="M12 21v-7" />
    <path {...stroke} d="M12 14c0-3 2-5 5-5 0 3-2 5-5 5Zm0 0c0-3-2-5-5-5 0 3 2 5 5 5Z" />
    <path {...stroke} d="M4 21h16" />
  </svg>
)

export const IconBagger = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <path {...stroke} d="M3 18h11M4.5 18a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0m6 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0" />
    <path {...stroke} d="M5 15h7v-4H8l-1 2z" />
    <path {...stroke} d="m12 12 5-6 3 2-3 5" />
    <path {...stroke} d="M15 17h6v-2h-6z" />
  </svg>
)

export const IconTrockenbau = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <path {...stroke} d="M4 4h16v16H4z" />
    <path {...stroke} d="M4 12h16M12 4v16" />
  </svg>
)

export const IconPhone = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <path
      {...stroke}
      d="M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"
    />
  </svg>
)

export const IconMail = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <path {...stroke} d="M3 6h18v12H3z" />
    <path {...stroke} d="m3 7 9 6 9-6" />
  </svg>
)

export const IconPin = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <path {...stroke} d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle {...stroke} cx="12" cy="10" r="2.5" />
  </svg>
)

export const IconClock = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <circle {...stroke} cx="12" cy="12" r="8.5" />
    <path {...stroke} d="M12 7v5.2l3.2 2" />
  </svg>
)

export const IconCheck = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <path {...stroke} d="m5 12.5 4.5 4.5L19 7" />
  </svg>
)

export const IconStar = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true" fill="currentColor">
    <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5-4.7-4.6 6.5-.9z" />
  </svg>
)

export const IconGoogle = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <path
      fill="#4285F4"
      d="M21.6 12.2c0-.7-.06-1.4-.18-2.05H12v3.88h5.4a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.89-1.74 2.97-4.3 2.97-7.35Z"
    />
    <path
      fill="#34A853"
      d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.5c-.9.6-2.05.95-3.39.95-2.6 0-4.8-1.76-5.6-4.12H3.07v2.58A10 10 0 0 0 12 22Z"
    />
    <path fill="#FBBC05" d="M6.4 13.9a6 6 0 0 1 0-3.82V7.5H3.07a10 10 0 0 0 0 9l3.33-2.6Z" />
    <path
      fill="#EA4335"
      d="M12 5.96c1.47 0 2.79.5 3.83 1.5l2.86-2.86C16.95 2.98 14.7 2 12 2a10 10 0 0 0-8.93 5.5L6.4 10.1C7.2 7.72 9.4 5.96 12 5.96Z"
    />
  </svg>
)

export const IconMenu = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <path {...stroke} d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const IconClose = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <path {...stroke} d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const IconChevronLeft = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <path {...stroke} d="m14.5 5.5-6.5 6.5 6.5 6.5" />
  </svg>
)

export const IconChevronRight = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
    <path {...stroke} d="m9.5 5.5 6.5 6.5-6.5 6.5" />
  </svg>
)

export const leistungsIcons = [
  IconInnenausbau,
  IconSanierung,
  IconBad,
  IconGarten,
  IconBagger,
  IconTrockenbau,
]
