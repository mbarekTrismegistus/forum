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


    
    const {mutate: sendNotif} = useMutation({
        
        mutationFn: async() => {
            if(!(session.id === props.post.userId)){
                await axios.post("/api/addNotif", {data: {
                    content: `${session.id} Commented on your post`,
                    notifierId: session.id,
                    postId: Number(props.post.id),
                    notifiedId: props.post.userId
                }})
            }
        },
        
    })
    

    const {mutate: handleSubmit} = useMutation({
        
        mutationFn: async() => {
                
                await axios.post("/api/addComment", {data: {
                    ...data,
                    userId: session.id,
                    postId: Number(props.post.id)}}
                )
                
        },
        onSuccess: () => {
            
            queryClient.invalidateQueries(['comments'])
            setData({
                ...data,
                content: ""
            })

            
        }
        
    })



  return (
    <div className='newComment mb-5'>

        <div className='d-flex'>
            <textarea onChange={handleChange} placeholder='Enter your comment' className='form-control' name='content' value={data.content}></textarea>
            <button className='btn btn-dark align-self-center ms-3' onClick={() => {
                handleSubmit();
                sendNotif();
            }}>Comment</button>
        </div>
    </div>
  )
}
