import React from "react";
import "./AboutPage.css";
import ThemeTogle from "../components/ThemeTogle";

function AboutPage() {
  return (
    <div className="about-page">
      <ThemeTogle />
      <div className="about-container">
        <h2>About the Cat Gallery</h2>

        <section className="about-section">
          <h3>Welcome to Our Cat Gallery!</h3>
          <p>
            This application is a delightful showcase of cats from around the
            world, powered by TheCatAPI. Our gallery provides a seamless
            experience for cat lovers to explore various breeds and categories
            of our feline friends.
          </p>
        </section>

        <section className="about-section">
          <h3>Features</h3>
          <ul>
            <li>Browse through an extensive collection of cat images</li>
            <li>Filter cats by specific breeds</li>
            <li>Explore different categories of cat photos</li>
            <li>Infinite scroll for continuous browsing</li>
            <li>Responsive design for all devices</li>
          </ul>
        </section>

        <section className="about-section">
          <h3>How to Use</h3>
          <ol>
            <li>Scroll through the gallery on the home page</li>
            <li>Use filters to find specific breeds or categories</li>
            <li>Click on images to view them in full size</li>
            <li>Keep scrolling to load more content automatically</li>
          </ol>
        </section>

        <section className="about-section">
          <h3>Technical Details</h3>
          <p>
            Built with React.js and powered by TheCatAPI, this application
            demonstrates modern web development practices including:
          </p>
          <ul>
            <li>Redux state management</li>
            <li>Responsive design principles</li>
            <li>RESTful API integration</li>
            <li>Infinite scroll implementation</li>
          </ul>
        </section>

        <section className="about-section">
          <h3>Contact & Support</h3>
          <p>Have questions or suggestions? Feel free to reach out to us:</p>
          <a href="mailto:support@catgallery.com" className="contact-link">
            support@catgallery.com
          </a>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
