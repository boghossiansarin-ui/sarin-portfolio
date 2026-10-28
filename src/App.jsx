import { useState } from 'react';
import './App.css';

// Project data stored in an array of objects
const projectsData = [
  {
    id: 1,
    title: "Personal Portfolio",
    description: "A modern, responsive portfolio website built to showcase my web development journey and projects.",
    tags: ["React", "JavaScript", "CSS"]
  },
  {
    id: 2,
    title: "Productivity App",
    description: "A task and time management tool designed to help users stay organized and boost daily efficiency.",
    tags: ["React", "JavaScript", "Local Storage"]
  },
  {
    id: 3,
    title: "AI Study Assistant",
    description: "An intelligent web app that generates summaries and flashcards using integrated AI APIs.",
    tags: ["React", "Node.js", "AI APIs"]
  }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Smooth scroll helper function
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu on click
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-app">
      {/* Sticky Navigation Bar */}
      <header className="navbar">
        <div className="nav-container">
          <a href="#hero" onClick={(e) => handleScroll(e, 'hero')} className="nav-logo">
            Portfolio<span className="logo-dot">.</span>
          </a>
          
          <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#about" onClick={(e) => handleScroll(e, 'about')}>About</a>
            <a href="#projects" onClick={(e) => handleScroll(e, 'projects')}>Projects</a>
            <a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>Contact</a>
          </nav>

          <button className="menu-btn" onClick={toggleMenu} aria-label="Toggle navigation menu">
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-container">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            JUNIOR FULL-STACK DEVELOPER
          </div>
          <h1 className="hero-title">
            Building digital experiences, one project at a time.
          </h1>
          <p className="hero-description">
            Hi there! I'm an aspiring developer passionate about building modern web applications. 
            Currently sharpening my skills in <strong>React</strong>, <strong>Node.js</strong>, and leveraging 
            <strong>AI-assisted development</strong> to write clean, efficient code and solve real-world problems.
          </p>
          <div className="hero-actions">
            <a 
              href="#projects" 
              onClick={(e) => handleScroll(e, 'projects')} 
              className="btn btn-primary"
            >
              View My Projects
              <svg 
                className="btn-icon" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleScroll(e, 'contact')} 
              className="btn btn-secondary"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="section-container">
          <h2 className="section-title">About Me</h2>
          <p className="about-text">
            I am a dedicated junior full-stack developer with a strong enthusiasm for crafting intuitive user interfaces 
            and robust back-end systems. By combining foundational engineering principles with modern AI tools, I accelerate 
            my learning workflow and build production-ready applications with high efficiency.
          </p>

          <div className="skills-grid">
            <div className="skill-card">
              <h3>Frontend Development</h3>
              <p>Building responsive, accessible, and dynamic user interfaces using React, modern JavaScript, and CSS.</p>
            </div>
            <div className="skill-card">
              <h3>Backend Development</h3>
              <p>Developing server-side logic, managing data flow, and building scalable APIs with Node.js.</p>
            </div>
            <div className="skill-card">
              <h3>AI-Assisted Development</h3>
              <p>Leveraging AI tools intelligently to brainstorm architecture, troubleshoot bugs, and accelerate development speed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="section-container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Here are a few projects I've built to hone my development skills.</p>

          <div className="projects-grid">
            {projectsData.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="section-container text-center">
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-description">
            I'm currently looking for new opportunities as a Junior Full-Stack Developer. 
            Whether you have a question or just want to say hi, my inbox is always open!
          </p>
          <a href="mailto:your.email@example.com" className="btn btn-primary">
            Say Hello
          </a>
        </div>
      </section>
    </div>
  );
}

export default App;