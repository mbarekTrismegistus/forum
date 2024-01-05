import Image from 'next/image'


export default function Home() {
  return (
    <div className='container mt-5'>
      <div className='d-md-flex'>
        <div className='col-md-8 welcome me-5 p-4 pb-0 align-self-start'>
          <h1 className='pb-3'>
            Welcome To Discuss Dev
          </h1>
          <p className='pb-3'>Quos nulla doloribus quaerat. In minima odio quis tempora. Qui dignissimos sit ut sit. Dolore non et numquam nemo eos dolor. Id saepe quia laudantium repellat non rerum quia.</p>
          <button className='btn joinBtn my-3'>Join Us !</button>
        </div>
        
      </div>
      <div className='home-cats mt-4'>
        <h1 className='my-5'>Trending Categories</h1>
        <div className='row mb-5'>
          <div className='card text-center col-md mx-4 p-0 '>
            <div className='card-img-top pt-3'>
              <img className='mx-auto d-block' src='https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2023/10/WordPress-alt-1.jpg'/>
            </div>
            <div className='card-body'>
              <h3>Categorie 1</h3>
              <p>
                Expedita id laboriosam sapiente et ut et.Expedita id laboriosam sapiente et ut et.
              </p>
              <button className='btn joinBtn my-3 mx-auto d-block'>Visit</button>
            </div>
          </div>
          <div className='card text-center col-md mx-4 p-0 '>
            <div className='card-img-top pt-3'>
              <img className='mx-auto d-block' src='https://miro.medium.com/v2/resize:fit:5120/1*mp91A9RzagntGGjBnwu4Yw.png'/>
            </div>
            <div className='card-body'>
              <h3>Categorie 2</h3>
              <p>
                Assumenda sunt ut ut culpa ad asperiores cupiditate.Expedita id laboriosam sapiente et ut et.
              </p>
              <button className='btn joinBtn my-3 mx-auto d-block'>Visit</button>
            </div>
          </div>
          <div className='card text-center col-md mx-4 p-0 '>
            <div className='card-img-top pt-3'>
              <img className='mx-auto d-block' src='https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/1284736/op-Ten-Front-End-Design-Rules-For-Developers_Luke-Social-33a3a7c9b759fdaa22973906070f8065.png'/>
            </div>
            <div className='card-body'>
              <h3>Categorie 2</h3>
              <p>
                Nesciunt perferendis et saepe ut dolores.Expedita id laboriosam sapiente et ut et.
              </p>
              <button className='btn joinBtn my-3 mx-auto d-block'>Visit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
