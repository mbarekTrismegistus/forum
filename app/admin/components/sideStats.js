import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FilePost } from 'react-bootstrap-icons'
import { TagFill } from 'react-bootstrap-icons'
import { ChatDotsFill } from 'react-bootstrap-icons'
import { PeopleFill } from 'react-bootstrap-icons'
import { Hearts } from 'react-bootstrap-icons'
import { FunnelFill } from 'react-bootstrap-icons'

export default function stats() {

    const [period,setPeriod] = useState(undefined)

    const {data, isLoading, isError, isPending} = useQuery({
        queryKey: [period,"stats"],
        queryFn: async () => {
            let data = await axios.post("/api/getStats", {period : period})
            return data.data.data
        }
    })
    console.log(period)
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

    return (
        <div className='container-fluid Stats mt-5 pe-3'>
            <div className='d-flex align-items-center'>
                <FunnelFill size={26} className='ms-auto'/>
                <select onChange={handleChange} defaultValue="All time" className='form-select w-25 ms-2'>
                    <option value={"day"}>Last day</option>
                    <option value={"week"}>Last week</option>
                    <option value={"month"}>Last month</option>
                    <option value={undefined}>All time</option>
                </select>
            </div>
            <div className='row my-4 text-white'>
                <div className='col stat mx-2'>
                    <h5><strong>
                    <FilePost size={26} color='white'/> Totale Posts                      
                    </strong></h5>
                    <p>
                    {isLoading ? "loading" : data?.posts}                        
                    </p>
                </div>
                <div className='col stat mx-2'>
                    <h5><strong>
                    <TagFill size={26}/> Totale Categories                       
                    </strong></h5>
                    <p>
                    {isLoading ? "loading" : data?.categories}                        
                    </p>
                </div>
                <div className='col stat mx-2'> 
                    <h5><strong>
                    <ChatDotsFill size={26}/> Totale Comments                       
                    </strong></h5>
                    <p>
                    {isLoading ? "loading" : data?.comments}                        
                    </p>
                </div>
                <div className='col stat mx-2'>
                    <h5><strong>
                    <PeopleFill size={26}/> Totale users                      
                    </strong></h5>
                    <p>
                    {isLoading ? "loading" : data?.users}                        
                    </p>
                </div>
                <div className='col stat mx-2'>
                    <h5><strong>
                    <Hearts size={26}/> Totale Likes            
                    </strong></h5>
                    <p>
                    {isLoading ? "loading" : data?.likes}                        
                    </p>
                </div>
            </div>
            
            
            
        </div>
  )
}
