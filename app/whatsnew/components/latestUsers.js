"use client"


import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { ChatLeftTextFill, HeartFill } from 'react-bootstrap-icons'
import dayjs from 'dayjs'
import Link from 'next/link'



export default function LatestUsers() {

 

  const {data, isError, isLoading} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      let {data} = await axios.post("/api/getUsers")
      return data.data
    }
  })

  
  if(isLoading){
    return(
      <div>Loading</div>
    )
  }

  let date = dayjs()



  function convertMiliseconds(miliseconds, format) {
    var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;
    
    total_seconds = parseInt(Math.floor(miliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    days = parseInt(Math.floor(total_hours / 24));
  
    seconds = parseInt(total_seconds % 60);
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours % 24);
    
    if(days == 0){
      return `Posted ${hours} h and ${minutes} m ago`
    }
    else{
      return `Posted ${days} days and ${hours} h and ${minutes} m ago`
    }
    
    
    
  };

  return (
        <div className='row g-4'>
          
            {data.map((user) => {
              return(
                <div className='mx-auto userCards'>
                  <Link href={`/profile?id=${user.id}`}>
                  <div className='p-4 d-flex align-items-center'>
                    <img width={60} height={60} src={user.image} className='me-3'/>
                    <h2 className='my-3'><strong>{user.id}</strong></h2>
                    {/* <p className='text-center'>{convertMiliseconds(date.diff(user.dateCreated))}</p> */}
                  </div>
                  </Link>
                </div>
              )
            })}
          
          
        </div>
        
  )
}
