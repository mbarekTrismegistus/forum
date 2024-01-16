import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import axios from 'axios'


export default function AddCat() {
    const [data, setData] = useState("")

    const {mutate: handleSubmit} = useMutation({
      mutationFn: async () => {
        await axios.post("/api/addCat", {data: data})
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
        <div>
          <h1>Add categorie</h1>
          <input type='text' className='form-control main w-50 mx-auto' name='id' onChange={handleChange}/>
          <input type='file' name='image' onChange={handleChange}/>
          <button className='btn btn-primary' onClick={handleSubmit}>Add Categorie</button>
        </div>

      </div>
    )
  
  
}







  