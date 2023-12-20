import Image from 'next/image'


export default function Home() {
  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-8 welcome mx-3 p-4'>
          <h1>
            Welcome To Discuss Dev
          </h1>
          <p>Quos nulla doloribus quaerat. In minima odio quis tempora. Qui dignissimos sit ut sit. Dolore non et numquam nemo eos dolor. Id saepe quia laudantium repellat non rerum quia.</p>
          <button className='btn joinBtn my-3'>Join Us !</button>
        </div>
        <div className='col-md bg-danger'>
          Welcome To Discuss Dev
        </div>
      </div>
    </div>
  )
}
