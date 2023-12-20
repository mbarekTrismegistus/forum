"use client"

import Link from 'next/link'
import Posts from './components/posts'
import { useSession, signIn } from 'next-auth/react';
import Loading from '../components/loading';

export default function Page() {

        return (
            <div className='container'>
               
                <Link href={`newPost`}>
                    <button className='btn btn-dark mt-3'>New Post</button>            
                </Link>
                <Posts/>
            </div>
        )
}


    

