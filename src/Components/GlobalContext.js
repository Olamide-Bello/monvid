import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalContext = createContext({
    searchParam: "",
    allProducts: [],
    handleCategory: () => { },
    category: "",
    searchValue: "",
    searchMatch: true,
    searchResult: [],
    cart: [],
    bill: 0,
    cartId: "",
    handleCart: () => { },
    deleteItem: () => { },
    logUser: () => { },
    handleModal: () => { },
    handleSignUpModal: () => { },
    openSignIn: false,
    openSignUp: false,
    user: {},
    handleUser: () => { },
})

function GlobalState({ children }) {
    const [searchParam, setSearchParam] = useState("")
    const [allProducts, setAllProducts] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [searchMatch, setSearchMatch] = useState(true)
    const searchValue = useRef("")
    const [openSignIn, setOpenSignIn] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false)
    const [category, setCategory] = useState("")
    const [token, setToken] = useState(
        () => {
            const savedSession = localStorage.getItem("token");
            if (savedSession) {
                return savedSession;
            } else {
                return "";
            }
        }
    )
    const [cart, setCart] = useState([])
    const [bill, setBill] = useState(0)
    const [cartId, setCartId] = useState("")
    const [user, setUser] = useState(
        () => {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                return JSON.parse(savedUser);
            } else {
                return {};
            }
        }
    )
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )


    const handleModal= () => {
        setOpenSignIn(!openSignIn)
    }

    const handleSignUpModal= () => {
        setOpenSignUp(!openSignUp)
    }


    const handleChange = async (e) => {
        searchValue.current = e.target.value
        setSearchParam(searchValue.current)
    }

    const handleCategory = (e) => {
        setCategory(e.target.name)
    }
    const handleCart = async (id, qty) => {
        if (Object.keys(user).length === 0 && user.constructor === Object) {
            handleModal()
        } else {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`)
            myHeaders.append("Access-Control-Allow-Origin", "https://monvid.pages.dev");
            const updated = { itemId: id, quantity:qty }
            const raw = JSON.stringify(updated);
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
                mode: 'cors'
            };
            const response = await fetch('https://api-monvid.onrender.com/cart', requestOptions)
            if (response.ok) {
                const result = await response.json()
                console.log(result)
                setCart(result.items)
                setBill(result.bill)
                toast.success("Item added to cart successfully!")
            }
            if (response.status === 404) {
                toast.warning("Item does not exists")
            }
        }
    }
    const deleteItem = async (e) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`)
        myHeaders.append("Access-Control-Allow-Origin", "https://monvid.pages.dev");
        const id = e.currentTarget.id
    
        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
            mode: 'cors'
        };
        const response = await fetch(`https://api-monvid.onrender.com/cart/?itemId=${id}`, requestOptions)
        if (response.ok) {
            const result = await response.json()
            console.log(result)
            setCart(result.items)
            setBill(result.bill)
            toast.info("Item removed from cart successfully!")
        }
        if (response.status === 404) {
            toast.warning("Item does not exists")
        }

    }
    

    const logUser = (newToken) => {
        setToken(newToken)
    }

    const handleUser = (userData) => {
        setUser(userData)
    }
    useEffect(() => {
        (async () => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Access-Control-Allow-Origin", "https://monvid.pages.dev");
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
                mode: 'cors'
            };
            const response = await fetch("https://api-monvid.onrender.com/item/items", requestOptions)
            if (response.ok) {
                const result = await response.json()
                setAllProducts(result)
            }
        })
            ()
    }, [])

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);
    useEffect(() => {
        localStorage.setItem("token", token);
    }, [token])
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user])
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    useEffect(() => {
        (async () => {
            const myHeaders = new Headers();
            myHeaders.append("Access-Control-Allow-Origin", "https://monvid.pages.dev");
            myHeaders.append("Authorization", `Bearer ${token}`)
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
                mode: 'cors'
            };

            const response = await fetch("https://api-monvid.onrender.com/cart", requestOptions)
            if (response.status === 200) {
                const result = await response.json()
                console.log(result)
                setCart(result.items)
                setBill(result.bill)
                setCartId(result._id)
            }
        })
            ()
    }, [token])
    useMemo(() => {
        if (searchParam === "") {
            setSearchResult([])
            setSearchMatch(true)
        }
    }, [searchParam])
    useEffect(() => {
        (async () => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Access-Control-Allow-Origin", "https://monvid.pages.dev");
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
                mode: 'cors'
            };
            if (searchParam) {
                const response = await fetch(`https://api-monvid.onrender.com/item/search/${searchParam}`, requestOptions)
                if (response.status === 200) {
                    const result = await response.json()
                    setSearchResult(result)
                    setSearchMatch(true)
                    console.log(result)
                } else if (response.status === 404) {
                    setSearchMatch(false)
                    setSearchResult([])
                }

            }
            if (searchParam === "") {
                setSearchResult([])
            }

        })
            ()
    }, [searchParam])

    const contextValue = {
        searchParam,
        handleChange,
        matches,
        searchValue,
        searchMatch,
        allProducts,
        searchResult,
        handleCategory,
        category,
        cart,
        bill,
        cartId,
        handleCart,
        deleteItem,
        logUser,
        handleModal,
        handleSignUpModal,
        openSignIn,
        openSignUp,
        user,
        handleUser,
    }
    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalState