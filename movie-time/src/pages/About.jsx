const About = () => {
  return (
    <div className="main-content">
      <div className="container">
        <div className="about-page">
          <div className="about-header">
            <h1>About BingeBliss</h1>
            <p className="about-subtitle">
              Your ultimate destination for discovering movies
            </p>
          </div>

          <div className="about-content">
            <div className="about-section">
              <h2>What is BingeBliss?</h2>
              <p>
                BingeBliss is a modern, minimalist movie discovery platform that helps you 
                find your next favorite film. Built with React and powered by The Movie Database (TMDb), 
                we provide you with comprehensive movie information and a seamless browsing experience.
              </p>
            </div>

            <div className="about-section">
              <h2>Features</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <h3>Smart Search</h3>
                  <p>Find any movie with our powerful search functionality</p>
                </div>
                <div className="feature-card">
                  <h3>Favorites</h3>
                  <p>Save your favorite movies for easy access later</p>
                </div>
                <div className="feature-card">
                  <h3>Responsive Design</h3>
                  <p>Perfect experience on desktop, tablet, and mobile</p>
                </div>
                <div className="feature-card">
                  <h3>Rich Information</h3>
                  <p>Get detailed information about movies, ratings, and more</p>
                </div>
              </div>
            </div>

            <div className="about-section">
              <h2>Technology</h2>
              <p>
                Built with modern web technologies including React, React Router, 
                and integrated with The Movie Database API for accurate and up-to-date movie information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;