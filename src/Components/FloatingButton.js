import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

function FloatingButton() {
    const message= `Hello, I want to enquire about your products and services`
    return (
        <a href={`https://web.whatsapp.com/send?phone='+2349123532183'&text=${message}&app_absent=0`} target='_blank' rel="noreferrer" >
            <button className='floating-btn'>
                <FontAwesomeIcon icon={faWhatsapp} size="lg" /> Make Enquiry
            </button>
        </a>

    )
}

export default FloatingButton