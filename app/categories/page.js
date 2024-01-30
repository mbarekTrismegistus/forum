"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Categorie from './components/Categorie'
import { usePathname } from 'next/navigation'
import { Breadcrumbs } from '@mui/material'
import Link from 'next/link'
import Loading from '../components/loading'
axios.defaults.baseURL = process.env.baseURL;

export default function Page() {


    const {data,isError,isLoading} = useQuery({
        queryKey: ["cats"],
        queryFn: async () => {
            const {data} = await axios.post("/api/getCats")
            return data.data 
        }
    })


    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return "error"
    }

  return (
    
    <div className='me-5 main mt-5'>
        <h1 className='mb-4 font5'>Browse Our Categories !</h1>
        <div className='row g-5'>
            {data.map((cat) => {
                return (
                        <Categorie cat={cat} key={cat.id}/>
                        )
                    })}
        </div>
    </div>
  )
}
