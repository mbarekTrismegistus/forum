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
import { ConfirmDialog } from 'primereact/confirmdialog'; 
import { confirmDialog } from 'primereact/confirmdialog';
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

    const accept = (id) => {
      deleteCat(id)
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

    if(isError){
      return(
        "error"
      )
    }


  return (
    
    <div className='container-fluid'>
        <div className='mt-4'>
          <div className='d-flex'> 
            <h4 className=''><strong>All Categories</strong></h4>

              <button className='btn btn-primary ms-auto'>Add Categorie</button>

          </div>

          {isLoading ? 
            
            <div>
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: "var(--skeleton-dark)" }} />
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: "var(--skeleton-dark)" }} />
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: "var(--skeleton-dark)" }} />
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: "var(--skeleton-dark)" }} />
              <Skeleton variant="text" sx={{ fontSize: '50px', bgcolor: "var(--skeleton-dark)" }} />
            </div>

          :

          data.map((cat) => {
            return (
                    
                    <div key={cat.id} className='d-flex adminList my-2 align-items-center'>
                      <img src={cat.image}/>
                      <h5 className='m-0 p-4'>{cat.id}</h5>
                      <TrashFill size={20} className='ms-auto primaryColor' onClick={(event) => confirm(cat.id,event)}/>
                      <Link href={`/admin/${cat.id}`} className='ms-2 me-3 align-items-center d-flex'>
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








  