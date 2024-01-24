import React from 'react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { hash } from 'bcryptjs'
import { compareSync } from 'bcryptjs'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function ChangePass(props) {

    const [pass, setPass] = useState({})
    const [open, setOpen] = useState(false)
    const [notVal, setVal] = useState({
        curPass: false,
        password: false,
        rePass: false
    })
    const [showAlert, setShowAlert] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    function handlePass(e){
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
        setPass((prev) => {
            return{
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const {mutate: changePass, isPending: passPending} = useMutation({
        mutationFn: async () => {
            if(pass.curPass !== undefined && pass.curPass !== "" && pass.password !== "" && pass.rePass !== "" && pass.password === pass.rePass){
                if(compareSync(pass.curPass, props.pass)){
                    setShowAlert(false)
                    await axios.post("/api/changePass", { data: {
                        id: props.user,
                        password: pass.rePass
                    }})
                    setOpen(true)
                }
                else{
                    setShowAlert(true)
                }
            }
            else{
                setShowAlert(true)
            }
        }
    })


  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col-md-4 my-4">
                    <h4>Change password</h4>
                    <small>Update your password associated with your account.</small>
                </div>
                <div className="col-md mb-3">
                        <div className="form-group my-4">
                            <label>Current Password</label>
                            <input type="password" name='curPass' onChange={handlePass} className={`form-control ${notVal.curPass ? "border-danger" : ""}`}/>
                        </div>
                        <div className="form-group my-4">
                            <label>New Password</label>
                            <input type="password" name='password' onChange={handlePass} className={`form-control ${notVal.password ? "border-danger" : ""}`}/>
                        </div>
                        <div className="form-group my-4">
                            <label>Confirm Password</label>
                            <input type="password" name='rePass' onChange={handlePass} className={`form-control ${notVal.rePass ? "border-danger" : ""}`}/>
                        </div>
                        <button className="btn btn-outline-light" onClick={changePass} disabled={passPending}>Save</button>
                </div>
                <Alert severity="error" className={`d-${showAlert ? "block" : "none"} d-flex`}>Pass entered is false.</Alert>
                <hr className="my-5"/>
                
                <Snackbar
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={3000}
                    message="Password changed successfully"
                />
            </div>
        
        </div>
    </div>
  )
}
