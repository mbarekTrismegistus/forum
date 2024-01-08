"use client"

import axios from 'axios'
import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Loading from '@/app/components/loading';
import { useMutation } from '@tanstack/react-query';
import { Heart } from 'react-bootstrap-icons';
import { ChatLeftText } from 'react-bootstrap-icons';
import Image from 'next/image';
import Link from 'next/link';
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
            <div className='post my-4 mx-auto' key={post.id}>
              <div className='post-info d-flex align-items-start'>
                <Image src={post.user.image} width={60} height={60} className='me-3'/>
                <div key={post.id} className='postHeader'>
                  
                    <h1>{post.title}</h1>
                  
                  <p>{post.content}</p>
                  <Link href={`/posts/${post.id}`}>
                    <button className='btn btn-outline-light postBtn my-3'>See More</button>
                  </Link>
                </div>
                <div className='ms-auto me-4 d-flex align-self-center'>
                  <div className='my-4 d-flex flex-column align-items-center me-5'>
                    <Heart className='' size={28}/>{post._count.comments}
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
