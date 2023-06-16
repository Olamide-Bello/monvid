import React, { useContext } from 'react'
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import QuotationDoc from '../QuotationDoc.js';
import { GlobalContext } from '../GlobalContext.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ConfirmationModal.css'

function ConfirmationModal({ handleModal }) {
    const { user, cart, bill, cartId, putComma, token } = useContext(GlobalContext)
    const handlePDF = async () => {
        const blob = await pdf(
            <QuotationDoc user={user} cart={cart} bill={bill} cartId={cartId} putComma={putComma} />
        ).toBlob();
        saveAs(blob, "Quotation.pdf");
        saveToCheckOut()
    }

    const saveToCheckOut = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Access-Control-Allow-Origin", "https://monvid.pages.dev");
        // myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3001");
        myHeaders.append("Authorization", `Bearer ${token}`)
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            mode: 'cors'
        };

        const response = await fetch("https://api-monvid.onrender.com/cart/checkout", requestOptions)
        // const response = await fetch("http://localhost:3000/cart/checkout", requestOptions)
        console.log(response)
        if (response.status === 200) {
            const result = await response.json()
            console.log(result)
            toast.success("Checkout successful!")
        }

    }
    const message = `Hello, just made an order with quotation id "${cartId}" `

    return (
        <div className='modal-container'>
            <div className='confirm-modal'>
                <h5>Confirm Printing...</h5>
                <p>This will redirect after download to our whatsapp page to finalize order</p>
                <button className='back-btn' onClick={handleModal}>Cancel</button>
                <a href={`https://wa.me/2349123532183?text=${message}&app_absent=0`} target='_blank' rel='noreferrer'><button className='print-btn' onClick={handlePDF}>Print</button></a>
            </div>
        </div>
    )
}

export default ConfirmationModal