import { CSSProperties } from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  style?: CSSProperties
  /**
   * Makes the whole card a control. The card then renders as a `<button>` so it
   * is reachable by Tab and activated by Enter/Space — a click handler on a
   * `<div>` would be mouse-only.
   */
  onClick?: () => void
  /** Accessible name, when the card's own content is not descriptive enough. */
  ariaLabel?: string
  /** For cards that toggle a disclosure (e.g. an expanding pet card). */
  ariaExpanded?: boolean
}

const Card = ({ children, className = '', style, onClick, ariaLabel, ariaExpanded }: CardProps) => {
  const classes = `card-base flex flex-col ${className}`

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        style={style}
        className={`${classes} w-full text-left cursor-pointer`}
      >
        {children}
      </button>
    )
  }

  return (
    <div style={style} className={classes}>
      {children}
    </div>
  )
}

export default Card
