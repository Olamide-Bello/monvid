import React, { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import Header from '../Components/Header/Header.js';
import Footer from '../Components/Footer.js';
import FloatingButton from '../Components/FloatingButton.js';
const Detail = React.lazy(() =>
  import('../Components/ProductDetail/ProductDetail.js')
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