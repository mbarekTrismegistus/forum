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

    const {mutate: deleteCat} = useMutation({
      mutationFn: async (id) => {
        await axios.post("/api/deleteUser" ,{id: id})
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['users'])
      }
    })

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
                          <TrashFill size={20} className='ms-auto primaryColor' onClick={() => deleteCat(user.id)}/>
                          <Link href={`/admin/${user.id}`} className='ms-2 align-items-center d-flex'>
                            <PencilSquare size={20} className='secondaryColor'/>
                          </Link>
                          
                          
                        </div>
                        )
                    })}
        </div>
    </div>
  )
}








  
