"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loading from '@/app/loading'
import { TrashFill } from 'react-bootstrap-icons'
import { PencilSquare } from 'react-bootstrap-icons'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
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

    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return "error"
    }

  return (
    
    <div className='container-fluid admin'>
        <div className=''>
            {data.map((cat) => {
                return (
                        <div key={cat.id} className='d-flex'>
                          <p>{cat.id}</p>
                          <TrashFill className='ms-auto' onClick={() => deleteCat(cat.id)}/>
                          <Link href={`/admin/${cat.id}`}>
                            <PencilSquare/>
                          </Link>
                          
                          
                        </div>
                        )
                    })}
        </div>
    </div>
  )
}








  