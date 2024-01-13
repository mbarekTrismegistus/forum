"use client"

import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
axios.defaults.baseURL = process.env.baseURL;
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page({params}) {

    const {data, isError, isFetching} = useQuery({
        queryKey: ["post"],
        queryFn: async () => {
          const { data } = await axios.post("/api/getAPost", { id: Number(params.updatePost) })
          setData(data.data)
          return data.data
        }
    })

    let [postdata, setData] = useState(data?.data)
    
    const router = useRouter()

    const {mutate: handleSubmit} = useMutation({
        
        mutationFn: async() => {
            console.log("hell")
            await axios.post("/api/updatePost", {data: {
                id: Number(params.updatePost),
                title: postdata.title,
                content: postdata.content,
                categorieId: postdata.categorieId
            }})
        },
        onSuccess: () => {
            router.back()
        },
        
    })


    function handleChange(event){
        
        setData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
        
    }
    if(isFetching){
        return "...loading"
    }
    else if(isError){
        return "error :("
    }
    else{

        return (
          <div>
              <form>
                  <label className='form-label'>Enter Title</label>
                  <input type='text' onChange={handleChange} name='title' className='form-control' value={postdata.title}/>
                  <label className='form-label'>Enter thread</label>
                  <input type='text' onChange={handleChange} name='categorieId' className='form-control' value={postdata.categorieId}/>
                  
                  <textarea onChange={handleChange} name='content' value={postdata.content}></textarea>
                  
                  <button onClick={(e) => {
                      e.preventDefault()
                      handleSubmit()
                  }} className='btn btn-dark'>Update Post</button>            
                  
              </form>
          </div>
        )
    }

}
