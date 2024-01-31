"use client"

import React, { useState } from 'react'
import SideStats from './components/sideStats'
import Categories from './components/categories'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Users from './components/users';
import Posts from './components/posts';
import { FunnelFill } from 'react-bootstrap-icons'




export default function Page() {

  const [period,setPeriod] = useState(undefined)


  function handleChange(e){

    if(e.target.value === "day"){
        let lastDay = Date.now() - (24 * 60 * 60 * 1000)
        lastDay = new Date(lastDay).toISOString()
        setPeriod(lastDay)
    }
    else if(e.target.value === "week"){
        let lastWeek = Date.now() - (7 * 24 * 60 * 60 * 1000)
        lastWeek = new Date(lastWeek).toISOString()
        setPeriod(lastWeek)
    }
    else if(e.target.value === "month"){
        let lastMonth = Date.now() - (30 * 7 * 24 * 60 * 60 * 1000)
        lastMonth = new Date(lastMonth).toISOString()
        setPeriod(lastMonth)
    }
    else{
        setPeriod(undefined)
    }
    
}

  return(
    <div className='admin main p-2 mt-4'>
      <h1 className='mb-4 aDashTit'><strong>Dashboard</strong></h1>
      <div className='d-flex align-items-center me-3'>
                <FunnelFill size={30} className='ms-auto'/>
                <select onChange={handleChange} defaultValue="All time" className='form-select w-25 ms-2'>
                    <option value={"day"}>Last day</option>
                    <option value={"week"}>Last week</option>
                    <option value={"month"}>Last month</option>
                    <option value={undefined}>All time</option>
                </select>
          </div>
      <SideStats period={period}/>
        <Tabs
          defaultActiveKey="categories"
          id="uncontrolled-tab-example"
          className="mb-5"
          fill
        >
          <Tab eventKey="categories" title="Categories" className='mx-auto'>

              <Categories period={period}/>

          </Tab>
          <Tab eventKey="users" title="Users">

              <Users period={period}/>

          </Tab>
          <Tab eventKey="posts" title="Posts">

              <Posts period={period}/>

          </Tab>
        </Tabs>
      
    </div>
  )
  
}
