import React from 'react'
import './d.css'
const Displayc = ({c}) => {
  return (
    <div class="container mt-5 box">
        <strong>Comments</strong><br/><br/>
        {c.map((item) => (
          <p align="center">{item}</p>
          ))}
    </div>
  )
}

export default Displayc
