import './AsciiDemo.css'
import { useEffect, useMemo, useRef, useState } from 'react'

const ASCII_CHARS = ' .:-=+*#%@'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function AsciiDemo({ source }) {
  const containerRef = useRef(null)

  const [asciiArt, setAsciiArt] = useState('')
  const [isReady, setIsReady] = useState(false)
  const [sliderPercent, setSliderPercent] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (!source) return

    const image = new Image()
    image.src = source

    image.onload = () => {
      const canvas = document.createElement('canvas')

      const ctx = canvas.getContext('2d', {
        willReadFrequently: true,
      })

      if (!ctx) return

      const columns = 58

      const aspectRatio =
        image.naturalHeight / image.naturalWidth

      const rows = Math.max(
        28,
        Math.round(columns * aspectRatio * 0.42),
      )

      canvas.width = columns
      canvas.height = rows

      ctx.drawImage(
        image,
        0,
        0,
        columns,
        rows,
      )

      const { data } = ctx.getImageData(
        0,
        0,
        columns,
        rows,
      )

      let output = ''

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          const index = (y * columns + x) * 4

          const r = data[index]
          const g = data[index + 1]
          const b = data[index + 2]

          let brightness =
            (
              0.299 * r +
              0.587 * g +
              0.114 * b
            ) / 255

          brightness =
            (brightness - 0.5) * 1.4 + 0.5

          brightness = clamp(
            brightness,
            0,
            1,
          )

          if (brightness > 0.91) {
            output += ' '
            continue
          }

          const charIndex = Math.floor(
            (1 - brightness) *
              (ASCII_CHARS.length - 1),
          )

          output += ASCII_CHARS[charIndex]
        }

        output += '\n'
      }

      setAsciiArt(output)
      setIsReady(true)
    }

    image.onerror = () => {
      console.error('Hero source image failed to load.')
    }
  }, [source])

  const updateSliderFromClientX = (clientX) => {
    if (!containerRef.current) return

    const rect =
      containerRef.current.getBoundingClientRect()

    const relativeX = clientX - rect.left

    const percent =
      (relativeX / rect.width) * 100

    setSliderPercent(
      clamp(percent, 2, 98),
    )
  }

  const handlePointerDown = (event) => {
    setIsDragging(true)

    event.currentTarget.setPointerCapture?.(
      event.pointerId,
    )

    updateSliderFromClientX(event.clientX)
  }

  const handlePointerMove = (event) => {
    if (!isDragging) return

    updateSliderFromClientX(event.clientX)
  }

  const handlePointerUp = (event) => {
    setIsDragging(false)

    event.currentTarget.releasePointerCapture?.(
      event.pointerId,
    )
  }

  const sliderLabel = useMemo(() => {
    return sliderPercent < 50
      ? 'Original'
      : 'ASCII'
  }, [sliderPercent])

  return (
    <div className="ascii-demo">
      <div className="ascii-demo__topbar">
        <span className="ascii-demo__badge">
          Portrait
        </span>

        <span className="ascii-demo__badge">
          Live conversion
        </span>
      </div>

      <div
        ref={containerRef}
        className={`ascii-demo__frame ${
          isReady
            ? 'ascii-demo__frame--ready'
            : ''
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="ascii-demo__original"
          style={{
            backgroundImage: `url(${source})`,
          }}
        />

        <div
          className="ascii-demo__ascii-layer"
          style={{
            clipPath: `inset(0 ${100 - sliderPercent}% 0 0)`,
          }}
        >
          <div className="ascii-demo__ascii-surface">
            <pre className="ascii-demo__ascii-text mono">
              {asciiArt}
            </pre>
          </div>
        </div>

        <div
          className="ascii-demo__divider"
          style={{
            left: `${sliderPercent}%`,
          }}
          role="slider"
          aria-label="Original and ASCII comparison"
          aria-valuemin={2}
          aria-valuemax={98}
          aria-valuenow={Math.round(
            sliderPercent,
          )}
          tabIndex={0}
        >
          <div className="ascii-demo__handle">
            <span className="ascii-demo__handle-label mono">
              {sliderLabel}
            </span>
          </div>
        </div>

        {!isReady && (
          <div className="ascii-demo__loading">
            <span className="mono">
              generating characters...
            </span>
          </div>
        )}
      </div>

      <div className="ascii-demo__footer">
        <div className="ascii-demo__stat">
          <span className="ascii-demo__stat-label mono">
            MODE
          </span>

          <span className="ascii-demo__stat-value">
            Portrait → ASCII
          </span>
        </div>

        <div className="ascii-demo__stat">
          <span className="ascii-demo__stat-label mono">
            DENSITY
          </span>

          <span className="ascii-demo__stat-value">
            58 chars
          </span>
        </div>

        <div className="ascii-demo__stat">
          <span className="ascii-demo__stat-label mono">
            CHARSET
          </span>

          <span className="ascii-demo__stat-value">
            Classic
          </span>
        </div>
      </div>
    </div>
  )
}

export default AsciiDemo