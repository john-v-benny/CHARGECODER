import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLegalClick = () => {
    navigate("/legal");
  };

  return (
    <div className="container">
      {/* Dashboard Button */}
      <button className="dashboard-button" onClick={toggleSidebar}>
        
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-sidebar" onClick={toggleSidebar}>&times;</button>
        <button className="sidebar-button" onClick={handleProfileClick}>Profile</button>
        <button className="sidebar-button" onClick={handleLegalClick}>Legal Section</button>
      </div>

      {/* Search Box */}
      <div className="searchbox_cont">
        <input 
          type="text"
          placeholder="Type here" 
          value={query}
          onChange={handleInputChange}
          className="search-input"
          aria-label="Search input"
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Landing;
