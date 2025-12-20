import React from 'react'

export const Logo: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 48
}) => {
  return (
    <img
      src="/images/logo.png"
      alt="Fleuralys"
      width={size}
      height={size}
      className={className}
    />
  )
}