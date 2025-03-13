import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const [query, setQuery] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter text to predict.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: query }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setPrediction(data.predicted_section);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Error fetching prediction. Please try again.");
    }
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
      {/* Sidebar Toggle Button */}
      <button className="dashboard-button" onClick={toggleSidebar}></button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-sidebar" onClick={toggleSidebar}>&times;</button>
        <button className="sidebar-button" onClick={handleProfileClick}>Profile</button>
        <button className="sidebar-button" onClick={handleLegalClick}>Legal Section</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
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
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>

        {/* Display Prediction */}
        {prediction && (
          <div className="prediction-box">
            <h3>Predicted Section:</h3>
            <p>{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;