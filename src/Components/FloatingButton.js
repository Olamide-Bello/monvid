import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { GlobalContext } from './GlobalContext.js'

function FloatingButton() {
    const {matches} = useContext(GlobalContext)
    const message= `Hello, I want to enquire about your products and services`
    return (
        <a href={`https://wa.me/2349123532183?text=${message}&app_absent=0`} target='_blank' rel="noreferrer" >
            <button className={matches ? 'mobile-floating-btn' : 'floating-btn'}>
                <FontAwesomeIcon icon={faWhatsapp} size="lg" /> Make Enquiry
            </button>
        </a>

    )
}

export default FloatingButton