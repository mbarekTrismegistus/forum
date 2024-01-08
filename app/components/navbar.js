"use client"
import { useSession, signIn,signOut } from 'next-auth/react';
import { Search } from 'react-bootstrap-icons';
import { Bell } from 'react-bootstrap-icons';
import Link from 'next/link';
import Notification from './notification';
import { PlusCircle } from 'react-bootstrap-icons';
import anime from 'animejs';
import { usePathname, useRouter } from 'next/navigation';



import React, { useState } from 'react'

export default function Navbar() {

  const [notiShown, setNotifi] = useState(false)
  const [notiNum, setNotiNum] = useState(0)
  const [searchQuery, setSearch] = useState("")
  const router = useRouter()
  const pathname = usePathname()


  const { data: session, status } = useSession()
  
  function showNotifi(){
    if(notiShown){
      document.querySelector(".notification-box").style.display = "none"
      setNotifi(false)
    }
    else{
      document.querySelector(".notification-box").style.display = "block"
      setNotifi(true)
    }
  }


  function search(){
    if(pathname.startsWith('/search')){
      window.location.href = `/search?search=${searchQuery}`
    }
    else{
      router.push(`/search?search=${searchQuery}`)
    }
  }

  
  return (
    <nav className='navbar navbar-expand sticky-top navbar-dark py-3 shadow-bottom shadow'>
        
        <div className='collapse navbar-collapse container-fluid'>
            <a className='navbar-brand'>Discuss Dev</a>
            <div className='search d-flex mx-auto'>
              <input className='form-control searchbar' onChange={(e) => setSearch(e.target.value)}/>
              <button className='btn' onClick={search}>
                <Search color='white'/>
              </button>
            </div>

            {
              session ? 
                <div className='d-flex align-items-center'> 
                    <Link href={'/newPost'} className='ms-auto me-3'>
                      <PlusCircle className='' size={28}/>
                    </Link>
                    <div className='me-3 notifications'>
                      <div className='notiNum'>{notiNum}</div>
                      <Bell size={28} onClick={showNotifi}/>
                      <Notification setNotiNum={setNotiNum}/>
                    </div>
                    
                    <img className='text-white m-0 me-3 user' src={session.image}/>
                   
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
