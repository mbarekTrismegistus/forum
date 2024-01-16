"use client"

import React, { useState } from 'react'
import SideStats from './components/sideStats'
import Categories from './components/categories'
import {Tabs, Tab} from "@nextui-org/react";



export default function Page() {
  return(
    <div className='admin main'>
      <Tabs aria-label="Options">
        <Tab key="Categories" title="Categories">
          <Categories/>
        </Tab>
        <Tab key="Users" title="Users">
          "all users here"
        </Tab>
        <Tab key="Posts" title="Posts">
          "all posts here"
        </Tab>
      </Tabs>
      
      <SideStats/>
    </div>
  )
  
}
