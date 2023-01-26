import axios from 'axios';
import './Load.css'
import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const navigation = useNavigate();
    const adm = ()=>{
        navigation('/admin')
    }
    const [loading,setloading] = useState('');
    const [result,setresult] = useState('');
    const [id,setid] = useState('');
    const [password,setpass] = useState('');
    const sub = async(e)=>{
        setloading(true);
        e.preventDefault();
        await axios.post("https://cserver-production.up.railway.app/login",{
            email:id,
            password:password
        }).then((response)=>{
            console.log(response)
            console.log(response.data)
            if(response.data.message === "User Not Found"){
                 setresult("User not found");
            }
            else if(response.data.message === "Incorrect Password")
            {
                setresult("Password is Incorrect");
            }
            if(response.data.token.length>0)
            {
                localStorage.setItem('token',response.data.token)
                setloading(false);
                navigation('/dashboard')
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
  return (
    <div>
         <div class="container log text-warning text-center">
            <br/>
            <h2 align="center">Login</h2>
            <br/><br/>
            <div class="row justify-content-center">
                <div class="col-md-9">
                    <input type="text" class="form-control ml-4 text-center" placeholder="Login ID" onChange={(e)=>{setid(e.target.value);console.log(id)}}/>
                </div>
            </div>
            <br/>
            <div class="row justify-content-center">
                <div class="col-md-9">
                    <input type="Password" class="form-control ml-4 text-center" placeholder="Password" onChange={(e)=>{setpass(e.target.value)}}/>
                </div>
            </div>
            <br/>
            <div class="row">
                <div class="col-md-9">
                    <a href="#" class="nav-link text-white">Forgot Your Password ?</a>
                </div>
            </div> <br/>
            <div class="row justify-content-center">
                <div class="col-md-9">
                <button className="button" onClick={sub}>
                    {loading && (
                        <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                        />
                    )}
                    {loading && <span>Validating Credentials</span>}
                    {!loading && <span>Login</span>}
                    </button>
                </div>
            </div>
            <br/>
            <p class="text text-white">{result}</p>
            <br/>
         </div>
         <center>
         
         </center>
    </div>
  )
}

export default Login
