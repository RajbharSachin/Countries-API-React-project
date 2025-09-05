import React, { useContext, useEffect, useState } from 'react'
import './CountryDetail.css'
import { Link, useLocation, useParams } from 'react-router'
import { ThemeContext } from '../contexts/ThemeContext'
export default function CountryDetail() {
  // FETCH STATE
  // no need to Pass Props & avoid ❌'prop dilling' for Uplift State in React
  const [isDark] = useContext(ThemeContext)

  const params = useParams()
  const countryName = params.country
  const { state } = useLocation()
  console.log(state)

  const [countryData, setCountryData] = useState(null)
  const [notFound, setNotFound] = useState(false)

  function updateCountryData(data) {
    setCountryData({
      name: data.name.common,
      nativeName: Object.values(data.name.nativeName)[0].common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      flag: data.flags.svg,
      tld: data.tld,
      currencies: Object.values(data.currencies)
        .map((currency) => currency.name)
        .join(', '),
      languages: Object.values(data.languages).join(', '),
      borders: [], // Initialize border as empty array
    })

    if (!data.borders) {
      data.borders = [] // not gives error & doesn't show if No Borders
    }
    Promise.all(
      // Fetch all border countries promises FOR 3 TIMES RUN ONLY
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common)
      })
    ).then((borders) => {
      // to avoid React FastDataOptimization if no borders to stop immediate useLocation hook state update to empty array
      setTimeout(() =>
        setCountryData((prevState) => ({ ...prevState, borders }))
      )
    })
  }

  useEffect(() => {
    if (state) {
      // if state is already FETCHED FROM HOMEPAGE COUNTRIES DATA pass it directly
      updateCountryData(state)
      return
    }
    // else  fetch data if user TYPES URL directly first time
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        // console.log(data);
        updateCountryData(data)
      })
      .catch((err) => {
        // error if incorrect country name
        console.log(err)
        setNotFound(true)
      })
  }, [countryName])

  if (notFound) return <div>Country Not Found</div>

  // RENDER
  return countryData === null ? (
    'loading...'
  ) : (
    <main className={`${isDark ? 'dark' : ''}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flag} alt={`${countryData.name} flag`} />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: {countryData.nativeName}</b>
                <span className="native-name"></span>
              </p>
              <p>
                <b>
                  Population: {countryData.population.toLocaleString('en-IN')}
                </b>
                <span className="population"></span>
              </p>
              <p>
                <b>Region: {countryData.region}</b>
                <span className="region"></span>
              </p>
              <p>
                <b>Sub Region: {countryData.subregion}</b>
                <span className="sub-region"></span>
              </p>
              <p>
                <b>Capital: {countryData.capital.join(', ')}</b>
                <span className="capital"></span>
              </p>
              <p>
                <b>Top Level Domain: {countryData.tld}</b>
                <span className="top-level-domain"></span>
              </p>
              <p>
                <b>Currencies: {countryData.currencies}</b>
                <span className="currencies"></span>
              </p>
              <p>
                <b>Languages: {countryData.languages}</b>
                <span className="languages"></span>
              </p>
            </div>
            {countryData.borders.length !== 0 && (
              <div className="border-countries">
                <b>Border Countries: </b>&nbsp;
                {countryData.borders.map((border) => (
                  <Link key={border} to={`/${border}`}>
                    {border}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
