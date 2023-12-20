"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loading from '../components/loading'
axios.defaults.baseURL = process.env.baseURL;

export default function Page() {


    const {data,isError,isLoading} = useQuery({
        queryKey: ["cats"],
        queryFn: async () => {
            const {data} = await axios.get("/api/getCats")
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
    
    <div className='container'>
        {data.map((cat) => {
            return (
                <div key={cat.id}>
                    <a href={`categories/${cat.id}`}>
                        <h1>{cat.id}</h1>
                    </a>
                </div>
            )
        })}
    </div>
  )
}
