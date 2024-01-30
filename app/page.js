import Image from 'next/image'
import Link from 'next/link'



export default function Home() {
  return (
    
    <div className='main d-flex flex-column mt-5'>
      <div className='col-9 pb-5 align-self-center text-center'>
        <div className='welcome me-5 p-4 pb-5 align-self-start'>
          <h1 className='pb-3'>
            <span>Welcome To </span><span className='disDev'>Discuss Dev</span>
          </h1>
          <p className='pb-3'>Welcome to Discuss Dev, where all devs gather in one place to help each others in everything concercing development, have a question in your ? don't be shy ! <strong>POST IT</strong></p>
          <Link href={'/categories'}>
            <button className='btn joinBtn my-3 px-4 mx-3'>Discover !</button>
          </Link>
          <Link href={'/whatsnew'}>
            <button className='btn joinBtn my-3 px-4 mx-3'>See What's new !</button>
          </Link>
        </div>
        
      </div>
    </div>
  )
}
