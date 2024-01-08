"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/app/components/loading'
import { useQueryClient } from '@tanstack/react-query';



export default function Page(params) {


    const {data, isLoading, isError} = useQuery({
        queryKey: ["search"],
        queryFn: async () => {
            const { data } = await axios.post("/api/search", {query: params.searchParams.search})
            console.log(data.data)
            return data.data
            
        }
    })


    if(isLoading){
        return <Loading/>
    }

  return (
    <div>
        <div>
            {data.posts.length !== 0 && <h1>Posts</h1>}
            {data.posts.map((result) => {
                return(
                    <p>{result.title}</p>

                )
            })}
        </div>
        <div>
            {data.users.length !== 0 && <h1>users</h1>}
            {data.users.map((result) => {
                return(
                    <p>{result.id}</p>

                )
            })}
        </div>
        <div>
            {data.categories.length !== 0 && <h1>categories</h1>}
            {data.categories.map((result) => {
                return(
                    <p>{result.id}</p>

                )
            })}
        </div>
    </div>
  )
}
