import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Categorie(props) {
  return (
  
            <div className='card text-center col-md-3 mx-auto p-0 ' key={props.key}>
                <div className='card-img-top pt-3'>
                <img className='mx-auto d-block' src={props.cat.image}/>
                </div>
                <div className='card-body'>
                <h3>{props.cat.id}</h3>
                <p>
                    Expedita id laboriosam sapiente et ut et.Expedita id laboriosam sapiente et ut et.
                </p>
                <a href={`/categories/${props.cat.id}`}>
                    <button className='btn joinBtn my-3 mx-auto d-block'>Visit</button>
                </a>
                </div>
            </div>

    
  )
}
