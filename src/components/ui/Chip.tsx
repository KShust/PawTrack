interface ChipProps {
  label: string
  sublabel?: string
  variant?: 'primary' | 'accent' | 'neutral' | 'outline'
  /** Overrides the label colour. Pass a `--tint-*-fg` token, not a raw hex. */
  textColor?: string
}

const Chip = ({ label, sublabel, variant = 'neutral', textColor }: ChipProps) => {
  return (
    <span className={`chip-${variant}`}>
      <span
        className="text-sm font-bold leading-tight"
        style={{ color: textColor ?? 'inherit' }}
      >
        {label}
      </span>
      {sublabel && (
        <span
          className="text-xs font-medium leading-tight"
          style={{ color: 'var(--text-muted)' }}
        >
          {sublabel}
        </span>
      )}
    </span>
  )
}

export default Chip
