import { CSSProperties } from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

const Card = ({ children, className = '', style, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`card-base flex flex-col ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

export default Card