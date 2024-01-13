"use client"

import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export default function Page() {

  const [data, setData] = useState("")

  const {mutate: handleSubmit} = useMutation({
    mutationFn: async () => {
      await axios.post("/api/addCat", {id: data})
    }
  })

  return (
    <div>Admin, welcome
      <input type='text' className='form-control main w-50 mx-auto' onChange={(e) => setData(e.target.value)}/>
      <button className='btn btn-primary' onClick={handleSubmit}>Add Categorie</button>
    </div>
  )
}
