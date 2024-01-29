import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function TrendCat() {

    const {data, isError, isLoading} = useQuery({
        queryKey: ["cats"],
        queryFn: async () => {
            let {data} = axios.post('/api/getCats', {take: 3})
        }
    })
  return (
    <div>trendCat</div>
  )
}
