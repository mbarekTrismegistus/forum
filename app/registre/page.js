"use client"


import React from 'react'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
import Loading from '../components/loading'
axios.defaults.baseURL = 'https://discuss-wdev.vercel.app';


export default function Page() {

    
    let [data, setData] = useState({})
    let router = useRouter()
    const {data: session, status} = useSession()

    const {mutate: handleSubmit} = useMutation({
    
        mutationFn: async() => await axios.post("api/newUser", {data: {data} }),
        onSuccess: () => {
            router.push("/")
        }
    })

    function handleChange(event){
        
        setData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
        console.log(data)
        
    }

    if(status === "loading"){
        return <Loading/>
    }
    if(session){
        router.push("/")
    }
    else{
        return (
            <div>
                <form>
                    <label>Username</label>
                    <input type='text' name='id' onChange={handleChange}/>
                    <label>First Name</label>
                    <input type='text' name='firstName' onChange={handleChange}/>
                    <label>Last Name</label>
                    <input type='text' name='lastName' onChange={handleChange}/>
                    <label>Password</label>
                    <input type='password' name='password' onChange={handleChange}/>
        
        
                    <button onClick={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }} className='btn btn-dark'>New Post</button>    
                </form>
            </div>
          )
    }
    

    

  
}
