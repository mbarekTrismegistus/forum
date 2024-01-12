import React from 'react'
import { HeartFill } from 'react-bootstrap-icons'
import { useMutation } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
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

    function handleClick(){
      if(props.click === "addLike"){
            addLike()
            sendNotif()
      }
      else if(props.click === "rmLike"){
        console.log("remove")
        rmLike()
      }
      else{
        signIn()
      }
    }

    const {mutate: addLike} = useMutation({
        mutationFn: async () => {
            await axios.post("/api/addLike", {data: {
              userId: props.user,
              postId: props.post,
              commentId: props.comment
            }})
        },
        onSuccess: () => {
          queryClient.invalidateQueries(['posts'])
        }
    })

    const {mutate: rmLike} = useMutation({
      mutationFn: async () => {
          await axios.post("/api/rmLike", {data: {
            id: props.id
          }})
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['posts'])
      }
  })

  return (
    <div>
      <HeartFill size={24} color={props.color} onClick={handleClick}/>
    </div>
  )
}
