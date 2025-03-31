import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LegalSection.css';

const LegalSection = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://127.0.0.1:8000/legal/search/?q=${encodeURIComponent(query)}`);
      
      if (response.data.length > 0) {
        const legalData = response.data[0];
        setResult({
          sectionNumber: legalData.section_number,
          title: legalData.title || `Section ${legalData.section_number}`,
          punishment: legalData.punishment || 'Not specified',
          description: legalData.description || 'No description available',
          cases: legalData.cases || []
        });
      } else {
        setResult(null);
        setError('No results found for your search.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult(null);
      setError('An error occurred while fetching data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleHomeClick = () => {
    navigate('/landing');
  };

  return (
    <div className="legal-page">
      <div className="legal-container">
        <button 
          className="legal-home-button" 
          onClick={handleHomeClick} 
          title="Return to Home"
          aria-label="Return to Home"
        />
        
        <div className="legal-box">
          <h2>Legal Section Search</h2>
          
          <div className="legal-search-container">
            <input
              type="text"
              className="legal-search-input"
              placeholder="Search by section number, title, or keywords..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              aria-label="Search input"
            />
            <button 
              className="legal-search-button" 
              onClick={handleSearch} 
              disabled={isLoading}
              aria-label="Search button"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {isLoading && <div className="legal-loading-indicator">Loading results...</div>}

          {error && <div className="legal-error-message" role="alert">{error}</div>}

          {result && (
            <div className="legal-result-container">
              <div className="legal-section-header">
                <h3>{result.sectionNumber} - {result.title}</h3>
              </div>
              
              <div className="legal-section-details">
                <div className="legal-detail-block">
                  <h4>Description</h4>
                  <p>{result.description}</p>
                </div>
                
                <div className="legal-detail-block">
                  <h4>Punishment</h4>
                  <p>{result.punishment}</p>
                </div>
              </div>

              {result.cases && result.cases.length > 0 && (
                <div className="legal-cases-container">
                  <h4>Famous Cases</h4>
                  <div className="legal-cases-list">
                    {result.cases.map((caseItem, index) => (
                      <div key={index} className="legal-case-item">
                        <h5 className="legal-case-title">{caseItem.case_name}</h5>
                        <div className="legal-case-summary">
                          {caseItem.summary.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalSection;