import React, { useContext } from 'react'
import { useParams, Link } from "react-router-dom"
import Container from "react-bootstrap/esm/Container";
import UseFetch from "./UseFetch.js"
import { GlobalContext } from './GlobalContext.js';
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap';

function ProductCategory() {
  const { name } = useParams()
  const { category } = useContext(GlobalContext)
  const data = UseFetch(`http://localhost:3000/item/category/?catName=${name}`)

  return (
    <div>
      <div className='promo'>20% off on all products</div>
        <Breadcrumb className='breadcrumb-dk'>
          <BreadcrumbItem href="/home">Home</BreadcrumbItem>
          <BreadcrumbItem href={`/category/${name}`} active>{name}</BreadcrumbItem>
        </Breadcrumb>
      <Container>
        <div className="category-title">
          <h3><strong>{category}</strong></h3>
        </div>
        <div className='all-products'>
          {data.length >= 1 ?
            data.map((product) => (
              <div key={product._id} className="product-card" style={{ background: `url(${product.image}) no-repeat center center/cover` }}>
                <img src={product.image} alt="product" />
                <Container >
                  <div className="card-title">
                    <h5>{product.name}</h5>
                  </div>
                  <Link to={`/product/${product.category}/${product._id}`}><button className="card-btn">View product</button></Link>
                </Container>
              </div>
            )) :
            <p>No product to display</p>
          }
        </div>
      </Container>
    </div>
  )
}

export default ProductCategory