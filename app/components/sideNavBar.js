"use client"

import { House } from 'react-bootstrap-icons';
import { Fire } from 'react-bootstrap-icons';
import { People } from 'react-bootstrap-icons';
import { Chat } from 'react-bootstrap-icons';
import { BoxArrowRight } from 'react-bootstrap-icons';
import { usePathname } from 'next/navigation'
import anime from 'animejs';
import { signOut } from 'next-auth/react';







export default function SideNavBar() {

    const pathname = usePathname()

  return (
    <div className='sideNav shadow shadow-end' onMouseEnter={() => {
        anime({
            targets: ".items",
            width: 200,
            duration: 1000,
    
        })
    }} onMouseLeave={() => {
        anime({
            targets: ".items",
            width: 60,
            duration: 1000,
    
        })
    }}>
        <div className='items'>
           
            <div className={`item p-3 py-4 ${pathname == "/"  ? 'border-end border-success border-3' : ""}`}>
                <House size={28}/>
                <a href='/' className='ms-4 mb-0'>Home</a>
            </div>
            <div className=' p-3 py-4'>
                <Fire size={28}/>
                <a className='ms-4 mb-0'>What&#39;s New</a>
            </div>
            <div className=' p-3 py-4'>
                <People size={28}/>
                <a className='ms-4 mb-0'>Members</a>
            </div>
            <div className={`item p-3 py-4 ${pathname == "/categories"  ? 'border-end border-success border-3' : ""}`}>
                <Chat size={28}/>
                <a href='/categories' className='ms-4 mb-0'>Forums</a>
            </div>
            <hr className='mx-auto'/>
            <div className=' p-3 py-4'>
                <BoxArrowRight size={28} onClick={() => signOut({callbackUrl: "/"})}/>
                <a className='ms-4 mb-0'>Logout</a>
            </div>
        </div>
           
            
           
        
    </div>
  )
}
