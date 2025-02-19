import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for navigation
import "./Landing.css";

const Landing = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
    // Add your search logic here
  };

  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to the Profile page
  };

  const handleLegalClick = () => {
    navigate("/legal"); // Navigate to the Legal Section page
  };

  return (
    <div className="container">
      {/* Profile/Dashboard Button */}
      <button 
        className="profile-button" 
        onClick={handleProfileClick}
      >
        Profile
      </button>

      {/* Legal Section Button */}
      <button 
        className="legal-button" 
        onClick={handleLegalClick}
      >
        Legal Section
      </button>

      <div className="searchbox_cont">
        <input 
          type="text"
          placeholder="Type here" 
          value={query}
          onChange={handleInputChange}
          className="search-input"
          aria-label="Search input"
        />

        <button 
          className="search-button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Landing;
