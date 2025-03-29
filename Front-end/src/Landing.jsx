import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Landing.css";

const Landing = () => {
  const [query, setQuery] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [sectionDetails, setSectionDetails] = useState(null);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Comprehensive cybercrime-related keywords
  const cybercrimeKeywords = [
    // General cybercrime terms
    'hack', 'hacking', 'hacked', 'hacker', 'phish', 'phishing', 'cyber', 
    'cybercrime', 'cyber crime', 'cyber attack', 'cyber security', 'cyber law',
    'malware', 'virus', 'trojan', 'worm', 'spyware', 'ransomware', 'adware',
    'ddos', 'dos', 'denial of service', 'botnet', 'zombie computer',
    'data breach', 'data leak', 'data theft', 'information theft',
    'identity theft', 'impersonation', 'fake profile', 'catfishing',
    'cyberstalking', 'cyber harassment', 'online stalking', 'digital stalking',
    'cyberbullying', 'online bullying', 'internet bullying',
    'spam', 'junk mail', 'unsolicited', 'email fraud', 'online fraud',
    'credit card fraud', 'bank fraud', 'financial fraud', 'payment fraud',
    'digital fraud', 'internet fraud', 'web fraud', 'online scam', 'scam',
    
    // Technical terms
    'sql injection', 'xss', 'cross site scripting', 'csrf', 'clickjacking',
    'mitm', 'man in the middle', 'session hijacking', 'cookie theft',
    'zero day', 'exploit', 'vulnerability', 'patch', 'security flaw',
    'brute force', 'password cracking', 'credential stuffing', 'keylogger',
    'rootkit', 'backdoor', 'privilege escalation', 'sandbox escape',
    
    // Digital assets and currencies
    'bitcoin', 'crypto', 'cryptocurrency', 'blockchain', 'wallet hack',
    'exchange hack', 'nft fraud', 'digital wallet', 'coin theft',
    
    // Devices and networks
    'computer', 'laptop', 'mobile', 'smartphone', 'tablet', 'iot', 
    'internet of things', 'smart device', 'network', 'wi-fi', 'wireless',
    'router', 'server', 'cloud', 'vpn', 'proxy', 'tor', 'dark web',
    
    // Personal data and privacy
    'personal data', 'pii', 'personally identifiable', 'privacy breach',
    'aadhaar', 'pan card', 'voter id', 'passport', 'driving license',
    'bank details', 'account number', 'atm pin', 'credit card', 'debit card',
    'upi', 'paytm', 'phonepe', 'google pay', 'net banking', 'online banking',
    
    // Social media and online platforms
    'facebook', 'instagram', 'twitter', 'whatsapp', 'telegram', 'signal',
    'snapchat', 'linkedin', 'youtube', 'tiktok', 'social media',
    'online platform', 'dating app', 'matrimonial site', 'fake account',
    'impersonation', 'profile cloning', 'deepfake', 'ai generated',
    
    // Legal and compliance terms
    'it act', 'information technology act', 'section 43', 'section 66',
    'section 65', 'section 66a', 'section 66b', 'section 66c', 'section 66d',
    'section 66e', 'section 66f', 'section 67', 'section 67a', 'section 67b',
    'cyber law', 'digital law', 'internet law', 'computer law',
    'cyber cell', 'cyber police', 'ncpc', 'national cyber crime portal',
    
    // Industry-specific terms
    'healthcare data', 'medical records', 'insurance fraud', 'banking fraud',
    'stock market', 'sebi', 'trading fraud', 'bank hack', 'atm fraud',
    'sim swap', 'mobile porting', 'otp fraud', 'two factor', '2fa bypass',
    
    // Emerging threats
    'ai fraud', 'chatgpt scam', 'deepfake', 'voice cloning', 'biometric',
    'face recognition', 'fingerprint', 'iris scan', 'quantum computing',
    
    // Common phrases that might indicate cybercrime
    'unauthorized access', 'illegal access', 'without permission',
    'stolen data', 'leaked data', 'sold data', 'data for sale',
    'account hacked', 'password stolen', 'login compromised',
    'money stolen', 'funds transferred', 'unauthorized transaction',
    'blackmail', 'sextortion', 'revenge porn', 'morphed image',
    'fake news', 'misinformation', 'disinformation', 'fake video'
  ];

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

  const isCybercrimeRelated = (text) => {
    const lowerText = text.toLowerCase();
    return cybercrimeKeywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
  };

  // Rest of the component remains the same...
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setPrediction(null);
    setSectionDetails(null);
    setError(null);
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please describe a cybercrime scenario to analyze.");
      return;
    }

    if (!isCybercrimeRelated(query)) {
      setError("This doesn't appear to be a cybercrime scenario. Please describe something related to: hacking, online fraud, data theft, cyberbullying, or other digital crimes.");
      setPrediction(null);
      setSectionDetails(null);
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
      
      if (!isCybercrimeRelated(predictionData.predicted_section)) {
        setError("The system couldn't identify a cybercrime-related violation. Please try with a more specific description of a digital crime.");
        return;
      }

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
          setError("No legal details found for this section.");
        }
      } else {
        setSectionDetails(null);
        setError("No IT Act section found for this scenario.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while analyzing your scenario. Please try again.");
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

  const handleReportClick = () => {
    window.open("https://cybercrime.gov.in/", "_blank", "noopener,noreferrer");
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
            <button onClick={handleReportClick} className="nav-button">
              <span className="nav-icon">🛑</span>
              <span className="nav-text">Report Cybercrime</span>
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