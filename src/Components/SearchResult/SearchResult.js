import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext.js'
import './SearchResult.css'
import './Mobile.css'


function SearchResult() {
    const { searchResult, searchMatch, searchValue, matches } = useContext(GlobalContext)
    return (
        <>
            {!searchMatch &&
                <p className={matches ? 'no-match-mobile' : 'no-match'}>No match found</p>
            }
            <>
                {
                    searchResult && searchResult.length > 0 && searchValue.current ?
                        <div className={matches? 'mobile-result' : 'search-result'}>
                            {
                                searchResult.map((item) => (
                                    <Link to={`/product/${item._id}`} key={item._id} className='result-link'>
                                        <div className='search-item' >
                                            <img src={item.image} alt="product" />

                                            <div>
                                                <h5>{item.name}</h5>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                        :
                        <></>
                }
            </>

        </>
    )
}

export default SearchResult