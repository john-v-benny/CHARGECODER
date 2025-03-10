import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Signup.css"; // Importing the CSS file

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate(); // Initialize navigation

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    navigate("/landing"); // Navigate to landing page on signup
  };

  const handleSignIn = () => {
    navigate("/"); // Navigate to Sign In page
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          {/* Name */}
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Remember Me & Submit */}
          <div className="remember-me">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember Me
            </label>
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        {/* Sign In Link */}
        <p className="signin-text">
          Already have an account?{" "}
          <span className="signin-link" onClick={handleSignIn}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
