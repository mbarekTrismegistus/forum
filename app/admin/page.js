"use client"

import React, { useState } from 'react'
import SideStats from './components/sideStats'
import Categories from './components/categories'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';





export default function Page() {
  return(
    <div className='admin main p-2 mt-4'>
      <h1 className='mb-4 aDashTit'><strong>Dashboard</strong></h1>
      <SideStats/>
        <Tabs
          defaultActiveKey="categories"
          id="uncontrolled-tab-example"
          className="mb-5"
          fill
        >
          <Tab eventKey="categories" title="Categories" className='mx-auto'>
            <Categories/>
          </Tab>
          <Tab eventKey="users" title="Users">
            Tab content for users
          </Tab>
          <Tab eventKey="posts" title="Posts">
            Tab content for posts
          </Tab>
        </Tabs>
      
    </div>
  )
  
}
