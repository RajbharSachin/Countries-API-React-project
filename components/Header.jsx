import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

export default function Header() {
  // set initial DarkState from LOCAL-STORAGE & NEED TO UPLIFT STATE-Variable TO PARENT COMPONENT
  const [isDark, setIsDark] = useContext(ThemeContext)

  //  ❌DIRECT DOM MANIPULATION when re-render on setIsDark State Value will set
  // if (isDark) {
  //   document.body.classList.add('dark')
  // } else {
  //   document.body.classList.remove('dark')
  // }

  return (
    <header className={`header-container ${isDark ? 'dark' : ''}`}>
      <div className="header-content">
        <h2 className="title">
          <a href="/">Where in the world?</a>
        </h2>
        <p
          className="theme-changer"
          onClick={() => {
            setIsDark(!isDark)
            localStorage.setItem('isDarkMode', !isDark)
          }}
        >
          <i className={`fa-solid fa-${isDark ? 'sun' : 'moon'}`} />
          &nbsp;&nbsp;{isDark ? 'Light' : 'Dark'} Mode
        </p>
      </div>
    </header>
  )
}
