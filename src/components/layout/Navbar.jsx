import './Navbar.css'
import { useEffect, useState } from 'react'
import Button from '../ui/Button.jsx'
import ScrambleText from '../ui/ScrambleText.jsx'
import ThemeToggle from '../ui/ThemeToggle.jsx'

const NAV_LINKS = [
  {
    label: 'How It Works',
    href: '#how-it-works',
  },
  {
    label: 'Showcase',
    href: '#showcase',
  },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className={`navbar ${
        isScrolled ? 'navbar--scrolled' : ''
      }`.trim()}
    >
      <div className="navbar__shell">
        <a
          href="#top"
          className="navbar__brand"
          onClick={closeMenu}
        >
          <span
            className="navbar__brand-symbol mono"
            aria-hidden="true"
          >
            &gt;
          </span>

          <span className="navbar__brand-name">
            ASCII Studio
          </span>
        </a>

        <nav className="navbar__links" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__link"
            >
              <ScrambleText trigger="hover">
                {link.label}
              </ScrambleText>
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <ThemeToggle />

          <Button
            variant="primary"
            className="navbar__cta"
            glyph="↗"
            onClick={() => {
              window.location.hash = '#create'
            }}
          >
            Create
          </Button>
        </div>

        <button
          type="button"
          className={`navbar__hamburger ${
            isMenuOpen ? 'navbar__hamburger--open' : ''
          }`}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          onClick={() => {
            setIsMenuOpen((open) => !open)
          }}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        className={`navbar__mobile ${
          isMenuOpen ? 'navbar__mobile--open' : ''
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}

        <a href="#create" onClick={closeMenu}>
          Create
        </a>

        <ThemeToggle />
      </div>
    </header>
  )
}

export default Navbar