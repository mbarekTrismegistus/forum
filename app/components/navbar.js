"use client"
import { useSession, signIn,signOut } from 'next-auth/react';
import { Search } from 'react-bootstrap-icons';
import { Bell } from 'react-bootstrap-icons';
import Link from 'next/link';
import Notification from './notification';
import { usePathname, useRouter } from 'next/navigation';
import { Skeleton } from '@mui/material';
import { GiCrown } from "react-icons/gi";
import Image from 'next/image';



import React, { useEffect, useState } from 'react'

export default function Navbar() {

  const [notiShown, setNotifi] = useState(false)
  const [notiNum, setNotiNum] = useState(0)
  const [searchQuery, setSearch] = useState("")
  const [theme, setTheme] = useState('dark')
  const router = useRouter()
  const pathname = usePathname()


  const { data: session, status } = useSession()


  function changeTheme(){
      if(localStorage.getItem('theme') === "dark"){
        localStorage.setItem('theme', 'light')
        setTheme(localStorage.getItem('theme'))
      }
      else{
        localStorage.setItem('theme', 'dark')
        setTheme(localStorage.getItem('theme'))
    }
    }

    useEffect(() => {
      if (typeof window !== "undefined") {
        if(localStorage.getItem('theme') === "dark"){
          setTheme(localStorage.getItem('theme'))
          document.documentElement.style.setProperty('--base-color', '#dce0e8');
          document.documentElement.style.setProperty('--font-color', '#0f051c');
          document.documentElement.style.setProperty('--skeleton-dark', '#b1b7c2');
          document.documentElement.style.setProperty('--skeleton-light', '#160829');
        }
        else{
          setTheme(localStorage.getItem('theme'))
          document.documentElement.style.setProperty('--base-color', '#0f051c');
          document.documentElement.style.setProperty('--font-color', '#dce0e8');
          document.documentElement.style.setProperty('--skeleton-dark', '#160829');
          document.documentElement.style.setProperty('--skeleton-light', '#b1b7c2');
        }
      }
    })


    
  
  
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
    router.push(`/search?search=${searchQuery}`)
    
  }

  
  return (
    <nav className='navbar navbar-expand sticky-top navbar-dark py-3 shadow-bottom shadow w-100'>
        
        <div className='collapse navbar-collapse container-fluid'>
            <Link href={'/'} className='navbar-brand'><Image src={"/logo.png"} width={40} height={40}/></Link>
            <div className='search d-flex mx-auto'>
              <input className='form-control searchbar' onChange={(e) => setSearch(e.target.value)}/>
              <button className='btn d-flex align-items-center' onClick={search}>
                <Search color='white'/>
              </button>
            </div>
            <input type="checkbox" className="theme-checkbox me-3" onClick={changeTheme}/>

            {
              session ? 
                <div className='d-flex align-items-center'> 
                    <div className='me-3 notifications'>
                      <div className='notiNum'>{notiNum}</div>
                      <Bell size={28} onClick={showNotifi}/>
                      <Notification setNotiNum={setNotiNum}/>
                    </div>
                      {session.role === "admin" ? 
                        <Link href={`/admin`} className=' mx-2'>
                          <GiCrown size={32} className='secondaryColor'/>
                        </Link>
                      :
                      ""
                      }
                    <Link href={`/profile?id=${session.id}`}>
                      <img className='text-white flex-shrink-0 m-0 me-3 user' src={session.image}/>
                    </Link>
                   
                </div>
              : 
                status === "loading" ? <Skeleton className='m-0 me-3' variant='circular' width={50} height={50} sx={{bgcolor: '#281c38'}}/>
              : 
                <div>
                  <button className='btn btn-primary me-3' onClick={() => signIn({callbackUrl: "/"})}>Login</button>
                  <a href='/registre'>
                    <button className='btn btn-primary'>Registre</button>
                  </a>
                </div>
                
            }
            
        </div>
    </nav>
  )
}
