"use client"
import { useSession, signIn,signOut } from 'next-auth/react';
import { Search } from 'react-bootstrap-icons';
import { Bell } from 'react-bootstrap-icons';


import React from 'react'

export default function Navbar() {

  const { data: session, status } = useSession()

  return (
    <nav className='navbar navbar-expand sticky-top navbar-dark py-3 shadow-bottom shadow'>
        <div className='collapse navbar-collapse container-fluid'>
            <a className='navbar-brand'>Discuss Dev</a>
            <div className='search d-flex ms-auto'>
              <input className='form-control searchbar'/>
              <button className='btn'>
                <Search color='white'/>
              </button>
              

            </div>
            <Bell className='ms-auto me-3' size={28}/>
            
            
            {
              session ? 
                <div className='d-flex align-items-center'> 
                    <p className='text-white m-0 me-3'>{session.id}</p> 
                    <div className='text-white m-0 me-3 user'></div>
                   
                </div>
              : 
                status === "loading" ? <p className='text-white m-0 me-3 user'></p> 
              : 
                <div>
                  <button className='btn btn-outline-light me-3' onClick={() => signIn({callbackUrl: "/posts"})}>Login</button>
                  <a href='/registre'>
                    <button className='btn btn-outline-light'>Registre</button>
                  </a>
                </div>
            }
            
        </div>
    </nav>
  )
}
