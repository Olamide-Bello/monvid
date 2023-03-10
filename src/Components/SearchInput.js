import React, { useContext } from "react";
import { GlobalContext } from "./GlobalContext.js";
import { Container } from 'react-bootstrap/esm/index.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import '../App.css';

function Search() {
    const { searchParam, handleChange } = useContext(GlobalContext)
    return (
        <div className="search">
            <Container>
                <div id="search-area" className="searchArea">
                    <input id="search" name="search" value={searchParam} type="search" onChange={handleChange} className="input" placeholder="Enter product or category name" /><FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
            </Container>
        </div>
    )
}
export default Search