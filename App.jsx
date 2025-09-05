import './App.css'
import { Outlet } from 'react-router'
import Header from './components/Header'
import { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'

const App = () => {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem('isDarkMode'))
  )

  return (
      <ThemeProvider>
        <Header />
        <Outlet />
      </ThemeProvider>
  )
}

export default App
