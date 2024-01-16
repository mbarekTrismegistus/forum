import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


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
        <div className='container-fluid sideStates'>
            <select onChange={handleChange} defaultValue="All time">
                <option value={"day"}>Last day</option>
                <option value={"week"}>Last week</option>
                <option value={"month"}>Last month</option>
                <option value={undefined}>All time</option>
            </select><br></br>
            Totale Posts : {isLoading ? "loading" : data?.posts}<br/>
            Totale Categories : {isLoading ? "loading" : data?.categories}<br/>
            Totale Comments : {isLoading ? "loading" : data?.comments}<br/>
            Totale users : {isLoading ? "loading" : data?.users}<br/>
            Totale Likes : {isLoading ? "loading" : data?.likes}<br/>
        </div>
  )
}
