import axios from 'axios'
import React,{useState} from 'react'
import { useEffect } from 'react'
import Displayusers from './Displayusers'
const Topuser = () => {
    const [users,setdata] = useState([]);
    const getD = async()=>{
        await axios.get('https://codefriendbackend.vercel.app/getusers').then((res)=>{
            for(var i=0;i<res.data.length;i++)
            {
                if(users.length<res.data.length)
                {
                    users.push(res.data[i]);
                }
            }
            console.log(users);
        }).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(() =>{
       getD();
    }, []);
  return (
    <div>
       <div class="bg-dark pt-4 pl-5 pb-4 text-warning">
            <h3>CODEFRIEND</h3>
       </div><br/>
       <h4 class="text-center mt-5">Top Users</h4>
       <Displayusers data={users} />
    </div>
  )
}

export default Topuser
