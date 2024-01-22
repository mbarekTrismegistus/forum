"use client"

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'



export default function Settings(props) {

    const [info, setInfo] = useState({})
    

    const {data: session, update } = useSession()

    function getBase64(file, onLoadCallback) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function() { resolve(reader.result); };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }


    

    const {mutate: handleSubmit, isPending} = useMutation({
        mutationFn: async () => {

            let res = await axios.post("/api/updateUser", {data: {
                info: info,
                id: props.user.id
            }})
            return res.data.image
        },
        onSuccess: async (data) => {

            let res = await update({
                ...session,
                id: info.id || props.user.id,
                firstName: info.firstName || props.user.firstName,
                lastName: info.lastName || props.user.lastName,
                image: data || props.user.image
            })
            if(res){
                window.location.href = `/profile?id=${info.id || props.user.id}`
            }

        }
    })


    function handleInfo(e){
        setInfo((prevData) => {
            
            if(e.target.type === "file"){
                var promise = getBase64(e.target.files[0]);
                promise.then(function(result) {
                 setInfo(() => {
                    return{
                        ...prevData,
                        [e.target.name]: result
                    }
                 })
                 
                }
            );
                    
            }
            else{
                return {
                    ...prevData,
                    [e.target.name]: e.target.value
                }
            }
        })

    }

  return (
    <div className='mt-5 pt-4 setting'>
        <div className="container">
        <div className="row my-4">
            <div className="col-md-4">
                <h4>Personal Information</h4>
                <small>Use a permanent address where you can receive mail.</small>
            </div>
            <div className="col-md">
                <div className="row">
                    <div className="col-3">
                    <img
                        width={150}
                        height={150}
                        src={props.user.image}
                        alt="coucou"
                        className='img img-fluid'
                    />
                    </div>
                    <div className="col-md-5 d-flex justify-content-center align-items-center">
                        <div>
                            <input type='file' className='form-control' name='image' onChange={handleInfo}/>
                            Change avatar
                            <p>JPG, GIF or PNG. 1MB max.</p>
                        </div>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        <label htmlFor="firstName">First name</label><br/>
                        <input type="text" onChange={handleInfo} name="firstName" className="form-control w-100" defaultValue={props.user.firstName}/>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        <label htmlFor="lastName">Last name</label><br/>
                        <input type="text" onChange={handleInfo} name="lastName" className="form-control w-100" defaultValue={props.user.lastName}/>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        <label htmlFor="id">Username</label><br/>
                        <input type="text" onChange={handleInfo} name="id" className="form-control w-100" defaultValue={props.user.id}/>
                    </div>
                </div>
            
                <div className="row my-4">
                    <div className="col">
                        <button type="button" disabled={isPending} onClick={handleSubmit} className="btn btn-outline-light">Save</button>    
                    </div>
                </div>
            </div>
        </div>
        </div>
        <hr className='mx-auto w-100'/>
        <div className="container">
            <div className="row">
                <div className="col-md-4 my-4">
                    <h4>Change password</h4>
                    <small>Update your password associated with your account.</small>
                </div>
                <div className="col-md">
                    <form>
                        <div className="form-group my-4">
                            <label htmlFor="exampleInputPassword1">Current Password</label>
                            <input type="password" className="form-control"/>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="exampleInputPassword1">New Password</label>
                            <input type="password" className="form-control"/>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="exampleInputPassword1">Confirm Password</label>
                            <input type="password" className="form-control"/>
                        </div>
                        <button className="btn btn-outline-light">Save</button>
                    </form>
                </div>
                <hr className="my-5"/>
                
            </div>
        
        </div>
     
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h4>Delete account</h4>
                    <small>No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.</small>
                </div>
                <div className="col-md d-flex justify-content-center align-items-center">
                    <button className="btn btn-danger">Yes, delete my account</button>    
                </div>
            </div>
        </div>
    </div>

  )
}
