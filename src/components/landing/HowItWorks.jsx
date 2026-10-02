import './HowItWorks.css'
import heroSource from '../../assets/hero-source.jpg'
import heroAsciiMask from '../../assets/hero-ascii-mask.png'

const STEPS = [
  {
    index: '01',
    title: 'Upload',
    copy: 'Drop in a portrait, product shot, landscape, or anything with a strong silhouette.',
    glyph: '@',
    mode: 'source',
  },
  {
    index: '02',
    title: 'Adjust',
    copy: 'Tune density, contrast, character set, and spacing until the image feels like yours.',
    glyph: '#',
    mode: 'split',
  },
  {
    index: '03',
    title: 'Export',
    copy: 'Save the final piece as text or image and carry the character treatment anywhere.',
    glyph: '+',
    mode: 'ascii',
  },
]

function HowItWorks() {
  return (
    <section
      className="how-it-works"
      id="how-it-works"
    >
      <div className="how-it-works__inner container">
        <div className="how-it-works__header">
          <span className="how-it-works__kicker mono">
            02 / PROCESS
          </span>

          <h2>
            From image
            <br />
            to <span>character.</span>
          </h2>

          <p>
            Three moves. One visual language.
            No presets pretending to be creativity.
          </p>
        </div>

        <div className="how-it-works__strip">
          <div
            className="how-it-works__thread"
            aria-hidden="true"
          />

          {STEPS.map((step, index) => (
            <article
              className="how-it-works__step"
              key={step.index}
            >
              <span
                className="how-it-works__ghost-number"
                aria-hidden="true"
              >
                {step.index}
              </span>

              <div className="how-it-works__node">
                <span
                  className="how-it-works__glyph mono"
                  aria-hidden="true"
                >
                  {step.glyph}
                </span>
              </div>
              
              <div className={`how-it-works__preview how-it-works__preview--${step.mode}`}>
                <img
                  src={heroSource}
                  alt=""
                  aria-hidden="true"
                  className="how-it-works__preview-source"
                />

                <div
                  className="how-it-works__preview-ascii"
                  style={{
                    WebkitMaskImage: `url(${heroAsciiMask})`,
                    maskImage: `url(${heroAsciiMask})`,
                  }}
                />
              </div>

              <div className="how-it-works__step-copy">
                <span className="how-it-works__index mono">
                  {step.index}
                </span>

                <h3>{step.title}</h3>

                <p>{step.copy}</p>
              </div>

              {index < STEPS.length - 1 && (
                <span
                  className="how-it-works__flow mono"
                  aria-hidden="true"
                >
                  . : + * #
                </span>
              )}
            </article>
          ))}
        </div>

        <div
          className="how-it-works__footer-note mono"
          aria-hidden="true"
        >
          IMAGE
          <span>→</span>
          DENSITY
          <span>→</span>
          CHARACTER
          <span>→</span>
          OUTPUT
        </div>
      </div>
    </section>
  )
}

export default HowItWorks