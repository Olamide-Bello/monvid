import '../App.css';
import React, { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import ProductsCarousel from '../Components/Carousel.js';
import Header from '../Components/Header.js';
import Footer from '../Components/Footer.js';
import FloatingButton from '../Components/FloatingButton.js';
const AllItems = React.lazy(() =>
    import('../Components/AllProducts.js')
)

function Home() {
    return(
    <div>
        <Header />
        <div className='body'>
            <ProductsCarousel />
            <Suspense fallback={<Spinner />}><AllItems /></Suspense>
        </div>
        <FloatingButton/>
        <Footer/>
    </div>
    )
}
export default Home;