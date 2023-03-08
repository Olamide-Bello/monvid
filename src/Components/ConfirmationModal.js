import React, { useContext } from 'react'
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import QuotationDoc from './QuotationDoc';
import { GlobalContext } from './GlobalContext';

function ConfirmationModal({ handleModal }) {
    const { user, cart, bill, cartId } = useContext(GlobalContext)
    console.log(user)
    const handlePDF = async () => {
        const blob = await pdf(
            <QuotationDoc user={user} cart={cart} bill={bill} cartId={cartId} />
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
    return (
        <div className='modal-container'>
            <div className='confirm-modal'>
                <h5>Confirm Printing...</h5>
                <button className='back-btn' onClick={handleModal}>Cancel</button>
                <button className='print-btn' onClick={handlePDF}>Print</button>
            </div>
        </div>
        )
}

export default ConfirmationModal