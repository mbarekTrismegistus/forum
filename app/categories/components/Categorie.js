import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Categorie(props) {
  return (
    <div className=' col-md-4 mx-auto' key={props.cat.key}>
        <div className='card text-center p-0'>
                <div className='card-img-top pt-3'>
                  <Image className='mx-auto d-block' src={props.cat.image} width={200} height={100}/>
                </div>
                <div className='card-body'>
                  <Accordion className='accordion'>
                      <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                      >
                      <h3>{props.cat.id}</h3>
                      </AccordionSummary>
                    <AccordionDetails>
                      <p>
                      {props.cat.content}
                      </p>
                    </AccordionDetails>
                  </Accordion>
                  <Link href={`/categories/${props.cat.id}`}>
                      <button className='btn joinBtn my-3 mx-auto d-block'>Visit</button>
                  </Link>
                  
                </div>
            </div>
    </div>
            

    
  )
}
