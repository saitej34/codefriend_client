import axios from 'axios'
import React,{useState} from 'react'
import { useEffect } from 'react'

const Technews = ({items}) => {
  return (
    <div class="container mt-5">
        <div class="row">
            {items.map((item)=>{
                <div class="col-md-4">
                    <h1>{item.title}</h1>
                </div>
            })}
        </div>
    </div>
  )
}

export default Technews
