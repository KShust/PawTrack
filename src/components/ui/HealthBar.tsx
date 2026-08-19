interface HealthBarProps {
  /** 0–100. */
  score: number
  /** Fill colour. Pass a `--tint-*-solid` token. */
  color: string
  /** Accessible name — a bare progressbar has none. */
  label: string
  showLabel?: boolean
}

const HealthBar = ({ score, color, label, showLabel = false }: HealthBarProps) => {
  return (
    <div className="w-full">
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${score}/100`}
        className="h-1 rounded-full bg-[var(--bg-muted)] overflow-hidden"
      >
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${score}%`,
            background: color,
            transitionDuration: 'var(--duration-slow)',
            transitionTimingFunction: 'var(--ease-standard)',
          }}
        />
      </div>
      {/* The visible score stays on --text-secondary rather than the pet colour:
          the brand tints are 2–3:1 on a surface and would fail AA at this size. */}
      {showLabel && (
        <span
          className="text-xs font-semibold mt-1 block"
          style={{ color: 'var(--text-secondary)' }}
          aria-hidden="true"
        >
          {score}/100
        </span>
      )}
    </div>
  )
}

export default HealthBar
