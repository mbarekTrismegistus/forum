"use client"


import React from 'react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react'
import Loading from '../components/loading'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
axios.defaults.baseURL = process.env.baseURL;


export default function Page() {

    
    let [data, setData] = useState({})
    let router = useRouter()
    const {data: session, status} = useSession()


    const [notVal, setVal] = useState({
        firstName: false,
        lastName: false,
        id: false,
        password: false
    })
    const [showAlert, setShowAlert] = useState(false)
    const [open, setOpen] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const {mutate: handleSubmit, isPending} = useMutation({
        
        mutationFn: async() => {
            if((data.firstName !== undefined || "") && (data.lastName !== undefined || "") && (data.id !== undefined || "") && (data.password !== undefined || "")){
                setShowAlert(false)
                await axios.post("api/newUser", {data: {data} }),
                setOpen(true)
            }
            else{
                setShowAlert(true)
            }
        },
        onSuccess: async () => {
            if(!showAlert){
                await signIn("credentials", {
                    username: data.id,
                    password: data.password,
                    redirect: true,
                    callbackUrl: "/",
                })
            }
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
        if(event.target.value !== "" || undefined){
            setVal((prev) => {
                return{
                    ...prev,
                    [event.target.name]: false
                }
            })
        }
        else{
            setVal((prev) => {
                return{
                    ...prev,
                    [event.target.name]: true 
                }
            })
        }
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
    if(status === "loading"){
        return <Loading/>
    }
    if(session){
        router.push("/")
    }
    else{
        return (
            <div>
            <div className="container col-8 d-flex justify-content-center align-items-center min-vh-100 ">
            <div className="row rounded-5 p-3 shadow box-area registre">
                <div className="col-md-6 left-box">
                    <div className="row align-items-center">
                        <div className="header-text mb-4">
                            <h2 className="d-flex align-items-center justify-content-center">Join Us</h2>
                            <p className="d-flex align-items-center justify-content-center">Get In Track with Discuss Dev.</p>
                        </div>
                        <div class="input-group mb-3">
                            <input type="text" name='id' className={`form-control form-control-lg fs-6 ${notVal.id ? "border-danger" : ""}`} onChange={handleChange} placeholder="Username"/>
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" name='firstName' className={`form-control form-control-lg fs-6 ${notVal.firstName ? "border-danger" : ""}` } onChange={handleChange} placeholder="First Name"/>
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" name='lastName' className={`form-control form-control-lg fs-6 ${notVal.lastName ? "border-danger" : ""}` } onChange={handleChange} placeholder="Last Name"/>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" name='password' className={`form-control form-control-lg fs-6 ${notVal.password ? "border-danger" : ""}` } onChange={handleChange} placeholder="Password"/>
                        </div>
                        <div className="input-group mb-3">
                            <input type="file" name='image' className={`form-control form-control-lg fs-6` } onChange={handleChange}/>
                        </div>
                        
                        <Alert severity="error" className={`d-${showAlert ? "block" : "none"} d-flex`}>All fields are required</Alert>

                        <Snackbar
                            open={open}
                            onClose={handleClose}
                            autoHideDuration={3000}
                            message="Profile Created successfully"
                        />
                        
                        <div className="input-group mb-3">
                            <button className="btn my-4 w-100" disabled={isPending} onClick={handleSubmit}>Sign Up</button>
                        </div>
                        
                    </div>
                </div>
                <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column right-box shadow-lg">
                    
                    <p className=" fs-2 text-center font5">JOIN THE COMMUNITY</p>
                    <small className=" text-center text-wrap">Explore and discover art, become a better artist.</small>
                </div>
                </div>
            </div>
            </div>
          )
    }
    

    

  
}
