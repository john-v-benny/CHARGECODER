import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const LegalHomepage = () => {
  const navigate = useNavigate();
  const particleCanvasRef = useRef(null);

  const features = [
    {
      icon: '🛡️',
      title: "Cyber Crime Section Detection",
      description: "Advanced machine learning algorithms analyze legal documents to precisely identify and classify cyber crime sections with unprecedented accuracy."
    },
    {
      icon: '📊',
      title: "Real-time Legal Insights",
      description: "Instant analysis of digital legal documents, providing comprehensive insights into potential cyber crime classifications in milliseconds."
    },
    {
      icon: '🧠',
      title: "BERT-Powered Prediction",
      description: "Leveraging fine-tuned BERT models to deliver state-of-the-art natural language processing for legal document interpretation."
    }
  ];

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Create particles
    const particles = [];
    const particleCount = 150;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = `rgba(255,255,255,${Math.random() * 0.3})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    // Event listeners
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="legal-homepage">
      <div className="background-gradient"></div>
      <canvas 
        ref={particleCanvasRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          opacity: 0.5
        }}
      ></canvas>

      <header className="header">
        <div className="logo">
          <span className="logo-icon">🎯</span>
          Legal Section Predictor
        </div>
        <nav className="navigation">
          <a href="#home" className="nav-item">Home</a>
          <a href="#features" className="nav-item">Features</a>
          <a href="#technology" className="nav-item">Technology</a>
        </nav>
        <button className="cta-button primary-cta" onClick={() => navigate('/signin')}>Login</button>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <div className="hero-subtitle">CHARGECODER</div>
          <h1 className="hero-title">AI-Powered Legal Section Detection</h1>
          <p className="hero-description">
            Our cutting-edge machine learning solution uses fine-tuned BERT models to accurately predict and classify legal sections in cyber crime documents, providing unprecedented insights and efficiency.
          </p>
          <div className="cta-buttons">
            <button className="cta-button primary-cta">
              📖 Explore Solution
            </button>
            <button className="cta-button secondary-cta">
              📊 View Methodology
            </button>
          </div>
        </section>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LegalHomepage;