"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { TrashFill } from 'react-bootstrap-icons'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import Skeleton from '@mui/material/Skeleton';
import { ConfirmDialog } from 'primereact/confirmdialog'; 
import { confirmDialog } from 'primereact/confirmdialog';
        

axios.defaults.baseURL = process.env.baseURL;

export default function Posts(props) {

    const queryClient = useQueryClient()

    const {data, isError, isLoading} = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const {data} = await axios.post("/api/getAllPosts", {id: props.id})
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
    

    const accept = (id) => {
      deletePost(id)
    };

    const reject = () => {
      return
    };

    const confirm = (id, event) => {

      confirmDialog({
          target: event.currentTarget,
          message: 'Are you sure you want to proceed?',
          icon: 'pi pi-exclamation-triangle',
          defaultFocus: 'accept',
          accept: () => accept(id),
          reject
      });
  };
   
    if(isError){
      return(
        "error"
      )
    }


  return (
    
    <div className='container-fluid'>

        <div className='mt-4'>
        <ConfirmDialog className='confirmation'/>
          <h4 className=''><strong>All Posts</strong></h4>
          {isLoading ? 
          
            <div>
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: "var(--skeleton-dark)" }} />
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: "var(--skeleton-dark)" }} />
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: "var(--skeleton-dark)" }} />
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: "var(--skeleton-dark)" }} />
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: "var(--skeleton-dark)" }} />
            </div>

            :

            data.map((post) => {
              return ( 
                      <div key={post.id} className='d-flex adminList my-2 align-items-center'>
                        
                        <h5 className='m-0 p-3'>{post.title}</h5>
                        <TrashFill size={20} className='ms-auto me-3 primaryColor' onClick={(event) => confirm(post.id,event)}/>
                      </div>
                      )
                  })

          }
        </div>
    </div>
  )
}








  
