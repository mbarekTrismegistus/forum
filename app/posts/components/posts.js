"use client"

import axios from 'axios'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import Loading from '@/app/components/loading';
axios.defaults.baseURL = 'http://127.0.0.1:3000';

export default function Posts(props) {

    let content;
    
    const {data, isError, isLoading} = useQuery({
      queryKey: ["posts"],
      queryFn: async () => {
        const { data } = await axios.post("/api/getPosts")
        return data.data
      }
    })

  

    if(isLoading) return <Loading/>
    if(isError) return <div>Error happened</div>

    content = data.map(post => {
      return (
        <div key={post.id} className='post my-4'>
          <a href={`posts/${post.id}`}>
            <h1>{post.title}</h1>
          </a>
        </div>
        
      )
    })
    
    return (
    <div>
        {content}
    </div>
  )
}
