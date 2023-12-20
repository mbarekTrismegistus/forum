"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loading from '@/app/components/loading'
axios.defaults.baseURL = process.env.baseURL;

export default function Page({params}) {

    
    const {data,isError,isLoading} = useQuery({
        queryKey: ["cat"],
        queryFn: async () => {
            const {data} = await axios.post("/api/getAcat",  { params: params.catId })
            console.log(data)
            return data.data 
        }
    })

    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return "error"
    }

  return (
    
    <div className='container'>
        
                <div>
                    <a href={`categories/${data.id}`}>
                        {data.id}
                    </a>
                    {data.posts.map((post) => {
                        return (
                            <div key={data.id}>
                                <a href={`/posts/${post.id}`}>{post.title}</a>

                            </div>
                        )
                    })}
                </div>
            
        
    </div>
  )
}
