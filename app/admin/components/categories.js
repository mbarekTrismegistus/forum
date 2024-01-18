"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { TrashFill } from 'react-bootstrap-icons'
import { PencilSquare } from 'react-bootstrap-icons'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { Skeleton } from '@mui/material'
import Link from 'next/link'
axios.defaults.baseURL = process.env.baseURL;

export default function Page() {

    const queryClient = useQueryClient()


    const {data,isError,isLoading} = useQuery({
        queryKey: ["cats"],
        queryFn: async () => {
            const {data} = await axios.post("/api/getCats")
            return data.data 
        }
    })

    const {mutate: deleteCat} = useMutation({
      mutationFn: async (id) => {
        await axios.post("/api/deleteCat" ,{id: id})
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['cats'])
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
          <h4 className=''><strong>All Categories</strong></h4>

          {isLoading ? 
            
            <div>
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: '#281c38' }} />
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: '#281c38' }} />
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: '#281c38' }} />
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: '#281c38' }} />
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: '#281c38' }} />
            </div>

          :

          data.map((cat) => {
            return (
                    
                    <div key={cat.id} className='d-flex adminList my-2 align-items-center'>
                      <img src={cat.image}/>
                      <h5 className='m-0 p-4'>{cat.id}</h5>
                      <TrashFill size={20} className='ms-auto primaryColor' onClick={() => deleteCat(cat.id)}/>
                      <Link href={`/admin/${cat.id}`} className='ms-2 align-items-center d-flex'>
                        <PencilSquare size={20} className='secondaryColor'/>
                      </Link>
                      
                      
                    </div>
                    )
                })

          }
            
        </div>
    </div>
  )
}








  