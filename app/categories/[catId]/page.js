"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import Posts from '@/app/posts/components/posts'
import { PlusCircle } from 'react-bootstrap-icons'
import { useSession } from 'next-auth/react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation'


axios.defaults.baseURL = process.env.baseURL;

export default function SingleCat({params, searchParams}) {

  const router = useRouter()

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    router.push(`/categories/${params.catId}/?page=${value}`)

    
  };

  

  const {data: session, status} = useSession()



  return (
    
    <div className='container'>
                <div>
                  <div className='d-flex align-items-center'>
                    <Link href={`/newPost?cat=${params.catId}`} className='ms-auto'>
                      <PlusCircle className='' size={28}/>
                    </Link>
                  </div>
                  <div className='d-flex flex-column'>
                    <Stack spacing={2} className=' align-self-center'>
                      <Pagination size='large' count={10} page={page} onChange={handleChange} variant="outlined" color="secondary" />
                    </Stack>
                    <Posts cat={params.catId} user={session?.id} page={searchParams.page}/>
                  </div>
                </div>
    </div>
  )
}
