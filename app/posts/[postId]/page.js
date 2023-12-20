"use client"

import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
axios.defaults.baseURL = process.env.baseURL;
import { useSession } from 'next-auth/react';
import Loading from '@/app/components/loading';
import Comments from './comments/comments';


export default function Page({ params }) {

    const {data: session, status} = useSession()
    
    const {data, isError, isLoading} = useQuery({
        queryKey: ["post"],
        queryFn: async () => {
          const { data } = await axios.post("/api/getAPost", { id: Number(params.postId) })
          return data.data
        }
    })
    console.log(data)
    
    if(status === "loading"){
        return <Loading/>
    }

    if(session){
        if(isLoading) return <Loading/>
        if(isError) return <div>Error happened</div>
        return (
            <div className='container'>
                {data.map(post => {
                    return (
                        <>
                            <h1>{post.title}</h1>
                            <p>
                                {post.content}
                            </p>
                        </>
                    )
                })}
                <hr/>
                <Comments id={params.postId}/>
            </div>
        )
    }
    else{
        return (
            <p>sign in first</p>
        )
    }
    
}
