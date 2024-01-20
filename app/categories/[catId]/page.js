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

  const {data, isError, isLoading} = useQuery({
    queryKey: ['countpost'],
    queryFn: async () => {
      const {data} = await axios.post("/api/postCount" ,{ id:  params.catId})
      return (Math.ceil(data.data / 5))
    }
  })

  const router = useRouter()

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    router.push(`/categories/${params.catId}/?page=${value}`)

    
  };

  

  const {data: session, status} = useSession()



  return (
    
    <div className='container mt-5'>
                <div>
                  <div className='d-flex align-items-center'>
                    <Link href={`/newPost?cat=${params.catId}`} className='ms-auto'>
                      <button className="button d-flex">
                        <PlusCircle size={25} className='me-2 m-0'></PlusCircle>
                        New Post
                      </button>
                    </Link>
                  </div>
                  <div className='d-flex flex-column'>
                    <Stack spacing={2} className='mb-5 align-self-center'>
                      <Pagination size='large' count={data} page={page} onChange={handleChange} variant="outlined" color="secondary" />
                    </Stack>
                    <Posts cat={params.catId} user={session?.id} page={searchParams.page}/>
                  </div>
                </div>
    </div>
  )
}
