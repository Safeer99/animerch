import '../styles/globals.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import CartContext from '../context/CartContext';
import LoadingBar from 'react-top-loading-bar'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {

  const [progress, setProgress] = useState(0);

  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40);
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })
  })

  return (<>
    <CartContext>
      <LoadingBar
        color='#ff2d55'
        progress={progress}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </CartContext>
  </>
  )
}

export default MyApp
