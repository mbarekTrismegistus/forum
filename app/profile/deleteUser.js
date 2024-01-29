import React from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { signOut } from 'next-auth/react'
import { ConfirmDialog } from 'primereact/confirmdialog'; 
import { confirmDialog } from 'primereact/confirmdialog';


export default function DeleteUser(props) {


    const {mutate: deleteUser, isPending} = useMutation({
        mutationFn: async () => {
            await axios.post('/api/deleteUser', {id: props.user})
        },
        onSuccess: () => {
            signOut({ callbackUrl: '/' })
            
        }
    })

        const accept = () => {
        deleteUser()
      };
  
      const reject = () => {
        return
      };
  
      const confirm = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };

  return (
    <div className="container">
        <ConfirmDialog className='confirmation'/>
        <div className="row">
            <div className="col-md-4">
                <h4>Delete account</h4>
                <small>No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.</small>
            </div>
            <div className="col-md-8 d-flex justify-content-center align-items-center">
                <button className="btn btn-danger" disabled={isPending} onClick={() => confirm()}>Yes, delete my account</button>    
            </div>
        </div>
    </div>
  )
}
