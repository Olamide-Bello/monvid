import '../App.css';
import React, { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import ProductsCarousel from '../Components/Carousel';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import FloatingButton from '../Components/FloatingButton';
const AllItems = React.lazy(() =>
    import('../Components/AllProducts')
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