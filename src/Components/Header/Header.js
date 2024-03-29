import Navbar from "react-bootstrap/esm/Navbar.js";
import Nav from 'react-bootstrap/esm/Nav.js';
import { NavLink, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap/esm/index.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faShoppingCart, faMagnifyingGlass, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import './Header.css'
import './Mobile.css'
import Search from "./SearchInput.js";
import { useContext, useMemo, useRef, useState } from "react";
import { GlobalContext } from "../GlobalContext.js";
import SignInModal from "../SignIn/SignIn.js";
import SignUpModal from "../SignUp.js/SignUp.js";
import SearchResult from "../SearchResult/SearchResult.js";

function Header() {
    const { handleCategory, cart, user, logged, logOut, handleModal, handleSignUpModal, openSignIn, openSignUp, matches, normalScreen } = useContext(GlobalContext)
    const [showSearch, setShowSearch] = useState(false)
    const userInitials = useRef(null)
    const navigate = useNavigate()
    const handleCart = () => {
        if (!logged) {
            handleModal()
        } else {
            navigate('/cart')
        }
    }

    const handleSignIn = () => {
        handleModal()
    }

    const handleSignUp = () => {
        handleSignUpModal()
    }
    const handleLogOut = async () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        logOut()
        window.location.reload(true)
    }
    const handleSearch = () => {
        if (normalScreen) {
            setShowSearch(!showSearch)
        }
    }

    useMemo(() => {
        if (user) {
            const copy = user.name
            const arr = typeof copy === "string" ? copy.split(" ") : ""
            let initials = ""
            for (let i = 0; i <= 1; i++) {
                initials += typeof arr[i] === "string" ? arr[i].charAt(0).toUpperCase() : ""
            }
            userInitials.current = initials
        }
    }, [user])
    return (
        <div  className= {matches? "mobile-header" : "header"}>
            <div className="header-content">
                <Navbar.Brand className="brand-name"><Nav.Link as={NavLink} to="/home" end className="no-hover"><strong>monvid</strong><FontAwesomeIcon icon={faHotel} /></Nav.Link></Navbar.Brand>
                {!matches && !normalScreen && <Search />}

                <Nav className="nav" >
                    {normalScreen && <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} size="lg" onClick={handleSearch} />}
                    {!matches && <Nav.Link as={NavLink} to="/home" className="navlinks-item">About</Nav.Link>}
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
                    <button onClick={handleCart} className="navlinks-item cart-icon"><FontAwesomeIcon className="color-red" icon={faShoppingCart} /><sup><span className="cart-length">{cart.length || 0}</span></sup></button>
                    {matches && !logged && <FontAwesomeIcon onClick={handleSignIn} style={{color: "orangered"}} icon={faUserCircle} size= "2x"/>}
                    {!logged && !matches && <Nav.Link as={NavLink} onClick={handleSignIn} className="navlinks-item"><FontAwesomeIcon icon={faUser} /> Sign in</Nav.Link>}
                    {!logged && !matches && <button className="account-btn" onClick={handleSignUp}>Create Account</button>}
                    {logged &&
                        <div className="user-avatar">
                            <strong>{userInitials.current}</strong>
                            <div className="user-menu">
                                <div><div className="user-avatar"><strong>{userInitials.current}</strong></div><h4><strong>Welcome back, {logged && user.name}</strong></h4></div>
                                <p><a href="/home">Change Password</a></p>
                                <p><a href="/home">Contact us</a></p>
                                <button className="log-out-btn" onClick={handleLogOut}>Log Out</button>
                            </div>
                        </div>
                    }
                </Nav>
            </div>
            {matches && <Search />}
            {showSearch && normalScreen && <Search showSearch={showSearch} />}
            {openSignIn && <SignInModal />}
            {openSignUp && <SignUpModal />}
            <SearchResult />
        </div>

    )
}
export default Header