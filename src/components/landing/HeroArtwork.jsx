import './HeroArtwork.css'
import { useState } from 'react'

import heroSource from '../../assets/hero-source.jpg'
import heroAsciiMask from '../../assets/hero-ascii-mask.png'

const ESCAPING_CHARS = [
  { char: '@', x: '-30px', y: '25%' },
  { char: '#', x: '18px', y: '34%' },
  { char: '*', x: '-18px', y: '47%' },
  { char: '+', x: '28px', y: '58%' },
  { char: ':', x: '-34px', y: '69%' },
  { char: '.', x: '20px', y: '79%' },
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function HeroArtwork() {
  const [split, setSplit] = useState(38)
  const [dragging, setDragging] = useState(false)

  const updateSplit = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect()

    const next =
      ((event.clientX - rect.left) / rect.width) * 100

    setSplit(clamp(next, 18, 82))
  }

  const handlePointerDown = (event) => {
    setDragging(true)

    event.currentTarget.setPointerCapture?.(
      event.pointerId,
    )

    updateSplit(event)
  }

  const handlePointerMove = (event) => {
    if (!dragging) return
    updateSplit(event)
  }

  const handlePointerUp = (event) => {
    setDragging(false)

    event.currentTarget.releasePointerCapture?.(
      event.pointerId,
    )
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      setSplit((value) => clamp(value - 3, 18, 82))
    }

    if (event.key === 'ArrowRight') {
      setSplit((value) => clamp(value + 3, 18, 82))
    }
  }

  return (
    <div className="hero-artwork">
      <div
        className={`hero-artwork__frame ${
          dragging ? 'hero-artwork__frame--dragging' : ''
        }`}
        style={{
          '--split': `${split}%`,
        }}
        role="slider"
        aria-label="Compare original portrait with ASCII artwork"
        aria-valuemin={18}
        aria-valuemax={82}
        aria-valuenow={Math.round(split)}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        <img
          className="hero-artwork__source"
          src={heroSource}
          alt="Portrait source image"
          draggable="false"
        />

        <div className="hero-artwork__ascii-layer">
          <div
            className="hero-artwork__ascii-glyphs"
            style={{
              WebkitMaskImage: `url(${heroAsciiMask})`,
              maskImage: `url(${heroAsciiMask})`,
            }}
          />
        </div>

        <div
          className="hero-artwork__divider"
          aria-hidden="true"
        >
          <span className="hero-artwork__divider-glyph">
            :
          </span>
        </div>

        <div
          className="hero-artwork__characters"
          aria-hidden="true"
        >
          {ESCAPING_CHARS.map((item, index) => (
            <span
              key={`${item.char}-${index}`}
              style={{
                '--char-x': item.x,
                '--char-y': item.y,
                '--char-delay': `${index * 45}ms`,
              }}
            >
              {item.char}
            </span>
          ))}
        </div>
      </div>

      <div className="hero-artwork__annotation">
        <span className="hero-artwork__annotation-line" />

        <span className="mono">
          PORTRAIT / ASCII STUDY 01
        </span>
      </div>

      <p className="hero-artwork__hint mono">
        DRAG TO TRANSFORM
      </p>
    </div>
  )
}

export default HeroArtwork