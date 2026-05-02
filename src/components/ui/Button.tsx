import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  children: ReactNode
  className?: string
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  href,
  target,
  rel,
  onClick,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    primary:
      'bg-[var(--foreground)] text-[var(--background)] hover:opacity-80',
    secondary:
      'bg-[var(--muted)] text-[var(--background)] hover:opacity-80',
    outline:
      'border border-[var(--foreground)]/20 hover:bg-[var(--foreground)]/5',
  }

  const classNames = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link
        href={href}
        className={classNames}
        target={target}
        rel={rel}
      >
        {children}
      </Link>
    )
  }

  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  )
}