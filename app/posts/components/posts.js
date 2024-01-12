"use client"

import axios from 'axios'
import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '@/app/components/loading';
import { ChatLeftText, HeartFill } from 'react-bootstrap-icons';
import Image from 'next/image';
import Link from 'next/link';
import Likes from '@/app/components/likes';
import { useSession } from 'next-auth/react';

axios.defaults.baseURL = process.env.baseURL;


export default function Posts(props) {
    
    const {data: session, status} = useSession()

    const {data, isError, isLoading} = useQuery({
      queryKey: ["posts"],
      queryFn: async () => {
        const { data } = await axios.post("/api/getPosts", {data: {
          cat: props.cat,
          user: props.user
        }})

        return data.data
      }
    })

      if(isLoading) return <Loading/>
      if(isError) return <div>Error happened</div>
  
      
        return (
          data.map(post => {
            return (
              <div className='post my-4 mx-auto' key={post.id}>
                <div className='post-info d-md-flex align-items-start'>
                  <Image src={post.user.image} width={60} height={60} className='me-3'/>
                  <div key={post.id} className='postHeader'>
                    
                      <h3>{post.title}</h3>
                    
                    <p>{post.content.length > 100 ? post.content.replace(/^(.{100}[^\s]*).*/, "$1") + "..." : post.content}</p>
                    <Link href={`/posts/${post.id}`}>
                      <button className='btn btn-outline-light postBtn my-3'>See More</button>
                    </Link>
                  </div>
                  <div className='ms-auto me-4 d-flex align-self-center'>
                    <div className='my-4 d-flex flex-column align-items-center me-5'>
                     <Likes 
                        color={post.likes.length > 0 ? post.likes.filter(e => e.userId === props.user).length > 0 ? "red" : "white" : "white"}
                        click={session ? post.likes.length > 0 && post.likes.filter(e => e.userId === props.user).length > 0 ? "rmLike" : "addLike" : "signin"}
                        id={post.likes.filter(e => e.userId === props.user)[0]?.id}
                        user={props.user}
                        postId={post.id}
                        post={post.id}
                        owner={post.userId}
                        item={"post"}
                        
                      />
                      {post._count.likes}
                    </div>
                    <div className='my-4 d-flex flex-column align-items-center'>
                      <ChatLeftText className='' size={28}/>{post._count.comments}
                    </div>
                  </div>
                  
                </div>
                
              </div>
              
            )
          })
        )

    
      
   

  
}