import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Displayc from './Displayc';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import './Comp.css'
import './Load.css'
const Viewb = () => {
  const navigate = useNavigate();
  function Set() {
    return { __html: bod };
  }
  const [loading,setloading] = useState(false);
  const [com,setcom] = useState('');
  const [comments,setcomments] = useState([]);
  const [comm,setcomm] = useState('');
  const [bid,setbid] = useState('');
  const [user,setuser] = useState('');
  const [auth,setauth] = useState('');
  const [datetime,setdt] = useState('');
  const [tit,sett] = useState('');
  const [key,setkey] = useState('');
  const [im1,setim1] = useState('');
  const [bod,setbod] = useState('');
  const [im2,setim2] = useState('');
  const [b,setb] = useState('');
  const sub = (e)=>{
    const u = "https://en.wikipedia.org/wiki/"+key;
    window.open(u, '_blank');
  }
  let {id} = useParams();
  const cpost = ()=>{
    setloading(true);
    const url = "https://cserver-production.up.railway.app/comments/"+id;
    axios.put(url,{
       comments:com
    }).then((res)=>{
      console.log(res);
      setloading(false);
    })
}

  useEffect(()=>{
    if(!localStorage.getItem('token'))
    {
          navigate('/login')
          console.log();
    }
    const url = "https://cserver-production.up.railway.app/decode/"+auth;
    axios.get(url).then((res)=>{
      console.log(res.data.name)
      setuser(res.data.name)
    }).catch((err)=>{
      console.log(err);
    })
    axios.get('https://cserver-production.up.railway.app/getqy/'+id).then((response) => {
      console.log(response)
      sett(response.data.btitle);
      setauth(response.data.userid);
      setdt(response.data.date);
      setbod(response.data.his);
      setkey(response.data.keywords);
      setim1(response.data.imglinke);
      setim2(response.data.imglinks);
      setbid(response.data.id);
      setcomments(response.data.comments);
    }).catch((error) => {
      console.log(error);
    })
  },[])
  return (
    <div>
        <div class="container-fluid bg-dark text-center">
          <br/>
          <div class="row d-flex justify-content-around text-center">
              <div class="col-md-4 text-center">
              <a class="navbar-brand q text-warning text-center" href="#">
                    CODE FRIEND
                </a>
                <br/>
              </div>
              <div class="col-md-5">
                   <h5 class="text-white"><b>Author : </b>{user}</h5>
                   <p class="text-white"><b>Date and Time : </b>{datetime}</p>
              </div>
          </div>
        <br/>
       </div>
    <br/><br/>
        <div class="container">
            <div class="row mb-5">
                 <h2 class="text-dark text-center">{tit}</h2>
                 <div class="userbox">
                      <Link to={'/profile/' + auth}>Writer Profile</Link>
                 </div>
            </div>
            <br/><br/>
            <b>KeyTopics</b>
            <br/><br/>
            <a href="#" onClick={sub} class="btn btn-warning">{key}</a>
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <img src={im1} class="img-fluid" />
                    
                </div>
            </div>
            <div class="row justify-content-center mt-5">
                <div class="col-md-10 mt-5">
                <div dangerouslySetInnerHTML={Set()}></div>
                </div>
            </div>
        </div>
        
         <div class="container mt-5">
             <div class="row justify-content-center mt-4">
                <div class="col-md-6">
                     <input type="text" class="form-control fc" placeholder="Comments/Queries" onChange={(e)=>{setcom(e.target.value)}}/><br/>
                    <button className="buttonc" onClick={cpost}>
                    {loading && (
                        <i
                        className="fa fa-spinner fa-spin"
                        style={{ marginRight: "5px" }}
                        />
                    )}
                    {loading && <span>Posting Comment</span>}
                    {!loading && <span>Comment</span>}
                    </button>
                </div>
             </div>
             {comments.length >=1 ? <Displayc c={comments} /> : null}
         </div>


        <footer class="site-footer bg-dark mt-5">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">Codefriend.com<i>CODE WANTS TO BE SIMPLE </i> is an initiative  to help the upcoming programmers with the code. Scanfcode focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in different programming languages that include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.</p>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul class="footer-links">
              <li><a href="http://scanfcode.com/category/c-language/">Full Stack Development</a></li>
              <li><a href="http://scanfcode.com/category/front-end-development/">MERN Stack</a></li>
              <li><a href="http://scanfcode.com/category/back-end-development/">DataScience</a></li>
              <li><a href="http://scanfcode.com/category/java-programming-language/">Java Full Stack</a></li>
              <li><a href="http://scanfcode.com/category/android/">Android Dev</a></li>
              <li><a href="http://scanfcode.com/category/templates/">UI/UX Design</a></li>
            </ul>
          </div>
          <div class="col-xs-6 col-md-3">
            <h6>Subscribe to Updates</h6>
            <br/>
            <input type="email" class="form-control w-3"/>
            <br/>
            <input type="submit" class=""/>
          </div>
        </div>
        <hr/>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2022 All Rights Reserved by  
         <a href="https://saitej34.github.io/saiportfolio.github.io/"> Y.SAI TEJA</a>.
            </p>
          </div>
        </div>
      </div>
</footer>
    </div>
  )
}

export default Viewb
