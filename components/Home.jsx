import { useState } from 'react'
import SearchBar from './SearchBar'
import SelectMenu from './SelectMenu'
import CountriesList from './CountriesList'
import { useTheme } from '../hooks/useTheme'
// import { useWindowSize } from '../hooks/useWindowSize'

export default function Home() {
  const [query, setQuery] = useState('')

  // no need to Pass Props & avoid ❌'prop dilling' for Uplift State in React
  const [isDark] = useTheme()
  // const windowSize = useWindowSize()
  return (
    <main className={`${isDark ? 'dark' : ''}`}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SelectMenu />
      </div>
      {/* <h1 style={{ textAlign: 'center' }}>
        {windowSize.width} X {windowSize.height}
      </h1> */}
      {/* {query === 'unmount'? '' : <CountriesList query={query} />} */}
      <CountriesList query={query} />
    </main>
  )
}
