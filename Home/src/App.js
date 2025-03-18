import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import logoImage from './assets/logo.png'; // CHARGE Coder logo
import legalSectionsImage from './assets/legal_sections.png'; // legal sections button
import askAwayImage from './assets/ask_away.png'; // ASK AWAY... button
import aboutUsImage from './assets/about_us.png'; // about us button
import scalesWelcomeImage from './assets/scales.png'; // 1. WELCOME...
import scalesLegalImage from './assets/man.png'; // 2. got your phone stolen...
import cybercrimeKeyboardImage from './assets/keyboard.png'; // 3. CYBER CRIME...
import hoodedSecurityImage from './assets/hooded.png'; // 4. Ensures that sensitive...
import skullUniformityImage from './assets/skull.png'; // 5. Ensures uniformity...
import padlockImage from './assets/padlock.png'; // 6. Reduces the risk...
import loginButtonImage from './assets/login_signup.png'; // LOGIN/SIGN UP button image

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const containerRef = useRef(null);
  const isAnimating = useRef(false);

  // Array of images with their text (in the specified order)
  const images = [
    { src: scalesWelcomeImage, text: 'WELCOME\nTO YOUR PERSONALIZED LAW GUIDE', isPurple: true },
    { src: scalesLegalImage, text: 'got your phone stolen? Social media account hacked? Copyright issues? Fake accounts? Cyber bullying? Transactions without your knowledge?\nanything related to cyber crime and it act (2000) offences, we provide you with all the legal assistance you need' },
    { src: cybercrimeKeyboardImage, text: 'CYBER CRIME\nCan be integrated with existing legal and law enforcement systems to streamline workflows and improve efficiency.' },
    { src: hoodedSecurityImage, text: 'Ensures that sensitive case details and user data are handled securely, complying with data protection laws.' },
    { src: skullUniformityImage, text: 'Ensures uniformity in the application of cybercrime laws, minimizing biases and inconsistencies in charge assignment.' },
    { src: padlockImage, text: 'Reduces the risk of exposing sensitive personal information, even within the system.\nnow go onto sign in page to get started' },
  ];

  // Handle scroll for horizontal navigation
  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();

      if (isAnimating.current) return;

      isAnimating.current = true;
      if (event.deltaX > 0 || event.deltaY > 0) {
        setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1));
      } else if (event.deltaX < 0 || event.deltaY < 0) {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
      setTimeout(() => {
        isAnimating.current = false;
      }, 700);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [images.length]);

  // Handle mouse movement to show/hide sidebar and logo
  const handleMouseMove = (event) => {
    const mouseX = event.clientX;
    if (mouseX <= 20) {
      setIsSidebarVisible(true);
    } else if (mouseX > 200) {
      setIsSidebarVisible(false);
    }
  };

  // Button click handlers
  const handleLegalSections = () => {
    console.log("Navigating to Legal Sections...");
    // Add navigation logic here
  };

  const handleAboutUs = () => {
    console.log("Navigating to About Us...");
    // Add navigation logic here
  };

  const handleLogin = () => {
    console.log("Navigating to Login/Sign Up...");
    // Add navigation logic here
  };

  return (
    <div className="app" onMouseMove={handleMouseMove}>
      <div className={`logo-top-left ${isSidebarVisible ? 'visible' : ''}`}>
        <img src={logoImage} alt="CHARGE Coder" />
      </div>

      <button className="login-btn" onClick={handleLogin}>
        <img src={loginButtonImage} alt="LOGIN/SIGN UP" />
      </button>

      <nav className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <button className="nav-btn legal-btn" onClick={handleLegalSections}>
          <img src={legalSectionsImage} alt="legal sections" />
        </button>
        <button className="nav-btn ask-btn">
          <img src={askAwayImage} alt="ASK AWAY..." />
        </button>
        <button className="nav-btn about-btn" onClick={handleAboutUs}>
          <img src={aboutUsImage} alt="about us" />
        </button>
      </nav>

      <main className="main-content" ref={containerRef}>
        <div className="images-container">
          {images.map((image, index) => (
            <div
              key={index}
              className={`image-slide ${index === currentIndex ? 'center' : index < currentIndex ? 'left' : 'right'}`}
              style={{ transition: 'transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.7s ease-in-out, filter 0.7s ease-in-out' }}
            >
              <div
                className="image-wrapper"
                style={{ backgroundImage: `url(${image.src})`, transition: 'transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
              />
              {index === currentIndex && (
                <div
                  className={`image-text ${image.isPurple ? 'purple-text' : ''}`}
                  style={{ opacity: 1, transition: 'opacity 0.7s ease-in-out' }}
                >
                  {image.text}
                </div>
              )}
              {index !== currentIndex && (
                <div
                  className={`image-text ${image.isPurple ? 'purple-text' : ''}`}
                  style={{ opacity: 0, transition: 'opacity 0.7s ease-in-out' }}
                >
                  {image.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;