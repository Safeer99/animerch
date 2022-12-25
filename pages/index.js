import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>animerch.com</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex justify-center'>
        <img src="/home.png" alt="home page image" />
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">animerch.com</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Shop the latest anime merchandises at the minimum price of ₹499.</p>
          </div>
          {/* <h2 className='mb-10 text-center font-semibold sm:text-3xl text-black text-2xl'>Our Products</h2> */}
          <div className="flex justify-center flex-wrap ">

            <div className="md:w-1/2 h-[430px] p-4">
              <div className="border hover:bg-gray-100 border-gray-200 p-6 rounded-lg">
                <h2 className="text-xl text-gray-900 text-center mb-6 font-medium title-font">Anime - Tshirts collection</h2>
                <div className="inline-flex w-full h-[250px] items-center justify-center mb-4">
                  <img height='100%' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeN2ZKY33FrZiisMD6ztaa3qMmwPlZgicMRQ&usqp=CAU" alt="tshirts" />
                </div>
                <Link legacyBehavior href={'/tshirts'}>
                  <p className='text-center mt-1 hover:text-pink-300 cursor-pointer text-sm'>VIEW ALL</p>
                </Link>
              </div>
            </div>

            <div className="md:w-1/2 h-[430px] p-4">
              <div className="border hover:bg-gray-100 border-gray-200 p-6 rounded-lg">
                <h2 className="text-xl text-gray-900 text-center mb-6 font-medium title-font">Anime - Hoodies collection</h2>
                <div className="inline-flex w-full h-[250px] items-center justify-center mb-4">
                  <img height='100%' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyvvowCoAOsyhebk7ffUVwzWs5SwEWykPUTQ&usqp=CAU" alt="hoodies" />
                </div>
                <Link legacyBehavior href={'/hoodies'}>
                  <p className='text-center mt-1 hover:text-pink-300 cursor-pointer text-sm'>VIEW ALL</p>
                </Link>
              </div>
            </div>

            <div className="md:w-1/2 h-[430px] p-4">
              <div className="border hover:bg-gray-100 border-gray-200 p-6 rounded-lg">
                <h2 className="text-xl text-gray-900 text-center mb-6 font-medium title-font">Anime - Stickers collection</h2>
                <div className="inline-flex w-full h-[250px] items-center justify-center mb-4">
                  <img height='100%' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7vJ7xowut_Jq8qrtPnrlCkqwYrk_ANo_Wgw&usqp=CAU" alt="stickers" />
                </div>
                <Link legacyBehavior href={'/stickers'}>
                  <p className='text-center mt-1 hover:text-pink-300 cursor-pointer text-sm'>VIEW ALL</p>
                </Link>
              </div>
            </div>

            <div className="md:w-1/2 h-[430px] p-4">
              <div className="border hover:bg-gray-100 border-gray-200 p-6 rounded-lg">
                <h2 className="text-xl text-gray-900 text-center mb-6 font-medium title-font">Anime - Phone cases collection</h2>
                <div className="inline-flex w-full h-[250px] items-center justify-center mb-4">
                  <img height='100%' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZXLShGH5YQIFejAJHNYEiEivctRvMtcYrkQ&usqp=CAU" alt="cases" />
                </div>
                <Link legacyBehavior href={'/cases'}>
                  <p className='text-center mt-1 hover:text-pink-300 cursor-pointer text-sm'>VIEW ALL</p>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
