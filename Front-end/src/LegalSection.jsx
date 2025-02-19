import React, { useState } from 'react';
import './LegalSection.css';

const LegalSection = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    // Fetch legal section details from database
    setResult({ title: 'Section 420', description: 'Details about legal section 420.' });
  };

  return (
    <div className="legal-container">
      <h2>Legal Section Search</h2>
      <input type="text" placeholder="Search Legal Section..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {result && (
        <div className="result-container">
          <h3>{result.title}</h3>
          <p>{result.description}</p>
        </div>
      )}
    </div>
  );
};

export default LegalSection;