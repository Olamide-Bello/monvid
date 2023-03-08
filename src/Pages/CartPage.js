import React, { Suspense } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Spinner } from 'react-bootstrap'
import FloatingButton from '../Components/FloatingButton'
const Cart = React.lazy(() =>
    import('../Components/Cart')
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