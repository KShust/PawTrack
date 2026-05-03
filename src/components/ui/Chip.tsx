interface ChipProps {
  label: string
  sublabel?: string
  variant?: 'primary' | 'accent' | 'neutral' | 'outline'
  textColor?: string
}

const Chip = ({ label, sublabel, variant = 'neutral', textColor }: ChipProps) => {
  return (
    <span
      className={`chip-${variant}`}
      style={textColor ? { color: textColor } : undefined}
    >
      <span style={{ fontSize: '13px', fontWeight: 700, color: textColor ?? 'var(--text-primary)', fontVariantNumeric: 'normal' }}>
        {label}
      </span>
      {sublabel && (
        <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)' }}>
          {sublabel}
        </span>
      )}
    </span>
  )
}

export default Chip