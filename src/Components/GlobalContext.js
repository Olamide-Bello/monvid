import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalContext = createContext({
    searchParam: "",
    allProducts: [],
    handleCategory: () => { },
    putComma: () => { },
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
    logged: false,
    logOut: () => { },
    handleModal: () => { },
    handleSignUpModal: () => { },
    openSignIn: false,
    openSignUp: false,
    loading: false,
    user: {},
    handleUser: () => { },
    matches: window.matchMedia("(max-width: 768px)").matches,
    normalScreen: window.matchMedia("(min-width: 768px) and (max-width: 1100px)").matches
})

function GlobalState({ children }) {
    const [searchParam, setSearchParam] = useState("")
    const [allProducts, setAllProducts] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [searchMatch, setSearchMatch] = useState(true)
    const searchValue = useRef("")
    const [openSignIn, setOpenSignIn] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false)
    const [loading, setLoading] = useState(false)
    const [logged, setLogged] = useState(false)
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
            if (token) {
                setLogged(true)
                return JSON.parse(savedUser);
            } else {
                return {};
            }
        }
    )
    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 768px)").matches
    )
    const [normalScreen, setNormalScreen] = useState(
        window.matchMedia("(min-width: 769px) and (max-width: 1100px)").matches
    )
    const handleModal = () => {
        setOpenSignIn(!openSignIn)
    }

    const handleSignUpModal = () => {
        setOpenSignUp(!openSignUp)
    }

    const putComma = (amount) => {
        if (typeof amount === "number") {
            const value = amount.toString()
            const backward = value.split("").reverse()
            let num = ""
            for (let i=0; i <= backward.length - 1; i++) {
                i % 3 === 0 && i !== 0 ? num += `,${backward[i]}` : num += backward[i]
                console.log(backward[i])
            }
            const forward = num.split("").reverse().join("")
            console.log(forward)
            return forward
        }
    }

    const handleChange = async (e) => {
        searchValue.current = e.target.value
        setSearchParam(searchValue.current)
    }

    const handleCategory = (e) => {
        setCategory(e.target.name)
    }

    const logOut = () => {
        setLogged(false)
    }

    const handleCart = async (id, qty) => {
        if (Object.keys(user).length === 0 && user.constructor === Object) {
            handleModal()
        } else {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`)
            myHeaders.append("Access-Control-Allow-Origin", "https://monvid.pages.dev");
            // myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3001");
            const updated = { itemId: id, quantity: qty }
            const raw = JSON.stringify(updated);
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
                mode: 'cors'
            };
            const response = await fetch('https://api-monvid.onrender.com/cart', requestOptions)
            // const response = await fetch('http://localhost:3000/cart', requestOptions)
            if (response.ok) {
                const result = await response.json()
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
        setLogged(true)
    }

    const handleUser = (userData) => {
        setUser(userData)
    }
    useEffect(() => {
        (async () => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Access-Control-Allow-Origin", "https://monvid.pages.dev");
            // myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3001");
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
                mode: 'cors'
            };
            setLoading(true)
            const response = await fetch("https://api-monvid.onrender.com/item/items", requestOptions)
            // const response = await fetch("http://localhost:3000/item/items", requestOptions)
            if (response.ok) {
                const result = await response.json()
                setLoading(false)
                setAllProducts(result)
            }
        })
            ()
    }, [])

    useEffect(() => {
        window
            .matchMedia("(max-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);
    useEffect(() => {
        window
            .matchMedia("(min-width: 769px) and (max-width: 1100px)")
            .addEventListener('change', e => setNormalScreen(e.matches));
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
            // myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3001");
            myHeaders.append("Authorization", `Bearer ${token}`)
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
                mode: 'cors'
            };

            const response = await fetch("https://api-monvid.onrender.com/cart", requestOptions)
            // const response = await fetch("http://localhost:3000/cart", requestOptions)
            if (response.status === 200) {
                const result = await response.json()
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
        loading,
        handleCategory,
        putComma,
        category,
        cart,
        bill,
        cartId,
        handleCart,
        deleteItem,
        logUser,
        logged,
        logOut,
        handleModal,
        handleSignUpModal,
        openSignIn,
        openSignUp,
        user,
        handleUser,
        normalScreen
    }
    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalState