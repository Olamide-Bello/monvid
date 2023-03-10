import { useContext } from "react"
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap/esm/index.js'
import { GlobalContext } from "./GlobalContext.js"

function AllItems
  () {
  const { allProducts, handleCart } = useContext(GlobalContext)
  const addToCart = (e) => {
    const qty = "1"
    handleCart(e.target.id, qty)
  }
  return (
    <Container>
      <div className="category-title">
        <h3><strong>All Products</strong></h3>
      </div>
      <div className='all-products'>
        {allProducts.length > 1 ?
          allProducts.map((product) => (
            <div key={product._id} className="product-card" style={{ background: `url(${product.image}) no-repeat center center/cover` }}>
              <img src={product.image} alt="product" />
              <Container >
                <div className="card-title">
                  <h5>{product.name}</h5>
                </div>
                <div>
                  <Link to={`/product/${product.category}/${product._id}`}><button className="card-btn">View product</button></Link>
                  <button id={product._id} type='submit' className='card-add-cart-btn' onClick={addToCart}>Add to cart</button>
                </div>
              </Container>
            </div>
          )) :
          <p>No product to display</p>
        }
      </div>
    </Container>
  )
}
export default AllItems
