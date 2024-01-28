"use client"


import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { ChatLeftTextFill, HeartFill } from 'react-bootstrap-icons'
import dayjs from 'dayjs'
import Link from 'next/link'
import { Skeleton } from '@mui/material'
import Image from 'next/image'



export default function LatestPosts() {

 

  const {data, isError, isLoading} = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      let {data} = await axios.post("/api/getPosts", {data: {}})
      return data.data
    }
  })

  
 

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

  if(isLoading){
    return(
        <div className='row postCards g-4'>
            <Skeleton variant="rounded" className='col-md-5 col-lg mx-2 rounded-5' sx={{bgcolor: "var(--skeleton-dark)"}} height={300} animation="wave"/>
            <Skeleton variant="rounded" className='col-md-5 col-lg mx-2 rounded-5' sx={{bgcolor: "var(--skeleton-dark)"}} height={300} animation="wave"/>
            <Skeleton variant="rounded" className='col-md-5 col-lg mx-2 rounded-5' sx={{bgcolor: "var(--skeleton-dark)"}} height={300} animation="wave"/>
            <Skeleton variant="rounded" className='col-md-5 col-lg mx-2 rounded-5' sx={{bgcolor: "var(--skeleton-dark)"}} height={300} animation="wave"/>
            <Skeleton variant="rounded" className='col-md-5 col-lg mx-2 rounded-5' sx={{bgcolor: "var(--skeleton-dark)"}} height={300} animation="wave"/>
        </div>
    )
  }

  return (
        <div className='row postCards g-4'>
          
            {data.map((post) => {
              return(
                <div className='card col-md-5 col-lg mx-auto '>
                  <Link href={`/posts/${post.id}`}>
                  <div className='card-body d-flex flex-column align-items-center p-4'>
                    <Image width={60} height={60} src={post.user?.image}/>
                    <h2 className='my-3'><strong>{post.title}</strong></h2>
                    <p className='text-center'>{convertMiliseconds(date.diff(post.dateCreated))}</p>
                    <div className='d-flex mt-3'>
                      <div className='d-flex flex-column align-items-center mx-4'>
                        <HeartFill size={24}/>
                        {post._count?.likes}                  
                      </div>
                      
                      <div className='d-flex flex-column align-items-center mx-4'>
                        <ChatLeftTextFill size={24}/>
                        {post._count?.comments}                  
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
              )
            })}
          
          
        </div>
        
  )
}
