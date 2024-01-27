import React from 'react'

export default function Loading() {
  return (
    <div className='loading d-flex align-items-center justify-content-center h-100 w-100 '>
      <l-trefoil
                size="70"
                stroke="4"
                stroke-length="0.15"
                bg-opacity="0.1"
                speed="1.4"
                color="#d20f39"
                 
              ></l-trefoil>
    </div>
  )
}
