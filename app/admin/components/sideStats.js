import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FilePost } from 'react-bootstrap-icons'
import { TagFill } from 'react-bootstrap-icons'
import { ChatDotsFill } from 'react-bootstrap-icons'
import { PeopleFill } from 'react-bootstrap-icons'
import { Hearts } from 'react-bootstrap-icons'
import { FunnelFill } from 'react-bootstrap-icons'



export default function stats(props) {



    const {data, isLoading, isError, isPending} = useQuery({
        queryKey: [props.period,"stats"],
        queryFn: async () => {
            let data = await axios.post("/api/getStats", {period : props.period})
            return data.data.data
        }
    })

    return (
        <div className='container-fluid Stats my-5 pe-3'>
            
            <div className='row my-4 text-white gy-3'>
                <div className='col stat mx-2 d-flex'>
                    <div className='icon'>
                        <FilePost size={40} className='me-3 primaryColor' color='#d20f39'/>
                    </div>
                    <div>
                        <h5>
                            <strong>
                                Totale Posts                      
                            </strong>
                        </h5>
                        <h1>
                        <strong>
                            {isLoading ? 
                            <l-ping
                                size='45'
                                speed='2'
                                color='white'
                            ></l-ping>
                            : data?.posts} 
                        </strong>                      
                        </h1>
                    </div>
                    
                </div>
                <div className='col stat mx-2 d-flex'>
                    <div className='icon'>
                        <TagFill size={40} className='me-3 primaryColor' color='#d20f39'/>
                    </div>
                    <div>
                        <h5>
                            <strong>
                                Totale Categories                      
                            </strong>
                        </h5>
                        <h1>
                            <strong>
                                {isLoading ? 
                                    <l-ping
                                        size='45'
                                        speed='2'
                                        color='white'
                                    ></l-ping>
                                : data?.categories}  
                            </strong>
                                              
                        </h1>
                    </div>
                    
                </div>
                <div className='col stat mx-2 d-flex'>
                    <div className='icon'>
                        <ChatDotsFill size={40} className='me-3 primaryColor' color='#d20f39'/>
                    </div>
                    <div>
                        <h5>
                            <strong>
                                Totale Comments                      
                            </strong>
                        </h5>
                        <h1>
                            <strong>
                                {isLoading ? <l-ping
                                size='45'
                                speed='2'
                                color='white'
                            ></l-ping> : data?.comments}  
                            </strong>
                                             
                        </h1>
                    </div>
                    
                </div>
                <div className='col stat mx-2 d-flex'>
                    <div className='icon'>
                        <PeopleFill size={40} className='me-3 primaryColor' color='#d20f39'/>
                    </div>
                    <div>
                        <h5>
                            <strong>
                                Totale Users                      
                            </strong>
                        </h5>
                        <h1>
                            <strong>
                                {isLoading ? <l-ping
                                size='45'
                                speed='2'
                                color='white'
                            ></l-ping> : data?.users}
                            </strong>
                                                
                        </h1>
                    </div>
                    
                </div>
                <div className='col stat mx-2 d-flex'>
                    <div className='icon'>
                        <Hearts size={40} className='me-3 primaryColor' color='#d20f39'/>
                    </div>
                    <div>
                        <h5>
                            <strong>
                                Totale Likes                      
                            </strong>
                        </h5>
                        <h1>
                            <strong>
                                {isLoading ? <l-ping
                                size='45'
                                speed='2'
                                color='white'
                            ></l-ping> : data?.likes} 
                            </strong>
                                               
                        </h1>
                    </div>
                    
                </div>
            </div>
            
            
            
            
        </div>
  )
}
