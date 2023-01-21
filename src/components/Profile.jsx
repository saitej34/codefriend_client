import axios from 'axios';
import './des.css'
import {Link} from 'react-router-dom'
import React,{useState} from 'react'
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import {useParams} from 'react-router-dom'
const Profile = () => {
    const [name,setname] = useState('');
    const [email,setemail] = useState('');
    const [college,setcoll] = useState('');
    const [sbio,setsbio] = useState('');
    const [linkedi,setlinkde] = useState('');
    const [ppic,setppic] = useState('');
    const {id} = useParams();
    const url = "http://localhost:5000/profile/"+id;
    useEffect(()=>{
        axios.get(url).then((res)=>{
            console.log(res)
            setname(res.data.name);
            setemail(res.data.email);
            setcoll(res.data.college);
            setsbio(res.data.sbio);
            setlinkde(res.data.linkedi);
            setppic(res.data.profilepic);
        }).catch((err)=>{
            console.log(err)
        })
    },[]);
  return (
    <div>
        <div class="container-fluid bg-dark pt-4 pb-4 pl-3">
            <h4 class="text-warning pl-5">CODEFRIEND</h4>
        </div>
        <div class="container p-5">
            <div class="row p-5">
                <div class="col-md-6">
                <Avatar
                    alt="https://www.shutterstock.com/image-vector/profile-placeholder-image-gray-silhouette-no-1153673752"
                    src={ppic}
                    sx={{ width: 160, height: 160 }}
                />
                <br/><br/>
                <table>
                    <tr>
                        <td>Name</td>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <td>Email ID</td>
                        <td>{email}</td>
                    </tr>
                    <tr>
                        <td>College Name</td>
                        <td>{college}</td>
                    </tr>
                    <tr>
                        <td>Linkedin Profile Link</td>
                        <td><Link to={linkedi}>Link</Link></td>
                    </tr>
                    <tr>
                        <td>Short Bio</td>
                        <td>{sbio}</td>
                    </tr>
                </table>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Profile
