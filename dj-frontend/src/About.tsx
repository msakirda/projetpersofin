import './App.css'
import React from 'react';
import MenuBar from './MenuBar';
import './About.css'
import SectionTitle from './SectionTitle';


function About() {
    

    return (
      <>
        <MenuBar ></MenuBar>
        <SectionTitle contenu="About..."></SectionTitle>
          
      <div className='right_part'>
          <header>
            <h1>About SpeedAlbum</h1>
          </header>

          <section>
            <h2>Our Story</h2>
            <p>Welcome to SpeedAlbum, where creating stunning video slideshows is as easy as 1-2-3. We believe in simplicity and creativity.</p>

            <h2>How It Works</h2>
            <p>SpeedAlbum allows you to effortlessly create video slideshows by filling pages with subtitles and uploading your favorite images. Our platform then takes care of the rest, turning your content into beautiful and engaging slideshows.</p>

            <h2>Why Choose SpeedAlbum?</h2>
            <p> - Easy-to-use: No technical expertise required. Just fill in the subtitles and upload your images.</p>
            <p> - Quick Results: Generate professional-looking slideshows in minutes.</p>
            <p> - Customization: Tailor your slideshows to fit your style with various customization options.</p>

            <h2>Contact Us</h2>
            <p>Have questions or suggestions? We'd love to hear from you! Reach out to us at <a href="mailto:info@speedalbum.com">info@speedalbum.com</a>.</p>
          </section>

        </div>
      

      </>
    )
  }
  
  export default About
  