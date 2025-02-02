import React, {useState} from "react";
import "./Landing.css";

const Landing = () =>{

    const[query,setQuery]=useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    return(
        <div className="container">
            <div className="searchbox_cont">
                <input 
                type="text"
                placeholder="Type here" 
                value={query}
                onChange={handleInputChange}
                className="search-input"
                />

                <button className="search-button">
                    Search
                </button>
               
            </div>
        </div>
        
        
    )
}

export default Landing;