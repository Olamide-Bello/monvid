import '../App.css';
import React, { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import FloatingButton from '../Components/FloatingButton';
const Category = React.lazy(() =>
    import('../Components/ProductCategory')
)

function CategoryPage() {
    return(
    <div>
        <Header />
        <div className='body'>
            <Suspense fallback={<Spinner />}><Category /></Suspense>
        </div>
        <FloatingButton/>
        <Footer/>
    </div>
    )
}
export default CategoryPage;