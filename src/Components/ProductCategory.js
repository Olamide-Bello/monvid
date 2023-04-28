import React, { useMemo, useRef } from 'react'
import { useParams, Link } from "react-router-dom"
import { Container } from 'react-bootstrap/esm/index.js'
import UseFetch from "./UseFetch.js"
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap/esm/index.js';

function ProductCategory() {
  const upperCase = useRef(null)
  const { name } = useParams()
  const data = UseFetch(`https://api-monvid.onrender.com/item/category/?catName=${name}`)

  useMemo(() => {
    if (name) {
      const copy = name
      let arr = typeof copy === "string" ? copy.split(" ") : ""
      let joined= []

      for (let i = 0; i <= arr.length; i++) {
        const initials = (typeof arr[i] === "string" ? arr[i].charAt(0).toUpperCase() + arr[i].slice(1) : "")
        joined.push(initials)
      }
      upperCase.current = joined.join(" ")
    }
  }, [name])

  return (
    <div>
      <div className='promo'>20% off on all products</div>
      <Breadcrumb className='breadcrumb-dk'>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem href={`/category/${name}`} active>{upperCase.current}</BreadcrumbItem>
      </Breadcrumb>
      <Container>
        <div className="category-title">
          <h3><strong>{upperCase.current}</strong></h3>
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
                  <Link to={`/product/${product.category}/${product._id}`}><button className="card-btn">View</button></Link>
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