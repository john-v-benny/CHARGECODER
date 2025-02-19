import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignIn from './SignIn';
import Landing from './Landing';
import Profile from './Profile';
import LegalSection from './LegalSection';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/legal" element={<LegalSection />} />
      </Routes>
    </Router>
  );
};

export default App;