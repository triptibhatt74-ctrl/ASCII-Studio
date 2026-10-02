import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import './index.css'
import App from './App.jsx'

=======
import './styles/global.css'
import App from './App.jsx'

// Resolve the theme synchronously, before React mounts, so there
// is no flash of the wrong theme. Must match the same storage key
// and valid values ThemeToggle uses, so both stay in agreement.
const STORAGE_KEY = 'ascii-studio-theme'
const VALID_THEMES = ['light', 'dark']

const savedTheme = window.localStorage.getItem(STORAGE_KEY)
const initialTheme = VALID_THEMES.includes(savedTheme) ? savedTheme : 'dark'

document.documentElement.setAttribute('data-theme', initialTheme)

>>>>>>> origin/payal-frontend
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
