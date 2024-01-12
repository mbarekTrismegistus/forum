import React from 'react'
import { HeartFill } from 'react-bootstrap-icons'
import { useMutation } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { Spinner } from 'react-bootstrap'
import axios from 'axios'


export default function Likes(props) {

    const queryClient = useQueryClient()

    const {data: session, status} = useSession()

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
          queryClient.invalidateQueries(['posts'])
          
        }
    })

    console.log(isPending)

  return (
    <div>
      {isPending ? 
        <Spinner animation="border" role="status" size={24}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      : <HeartFill size={24} color={props.color} onClick={toggleLike}/>}
    </div>
  )
}