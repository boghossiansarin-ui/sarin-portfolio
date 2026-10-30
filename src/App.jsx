import { useState } from 'react';
import './App.css';

// Project data stored in an array of objects
const projectsData = [
  {
    id: 1,
    title: "Personal Portfolio",
    description: "A modern, responsive portfolio website built to showcase my web development journey and projects.",
    technologies: ["React", "JavaScript", "CSS"],
    githubUrl: "https://github.com/example/portfolio",
    liveUrl: ""
  },
  {
    id: 2,
    title: "Productivity App",
    description: "A task and time management tool designed to help users stay organized and boost daily efficiency.",
    technologies: ["React", "JavaScript", "Local Storage"],
    githubUrl: "https://github.com/example/productivity-app",
    liveUrl: "https://example.com/productivity-demo"
  },
  {
    id: 3,
    title: "AI Study Assistant",
    description: "An intelligent web app that generates summaries and flashcards using integrated AI APIs.",
    technologies: ["React", "Node.js", "AI APIs"],
    githubUrl: "https://github.com/example/ai-study-assistant",
    liveUrl: ""
  }
];

// Reusable ProjectCard component
function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
      </div>

      <div className="project-tags">
        {project.technologies.map((tech, index) => (
          <span key={index} className="tag">{tech}</span>
        ))}
      </div>

      {(project.githubUrl || project.liveUrl) && (
        <div className="project-links">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              GitHub Repo &rarr;
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              Live Demo &rarr;
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle input changes for controlled inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    // Clear validation error when user starts typing again
    if (errorMsg) setErrorMsg('');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Requirement 4: Prevent default page reload

    // Requirement 5 & 6: Validate fields and email format
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all fields before submitting.');
      setIsSubmitted(false);
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      setIsSubmitted(false);
      return;
    }

    // Requirement 8 & 9: Success state and clear form fields
    setErrorMsg('');
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
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
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="section-container">
          <h2 className="section-title text-center">Get In Touch</h2>
          <p className="contact-description text-center">
            I'm currently looking for new opportunities as a Junior Full-Stack Developer. 
            Whether you have a question or just want to say hi, send me a message below!
          </p>

          <form onSubmit={handleSubmit} className="contact-form">
            {errorMsg && <div className="form-alert error-alert">{errorMsg}</div>}
            {isSubmitted && (
              <div className="form-alert success-alert">
                Thank you for your message! (Note: Demo form simulated successfully — no real email was sent.)
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Your Name" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="your.email@example.com" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;