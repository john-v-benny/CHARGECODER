import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './LegalSection.css';

const LegalSection = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigation

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/legal/search/?q=${query}`);
      
      if (response.data.length > 0) {
        setResult({
          punishment: response.data[0].punishment,
          description: response.data[0].description,
          cases: response.data[0].cases,
        });
        setError(null);
      } else {
        setResult(null);
        setError('No results found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult(null);
      setError('An error occurred while fetching data.');
    }
  };

  return (
    
    <body class="legal-page">
      {/* Home Button */}
      <button className="home-button" onClick={() => navigate('/landing')}></button>

      <div className="legal-container">
        <div className="legal-box">
          <h2>Legal Section Search</h2>
          <input
            type="text"
            placeholder="Search Legal Section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>

          {result && (
            <div className="result-container">
              <h3>{result.title}</h3>
              <p><strong>Description:</strong> {result.description}</p>
              <p><strong>Punishments:</strong> {result.punishment}</p>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
  </body>
  );
};

export default LegalSection;
