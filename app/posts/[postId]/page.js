"use client"

import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
axios.defaults.baseURL = process.env.baseURL;
import { useSession } from 'next-auth/react';
import Loading from '@/app/components/loading';
import Comments from './comments/comments';
import { useRouter } from 'next/navigation';


export default function SinglePost({ params }) {

    const {data: session, status} = useSession()

    let router = useRouter()
    
    const {data, isError, isLoading} = useQuery({
        queryKey: ["post"],
        queryFn: async () => {
          const { data } = await axios.post("/api/getAPost", { id: Number(params.postId) })
          return data.data
        }
    })
    
    const {mutate: handleDelete} = useMutation({
        mutationFn: async(id) => {
          await axios.post("/api/deletePost", {data: id})
        },
        onSuccess: () => {
            router.push("/posts")
        }
        
        
      })

    function handleUpdate(){
        router.push(`updatePost/${params.postId}`)
    }

    

    if(status === "loading"){
        return <Loading/>
    }

    if(session){
        
        if(isLoading) return <Loading/>
        if(isError) return <div>Error happened</div>
        return (
            <div className='container'>
                
                    
                        <>
                            <h1>{data.title}</h1>
                            <p>
                                {data.content}
                            </p>
                                {status == "authenticated" ? 
                                session.id == data.userId ?
                                    <>
                                        <button className='btn btn-danger me-3' onClick={() => {handleDelete({id: data.id})}}>Delete</button>
                                        <button className='btn btn-primary' onClick={() => {handleUpdate(data.id)}}>Update</button>
                                    </>
                                : ""
                                : ""
                                }
                        </>
                    
                
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
