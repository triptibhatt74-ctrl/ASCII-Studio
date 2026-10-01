import './Button.css'

function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  glyph,
  ...rest
}) {
  const variantClass = variant === 'ghost' ? 'btn-ghost' : 'btn-primary'

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${className}`.trim()}
      onClick={onClick}
      {...rest}
    >
      {children}
      {glyph && (
        <span className="btn__glyph" aria-hidden="true">
          {glyph}
        </span>
      )}
    </button>
  )
}

export default Button
