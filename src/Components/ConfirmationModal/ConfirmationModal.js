import React, { useContext } from 'react'
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import QuotationDoc from '../QuotationDoc.js';
import { GlobalContext } from '../GlobalContext.js';
import './ConfirmationModal.css'

function ConfirmationModal({ handleModal }) {
    const { user, cart, bill, cartId, putComma } = useContext(GlobalContext)
    const handlePDF = async () => {
        const blob = await pdf(
            <QuotationDoc user={user} cart={cart} bill={bill} cartId={cartId} putComma={putComma} />
        ).toBlob();
        saveAs(blob, "Quotation.pdf");
        // let fd = new FormData();
        // fd.append('myfile', blob);

        // fetch('http://localhost:3000/send_mail', {
        //     method: 'POST', body: fd
        // }).catch(err => {
        //     console.error(err);
        // });

    }
    const message = `Hello, just made an order with quotation id "${cartId}" `
    const handleWhatsapp = () => {
        window.location.href = `https://web.whatsapp.com/send?phone='+2349123532183'&text=${message}&app_absent=0`
    }
    const handleFunctions = async () => {
        await handlePDF()
        await handleWhatsapp()
    }
    return (
        <div className='modal-container'>
            <div className='confirm-modal'>
                <h5>Confirm Printing...</h5>
                <p>This will redirect after download to our whatsapp page to finalize order</p>
                <button className='back-btn' onClick={handleModal}>Cancel</button>
                <button className='print-btn' onClick={handleFunctions}>Print</button>
            </div>
        </div>
        )
}

export default ConfirmationModal