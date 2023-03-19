import '../App.css';
import React, { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import Header from '../Components/Header/Header.js';
import Footer from '../Components/Footer.js';
import FloatingButton from '../Components/FloatingButton.js';
const Category = React.lazy(() =>
    import('../Components/ProductCategory.js')
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