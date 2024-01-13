"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loading from '../components/loading'
import Categorie from './components/Categorie'
axios.defaults.baseURL = process.env.baseURL;

export default function Page() {


    const {data,isError,isLoading} = useQuery({
        queryKey: ["cats"],
        queryFn: async () => {
            const {data} = await axios.post("/api/getCats")
            console.log(data.data)
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
    
    <div className='container mt-5'>
        <h1 className='mb-5'>Browse Our Categories !</h1>
        <div className='row'>
            {data.map((cat) => {
                return (
                        <Categorie cat={cat} key={cat.id}/>
                        )
                    })}
        </div>
    </div>
  )
}
