import React from 'react'
import nomatch from './NoMatch.module.css'
const NoMatch = () => {
  return (
    <div className={`${nomatch.nomatch_container}`}>
        <h1 className="text-primary-fw-bold text-center">
        Whoops!!! Sorry the page you are looking for cannot be found
        </h1>
    </div>
  )
}

export default NoMatch