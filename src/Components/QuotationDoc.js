import React from 'react'
import { Document, Page, Text, View, StyleSheet} from '@react-pdf/renderer';
import moment from "moment/moment.js";


function QuotationDoc({ cart, bill, user, cartId }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.Container}>
                    <View style={styles.Toolbar}>
                        <View style={styles.Logo}><Text>A</Text></View>
                        <View style={{ width: '70%', fontSize: 16 }}><Text>Monvid Ventures</Text></View>
                        <View style={{ width: '20%', fontSize: 16 }}><Text>Quotation</Text></View>
                    </View>
                    <View style={styles.DetailCover}>
                        <View style={styles.BoxLayout}>
                            <View style={{ width: '70%' }}>
                                <Text>To:</Text>
                                <Text>{user.name}</Text>
                                <Text>{user.compName}</Text>
                                <Text>{user.address}</Text>
                            </View>
                        </View>
                        <View style={styles.BoxLayout}>
                            <View style={{ width: '30%' }}>
                                <Text>Quotation Details:</Text>
                                <Text>Quotation ID:  {cartId}</Text>
                                <Text>Date: {moment().format('DD-MM-YYYY')}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.table}>

                        {/* TableHeader */}
                        <View style={styles.tableHead}>
                            <View style={styles.th}>
                                <Text style={styles.tableCell}>S/N</Text>
                            </View>
                            <View style={styles.th2}>
                                <Text style={styles.tableCell}>Name</Text>
                            </View>
                            <View style={styles.th}>
                                <Text style={styles.tableCell}>Quantity</Text>
                            </View>
                            <View style={styles.th}>
                                <Text style={styles.tableCell}>Unit Price</Text>
                            </View>
                            <View style={styles.th}>
                                <Text style={styles.tableCell}>Price</Text>
                            </View>
                        </View>

                        {/* TableContent */}
                        {cart.map((list, index) => {
                            return <View key={list.itemId} style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{index + 1}</Text>
                                </View>
                                <View style={styles.tableCol2}>
                                    <Text style={styles.tableCell}>{list.name}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{list.quantity}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{list.price}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{list.price * list.quantity}</Text>
                                </View>
                            </View>
                        })}
                    </View>
                    <View style={styles.Total}>
                        <Text>Bill: NGN{bill}</Text>
                    </View>
                    <View style={styles.Box}>
                        <Text style={{ marginTop: '40px' }}>_____________________</Text>
                        <Text style={{ marginLeft: '40px' }}>Signature</Text>
                    </View >
                    <View style={styles.hr}>
                        <Text>Thanks for your patronage</Text>
                    </View>

                    <View style={styles.Box} >
                        <Text>Tel: 07062907183, 08132283377, 09123532183</Text>
                        <Text>E-mail: admin@monvid.com</Text>
                    </View>
                </View>

            </Page>
        </Document>
    )
}

export default QuotationDoc

const styles = StyleSheet.create({
    Page: {
        backgroundColor: '#ffffff',
    },
    Container: {
        width: '80vw',
        margin: '20px 10%'
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
        fontSize: 12
    },

    DetailCover: {
        width: '90%',
        flexDirection: "row",
        margin: '20px auto',
        fontSize: 12,
        display: 'flex',
        justifyContent: 'space-between'
    },
    table: {
        display: "table",
        width: "auto",
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
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        borderRightWidth: 0

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
        fontSize: 12
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
        padding: '10px 5px',
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