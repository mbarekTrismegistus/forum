"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Newcomment from "./newComment";
import Likes from "@/app/components/likes";
import { useSession } from "next-auth/react";
import Markdown from "react-markdown";
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
    <div className="comments pt-5">
      
      {session ? <Newcomment post={data}/> : ""}
      <h1>Comments</h1>
      {data.comments.map((comment) => {
        return (
              <div key={comment.id} className="px-4 py-2 d-flex ">
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-2">
                      <img src={comment.user.image} className="user me-2"/>
                      <h5>
                        {comment.userId}
                      </h5>
                    </div>
                    <p className="px-5">
                      <Markdown>
                        {comment.content}
                      </Markdown>
                    </p>
                  </div>
                  <div className="ms-auto d-flex flex-column justify-content-center align-items-center">
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
                    <p>{comment._count.likes}</p>
                  </div>
              <div>

            </div>
          </div>
        )
      })}
      
      
    </div>
  )
}
