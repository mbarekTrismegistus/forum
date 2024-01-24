"use client"

import { Card } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { ChatLeftTextFill, HeartFill } from 'react-bootstrap-icons'
import dayjs from 'dayjs'
import Link from 'next/link'
import LatestPosts from './components/latestPosts'
import LatestUsers from './components/latestUsers'


export default function WhatsNew() {



  return (
    <div className='main mt-4'>
      <span className='font5'>
        What's New
      </span>
      <div className='container-fluid px-4 m-0'>
        <h1 className='my-4'><strong>Latest Posts</strong></h1>
          <LatestPosts/>
        <h1 className='my-5'><strong>Latest Members</strong></h1>
          <LatestUsers/>
      </div>
    </div>
  )
}
