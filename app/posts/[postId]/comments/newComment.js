import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation';
axios.defaults.baseURL = process.env.baseURL;
import { useSession } from 'next-auth/react';


export default function Newcomment(props) {

    const [data, setData] = useState({})
    const { data: session, status } = useSession()
    const queryClient = useQueryClient()

    function handleChange(e){
        
        setData(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
        
        
    }
    

    const {mutate: handleSubmit} = useMutation({
        
        mutationFn: async() => await axios.post("api/addComment", {data: {
            ...data,
            userId: session.id,
            postId: Number(props.postId)}}),
        onSuccess: () => {
            queryClient.invalidateQueries(['comments'])
            setData({
                ...data,
                content: ""
            })

            
        }
        
    })



  return (
    <div>
        <label>Content</label>
        <textarea onChange={handleChange} name='content' value={data.content}></textarea>
        <button className='btn btn-dark' onClick={handleSubmit}>Comment</button>
    </div>
  )
}
