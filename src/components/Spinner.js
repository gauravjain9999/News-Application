import React from 'react'
import loading from '../Images/loading.gif'

const Spinner = () => {
  return (
    <div className="text-center d-flex justify-content-center align-items-center vh-100">
      <img src={loading} style={{background: 'transparent', justifyContent: 'center', alignItems: 'center', display: 'flex'}} alt='loading'/>
    </div>
  )
}

export default Spinner
