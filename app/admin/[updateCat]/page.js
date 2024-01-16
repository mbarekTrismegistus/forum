"use client"

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'

export default function Page(params) {

    const [data, setData] = useState({})

    const {mutate: updateCat} = useMutation({
        mutationFn: async () => {
            await axios.post("/api/upCat", {data: {
                ...data,
                currentId: params.params.updateCat
            }}) 
        }
    })

    function getBase64(file, onLoadCallback) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function() { resolve(reader.result); };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
      }

    function handleChange(event){
          
        setData((prevData) => {
            if(event.target.type === "file"){
                    
                var promise = getBase64(event.target.files[0]);
                promise.then(function(result) {
                    
                 setData(() => {
                    return{
                        ...prevData,
                        [event.target.name]: result
                    }
                 })
                 
                }
            );
                    
            }
            else{
                return {
                    ...prevData,
                    [event.target.name]: event.target.value
                }
            }
        })
        
        
      }

  return (
    <div>
        <input name='id' onChange={handleChange}/>
        <input name='content' onChange={handleChange}/>
        <input name='image' type='file' onChange={handleChange}/>
        <button onClick={updateCat}>Update</button>
    </div>
  )
}
