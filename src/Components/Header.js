import Navbar from "react-bootstrap/esm/Navbar";
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import '../App.css'
import Search from "./SearchInput";
import { useContext, useMemo, useRef } from "react";
import { GlobalContext } from "./GlobalContext";
import SignInModal from "./SignIn/SignIn";
import SignUpModal from "./SignUp.js/SignUp";
import SearchResult from "./SearchResult/SearchResult";

function Header() {
    const {handleCategory, cart, user, handleModal, handleSignUpModal, openSignIn, openSignUp} = useContext(GlobalContext)
    const userInitials= useRef(null)
    const navigate= useNavigate()

    const handleCart = () => {
        if(Object.keys(user).length === 0 && user.constructor === Object) {
            handleModal()
        } else {
            navigate('/cart')
        }
    }

    const handleSignIn= () => {
        handleModal()
    }

    const handleSignUp= () => {
        handleSignUpModal()
    }
    const handleLogOut= async () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        window.location.reload(true)
    }
    
    useMemo(()=> {
        if(user) {
            const copy = user.name
            const arr= typeof copy==="string" ? copy.split(" "): ""
            let initials=""
            for(let i=0; i<= 1; i++) {
                initials += typeof arr[i] === "string" ? arr[i].charAt(0).toUpperCase(): ""
            }
            userInitials.current = initials
        }
    }, [user])
    return (
        <Navbar sticky="top" className="header">
            <div className="header-content">
                <Navbar.Brand className="brand-name"><Nav.Link as={NavLink} to="/home" end className="no-hover"><strong>monvid</strong><FontAwesomeIcon icon={faHotel} /></Nav.Link></Navbar.Brand>
                <Search />
                <Nav className="nav" >
                    <Nav.Link as={NavLink} to="/home" className="navlinks-item">About</Nav.Link>
                    <NavDropdown id="nav-dropdown-dark-example"
                            title="Categories"
                            drop="down"
                            className='dropdown menu-item'
                    >
                        <NavDropdown.Item as={NavLink} to={`/category/hotel bedding`} onClick={handleCategory} name="Hotel Bedding" className='dropdown'>Hotel Bedding</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to={`/category/amenities`} onClick={handleCategory} name="Amenities" className='dropdown'>Amenities</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to={`/category/furnitures`} onClick={handleCategory} name="Furnitures" className='dropdown'>Furniture & Fixture</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to={`/category/kitchen & dining`} onClick={handleCategory} name="Kitchen & Dining" className='dropdown'>Kitchen & Dining</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={NavLink}  onClick={handleCart} className="navlinks-item cart"><FontAwesomeIcon className="color-red" icon={faShoppingCart} /><sup><span className="cart-length">{cart.length || 0}</span></sup></Nav.Link>
                    {!user.name && <Nav.Link as={NavLink} onClick= {handleSignIn} className="navlinks-item"><FontAwesomeIcon icon={faUser} /> Sign in</Nav.Link>}
                    {!user.name && <button className="account-btn" onClick={handleSignUp}>Create Account</button>}
                    {user.name && 
                        <div className="user-avatar">
                            <strong>{userInitials.current}</strong>
                            <div className="user-menu">
                                <div><div className="user-avatar"><strong>{userInitials.current}</strong></div><h4><strong>Welcome back, {user.name}</strong></h4></div>
                                <p><a href="/home">Change Password</a></p>
                                <p><a href="/home">Contact us</a></p>
                                <button className="log-out-btn" onClick={handleLogOut}>Log Out</button>
                            </div>
                        </div>
                    }
                </Nav>
            </div>
            {openSignIn && <SignInModal />}
            {openSignUp && <SignUpModal />}
            <SearchResult/>
        </Navbar>

    )
}
export default Header