import React from 'react'
import { Link } from "react-router-dom"
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className='not-found-page'>
      <h1 className='capital'>Page not Found. Error 404</h1>
      <Link className='back-to-home' to='/'>Back to home</Link>
    </div>
  )
}

export default NotFound
