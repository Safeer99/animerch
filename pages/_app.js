import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import CartContext from '../context/CartContext';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (<>
    <CartContext>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </CartContext>
  </>
  )
}

export default MyApp
