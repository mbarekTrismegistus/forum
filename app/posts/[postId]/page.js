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
          console.log(data.data)
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

        if(isLoading) return <Loading/>
        if(isError) return <div>Error happened</div>
        return (
            <div className='container my-5 col-10'>
                        <div className='d-flex my-5'>
                            <div>
                                <h1>{data.title}</h1>
                                <p>Posted by {data.userId} at {new Date(data.dateCreated).toDateString()}</p>
                                <p className='mt-4 px-4'>
                                    {data.content}
                                </p>
                            </div>
                            <div className='ms-auto'>
                                {status == "authenticated" ? 
                                session.id == data.userId ?
                                    <div className='d-flex flex-column'>
                                        <button className='btn btn-danger my-2' onClick={() => {handleDelete({id: data.id})}}>Delete</button>
                                        <button className='btn btn-primary my-2' onClick={() => {handleUpdate(data.id)}}>Update</button>
                                    </div>
                                : ""
                                : ""
                                }
                            </div>
                        </div>
                <Comments id={params.postId} user={session?.id}/>
            </div>
        )
    
    
    
}
