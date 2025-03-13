import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Landing.css";

const Landing = () => {
  const [query, setQuery] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [sectionDetails, setSectionDetails] = useState(null);
  const [error, setError] = useState(null);
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
      // Step 1: Get the predicted section from the model
      const predictionResponse = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: query }),
      });

      if (!predictionResponse.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const predictionData = await predictionResponse.json();
      setPrediction(predictionData.predicted_section);

      // Step 2: Extract the IT Act section from the prediction
      const itActSection = predictionData.predicted_section
        .split(", ") // Split into ["BNS: Section 332", "IT Act: Section 70"]
        .find((section) => section.startsWith("IT Act")); // Find the IT Act section

      if (itActSection) {
        // Step 3: Fetch details of the IT Act section
        //const sectionName = itActSection.replace("IT Act: ", "IT Act "); // Convert "IT Act: Section 70" to "IT Act Section 70"
        const ITsection = itActSection.split(": ").find((section) => section.startsWith("Section"));
        const sectionNo = ITsection.replace("Section ","")
        const detailsResponse = await axios.get(
          `http://127.0.0.1:8000/legal/search/?q=${sectionNo}`
        );

        if (detailsResponse.data.length > 0) {
          setSectionDetails({
            title: detailsResponse.data[0].legal_section,
            description: detailsResponse.data[0].section_description,
            punishments: detailsResponse.data[0].punishments,
          });
          setError(null);
        } else {
          setSectionDetails(null);
          setError("No details found for this section.");
        }
      } else {
        // If no IT Act section is found in the prediction
        setSectionDetails(null);
        setError("No IT Act section found in the prediction.");
      }
    } catch (error) {
      console.error("Error:", error);
      setPrediction(null);
      setSectionDetails(null);
      setError("An error occurred. Please try again.");
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

        {/* Display Section Details (if available) */}
        {sectionDetails && (
          <div className="details-box">
            <h3>Section Details:</h3>
            <p><strong>Title:</strong> {sectionDetails.title}</p>
            <p><strong>Description:</strong> {sectionDetails.description}</p>
            <p><strong>Punishments:</strong> {sectionDetails.punishments}</p>
          </div>
        )}

        {/* Display Error Message */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Landing;