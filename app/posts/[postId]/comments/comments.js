"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Newcomment from "./newComment";
import Likes from "@/app/components/likes";
import { useSession } from "next-auth/react";
axios.defaults.baseURL = process.env.baseURL;


export default function Comments(props) {

  const {data: session, status} = useSession()

  const {data, isError, isLoading} = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const {data} = await axios.post("/api/getAPost", {id: Number(props.id)})
      console.log(data.data)
      return data.data
    }
  })
  if(isError){
    return "error"
  }
  if(isLoading){
    return "loading ..."
  }
 



  return (
    <div>
      {data.comments.map((comment) => {
        return (
          <div key={comment.id}>
            <h5>
              {comment.userId}
            </h5>
            <p>
              {comment.content}
            </p>
            <Likes 
                        color={comment.likes.length > 0 ? comment.likes.filter(e => e.userId === props.user).length > 0 ? "red" : "white" : "white"}
                        click={session ? comment.likes.length > 0 && comment.likes.filter(e => e.userId === props.user).length > 0 ? "rmLike" : "addLike" : "signin"}
                        id={comment.likes.filter(e => e.userId === props.user)[0]?.id}
                        user={props.user}
                        comment={comment.id}
                        postId={comment.postId}
                        owner={comment.userId}
                        item={"comment"}
                        
                      />

          {comment._count.likes}
          </div>
        )
      })}
      {session ? <Newcomment post={data}/> : ""}
      
    </div>
  )
}
