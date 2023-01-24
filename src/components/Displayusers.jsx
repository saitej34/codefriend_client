import React from 'react'
import Avatar from '@mui/material/Avatar';
const Displayusers = ({data}) => {
  return (
    <div class="container">
        <div class="row">
            {data.map((item)=>{
                <div class="col-md-4">
                <Avatar
                    alt="https://www.shutterstock.com/image-vector/profile-placeholder-image-gray-silhouette-no-1153673752"
                    src={item.profilepic}
                    sx={{ width: 50, height: 50 }}
                />
                <p>{item.email}</p>
                </div>
            })}
        </div>
    </div>
  )
}

export default Displayusers
