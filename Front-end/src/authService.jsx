import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8000/api/'; // Replace with your Django backend URL

// Function to register a new user
export const register = (email, password) => {
  return axios.post(`${API_URL}register/`, {
    username: email, // Use email as the username
    password,
  });
};

// Function to log in a user
export const login = (email, password) => {
  return axios.post(`${API_URL}login/`, {
    username: email, // Use email as the username
    password,
  }).then(response => {
    if (response.data.access) {
      Cookies.set('access_token', response.data.access); // Store access token in cookies
      Cookies.set('refresh_token', response.data.refresh); // Store refresh token in cookies
    }
    return response.data;
  });
};