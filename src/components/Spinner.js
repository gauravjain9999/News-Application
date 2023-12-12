import React, { Component } from 'react'
import loading from '../Images/loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center d-flex justify-content-center align-items-center vh-100">
        <img src={loading} style={{background: 'transparent', justifyContent: 'center', alignItems: 'center', display: 'flex'}} alt='loading'/>
      </div>
    )
  }
}
