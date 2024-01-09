"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Newcomment from "./newComment";
axios.defaults.baseURL = process.env.baseURL;


export default function Comments(props) {



  const {data, isError, isLoading} = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const {data} = await axios.post("/api/getAPost", {id: Number(props.id)})
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
          </div>
        )
      })}
      <Newcomment post={data}/>
    </div>
  )
}
