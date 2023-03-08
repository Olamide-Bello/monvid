import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
    return (
        <footer className='footer'>
            <div className='socials'>
                <FontAwesomeIcon className='footer-icon' style={{ color: "blue" }} icon={faFacebook} size="2x" />
                <FontAwesomeIcon className='footer-icon' style={{ color: "green" }} icon={faWhatsapp} size="2x" />
                <FontAwesomeIcon className='footer-icon' style={{ color: "#00acee" }} icon={faTwitter} size="2x" />
                <a href='https://instagram.com/monvid_ventures?r=nametag' target="_blank" rel="noreferrer"><FontAwesomeIcon className='footer-icon' style={{ color: "#fbad50" }} icon={faInstagram} size="2x" /></a>
            </div>
            <div className='footer-navs'>
                <Link className='footer-nav'>About Us</Link>
                <Link className='footer-nav'>Contact</Link>
                <Link className='footer-nav'>Terms</Link>
            </div>
            <div><p>Copyright &copy; 2022 monvid. All Rights Reserved</p></div>
        </footer>
    )
}

export default Footer