import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logoImage from './assets/logo.png';
import legalSectionsImage from './assets/legal_sections.png';
import askAwayImage from './assets/ask_away.png';
import aboutUsImage from './assets/about_us.png';
import scalesWelcomeImage from './assets/scales.png';
import scalesLegalImage from './assets/man.png';
import cybercrimeKeyboardImage from './assets/keyboard.png';
import hoodedSecurityImage from './assets/hooded.png';
import skullUniformityImage from './assets/skull.png';
import padlockImage from './assets/padlock.png';

const Home = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const containerRef = useRef(null);
  const isAnimating = useRef(false);

  const images = [
    { src: scalesWelcomeImage, text: 'WELCOME\nTO YOUR PERSONALIZED LAW GUIDE', isPurple: true },
    { src: scalesLegalImage, text: 'got your phone stolen? Social media account hacked? Copyright issues? Fake accounts? Cyber bullying? Transactions without your knowledge?\nanything related to cyber crime and it act (2000) offences, we provide you with all the legal assistance you need' },
    { src: cybercrimeKeyboardImage, text: 'CYBER CRIME\nCan be integrated with existing legal and law enforcement systems to streamline workflows and improve efficiency.' },
    { src: hoodedSecurityImage, text: 'Ensures that sensitive case details and user data are handled securely, complying with data protection laws.' },
    { src: skullUniformityImage, text: 'Ensures uniformity in the application of cybercrime laws, minimizing biases and inconsistencies in charge assignment.' },
    { src: padlockImage, text: 'Reduces the risk of exposing sensitive personal information, even within the system.\nnow go onto sign in page to get started' },
  ];

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

  const handleMouseMove = (event) => {
    const mouseX = event.clientX;
    setIsSidebarVisible(mouseX <= 100);
  };

  return (
    <body class="home-page">
    <div className="home" onMouseMove={handleMouseMove}>
      <div className={`logo-top-left ${isSidebarVisible ? 'visible' : ''}`}>
        <img src={logoImage} alt="CHARGE Coder" />
      </div>

      <button className="login-btn" onClick={(handleSigninClick) => navigate('/signin')}>LOGIN/SIGNIN</button>

      <nav className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <button className="nav-btn legal-btn" onClick={() => console.log('Navigating to Legal Sections...')}>
          <img src={legalSectionsImage} alt="legal sections" />
        </button>
        <button className="nav-btn ask-btn">
          <img src={askAwayImage} alt="ASK AWAY..." />
        </button>
        <button className="nav-btn about-btn" onClick={() => console.log('Navigating to About Us...')}>
          <img src={aboutUsImage} alt="about us" />
        </button>
      </nav>

      <main className="main-content" ref={containerRef}>
        <div className="images-container">
          {images.map((image, index) => (
            <div
              key={index}
              className={`image-slide ${index === currentIndex ? 'center' : index < currentIndex ? 'left' : 'right'}`}
              style={{ transition: 'transform 0.7s ease, opacity 0.7s ease' }}
            >
              <div className="image-wrapper" style={{ backgroundImage: `url(${image.src})` }} />
              <div className={`image-text ${image.isPurple ? 'purple-text' : ''}`} style={{ opacity: index === currentIndex ? 1 : 0 }}>
                {image.text}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  </body>
  );
};

export default Home;
