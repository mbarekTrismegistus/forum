"use client"

import { House } from 'react-bootstrap-icons';
import { Fire } from 'react-bootstrap-icons';
import { Chat } from 'react-bootstrap-icons';
import { BoxArrowRight } from 'react-bootstrap-icons';
import { usePathname } from 'next/navigation'
import anime from 'animejs';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';






export default function SideNavBar() {

const pathname = usePathname()
    const {data: session} = useSession()

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
        <div className='items d-flex flex-column'>
           
                <Link href="/" className='p-3 my-2'>
                        <House size={28} className='me-4'/>
                        Home
                </Link>
                <Link href="/whatsnew" className='p-3 my-2'>
                        <Fire size={28} className='me-4'/>
                        What&#39;s New
                </Link>
                <Link href="/categories" className='p-3 my-2'>
                        <Chat size={28} className='me-4'/>
                        Forums
                </Link>
                {
                    session ?
                    <div>
                        <hr className='mx-auto'/>
                        <div className=' p-3 py-4' >
                            <BoxArrowRight className='me-4' size={28} onClick={() => signOut({callbackUrl: "/"})} cursor='pointer'/>
                            Logout
                        </div>
                    </div>
                    :
                    ""
                }

        </div>
           
            
           
        
    </div>
  )
}
