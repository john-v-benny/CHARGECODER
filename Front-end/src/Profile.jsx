import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./profile.css";
import defaultAvatar from "./assets/default-avatar.jpg";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    avatar: defaultAvatar,
    name: "John Doe",
    email: "johndoe@example.com",
    dob: "1995-05-15",
    joinedYear: "2020",
    history: [
    ],
  });
 const navigate = useNavigate();
  useEffect(() => {
    // Fetch user data from database
    // Example API call:
    // fetch('API_ENDPOINT')
    //   .then(response => response.json())
    //   .then(data => setUserData(data));
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUserData((prevData) => ({
        ...prevData,
        avatar: imageURL,
      }));
    }
  };

  return (
  <body class="profile-page">
    <button className="home-button" onClick={() => navigate('/landing')}></button>

    <div class="dashboard-container">
     <div className="dashboard-box">
      <div className="avatar-container">
        <img 
          src={userData.avatar} 
          alt="Avatar" 
          className="avatar-image" 
        />
        <input 
          type="file" 
          accept="image/*" 
          id="avatarUpload" 
          style={{ display: "none" }} 
          onChange={handleAvatarChange}
        />
        <label htmlFor="avatarUpload" className="avatar-upload">
          Change Avatar
        </label>
      </div>
      
      <div className="user-info">
        <h2>{userData.name}</h2>
        <p>Email: {userData.email}</p>
        <p>Date of Birth: {userData.dob}</p>
        <p>Joined Year: {userData.joinedYear}</p>
      </div>
      
      <div className="history-section">
        <h3>Past Input History</h3>
        <ul className="history-list">
          {userData.history.map((item, index) => (
            <li key={index} className="history-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  </body>
  );
};

export default Dashboard;
