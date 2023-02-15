import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import './Comps.css'
import Avatar from '@mui/material/Avatar';
const Display = ({data}) => {
  const [x,setx] = useState(3);
  const [bod,setbod] = useState('');
  const idb = data.id;

  const views = ()=>{
        setx(x*2);
  }
  return (
    <div class="container pt-4">
        <h3 class="text-center">Recent Blogs on Road</h3>
        <br/><br/>
        <div class="row d-flex justify-content-around">
            {data.slice(0,x).map((item) => (
              <div class="col-md-3 column pb-3 m-2">
              <div class="boxkey mt-3 ml-5">
                   {item.keywords}
              </div>
              <br/>
              <div class="head pt-3">
                   <p class="hea">{item.btitle}</p>
              </div>
              <br/>
              <Link to={'/viewblog/' + item._id}><span class="btn btn-outline-warning btx">Read more</span></Link>
          </div>
              ))}
        </div>
        <center><a class="btn btn-warning mt-5" onClick={views} >View More</a></center>
    </div>
  )
}

export default Display
