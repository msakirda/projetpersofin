// Import des modules React, Link pour les liens react-router, CSS et MenuBar

import './App.css'
import './Home.css'
import MenuBar from './MenuBar'
import SectionTitle from './SectionTitle'


// Définition du composant fonctionnel Home
function Home() {
    
    // Rendu du composant Home
    return (
      <>
          <MenuBar ></MenuBar>
          <SectionTitle contenu="Home..."></SectionTitle>
          <div className='right_part'>
              <p className='texte_haut'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/_4EjGXRDOH0?si=DCqxV4KPlepE5_D5" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>              
              <p className='texte_bas'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
          </div>
        
      </>
    )
  }
  // Export du composant Home
  export default Home
  