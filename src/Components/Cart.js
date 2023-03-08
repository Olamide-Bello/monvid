import React, { useContext } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GlobalContext } from './GlobalContext'
import { Container } from 'react-bootstrap'

function Cart() {
    const { cart, deleteItem, handleCart, bill } = useContext(GlobalContext)
    console.log(typeof (cart))
    const handleQty = (e) => {
        handleCart(e.target.dataset.productid, e.target.value)
    }

    return (
        <div className='cart-container'>
            <div className='promo'>20% off on all products</div>
            <h3 style={{ color: "#b70000", textAlign: "center" }}><strong>Your Cart</strong></h3>
            {cart.length === 0 &&
                <div className='empty-cart'>
                    <h4>Your cart is empty</h4>
                    <p>Click <span style={{ color: "#b70000" }}><a href='/home'>here</a></span> to shop for items</p>
                </div>
            }
            {cart.length > 0 &&
                <Container>
                    <div className='cart'>
                        {cart.map((product) => (
                            <div key={product._id} className='cart-item'>
                                <img src={product.image} alt="item" />
                                <p className='cart-item-title'><strong>{product.name}</strong></p>
                                <h5>{product.price}</h5>
                                <input type={"number"} name="number" data-productid={product.itemId} id='number' min={1} defaultValue={product.quantity} onChange={handleQty} />
                                <FontAwesomeIcon id={product.itemId} className='delete-btn' icon={faXmark} onClick={deleteItem} size="2x" />
                            </div>
                        ))}
                    </div>
                    <div className='bill'><h3 className='bill'> Bill: &#8358;{bill}</h3></div>
                    <div className='cart-link-btn'>
                        <a href='/home'><button className='continue-btn'>Continue Shopping</button></a>
                        <a href='/quotation'><button className='quotation-btn'>Get Quotation</button></a>
                    </div>
                </Container>
            }
        </div>
    )
}

export default Cart