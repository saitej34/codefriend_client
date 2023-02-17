import axios from 'axios';
import './styless.css';
import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const Login = () => {
    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
                 handleClickOpen();
                 setloading(false);
            }
            else if(response.data.message === "Incorrect Password")
            {
                setresult("Password is Incorrect");
                handleClickOpen();
                setloading(false);
            }
            if(response.data.token.length>0)
            {
                setresult("Login Successfull Redirecting.....")
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
    <div class="boxy">
        <br/><br/><br/>
<div class="wrapper">
    <header>Login</header>
    <form action="#">
      <div class="field email">
        <div class="input-area">
          <input type="email" placeholder="Email Address" onChange={(e)=>{setid(e.target.value)}}/>
          <i class="icon fas fa-envelope"></i>
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
      </div><br/>
      <button className="buttons" onClick={sub}>
                    {loading && (
                        <i
                        className="fa fa-spinner fa-spin"
                        style={{ marginRight: "5px" }}
                        />
                    )}
                    {loading && <span>Validating your Credentials</span>}
                    {!loading && <span>Login</span>}
                    </button>
    </form>
    <div class="sign-txt">New User ? <a href="/register">Signup</a></div>
  </div>
  <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Status
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {result}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div></div>
  )
}

export default Login