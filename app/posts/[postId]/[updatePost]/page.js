"use client"

import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
axios.defaults.baseURL = process.env.baseURL;
import { useRouter } from 'next/navigation';
import MDEditor from '@uiw/react-md-editor';
import Loading from '@/app/components/loading';

export default function Page({params}) {



    const {data, isError, isLoading} = useQuery({
        queryKey: ["post"],
        queryFn: async () => {
          const { data } = await axios.post("/api/getAPost", { id: Number(params.updatePost) })
          return data.data
        }
    })


    let [postdata, setData] = useState(data?.content)
    let [title, setTitle] = useState(data?.title)
    
    const router = useRouter()

    const {mutate: handleSubmit, isPending} = useMutation({
        
        mutationFn: async() => {
            await axios.post("/api/updatePost", {data: {
                id: Number(params.updatePost),
                title: title,
                content: postdata
            }})
        },
        onSuccess: () => {
            router.back()
        },
        
    })


    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return "error :("
    }
        return (
            <div className='container main me-4 mt-5 newPost'>
                <form>
                    <label className='form-label mt-4'><h4><strong>Title</strong></h4></label>
                    <input type='text' onChange={(e) => setTitle(e.target.value)} className='form-control mb-4' defaultValue={title}/>
                    <label className='form-label'><h4><strong>Content</strong></h4></label>
                    <MDEditor
                        value={postdata}
                        onChange={setData}
                    />
                    
                    <button onClick={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }} className='btn btn-dark' disabled={isPending}>Update Post</button>            
                    
                </form>
            </div>
        )
    }


