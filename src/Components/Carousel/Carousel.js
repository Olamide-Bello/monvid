import React, { useContext } from "react";
import { Carousel } from "react-bootstrap/esm/index.js";
import bedding from "../Images/Bedding.jpg"
import amenity from "../Images/Amenities.jpg"
import furniture from "../Images/furniture.jpg"
import tablewares from "../Images/tablewares.jpg"
import './Carousel.css'
import './Mobile.css'
import { GlobalContext } from "../GlobalContext.js";
function ProductsCarousel () {
    const {matches} = useContext(GlobalContext)
    console.log(matches)
    return (
        <div className="carousel-body">
            <Carousel>
                <Carousel.Item>
                    <img
                    className= {matches ? "mobile-carousel-img" : "carousel-item-img"}
                    src={bedding}
                    alt="bedding"
                    />
                    <Carousel.Caption className="carousel-des">
                        <h3><strong>Hotel Bedding</strong></h3>
                        <p><strong>Bedsheet, Fitted Sheet, Duvet, Duvet Cover, Towel, Pillow, Tablecloth and more</strong></p>
                        <button className="carousel-btn">Explore Products</button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="carousel-item-img"
                    src={amenity}
                    alt="bedding"
                    />
                    <Carousel.Caption className="carousel-des">
                        <h3><strong>Amenities</strong></h3>
                        <p><strong>Welcome tray, Soap, Shampoo, Bath gel, Hair dryer and more</strong></p>
                        <button className="carousel-btn">Explore Products</button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="carousel-item-img"
                    src={furniture}
                    alt="bedding"
                    />
                    <Carousel.Caption className="carousel-des">
                        <h3><strong>Furniture & Fixture</strong></h3>
                        <p><strong>Chair, Table, Sofa Sets, Carpet and more </strong></p>
                        <button className="carousel-btn">Explore Products</button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="carousel-item-img"
                    src={tablewares}
                    alt="bedding"
                    />
                    <Carousel.Caption className="carousel-des">
                        <h3><strong>Kitchen & Dining</strong></h3>
                        <p><strong>Tableware, Cookware, Cutlery, Crockery, Serveware and more</strong></p>
                        <button className="carousel-btn">Explore Products</button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        </div>
    )
}
export default ProductsCarousel