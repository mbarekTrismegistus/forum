"use client"

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import ChangePass from './changePass'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import DeleteUser from './deleteUser'
import Image from 'next/image'




export default function Settings(props) {

    const [info, setInfo] = useState({})
    const [notVal, setVal] = useState({
        firstName: false,
        lastName: false,
        id: false
    })
    const [showAlert, setShowAlert] = useState(false)
    const [open, setOpen] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

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
            if(info.firstName !== "" && info.lastName !== "" && info.id !== ""){
                setShowAlert(false)
                let res = await axios.post("/api/updateUser", {data: {
                    info: info,
                    id: props.user.id
                }})
                setOpen(true)
                return res.data.image
            }
            else{
                setShowAlert(true)
            }
        },
        onSuccess: async (data) => {
            let res = await update({
                ...session,
                id: info.id || props.user.id,
                firstName: info.firstName || props.user.firstName,
                lastName: info.lastName || props.user.lastName,
                image: data || props.user.image
            })
            if(res && !showAlert){
                window.location.href = `/profile?id=${info.id || props.user.id}`
            }

        }
    })


    function handleInfo(e){
        if(e.target.value !== "" || undefined){
            setVal((prev) => {
                return{
                    ...prev,
                    [e.target.name]: false
                }
            })
        }
        else{
            setVal((prev) => {
                return{
                    ...prev,
                    [e.target.name]: true 
                }
            })
        }
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
                <div className="d-md-flex">
                        <Image
                            width={150}
                            height={150}
                            src={props.user.image}
                            alt=""
                            className='me-4 flex-shrink-0'
                        />
                    <div className="d-flex justify-content-center align-items-center">
                        <div>
                            <input type='file' className='form-control' name='image' onChange={handleInfo}/>
                            Change avatar

                        </div>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        <label htmlFor="firstName">First name</label><br/>
                        <input type="text" onChange={handleInfo} name="firstName" className={`w-100 form-control ${notVal.firstName ? "border-danger" : ""}`} defaultValue={props.user.firstName} onMouseLeave={handleInfo}/>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        <label htmlFor="lastName">Last name</label><br/>
                        <input type="text" onChange={handleInfo} name="lastName" className={`w-100 form-control ${notVal.lastName ? "border-danger" : ""}`} defaultValue={props.user.lastName} onMouseLeave={handleInfo}/>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        <label htmlFor="id">Username</label><br/>
                        <input type="text" onChange={handleInfo} name="id" className={`w-100 form-control ${notVal.id ? "border-danger" : ""}`} defaultValue={props.user.id} onMouseLeave={handleInfo}/>
                    </div>
                </div>
            
                <div className="row my-4">
                    <div className="col">
                        <button type="button" disabled={isPending} onClick={handleSubmit} className="btn btn-primary">Save</button>    
                    </div>
                </div>
            </div>
        </div>
        <Alert severity="error" className={`d-${showAlert ? "block" : "none"} d-flex alertDanger`}>All fields are required</Alert>
        </div>
        <hr className='mx-auto w-100'/>
        <Snackbar
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={3000}
                    message="Profile updated successfully"
                    className='snackbar'
                />
        
        <ChangePass pass={props.user.password} user={props.user.id}/>
     
       <DeleteUser user={props.user.id}/>
    </div>

  )
}
