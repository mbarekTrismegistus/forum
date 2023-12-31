"use client"

import axios from 'axios'
import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Loading from '@/app/components/loading';
import { useMutation } from '@tanstack/react-query';
axios.defaults.baseURL = process.env.baseURL;


export default function Posts(props) {

    const session = useSession()
    
    const queryClient = useQueryClient()
    
    const {data, isError, isLoading} = useQuery({
      queryKey: ["posts"],
      queryFn: async () => {
        const { data } = await axios.post("/api/getPosts")
        return data.data
      }
    })

    
    
    

    

  

    if(isLoading) return <Loading/>
    if(isError) return <div>Error happened</div>

    
      return (
        data.map(post => {
          return (
            <div key={post.id} className='post my-4'>
              <a href={`posts/${post.id}`}>
                <h1>{post.title}</h1>
              </a>
            </div>
            
          )
        })
      )
      
   

  
}
