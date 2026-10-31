import { useEffect, useState } from 'react';
import { projectsData } from './data/projects.js';
import './App.css';

const currentYear = new Date().getFullYear();
const emailPattern = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

// Reusable ProjectCard component
function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
      </div>

      <div className="project-tags">
        {project.technologies.map((tech) => (
          <span key={tech} className="tag">{tech}</span>
        ))}
      </div>

      {/* Conditionally render link buttons only if real URLs exist */}
      {(project.githubUrl || project.liveUrl) && (
        <div className="project-links" role="group" aria-label={`${project.title} project links`}>
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
    </article>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#hero" onClick={onNavigate} className="footer-logo">
              Portfolio<span aria-hidden="true" className="logo-dot">.</span>
            </a>
            <p className="footer-description">
              A junior full-stack developer portfolio featuring selected work and contact information.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="#about" onClick={onNavigate}>About</a>
            <a href="#projects" onClick={onNavigate}>Projects</a>
            <a href="#contact" onClick={onNavigate}>Contact</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {currentYear} Portfolio.</p>
          <a href="#hero" onClick={onNavigate} className="back-to-top">
            Back to top <span aria-hidden="true">&uarr;</span>
          </a>
        </div>
      </div>
    </footer>
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
  const [formErrors, setFormErrors] = useState({});
  const [showDemoNotice, setShowDemoNotice] = useState(false);

  useEffect(() => {
    const scrollToHashTarget = () => {
      const target = document.getElementById(window.location.hash.slice(1));
      target?.scrollIntoView();
    };

    scrollToHashTarget();
    window.addEventListener('hashchange', scrollToHashTarget);
    return () => window.removeEventListener('hashchange', scrollToHashTarget);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    setIsMenuOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setShowDemoNotice(false);
    if (formErrors[name]) {
      setFormErrors((prevErrors) => {
        const nextErrors = { ...prevErrors };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!emailPattern.test(formData.email)) {
      errors.email = 'Please enter a valid email address (e.g., name@example.com).';
    }
    if (!formData.message.trim()) errors.message = 'Please enter a message.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setShowDemoNotice(false);
      e.currentTarget.elements.namedItem(Object.keys(errors)[0]).focus();
      return;
    }

    setFormErrors({});
    setShowDemoNotice(true);
  };

  return (
    <div className="portfolio-app">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="navbar">
        <div className="nav-container">
          <a href="#hero" onClick={handleScroll} className="nav-logo">
            Portfolio<span aria-hidden="true" className="logo-dot">.</span>
          </a>
          
          <nav id="primary-navigation" aria-label="Main navigation" className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#about" onClick={handleScroll}>About</a>
            <a href="#projects" onClick={handleScroll}>Projects</a>
            <a href="#contact" onClick={handleScroll}>Contact</a>
          </nav>

          <button
            type="button"
            className="menu-btn"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
          >
            <span aria-hidden="true" className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main id="main-content">
      <section id="hero" className="hero-section" aria-labelledby="hero-title">
        <div className="hero-container">
          <div className="hero-badge">
            <span aria-hidden="true" className="badge-dot"></span>
            JUNIOR FULL-STACK DEVELOPER
          </div>
          <h1 id="hero-title" className="hero-title">
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
              onClick={handleScroll}
              className="btn btn-primary"
            >
              View My Projects
              <svg 
                className="btn-icon" 
                aria-hidden="true"
                focusable="false"
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
              onClick={handleScroll}
              className="btn btn-secondary"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section" aria-labelledby="about-title">
        <div className="section-container">
          <h2 id="about-title" className="section-title">About Me</h2>
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
      <section id="projects" className="section projects-section" aria-labelledby="projects-title">
        <div className="section-container">
          <h2 id="projects-title" className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Selected work and the tools behind it.</p>

          {projectsData.length > 0 ? (
            <div className="projects-grid">
              {projectsData.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="projects-empty-state">
              <h3>Project details coming soon</h3>
              <p>Verified project details will appear here once they're ready to share.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section" aria-labelledby="contact-title">
        <div className="section-container">
          <h2 id="contact-title" className="section-title text-center">Get In Touch</h2>
          <p className="contact-description text-center">
            I'm currently looking for new opportunities as a Junior Full-Stack Developer. 
            Whether you have a question or just want to say hi, send me a message below!
          </p>

          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            {Object.keys(formErrors).length > 0 && (
              <div className="form-alert error-alert" role="alert">
                Please correct the highlighted fields.
              </div>
            )}
            {showDemoNotice && (
              <div className="form-alert info-alert" role="status" aria-live="polite">
                This contact form is currently a frontend demo. Messages are not being sent yet.
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
                autoComplete="name"
                required
                aria-invalid={Boolean(formErrors.name)}
                aria-describedby={formErrors.name ? 'name-error' : undefined}
              />
              {formErrors.name && <span className="field-error" id="name-error">{formErrors.name}</span>}
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
                autoComplete="email"
                required
                aria-invalid={Boolean(formErrors.email)}
                aria-describedby={formErrors.email ? 'email-error' : undefined}
              />
              {formErrors.email && <span className="field-error" id="email-error">{formErrors.email}</span>}
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
                required
                aria-invalid={Boolean(formErrors.message)}
                aria-describedby={formErrors.message ? 'message-error' : undefined}
              ></textarea>
              {formErrors.message && <span className="field-error" id="message-error">{formErrors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </section>
      </main>
      <Footer onNavigate={handleScroll} />
    </div>
  );
}

export default App;