import React from 'react'

export default function Loading() {
  return (
    <div className='loading text-center'>
      <l-trefoil
              size="80"
              stroke="4"
              stroke-length="0.15"
              bg-opacity="0.1"
              speed="1.4"
              color="white" 
            ></l-trefoil>
    </div>
  )
}
