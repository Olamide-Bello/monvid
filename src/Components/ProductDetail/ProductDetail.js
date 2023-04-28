import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useMemo } from 'react'
import { Breadcrumb, BreadcrumbItem, Container } from 'react-bootstrap/esm/index.js'
import { useParams, Link } from "react-router-dom"
import { GlobalContext } from '../GlobalContext.js'
import UseFetch from '../UseFetch.js'
import './ProductDetail.css'

function ProductDetail() {

    const { id, category } = useParams()
    const { handleCategory, handleCart, matches, putComma } = useContext(GlobalContext)
    const [qty, setQty] = useState("1")
    // const data = UseFetch(`http://localhost:3000/item/items/${id}`)
    const data = UseFetch(`https://api-monvid.onrender.com/item/items/${id}`)
    const suggestedProduct = UseFetch(`https://api-monvid.onrender.com/item/category/?catName=${category}`)
    const product = useMemo(() => suggestedProduct.filter((prod) => {
        return (prod._id !== id)
    }), [id, suggestedProduct])
    const handleChange = (event) => {
        setQty(event.target.value)
    }
    const addToCart = (e) => {
        handleCart(e.target.id, qty)
        setQty("1")
    }

    return (
        <div>
            <div className='promo'>20% off on all products</div>
            <Breadcrumb>
                <BreadcrumbItem href="/home">Home</BreadcrumbItem>
                <BreadcrumbItem href={`/category/${category}`} name={category} onClick={handleCategory}>{category}</BreadcrumbItem>
                <BreadcrumbItem href={`/product/${category}/${id}`} active>{id}</BreadcrumbItem>
            </Breadcrumb>
            <Container>
                {data ?
                    <div className='detail-card'>
                        <img src={data.image} alt="product" loading='lazy' />
                        <div className='detail'>
                            <h3>{data.name}</h3>
                            <p>~{data.category}~</p>
                            <p className='description' style={{ color: "#555" }}>{data.description}</p>
                            <p><strong>Price Per Unit: <span>&#8358;{putComma(data.price)}</span></strong></p>
                            <p><strong>Status: <span style={{ color: "green" }}>Available</span></strong></p>
                            <div>Quantity: <input type={"number"} name="number" id='number' min={1} defaultValue={"1"} className='number' onChange={handleChange} /></div>
                            <button id={data._id} type='submit' className='add-cart-btn' onClick={addToCart}>Add to cart</button>
                        </div>

                    </div>
                    :
                    <div></div>
                }
            </Container>
            <div>
                <div className='category-title'>
                    <h3 >Suggested</h3>
                </div>
                <div className='suggested-products'>
                    {product.length > 0 ?
                        product.map(product =>
                            <div key={product.id} className="suggestion-card" style={{ background: !matches && `url(${product.image}) no-repeat center center/cover` }}>
                                <img src={product.image} alt="product" />
                                <Container >
                                    <div className="card-title">
                                        <h5>{product.name}</h5>
                                    </div>
                                    <Link to={`/product/${product.category}/${product._id}`}><button className="card-btn">View</button></Link>

                                </Container>
                            </div>
                        )
                        :
                        <div>No suggestion available</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductDetail