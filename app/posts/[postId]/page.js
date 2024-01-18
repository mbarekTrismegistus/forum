"use client"

import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
axios.defaults.baseURL = process.env.baseURL;
import { useSession } from 'next-auth/react';
import Comments from './comments/comments';
import { TrashFill } from 'react-bootstrap-icons';
import { PencilSquare } from 'react-bootstrap-icons';
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
        return "loading"
    }


        if(isLoading) return "loading"
        if(isError) return <div>Error happened</div>
        return (
            <div className='container my-5 col-10'>
                        <div className='mt-5 pb-5 singlePost d-flex'>
                            <img src={data.user.image} className='user me-3 mt-3'/>
                            <div className='w-100'>
                                <div className='d-flex'>
                                    <div className='d-flex'>
                                        <div>
                                            <h1><strong>{data.title}</strong></h1>
                                            <p className='primaryColor'>Posted by {data.userId} at {new Date(data.dateCreated).toDateString()}</p>
                                            
                                        </div>
                                    </div>
                                    <div className='ms-auto'>
                                        {status == "authenticated" ? 
                                        session.id == data.userId || session.role === "admin" ?
                                            <div className='d-flex mt-3'>
                                                <TrashFill className='primaryColor me-3' size={24} onClick={() => {handleDelete({id: data.id})}}></TrashFill>
                                                <PencilSquare className='' color='blue' size={24} onClick={() => {handleUpdate(data.id)}}></PencilSquare>
                                            </div>
                                        : ""
                                        : ""
                                        }
                                    </div>
                                </div>
                                <div className='singlePostContent mt-4 mx-auto'>
                                        {data.content}
                                </div>
                            </div>
                        </div>

                <Comments id={params.postId} user={session?.id}/>
            </div>
        )
    
    
    
}
