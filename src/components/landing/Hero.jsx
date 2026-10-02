import './Hero.css'

import AsciiBackground from '../ui/AsciiBackground.jsx'
import ScrambleText from '../ui/ScrambleText.jsx'
import Button from '../ui/Button.jsx'
import HeroArtwork from './HeroArtwork.jsx'

function Hero() {
  return (
    <section className="hero" id="top">
      <AsciiBackground className="hero__background" />

      <div
        className="hero__ambient-word"
        aria-hidden="true"
      >
        ASCII
      </div>
      
      <div className="hero__floating-glyphs" aria-hidden="true">
        <span>@</span>
        <span>#</span>
        <span>+</span>
        <span>:</span>
      </div>

      <div className="hero__inner container">
        <div className="hero__content">
          <div className="hero__eyebrow-row">
            <span className="hero__eyebrow-index mono">
              01
            </span>

            <span className="hero__eyebrow-line" />

            <span className="hero__eyebrow mono">
              IMAGE → TEXT
            </span>
          </div>

          <h1 className="hero__headline">
            Turn pixels
            <br />
            into{' '}
            <ScrambleText
              as="span"
              trigger="mount"
              className="hero__headline-accent"
            >
              characters.
            </ScrambleText>
          </h1>

          <p className="hero__subcopy">
            Transform ordinary images into expressive
            ASCII artwork. Shape density, contrast and
            character style, then export something
            completely different from the source.
          </p>

          <div className="hero__actions">
            <Button
              variant="primary"
              className="hero__cta"
              glyph=">"
              onClick={() => {
                window.location.hash = '#create'
              }}
            >
              Start Creating
            </Button>

            <Button
              variant="ghost"
              onClick={() => {
                window.location.hash = '#showcase'
              }}
            >
              View Showcase
            </Button>
          </div>

          <div className="hero__source-note">
            <span className="hero__source-note-line" />
            <span className="mono">SOURCE 01 / PORTRAIT STUDY</span>
          </div>

        </div>

        <div className="hero__visual">
          <HeroArtwork />
        </div>
      </div>
    </section>
  )
}

export default Hero