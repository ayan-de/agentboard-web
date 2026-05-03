import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function Container({ children, className = '', style }: ContainerProps) {
  return (
    <div 
      className={`mx-auto w-full ${className}`} 
      style={{ 
        paddingLeft: 'var(--content-offset)', 
        paddingRight: 'var(--content-offset)',
        ...style 
      }}
    >
      {children}
    </div>
  )
}