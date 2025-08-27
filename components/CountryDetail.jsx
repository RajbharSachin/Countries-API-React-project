import React, { useEffect, useState } from 'react'
import './CountryDetail.css'
import { useParams } from 'react-router'
export default function CountryDetail() {
  // FETCH STATE
  const params = useParams()
  const countryName = params.country

  const [countryData, setCountryData] = useState(null)
  const [notFound, setNotFound] = useState(false)
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        // console.log(data);
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
          border: [], // Initialize border as empty array
        })

        // FOR BORDER COUNTRIES - Update countryData instead of separate state
        if (data.borders && data.borders.length > 0) {
          Promise.all(
            data.borders.map(
              (border) =>
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                  .then((res) => res.json())
                  .then(([borderCountry]) => ({
                    code: border,
                    name: borderCountry.name.common,
                  }))
                  .catch(() => null) // Handle errors gracefully
            )
          ).then((results) => {
            const borderCountries = results.filter(Boolean) // Remove null values

            // Update countryData with border countries
            setCountryData((prevData) => ({
              ...prevData,
              border: borderCountries,
            }))
          })
        } else {
          // No borders - update countryData with empty array
          setCountryData((prevData) => ({
            ...prevData,
            border: [],
          }))
        }
      }).catch((err) => {
        setNotFound(true)
      })
  }, [countryName])

  if(notFound) return <div>Country Not Found</div>

  // RENDER
  return countryData === null ? (
    'loading...'
  ) : (
    <main>
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
            <div className="border-countries">
              <b>Border Countries: </b>
              {countryData.border && countryData.border.length > 0 ? (
                countryData.border.map((border) => (
                  <button
                    key={border.code}
                    onClick={() =>
                      (window.location.search = `?name=${border.name}`)
                    }
                    style={{
                      margin: '2px',
                      padding: '4px 8px',
                      border: '1px solid #ccc',
                      background: '#f5f5f5',
                      cursor: 'pointer',
                      borderRadius: '4px',
                    }}
                  >
                    {border.name}
                  </button>
                ))
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
