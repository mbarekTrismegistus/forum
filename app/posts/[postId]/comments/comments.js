"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Newcomment from "./newComment";
axios.defaults.baseURL = process.env.baseURL;


export default function Comments(props) {

  const {data, isError, isLoading} = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const {data} = await axios.post("/api/getComments", {id: Number(props.id)})
      return data.data
    }
  })
  if(isError){
    return "error"
  }
  if(isLoading){
    return "loading ..."
  }
  console.log(data)



  return (
    <div>
      {data.map((comment) => {
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
      <Newcomment postId={props.id}/>
    </div>
  )
}
