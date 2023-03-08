import { useEffect, useState } from "react";


function UseFetch(url) {
    const [data,  setData]= useState([])
    useEffect(()=> {
        (async() =>{
            const response= await fetch(url)
            if(response.ok){
                const result= await response.json()
                setData(result)
            } else {
                console.log('unable to fetch')
            }
        })
        ()
    }, [ url ])

    return data
}
export default UseFetch