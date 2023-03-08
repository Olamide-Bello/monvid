import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { StyleSheet } from '@react-pdf/renderer';
import moment from "moment/moment";
import { GlobalContext } from './GlobalContext';
import ConfirmationModal from './ConfirmationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function Quotation() {
    const { cart, bill, user, cartId } = useContext(GlobalContext)
    const [modalState, setModalState] = useState(false)
    const navigate = useNavigate()
    console.log(cart)

    const handleModal = () => {
        setModalState(!modalState)
    }

    const backNavigate = () => {
        navigate('/cart')
    }

    const message= `Hello, just made an order with quotation id "${cartId}" `


    return (
        <div className='quotation-container'>
        <div style={styles.page} >
            <div id='quotation' style={styles.Container}>
                <div style={styles.DetailCover}>
                    <div style={styles.BoxLayout}>
                        <div style={{ width: '70%' }}>
                            <p>To:</p>
                            <p>{user.name}</p>
                            <p>{user.compName}</p>
                            <p>{user.address}</p>
                        </div>
                    </div>
                    <div style={styles.BoxLayout}>
                        <div style={{ width: '30%' }}>
                            <p>Quotation Details:</p>
                            <p>Quotation No: {cartId}</p>
                            <p>Date: {moment().format('DD-MM-YYYY')}</p>
                        </div>
                    </div>
                </div>
                <table style={styles.table}>
                    <thead style={styles.tableHead}>
                        <tr>
                            <th style={styles.th}>S/N</th>
                            <th style={styles.th2}>name</th>
                            <th style={styles.th}>Quantity</th>
                            <th style={styles.th}>Unit Price</th>
                            <th style={styles.th}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((list, index) => {
                            return <tr style={styles.tableRow} key={list._id} className='row' >
                                <td style={styles.tableCol}><p style={styles.tableCell}>{index + 1}</p></td>
                                <td style={styles.tableCol2}><p style={styles.tableCell}>{list.name}</p></td>
                                <td style={styles.tableCol}><p style={styles.tableCell}>{list.quantity}</p></td>
                                <td style={styles.tableCol}><p style={styles.tableCell}>{list.price}</p></td>
                                <td style={styles.tableCol}><p style={styles.tableCell}>{list.price * list.quantity}</p></td>
                            </tr>
                        })}
                        <tr style={styles.Total} className='bill'><p>Bill: &#8358;{bill}</p></tr>
                    </tbody>
                </table>
                <div style={styles.Box}>
                    <p style={{ marginTop: '40px' }}>________________________</p>
                    <p style={{ marginLeft: '40px' }}>Signature</p>
                </div>
                <div style={styles.Box}>
                    <p className="">Tel: 07062907183, 08132283377, 09123532183 </p>
                    <p>E-mail: admin@monvid.com</p>
                </div>

            </div>
            <div className='quotation-link-btn'>
                <button className='back-btn' onClick={backNavigate}>Back </button>
                <a href={`https://web.whatsapp.com/send?phone='+2349123532183'&text=${message}&app_absent=0`} target= '_blank' rel="noreferrer" >
                    <button className='whatsapp-btn'>
                    <FontAwesomeIcon icon={faWhatsapp} size="lg"/> Whats'app 
                    </button>
                </a>
                <button className='print-btn' onClick={handleModal} >Print </button>
            </div>
            {modalState && <ConfirmationModal handleModal={handleModal} />}
        </div>
        </div>
    )
}

export default Quotation

const styles = StyleSheet.create({
    Page: {
        backgroundColor: '#f4f4f4',
        height: 'auto',
        paddingTop: '30px'
    },
    Container: {
        width: '80vw',
        margin: '20px 10%',
        backgroundColor: '#fff'
    },
    Toolbar: {
        backgroundColor: '#b70000',
        width: '100%',
        height: '40px',
        flexDirection: "row",
        color: '#ffffff',
        padding: '10px'
    },

    BoxLayout: {
        padding: '0 0 0 10px',
        height: 'auto',
        textAlign: 'left',
        display: 'inline-block',
        verticalAlign: 'top',
        flexDirection: "row",
        fontSize: 16
    },

    DetailCover: {
        width: '90%',
        flexDirection: "row",
        margin: '20px auto',
        fontSize: '16px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    table: {
        display: "table",
        width: "100%",
    },
    tableHead: {
        backgroundColor: '#b70000',
        width: '100%',
        flexDirection: "row",
        color: '#ffffff',
        textAlign: 'center'
    },

    tableRow: {
        margin: "auto",
        flexDirection: "row",
        width: '100%',
        borderStyle: "solid",
        borderWidth: 1,
        borderBottom: 'none',
        borderLeft: 'none',
        borderRight: 'none',

    },

    th: {
        height: 'auto',
        display: 'inline-block',
        verticalAlign: 'middle',
        textAlign: 'center',
        flexDirection: "row",
        width: '12%',
        padding: '5px',
    },

    th2: {
        height: 'auto',
        display: 'inline-block',
        verticalAlign: 'middle',
        textAlign: 'center',
        flexDirection: "row",
        width: '52%',
        padding: '5px',
    },

    tableCol2: {
        display: 'inline-block',
        borderStyle: "solid",
        flexDirection: "row",
        textAlign: 'center',
        padding: '5px',
        width: '52%'
    },
    tableCol: {
        display: 'inline-block',
        borderStyle: "solid",
        padding: '5px',
        width: '12%',
        textAlign: 'center'
    },

    tableCell: {
        // margin: "auto", 
        // marginTop: 5, 
        fontSize: 16
    },

    P: {
        margin: 0,
    },

    Total: {
        width: '100%',
        backgroundColor: '#b70000',
        textAlign: 'right',
        color: 'white',
        fontSize: 16,
        fontWeight: 500,
        padding: '10px 15px',
    },

    hr: {
        width: '100%',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderColor: '#000',
        padding: '10px',
        textAlign: 'center',
        fontSize: 12
    },

    Box: {
        width: '100%',
        margin: '20px',
        textAlign: 'left',
        marginTop: '20px',
        fontSize: 16
    },

    Logo: {
        fontWeight: ' bold',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'white',
        width: '20px',
        height: 'auto',
        color: 'white',
        verticalAlign: 'top',
        marginRight: '10px'
    }
})