import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Landing.css";

const Landing = () => {
  const [query, setQuery] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [sectionDetails, setSectionDetails] = useState(null);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Initially open
  const [greeting, setGreeting] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Time-based greeting logic
  useEffect(() => {
    const hour = new Date().getHours();
    let timeGreeting = "";

    if (hour < 12) {
      timeGreeting = "Good Morning";
    } else if (hour < 17) {
      timeGreeting = "Good Afternoon";
    } else {
      timeGreeting = "Good Evening";
    }

    setGreeting(`${timeGreeting}, Legal Explorer`);
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    // Reset results when input changes
    setPrediction(null);
    setSectionDetails(null);
    setError(null);
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a scenario to predict.");
      return;
    }

    setIsLoading(true);
    setPrediction(null);
    setSectionDetails(null);
    setError(null);

    try {
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

      const itActSection = predictionData.predicted_section
        .split(", ")
        .find((section) => section.startsWith("IT Act"));

      if (itActSection) {
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
        setSectionDetails(null);
        setError("No IT Act section found in the prediction.");
      }
    } catch (error) {
      console.error("Error:", error);
      setPrediction(null);
      setSectionDetails(null);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
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
    <div className="legal-analyzer-container">
      <div className="app-background"></div>

      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <span className="sidebar-icon">☰</span>
      </div>

      <div className={`side-navigation ${sidebarOpen ? 'open' : ''}`}>
        <div className="side-nav-content">
          <div className="nav-section-header">
            <h3>ChargeCoder</h3>
            <button onClick={toggleSidebar} className="close-sidebar">
              ✕
            </button>
          </div>
          <div className="nav-section-buttons">
            <button onClick={handleProfileClick} className="nav-button">
              <span className="nav-icon">👤</span>
              <span className="nav-text">Profile</span>
            </button>
            <button onClick={handleLegalClick} className="nav-button">
              <span className="nav-icon">⚖️</span>
              <span className="nav-text">Legal Section</span>
            </button>
          </div>
        </div>
      </div>

      <div className="main-content-wrapper">
        <div className="greeting-section">
          <h1>{greeting}</h1>
          <p>Explore legal scenarios and get instant IT Act insights</p>
        </div>

        <div className="search-container">
          <input 
            type="text"
            placeholder="Describe your legal scenario..."
            value={query}
            onChange={handleInputChange}
            className="scenario-input"
          />
          <button 
            className="analyze-button professional-button"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? "Analyzing... 🔍" : "Analyze Scenario"}
          </button>
        </div>

        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}

        {prediction && (
          <div className="result-card prediction-result">
            <h3>Predicted Section 🎯</h3>
            <p>{prediction}</p>
          </div>
        )}

        {sectionDetails && (
          <div className="result-card section-details">
            <h3>Section Details 📜</h3>
            <div className="details-grid">
              <div>
                <strong>Title:</strong>
                <p>{sectionDetails.title}</p>
              </div>
              <div>
                <strong>Description:</strong>
                <p>{sectionDetails.description}</p>
              </div>
              <div>
                <strong>Punishments:</strong>
                <p>{sectionDetails.punishments}</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="result-card error-result">
            <p>🚨 {error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;