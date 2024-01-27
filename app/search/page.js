"use client"

import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/app/components/loading'
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Link from 'next/link'
import { HeartFill } from 'react-bootstrap-icons'
import { ChatLeftTextFill } from 'react-bootstrap-icons'
import Image from 'next/image'



export default function Page(params) {


    const {data, isLoading, isError} = useQuery({
        queryKey: ["search", params.searchParams.search],
        queryFn: async () => {
            const { data } = await axios.post("/api/search", {query: params.searchParams.search})
            return data.data
            
        }
    })



    if(isLoading){
        return <Loading/>
    }

  return (
    <div className='main pt-5 m-0'>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <div className='row gx-0'>
                <div className='pe-5 col-sm-3'>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                    <Nav.Link eventKey="first">Posts</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="second">Users</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="third">Categories</Nav.Link>
                    </Nav.Item>
                </Nav>
                </div>
                <div className='col-sm-9'>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                        <div className='pe-4'>
                            <h1 className='font5'>Posts</h1>
                            {data.posts.length !== 0 ? "" : "no posts found !"}
                            {data.posts.map((post) => {
                                return(
                                    <div className='post my-2 mx-auto' key={post.id} >
                                        <div className='post-info d-md-flex align-items-center px-3'>
                                            <Image src={post.user.image} width={60} height={60} className='me-3'/>
                                            <div key={post.id} className='postHeader'>
                                            <Link href={`/posts/${post.id}`}>
                                                <h3>{post.title}</h3>
                                            </Link>
                                            </div>
                                            <div className='ms-auto me-4 d-flex align-self-center'>
                                            <div className='my-4 d-flex flex-column align-items-center me-5'>
                                                <HeartFill size={28}/>{post._count.likes}
                                            </div>
                                            <div className='my-4 d-flex flex-column align-items-center'>
                                                <ChatLeftTextFill className='' size={28}/>{post._count.comments}
                                            </div>
                                            </div>
                    
                                            </div>
                                        
                                        </div>

                                )
                            })}
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        <div>
                            <h1 className='font5'>Users</h1>
                            {data.users.length !== 0 ? "" : "no users found !"}
                            {data.users.map((result) => {
                                return(
                                    <div className='d-flex align-items-center mt-3'>
                                        <img src={result.image} className='user me-3'/>
                                        <h3 key={result.id}><strong>{result.id}</strong></h3>
                                    </div>

                                )
                            })}
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third" className='p-0'>
                        <div className='p-0'>
                            <h1 className='font5'>categories</h1>
                            {data.categories.length !== 0 ? "" : "no categories found !"}
                            {data.categories.map((result) => {
                                return(
                                    <p key={data.categories.id}>{result.id}</p>

                                )
                            })}
                        </div>
                    </Tab.Pane>
                </Tab.Content>
                </div>
            </div>
        </Tab.Container>
        
        
        
    </div>
  )
}
