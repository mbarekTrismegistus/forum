import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'


export default function UpdateCat() {
    const [data, setData] = useState("")

    const router = useRouter()
    const params = useParams()


    const {mutate: handleSubmit, isPending} = useMutation({
      mutationFn: async () => {
        await axios.post("/api/upCat", {data: {
            ...data,
            id: params.updateCat
        }})
      },
      onSuccess: () => {
        router.back()
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

        <div className='main container'>
          <h1>Add categorie</h1>
          <label className='form-label'>Categorie title</label>
          <input type='text' className='form-control mx-auto' name='id' onChange={handleChange}/>
          <label className='form-label'>Categorie content</label>
          <input type='text' className='form-control' name='content' onChange={handleChange}/>
          <label className='form-label'>Categorie image</label>
          <input type='file' className='form-control' name='image' onChange={handleChange}/>
          <button className='btn btn-primary my-3' disabled={isPending} onClick={handleSubmit}>Update Categorie</button>
        </div>

    )
  
  
}







  