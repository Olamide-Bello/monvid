import React, { Suspense } from 'react'
import Header from '../Components/Header/Header.js'
import Footer from '../Components/Footer.js'
import { Spinner } from 'react-bootstrap'
import FloatingButton from '../Components/FloatingButton.js'
const Cart = React.lazy(() =>
    import('../Components/Cart/Cart.js')
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