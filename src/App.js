import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./Pages/Home"
import CategoryPage from './Pages/CategoryPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import CartPage from './Pages/CartPage';
import QuotationPage from './Pages/QuotationPage';


function App() {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/product/:category/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/quotation" element={<QuotationPage/>} />

        <Route path="*" element={<Navigate to='/' />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
