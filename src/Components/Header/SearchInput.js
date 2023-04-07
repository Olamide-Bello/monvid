import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchResult from "../SearchResult/SearchResult.js";

function Search({ showSearch }) {
    const { searchParam, handleChange, matches, normalScreen } = useContext(GlobalContext)
    return (
        <div className={(matches && "mobile-search") || (showSearch && normalScreen && "normal-search") || "search"}>
            <div id="search-area" className="searchArea">
                <input id="search" name="search" value={searchParam} type="search" onChange={handleChange} className="input" placeholder="Enter product or category name" /><FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <SearchResult/>
        </div>
    )
}
export default Search