import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import './Home.css';

const LegalHomepage = () => {
  const navigate = useNavigate();
  const particleCanvasRef = useRef(null);
  const featuresRef = useRef(null);
  
  const features = [
    {
      icon: "⚖️",
      title: "Cyber Crime Section Detection",
      description: "Advanced machine learning algorithms analyze input scenarios to precisely identify and classify cyber crime sections with unprecedented accuracy."
    },
    {
      icon: "📑",
      title: "Section Details",
      description: "An easy way to retrieve section details and punishments within milliseconds making the work easy for everyone."
    },
    {
      icon: "🧠",
      title: "BERT-Powered Prediction",
      description: "Leveraging fine-tuned BERT models to deliver state-of-the-art natural language processing for input crime scene interpretation."
    }
  ];

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const particles = [];
    const particleCount = 100;
    const connectionDistance = 150;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.opacity = Math.random() * 0.5 + 0.2;
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
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    const drawConnections = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            
            ctx.stroke();
          }
        }
      }
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      drawConnections();
      
      requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      if (featuresRef.current) {
        const featureCards = featuresRef.current.querySelectorAll('.lp-feature-card');
        
        featureCards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight - 100;
          
          if (isVisible) {
            setTimeout(() => {
              card.classList.add('visible');
            }, index * 200);
          }
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll);
    
    handleScroll();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="lp-container">
      <div className="lp-bg-wrapper">
        <div className="lp-bg-gradient"></div>
        <canvas 
          ref={particleCanvasRef} 
          className="lp-particle-canvas"
        ></canvas>
      </div>

      <header className="lp-header">
        <div className="lp-header-content">
          <div className="lp-logo-container">
            <img src={logo} alt="Legal AI Logo" className="lp-logo-image" />
          </div>
          <nav className="lp-nav-container">
            <button className="lp-nav-btn">About</button>
            <button className="lp-nav-btn">Services</button>
            <button className="lp-nav-btn">Contact</button>
            <button className="lp-btn lp-btn-primary" onClick={() => navigate('/signin')}>
              Login <span className="lp-btn-arrow">→</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="lp-main">
        <section className="lp-hero">
          <div className="lp-hero-content">
            <div className="lp-hero-badge">AI-POWERED LEGAL TECHNOLOGY</div>
            <h1 className="lp-hero-title">Legal Section Prediction With Artificial Intelligence</h1>
            <p className="lp-hero-desc">
              A cutting-edge legal section predictor that accurately identifies and classifies legal sections in crime scenarios using advanced machine learning algorithms.
            </p>
            <div className="lp-btn-group">
              <button className="lp-btn lp-btn-hero" onClick={() => navigate('/demo')}>
                Try Demo <span className="lp-btn-arrow">→</span>
              </button>
              <button className="lp-btn lp-btn-secondary" onClick={() => navigate('/learn-more')}>
                Learn More
              </button>
            </div>
          </div>
          <div className="lp-hero-graphic"></div>
        </section>

        <section className="lp-features" ref={featuresRef}>
          <h2 className="lp-section-title">Key Features</h2>
          <div className="lp-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="lp-feature-card">
                <div className="lp-feature-icon">
                  <span>{feature.icon}</span>
                </div>
                <h3 className="lp-feature-title">{feature.title}</h3>
                <p className="lp-feature-text">{feature.description}</p>
                <div className="lp-feature-decor"></div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="lp-workflow">
          <h2 className="lp-section-title">How It Works</h2>
          <div className="lp-steps">
            <div className="lp-step">
              <div className="lp-step-num">01</div>
              <h3 className="lp-step-title">Input Crime Scenario</h3>
              <p className="lp-step-desc">Describe the crime scenario in natural language</p>
            </div>
            <div className="lp-step-connector"></div>
            <div className="lp-step">
              <div className="lp-step-num">02</div>
              <h3 className="lp-step-title">AI Analysis</h3>
              <p className="lp-step-desc">Our BERT model processes and analyzes the input</p>
            </div>
            <div className="lp-step-connector"></div>
            <div className="lp-step">
              <div className="lp-step-num">03</div>
              <h3 className="lp-step-title">Results</h3>
              <p className="lp-step-desc">Receive accurate legal section predictions</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="lp-footer">
        <div className="lp-footer-content">
          <div className="lp-footer-logo">
            <img src={logo} alt="Legal AI Logo" className="lp-footer-logo-img" />
          </div>
          <div className="lp-footer-links">
            <div className="lp-footer-col">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Demo</a>
            </div>
            <div className="lp-footer-col">
              <h4>Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">API</a>
              <a href="#">Legal Guides</a>
            </div>
            <div className="lp-footer-col">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
              <a href="#">Careers</a>
            </div>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <p>© 2025 Legal AI Predictor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LegalHomepage;