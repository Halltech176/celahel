import React from 'react'

const NoValues = ({value}) => {
  return (
      <>
    <div className='no-values'>
    <h1>No {value} Available yet </h1>
    </div>
    </>
  )
}

export default NoValues