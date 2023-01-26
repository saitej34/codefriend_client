import axios from 'axios';
import React,{ useState, useRef, useMemo } from 'react'
import { useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';
import bg from './blogs.jpeg'
import swal from 'sweetalert'
import './Comp.css'
const Pblog = () => {

    const editor = useRef(null);
    const [loading,setloading] = useState(false);
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const [ti,setti] = useState('');
    const [kt,setkt] = useState('');
    const [sp,setsp] = useState('');
    const [ei,setei] = useState('');
    const [es,setes] = useState('');
    const subs = async(e)=>{
        setloading(true);
        await axios.post('https://cserver-production.up.railway.app/posts',{
            btitle:ti,
            keywords:kt,
            his:content,
            imglinke:ei,
            imglinks:es 
        },{
            headers: {
            'token':localStorage.getItem('token')
            }
        }).then((res)=>{
            console.log(res);
            console.log(res.data.status);
            if(res.data.status=="Blog posted Succesfully")
            {
                swal({
                    title: "Posted Successfully",
                    text: "Congratulations on your post",
                    icon: "success",
                    button: "Ok!",
                  });
                  setloading(false);
                  navigate('/dashboard');
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }

    },[])
  return (
    <div>
        <div class="container-fluid text-center bg-warning pt-3 pb-2">
            <h2>Get your problem Solved</h2>
        </div>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-6">
                    <img src={bg} class="img-responsive img-fluid shadow p-3 mb-5 rounded" />
                </div>
                <div class="col-md-6 justify-content-end text-center">
                    <input type="text" class="form-control text-center fc" placeholder="Error Title" required onChange={(e)=>{setti(e.target.value)}}/><br/>
                    <input type="text" class="form-control text-center fc" placeholder="Key Topics Used" required onChange={(e)=>{setkt(e.target.value)}}/><br/>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => {}}
                    /><br/>
                    <input type="url" class="form-control fc text-center" placeholder="Url of the Image respresenting Error" required onChange={(e)=>{setei(e.target.value)}}/><br/>
                    <input type="url" class="form-control fc text-center" placeholder="Url of the Image respresenting Error solved" required onChange={(e)=>{setes(e.target.value)}}/><br/>

                    <button className="button" onClick={subs}>
                    {loading && (
                        <i
                        className="fa fa-spinner fa-spin"
                        style={{ marginRight: "5px" }}
                        />
                    )}
                    {loading && <span>Posting</span>}
                    {!loading && <span>Post</span>}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pblog
