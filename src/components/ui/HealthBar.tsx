interface HealthBarProps {
  score: number
  color: string
  showLabel?: boolean
}

const HealthBar = ({ score, color, showLabel = false }: HealthBarProps) => {
  return (
    <div className="w-full">
      <div className="h-1 rounded-full bg-[var(--bg-muted)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-400"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
      {showLabel && (
        <span
          className="text-xs font-semibold mt-1 block"
          style={{ color }}
        >
          {score}/100
        </span>
      )}
    </div>
  )
}

export default HealthBar