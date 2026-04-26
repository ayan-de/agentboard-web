import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    primary:
      'bg-[var(--accent)] text-white hover:opacity-90 dark:bg-[var(--accent)] dark:text-[var(--background)]',
    secondary:
      'bg-[var(--secondary)] text-white hover:opacity-90 dark:bg-[var(--secondary)] dark:text-white',
    outline:
      'border border-[var(--foreground)]/20 hover:bg-[var(--foreground)]/5',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}