import axios from 'axios'
import React,{useState} from 'react'
import { useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import CountUp from 'react-countup'
/*import Button from 'react-bootstrap/Button';*/
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Comp.css'
import Display from './Display'
import imuser from './user.png'
import Avatar from '@mui/material/Avatar';


import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';





const DashBoard = () => {


  const settings = ['Profile','Account','Make Friends','Logout'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  





  navigator.geolocation.getCurrentPosition(function(position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
  });
  const idss = new Array();
  const arrs = new Array();
  const keys = new Array();
  const [uid,setuid] = useState('');
  const [img,setimg] = useState('');
  const [name,setname] = useState('');
  const [email,setemail] = useState('');
  const [profile,setprofile] = useState('');
  const [coll,setcoll]=useState('');
  const [link,setlink] = useState('');
  const [bio,setbio] = useState('');
  const [user,setuser] = useState('');
  const [arr,setarr] = useState([]);
  const [nb,setnb] = useState('')
  const navigate = useNavigate();
  const [show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const log = (e)=>{
      localStorage.removeItem('token')
      navigate('/')
  }
  const subdetails = (e)=>{
       axios.put('https://codefriendbackend.vercel.app/editprofile',{
            name:user,
            email:email,
            profilepic:profile,
            college:coll,
            sbio:bio,
            linkdeinprofile:link

       },{
        headers: {
        'token':localStorage.getItem('token')
        }
    }).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
       handleClose();
  }
  useEffect(()=>{
    if(!localStorage.getItem('token'))
    {
          navigate('/login')
    }
    const token = localStorage.getItem('token')
    const url = "https://codefriendbackend.vercel.app/decode/"+token;
    axios.get(url).then((response)=>{
          console.log(response.data.name);
          setemail(response.data.email);
          setuid(response.data._id);
          setuser(response.data.name);
          setimg(response.data.profilepic);
    }).catch((error)=>{
      console.log(error);
    })
    const ur = "https://codefriendbackend.vercel.app/getp/"+token;
    axios.get(ur).then((response)=>{
      console.log(response)
      console.log(response.data[0].btitle)
      setarr(response.data);
      setnb(response.data[0].length);
      const df = response.data;
      for(var i=0;i<df.length;i++)
      {
          idss.push(response.data[i]._id);
          arrs.push(response.data[i].btitle);
          keys.push(response.data[i].keywords);
      }
    }).catch((error)=>{
      console.log(error);
    })
  },[])
  return (
    <div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={user}
                onChange={(e)=>{setname(e.target.value)}}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Profile Picture Url</Form.Label>
                      <Form.Control
                        type="url"
                        onChange={(e)=>{setprofile(e.target.value)}}
                      />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e)=>{setemail(e.target.value)}}
                        required
                      />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>College Name</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e)=>{setcoll(e.target.value)}}
                      />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Linkedin Url</Form.Label>
                      <Form.Control
                        type="url"
                        onChange={(e)=>{setlink(e.target.value)}}
                      />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Short Bio</Form.Label>
              <Form.Control as="textarea" rows={2} onChange={(e)=>{setbio(e.target.value)}}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-warning" onClick={handleClose}>
            Exit
          </Button>
          <Button variant="warning" onClick={subdetails}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
         <div class="container-fluid bg-dark text-center">
          <br/>
          <div class="row d-flex justify-content-around text-center">
              <div class="col-md-4 text-center">
              <a class="navbar-brand q text-warning text-center" href="#">
                    CODE FRIEND
                </a>
                <br/>
              </div>
              <br/><br/>
              <div class="col-md-4 d-flex justify-content-center">
              <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="https://www.shutterstock.com/image-vector/profile-placeholder-image-gray-silhouette-no-1153673752"
                src={img}
                sx={{ width: 56, height: 56, marginRight: 10 }}
              />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><a href={'/profile' + uid}>Profile</a></Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><a href={'/'} onClick={log}>Logout</a></Typography>
                </MenuItem>
            </Menu>
          </Box>
                 
              </div>




            





              






          </div>
        <br/>
    </div>
    <br/><br/>
    <div class="container">
        <div class="row justify-content-center align-items-center">
           <div class="col-md-2">
                <a href="/postblog" class="btn btn-dark-warning">Post an Blog</a>
           </div>
           <div class="col-md-2">
                <a href="#" class="btn btn-dark-warning" onClick={handleShow}>Edit Profile</a>
           </div>
           <div class="col-md-2">
                <a href="#" class="btn btn-dark-warning">Top Feed</a>
           </div>
           <div class="col-md-2">
                <a href="/solve" class="btn btn-dark-warning">Solve Questions</a>
           </div>
        </div>
    </div>
    <br/><br/><br/>
    <div class="container">
        <div class="row">
             <div class="col-md-6">
                 <h2 align="center">Welcome <span class="text-warning">{user}</span>,</h2>
             </div>
        </div>
    </div>
    <br/><br/>
    <div class="container">
          <div class="row">
            <div class="col-md-4">
                <img src={img} class="img-responsive img-fluid" height="150px"/>
            </div>
          </div>
    </div><br/><br/>
    <div class="container text-center align-items-center mb-5">
        <h3 class="text-center mb-5">Info of our <span class="text-warning">PROFILE</span></h3>
        <div class="row">
           <div class="col-md-4">
                <h4>Total Errors Solved</h4>
                <h5><CountUp
                      start={0}
                      end={nb}
                      duration={5}/>  </h5>
           </div><br/>
           <div class="col-md-4">
                <h4>Total Likes</h4>
                <h5><CountUp
                      start={0}
                      end={100}
                      duration={5}/>  </h5>
           </div><br/>
           <div class="col-md-4">
                 <h4>Rating</h4>
                 <h5><CountUp
                      start={0}
                      end={4.5}
                      duration={5}/>  </h5>
           </div><br/>
        </div>
    </div><br/><br/>
    <div class="container pt-5 pb-5 pl-5 bg-dark">
        <div class="row">
          <div class="col-md-8 text-center">
               <h2 class="text-white">Every Problem Error has a <span class="text-warning">Solution</span>!</h2><br/>
               <h3 class="text-white">Let's <span class="text-warning">Solve</span>Your Problems</h3>
          </div>
          <div class="col-md-4">
              <a href="#" class="btn btn-outline-warning align-items-center">Watch Today's Top Feed</a>
          </div>
        </div>
    </div>
    <br/>
    {arr.length>0 ? <Display data={arr}/> : null}
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
            <p class="copyright-text">Copyright &copy; {new Date().getFullYear()} All Rights Reserved by  
         <a href="https://saitej34.github.io/saiportfolio.github.io/"> Y.SAI TEJA</a>.
            </p>
          </div>
        </div>
      </div>
</footer>
    </div>
    
  )
}

export default DashBoard