import React, { useState } from 'react';
import axios from 'axios';
import './LegalSection.css';

const LegalSection = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      // Fetch data from the Django backend API
      const response = await axios.get(`http://127.0.0.1:8000/api/search/?q=${query}`);
      
      if (response.data.length > 0) {
        setResult({
          title: response.data[0].legal_section,
          description: response.data[0].section_description,
          punishments: response.data[0].punishments,
        });
        setError(null);
      } else {
        setResult(null);
        setError('No results found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult(null); // Clear previous results
      setError('An error occurred while fetching data.'); // Display an error message
    }
  };

  return (
    <div className="legal-container">
      <h2>Legal Section Search</h2>
      <input
        type="text"
        placeholder="Search Legal Section..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Display search results or error messages */}
      {result && (
        <div className="result-container">
          <h3>{result.title}</h3>
          <p><strong>Description:</strong> {result.description}</p>
          <p><strong>Punishments:</strong> {result.punishments}</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LegalSection;