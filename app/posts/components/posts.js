"use client"

import axios from 'axios'
import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'; 
import { ChatLeftText, HeartFill } from 'react-bootstrap-icons';
import Image from 'next/image';
import Link from 'next/link';
import Likes from '@/app/components/likes';
import { useSession } from 'next-auth/react';



axios.defaults.baseURL = process.env.baseURL;


export default function Posts(props) {
    
    const {data: session, status} = useSession()

    const {data, isError, isLoading} = useQuery({
      queryKey: ["posts", props.page],
      queryFn: async () => {
        const { data } = await axios.post("/api/getPosts", {data: {
          cat: props.cat,
          user: props.user,
          skip: props.page === undefined ? 5 : (Number(props.page) * 0.5 * 10),
          take: props.take
        }})
        return data.data
      }
    })

      if(isLoading){
        return(
          <div className='post mt-5 d-flex flex-column align-items-center'>
            
            <l-trefoil
              size="40"
              stroke="4"
              stroke-length="0.15"
              bg-opacity="0.1"
              speed="1.4"
              color="white" 
            ></l-trefoil>
            
          </div>
        )
      }
      if(isError) return <div>Error happened</div>
  
      
        return (
          data.map(post => {
            return (
                <div className='post my-2 mx-auto' key={post.id} >
                  <div className='post-info d-md-flex align-items-center px-3 py-2'>
                    <Image src={post.user.image} width={60} height={60} className='me-3 flex-shrink-0'/>
                    <div key={post.id} className='postHeader'>
                      <Link href={`/posts/${post.id}`}>
                        <h3>{post.title}</h3>
                        
                      </Link>
                    </div>
                    <div className='ms-auto me-4 d-flex align-self-center'>
                      <div className='my-4 d-flex flex-column align-items-center me-5'>
                        {session ? 
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
                        :
                          <HeartFill size={28}/>
                        }
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
