"use client"


import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Link from 'next/link'
import { Skeleton } from '@mui/material'



export default function LatestUsers() {

 

  const {data, isError, isLoading} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      let {data} = await axios.post("/api/getUsers", {take: 5})
      return data.data
    }
  })

  
  if(isLoading){
    return(
        <div className='g-4'>
            <Skeleton variant="rounded" className='w-100 my-2 rounded-4' sx={{bgcolor: "var(--skeleton-dark)"}} height={70} animation="wave"/>
            <Skeleton variant="rounded" className='w-100 my-2 rounded-4' sx={{bgcolor: "var(--skeleton-dark)"}} height={70} animation="wave"/>
            <Skeleton variant="rounded" className='w-100 my-2 rounded-4' sx={{bgcolor: "var(--skeleton-dark)"}} height={70} animation="wave"/>
            <Skeleton variant="rounded" className='w-100 my-2 rounded-4' sx={{bgcolor: "var(--skeleton-dark)"}} height={70} animation="wave"/>
            <Skeleton variant="rounded" className='w-100 my-2 rounded-4' sx={{bgcolor: "var(--skeleton-dark)"}} height={70} animation="wave"/>
        </div>
    )
  }

  

  return (
        <div className='row g-4'>
          
            {data.map((user) => {
              return(
                <div className='mx-auto userCards'>
                  <Link href={`/profile?id=${user.id}`}>
                  <div className='p-2 d-flex align-items-center'>
                    <img width={60} height={60} src={user.image} className='me-3'/>
                    <h2 className='my-3'><strong>{user.id}</strong></h2>
                    
                  </div>
                  </Link>
                </div>
              )
            })}
          
          
        </div>
        
  )
}
