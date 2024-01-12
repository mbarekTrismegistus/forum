"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loading from '@/app/components/loading'
import Link from 'next/link'
import Posts from '@/app/posts/components/posts'
import { useSession } from 'next-auth/react'


axios.defaults.baseURL = process.env.baseURL;

export default function SingleCat({params}) {


  const {data: session, status} = useSession()

  if(status === "loading"){
    return "loading ..."
  }

  return (
    
    <div className='container mt-5'>
                <div>
                    <h1 className='mb-5'>
                       Discover All about {params.catId}
                    </h1>
                    <Posts cat={params.catId} user={session?.id}/>
                </div>
    </div>
  )
}
