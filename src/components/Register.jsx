import React,{useState} from 'react'
import axios from "axios";
import './styless.css'
import swal from 'sweetalert'
import {useNavigate} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
const Register = () => {
    const [loading,setloading] = useState(false);
    const hist = useNavigate();
    const [email,setemail] = useState('');
    const [name,setname] = useState('');
    const [password,setpass] = useState('');
    const [cpassword,setcpass] = useState('');
    const reg = (e)=>{
        setloading(true);
        /*fetch('http://localhost:5000/register',{
            method: 'POST',
            body: JSON.stringify({
                email:email,
                name:name,
                password:password,
                cpassword:cpassword
            }),
            contentType: 'application/json'
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })*/
        axios.post('https://cserver-production.up.railway.app/register', {
              email:email,
              name:name,
              password:password,
              cpassword:cpassword
            })
            .then(function (response) {
                console.log(response);
                if(response.data.message==='Registration Successful')
                {
                    swal({
                        title: "Registration Successfull",
                        text: "Congratulations!",
                        icon: "success",
                        button: "Ok!",
                      });
                      setloading(false);
                      hist('/login')

                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
  return (
    <div>
    <div class="boxy"><br/><br/>
           <div class="wrapper">
    <header>Sign Up</header>
    <form action="#">
      <div class="field email">
        <div class="input-area">
          <input type="email" placeholder="Email Address" onChange={(e)=>{setemail(e.target.value)}}/>
          <i class="icon fas fa-envelope"></i>
          <i class="error error-icon fas fa-exclamation-circle"></i>
        </div>
        <div class="error error-txt">Email can't be blank</div>
      </div>
      <div class="field email">
        <div class="input-area">
          <input type="text" placeholder="Name" onChange={(e)=>{setname(e.target.value)}}/>
          <i class="icon fa fa-address-book"></i>
          <i class="error error-icon fas fa-exclamation-circle"></i>
        </div>
        <div class="error error-txt">Email can't be blank</div>
      </div>
      
      <div class="field password">
        <div class="input-area">
          <input type="password" placeholder="Password" onChange={(e)=>{setpass(e.target.value)}}/>
          <i class="icon fas fa-lock"></i>
          <i class="error error-icon fas fa-exclamation-circle"></i>
        </div>
        <div class="error error-txt">Password can't be blank</div>
      </div>
      <div class="field password">
        <div class="input-area">
          <input type="password" placeholder="Confirm Password" onChange={(e)=>{setcpass(e.target.value)}}/>
          <i class="icon fas fa-lock"></i>
          <i class="error error-icon fas fa-exclamation-circle"></i>
        </div>
        <div class="error error-txt">Password can't be blank</div>
      </div>
      <div class="pass-txt"><a href="#">Forgot password?</a></div>
      <br/><br/>
      <button className="buttons" onClick={reg}>
                    {loading && (
                        <i
                        className="fa fa-spinner fa-spin"
                        style={{ marginRight: "5px" }}
                        />
                    )}
                    {loading && <span>Registering with our Network</span>}
                    {!loading && <span>Register</span>}
                    </button>
    </form>
    <div class="sign-txt">Already a User ?<a href="/login">Login</a></div>
  </div>

    </div></div>
  )
}

export default Register
