import React, { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import FloatingButton from '../Components/FloatingButton';
const Detail = React.lazy(() =>
  import('../Components/ProductDetail')
)

function ProductDetailPage() {
  return (
    <div>
      <Header />
      <div className='body'>
        <Suspense fallback={<Spinner />}><Detail /></Suspense>
      </div>
      <FloatingButton />
      <Footer />
    </div>
  )
}

export default ProductDetailPage