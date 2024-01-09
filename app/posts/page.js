"use client"

import Link from 'next/link'
import Posts from './components/posts'
import { useSession, signIn } from 'next-auth/react';
import Loading from '../components/loading';

export default function Page() {

        return (
            <div className='container mt-4'>
                <h1 className='mb-5'>Know All about Wordpress</h1>
                <Posts/>
            </div>
        )
}


    

