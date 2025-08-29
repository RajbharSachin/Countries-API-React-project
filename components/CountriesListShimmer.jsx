import React from 'react'
import './CountriesListShimmer.css'

export default function CountriesListShimmer() {
    // new Array(10).fill('')  any item like undefined or character or number

  return (
    <div className='countries-container'>
        {
            Array.from({length: 10}).map((el, index) => {
                return <div key={index} className='country-card shimmer-card'></div>
            })
        }
    </div>
  )
}
