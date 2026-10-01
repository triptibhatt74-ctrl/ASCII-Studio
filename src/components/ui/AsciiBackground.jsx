import './AsciiBackground.css'
import { useEffect, useMemo, useRef } from 'react'

const CHARACTERS = ['.', ':', '+', '*', '#', '@', '=', '-']
const ROWS = 14
const COLUMNS = 48

function generateGrid() {
  const grid = []

  for (let row = 0; row < ROWS; row++) {
    let line = ''

    for (let col = 0; col < COLUMNS; col++) {
      line +=
        CHARACTERS[
          Math.floor(Math.random() * CHARACTERS.length)
        ]
    }

    grid.push(line)
  }

  return grid
}

function AsciiBackground({ className = '' }) {
  const rootRef = useRef(null)
  const spotlightRef = useRef(null)

  const gridLines = useMemo(() => generateGrid(), [])

  useEffect(() => {
    const root = rootRef.current
    const spotlight = spotlightRef.current

    if (!root || !spotlight) return

    const prefersReducedMotion =
      window.matchMedia?.(
        '(prefers-reduced-motion: reduce)',
      ).matches

    if (prefersReducedMotion) return

    let frameId = null
    let latestX = 0
    let latestY = 0
    let isInside = false

    const render = () => {
      frameId = null

      spotlight.style.transform = `translate3d(
        ${latestX}px,
        ${latestY}px,
        0
      )`

      spotlight.style.opacity = isInside ? '1' : '0'
    }

    const handlePointerMove = (event) => {
      const rect = root.getBoundingClientRect()

      isInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom

      latestX = event.clientX - rect.left
      latestY = event.clientY - rect.top

      if (frameId === null) {
        frameId = requestAnimationFrame(render)
      }
    }

    const handlePointerLeaveWindow = () => {
      isInside = false

      if (frameId === null) {
        frameId = requestAnimationFrame(render)
      }
    }

    window.addEventListener(
      'pointermove',
      handlePointerMove,
      { passive: true },
    )

    document.documentElement.addEventListener(
      'pointerleave',
      handlePointerLeaveWindow,
    )

    return () => {
      window.removeEventListener(
        'pointermove',
        handlePointerMove,
      )

      document.documentElement.removeEventListener(
        'pointerleave',
        handlePointerLeaveWindow,
      )

      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className={`ascii-background ${className}`.trim()}
      aria-hidden="true"
    >
      <div className="ascii-background__layer">
        {gridLines.map((line, index) => (
          <div
            key={index}
            className="ascii-background__row mono"
          >
            {line}
          </div>
        ))}
      </div>

      <div
        ref={spotlightRef}
        className="ascii-background__spotlight"
      />
    </div>
  )
}

export default AsciiBackground