import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation';
axios.defaults.baseURL = process.env.baseURL;
import { useSession } from 'next-auth/react';
import MDEditor from '@uiw/react-md-editor';


export default function Newcomment(props) {

    const [data, setData] = useState({})
    const [commnt, setComment] = useState()
    const { data: session, status } = useSession()
    const queryClient = useQueryClient()


    
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
    

    const {mutate: handleSubmit, isPending} = useMutation({
        
        mutationFn: async() => {
                
                await axios.post("/api/addComment", {data: {
                    content: commnt,
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
    <div className='mb-5 pt-5'>
        <h4 className='mb-5'><strong>Add A new Comment</strong></h4>
        <div className='' data-color-mode="dark">
            <MDEditor
                value={commnt}
                onChange={setComment}
            />
            <button className='btn btn-dark align-self-start my-3' onClick={() => {
                handleSubmit();
                sendNotif();
            }} disabled={isPending}>Comment</button>
        </div>
    </div>
  )
}
