"use client"

import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
axios.defaults.baseURL = process.env.baseURL;
import { useSession } from 'next-auth/react';
import Comments from './comments/comments';
import { ChatLeftTextFill, TrashFill } from 'react-bootstrap-icons';
import { PencilSquare } from 'react-bootstrap-icons';
import { useRouter } from 'next/navigation';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Loading from '@/app/components/loading';
import Likes from '@/app/components/likes';
import { HeartFill } from 'react-bootstrap-icons';

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
            router.refresh()
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
                                                <TrashFill className='secondaryColor me-3' size={24} onClick={() => {handleDelete({id: data.id})}} cursor={"pointer"}></TrashFill>
                                                <PencilSquare className='primaryColor' size={24} onClick={() => {handleUpdate(data.id)}} cursor={"pointer"}></PencilSquare>
                                            </div>
                                        : ""
                                        : ""
                                        }
                                    </div>
                                   
                                </div>
                                   
                                <div className='singlePostContent d-flex mt-4'>
                                    <div className='me-5'>
                                        <Markdown remarkPlugins={remarkGfm}>
                                            {data.content}
                                        </Markdown>

                                    </div>
                                    <div className='ms-auto'>
                                        <div className=''>
                                            {session ? 
                                                <Likes 
                                                    color={data.likes.length > 0 ? data.likes.filter(e => e.userId === session.id).length > 0 ? "red" : "white" : "white"}
                                                    click={session ? data.likes.length > 0 && data.likes.filter(e => e.userId === session.id).length > 0 ? "rmLike" : "addLike" : "signin"}
                                                    id={data.likes.filter(e => e.userId === session.id)[0]?.id}
                                                    user={session.id}
                                                    postId={data.id}
                                                    post={data.id}
                                                    owner={data.userId}
                                                    item={"post"}
                                                    
                                                />
                                                :
                                                <HeartFill size={28}/>
                                                }
                                                <div className='ms-2'>
                                                    {data._count.likes}
                                                </div>
                                        </div>
                                        <div className='mt-3'>
                                            <ChatLeftTextFill size={28}/>
                                            <div className='ms-2'>
                                                {data._count.comments}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                <Comments id={params.postId} user={session?.id}/>
            </div>
        )
    
    
    
}
