"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { TrashFill } from 'react-bootstrap-icons'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import Skeleton from '@mui/material/Skeleton';
axios.defaults.baseURL = process.env.baseURL;

export default function Posts() {

    const queryClient = useQueryClient()


    const {data, isError, isLoading} = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const {data} = await axios.post("/api/getAllPosts")
            return data.data 
        }
    })

    const {mutate: deletePost} = useMutation({
      mutationFn: async (id) => {

        await axios.post("/api/deletePost" ,{data: {id: id}})
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['posts'])
      }
    })
   
    if(isError){
      return(
        "error"
      )
    }


  return (
    
    <div className='container-fluid'>

        <div className='mt-4'>
          <h4 className=''><strong>All Posts</strong></h4>
          {isLoading ? 
          
            <div>
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: '#281c38' }} />
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: '#281c38' }} />
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: '#281c38' }} />
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: '#281c38' }} />
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: '#281c38' }} />
            </div>

            :

            data.map((post) => {
              return ( 
                      <div key={post.id} className='d-flex adminList my-2 align-items-center'>
                        <h5 className='m-0 p-3'>{post.title}</h5>
                        <TrashFill size={20} className='ms-auto primaryColor' onClick={() => deletePost(post.id)}/>
                      </div>
                      )
                  })

          }
        </div>
    </div>
  )
}








  
