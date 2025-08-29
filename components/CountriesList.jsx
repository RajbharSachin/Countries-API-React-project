import React, { useEffect, useState } from 'react'
import data from '../countriesData'
import CountryCard from './CountryCard'
import CountriesListShimmer from './CountriesListShimmer'

export default function CountriesList({query}) {

  const [countriesData, setCountriesData] = useState([])

  useEffect(() => {  
      setCountriesData(data)  // set imported data to state  FOR EMPTYING Purposes later

      // const intervalId = setInterval(() => {
      //   console.log('Running countriesList component');
      // }, [1000])

      // return () => {   // Clean up return function   When we search Unmount but in routing its automatic
      //   console.log('Cleaning Up');
      //   clearInterval(intervalId)
      // }
  }, []) // Only RUN     1 time   OR   on variable state change

  if(countriesData.length === 0) return <CountriesListShimmer />
  return (
    <>
      {/* <button onClick={() => setCountriesData([])}>Remove All Countries</button> */}
      <div className="countries-container">
        {countriesData
          .filter((country) =>
            country.name.common.toLowerCase().includes(query)
          )
          .map((country) => {
            return (
              <CountryCard
                key={country.name.common}
                name={country.name.common}
                flag={country.flags.svg}
                population={country.population}
                region={country.region}
                capital={country.capital?.[0]}
                data={country}
              />
            )
          })}
      </div>
    </>
  )
}