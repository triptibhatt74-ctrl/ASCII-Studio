import './ScrambleText.css'
import { useState, useEffect, useRef, useCallback } from 'react'

const SCRAMBLE_CHARS = '.:+*#@=-'

const DURATION = 500
const TICK_INTERVAL = 40

function getRandomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
}

function ScrambleText({
  children,
  text,
  trigger = 'mount',
  className = '',
  as: Tag = 'span',
  onMouseEnter,
  ...rest
}) {
  const finalText = text ?? (typeof children === 'string' ? children : '')
  const [displayText, setDisplayText] = useState(finalText)

  const intervalRef = useRef(null)
  const reducedMotionRef = useRef(false)
  const previousTextRef = useRef(finalText)

  useEffect(() => {
    reducedMotionRef.current =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const runScramble = useCallback((targetText) => {
    if (reducedMotionRef.current || !targetText) {
      setDisplayText(targetText)
      return
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    const totalTicks = Math.round(DURATION / TICK_INTERVAL)
    let tick = 0

    intervalRef.current = setInterval(() => {
      tick += 1
      const progress = tick / totalTicks
      const lockedCount = Math.floor(progress * targetText.length)

      let next = ''

      for (let i = 0; i < targetText.length; i++) {
        const originalChar = targetText[i]

        if (originalChar === ' ') {
          next += ' '
        } else if (i < lockedCount) {
          next += originalChar
        } else {
          next += getRandomChar()
        }
      }

      setDisplayText(next)

      if (tick >= totalTicks) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setDisplayText(targetText)
      }
    }, TICK_INTERVAL)
  }, [])

  useEffect(() => {
    if (trigger === 'mount' || trigger === 'both') {
      runScramble(finalText)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (previousTextRef.current === finalText) {
      return
    }

    previousTextRef.current = finalText

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    setDisplayText(finalText)
  }, [finalText])

  const handleMouseEnter = (event) => {
    if (trigger === 'hover' || trigger === 'both') {
      runScramble(finalText)
    }

    if (onMouseEnter) {
      onMouseEnter(event)
    }
  }

  return (
    <Tag
      className={`scramble-text ${className}`.trim()}
      aria-label={finalText}
      onMouseEnter={handleMouseEnter}
      {...rest}
    >
      <span aria-hidden="true">{displayText}</span>
    </Tag>
  )
}

export default ScrambleText