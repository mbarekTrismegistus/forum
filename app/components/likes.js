import React, { useEffect, useState } from 'react'
import { HeartFill } from 'react-bootstrap-icons'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'
import axios from 'axios'



export default function Likes(props) {

    const queryClient = useQueryClient()

    const [color, setColor] = useState(props.color)

    useEffect(() => {
      setColor(props.color)
    },[props.color])

    const {mutate: sendNotif} = useMutation({
        
      mutationFn: async() => {
          if(!(props.user === props.owner)){
            await axios.post("/api/addNotif", {data: {
                content: `${props.user} Liked your ${props.item}`,
                notifierId: props.user,
                postId: Number(props.postId),
                notifiedId: props.owner
            }}) 
          }
          
      }
      
    })

    const {mutate: toggleLike, isPending} = useMutation({
        mutationFn: async () => {
          if(props.click === "addLike"){

                await axios.post("/api/addLike", {data: {
                  userId: props.user,
                  postId: props.post,
                  commentId: props.comment
                }})
                sendNotif()

          }
          else if(props.click === "rmLike"){
            await axios.post("/api/rmLike", {data: {
              id: props.id
            }})
          }
          else{
            signIn()
          }
        },
        onSuccess: () => {
          queryClient.invalidateQueries(['posts','post'])
          setColor(color === "red" ? "white" : "red")

          
        }
    })

  return (
    <div className='ms-auto'>
      {isPending ? 
        <HeartFill size={24} color={props.color === "red" ? "white" : "red"}/>
      : <HeartFill size={24} color={color} onClick={toggleLike} cursor={"pointer"}/>}
    </div>
  )
}
