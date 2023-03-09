import React, { Suspense } from 'react'
import Header from '../Components/Header.js'
import Footer from '../Components/Footer.js'
import { Spinner } from 'react-bootstrap'
import FloatingButton from '../Components/FloatingButton'
const Cart = React.lazy(() =>
    import('../Components/Cart.js')
)

function CartPage() {
  return (
    <div>
        <Header/>
        <div className='body'>
            <Suspense fallback={<Spinner/>}><Cart/></Suspense>
        </div>
        <FloatingButton/>
        <Footer/>
    </div>
  )
}

export default CartPage