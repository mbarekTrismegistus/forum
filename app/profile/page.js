"use client"

import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Person } from 'react-bootstrap-icons';
import { ClockHistory } from 'react-bootstrap-icons';
import { FileEarmarkPostFill } from 'react-bootstrap-icons';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@mui/material';
import Posts from '../posts/components/posts';
import Settings from './settings';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function Profile({ searchParams }) {

    const {data: session} = useSession()

    const {data, isError, isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await axios.post("/api/getUser", {id: searchParams.id})
            return data.data
        }
        
    })

    

  return (
    <div className='main me-5'>
        <div className='profileHead p-5 pt-3'>
            <div className='d-flex info'>
                {isLoading ? <Skeleton variant='circular' animation="wave" width={150} height={150} sx={{bgcolor: "#281c38"}}/> : <img src={data?.image} width={150} height={150}/>}
                <div className='ms-3 align-self-center'>
                    <h1><strong className=''>{isLoading ? "..." : data.id}</strong></h1>
                    <p>Member since {isLoading ? "..." : new Date(data.dateJoined).toDateString()}</p>
                </div>
            </div>
            <Tabs
                defaultActiveKey="about"
                id="uncontrolled-tab-example"
                className="mt-5 mb-3 p-2 rounded-5"
                fill
            >
                <Tab eventKey="about" title="about">
                    <div className='profileBody p-5 ps-0'>
                        <h1 className='mb-5'><strong>About</strong></h1>
                        <div className='row mb-5'>
                            <div className='ms-4 col-md'>
                                <div className='d-flex'>
                                    <div className='icon'>
                                        <Person size={45} className='me-3 primaryColor'/>
                                    </div>
                                    
                                    <div>
                                        <h3><strong>{isLoading ? "..." : data.id}</strong></h3>
                                        <p>{isLoading ? "..." : data.firstName + " " + data.lastName}</p>
                                    </div>

                                </div>
                            </div>
                            <div className='ms-4 col-md'>
                                <div className='d-flex'>
                                    <div className='icon'>
                                        <ClockHistory size={45} className='me-3 primaryColor'/>
                                    </div>
                                    <div>
                                        <h3><strong>Member Since</strong></h3>
                                        <p>{isLoading ? "..." : new Date(data.dateJoined).toDateString()}</p>
                                    </div>

                                </div>
                            
                                

                            </div>
                            <div className='ms-4 col-md'>
                                <div className='d-flex'>
                                    <div className='icon'>
                                        <FileEarmarkPostFill size={45} className='me-3 primaryColor'/>
                                    </div>
                                    <div>
                                        <h3><strong>Totale Posts</strong></h3>
                                        <h3><strong>{isLoading ? "..." : data._count.posts}</strong></h3>
                                    </div>

                                </div>
                            
                                

                            </div>
                        </div>
                        <Posts id={searchParams.id}/>
                    
                    </div>
                </Tab>
                {session?.id === data?.id ? 
                <Tab eventKey="setting" title="setting">
                    <Settings user={isLoading ? "" : data}/>
                </Tab>
                :
                ""
                }
                
            </Tabs>
            
        </div>
        
        
    </div>
  )
}
