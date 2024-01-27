"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSuspenseQuery } from '@tanstack/react-query'
import { TrashFill } from 'react-bootstrap-icons'
import { PencilSquare } from 'react-bootstrap-icons'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import Skeleton from '@mui/material/Skeleton';
import { ConfirmDialog } from 'primereact/confirmdialog'; 
import { confirmDialog } from 'primereact/confirmdialog';
axios.defaults.baseURL = process.env.baseURL;

export default function Users() {

    const queryClient = useQueryClient()


    const {data,isError,isLoading} = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const {data} = await axios.post("/api/getUsers")
            return data.data 
        }
    })

    const {mutate: deleteUser} = useMutation({
      mutationFn: async (id) => {
        await axios.post("/api/deleteUser" ,{id: id})
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['users'])
      }
    })


    const accept = (id) => {
      deleteUser(id)
    };

    const reject = () => {
      return
    };

    const confirm = (id, event) => {
      console.log(id)
      confirmDialog({
          target: event.currentTarget,
          message: 'Are you sure you want to proceed?',
          icon: 'pi pi-exclamation-triangle',
          defaultFocus: 'accept',
          accept: () => accept(id),
          reject
      });
    };

    if(isLoading){
      return(
        "Loading"
      )
    }
    if(isError){
      return(
        "error"
      )
    }



  return (
    
    <div className='container-fluid admin'>
          
          
        <div className='mt-4'>
          <h4 className=''><strong>All Users</strong></h4>

            {isLoading ? 
              <div>
                <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: "var(--skeleton-dark)" }} />
                <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: "var(--skeleton-dark)" }} />
                <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: "var(--skeleton-dark)" }} />
                <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: "var(--skeleton-dark)" }} />
                <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: "var(--skeleton-dark)" }} />
              </div>
            
            :
              
            data.map((user) => {
                return (
                        
                        <div key={user.id} className='d-flex adminList my-2 align-items-center'>
                          <img src={user.image}/>
                          <h5 className='m-0 p-3'>{user.id}</h5>
                          <TrashFill size={20} className='ms-auto me-3 primaryColor' onClick={(event) => confirm(user.id,event)}/>

                        </div>
                        )
                    })}
        </div>
    </div>
  )
}








  
