import './ThemeToggle.css'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ascii-studio-theme'
const THEME_EVENT = 'ascii-studio-theme-change'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'

  const saved = window.localStorage.getItem(STORAGE_KEY)

  return saved === 'light' || saved === 'dark'
    ? saved
    : 'dark'
}

function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    const syncTheme = (event) => {
      if (
        event.detail === 'light' ||
        event.detail === 'dark'
      ) {
        setTheme(event.detail)
      }
    }

    window.addEventListener(
      THEME_EVENT,
      syncTheme,
    )

    return () => {
      window.removeEventListener(
        THEME_EVENT,
        syncTheme,
      )
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme =
      theme === 'dark' ? 'light' : 'dark'

    setIsChanging(true)

    window.setTimeout(() => {
      setTheme(nextTheme)

      document.documentElement.setAttribute(
        'data-theme',
        nextTheme,
      )

      window.localStorage.setItem(
        STORAGE_KEY,
        nextTheme,
      )

      window.dispatchEvent(
        new CustomEvent(THEME_EVENT, {
          detail: nextTheme,
        }),
      )

      setIsChanging(false)
    }, 110)
  }

  return (
    <button
      type="button"
      className={`theme-glyph-toggle ${
        isChanging
          ? 'theme-glyph-toggle--changing'
          : ''
      } ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={`Switch to ${
        theme === 'dark' ? 'light' : 'dark'
      } theme`}
      title={`Switch to ${
        theme === 'dark' ? 'light' : 'dark'
      } theme`}
    >
      <span
        className="theme-glyph-toggle__glyph mono"
        aria-hidden="true"
      >
        {theme === 'dark' ? '▓' : '░'}
      </span>
    </button>
  )
}

export default ThemeToggle