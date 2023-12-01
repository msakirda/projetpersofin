import { Link } from "react-router-dom";
import React, { useCallback, useState } from "react";
import './App.css'
import './MenuBar.css';

function MenuBar(props:{connected:boolean}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userConnected , setUserConnected] = useState("#UserIncognito")

  const handleClickSandwich = useCallback(() => {
    const menuGauche = document.querySelector('.Menu_gauche');

    if (menuGauche) {
      menuGauche.classList.toggle("bouger", !isMenuOpen);
      setIsMenuOpen(prevState => !prevState);
    }
  }, [isMenuOpen]);

  return (
    <div className="Menu_gauche">
        <div id="boutonSandwich" onClick={handleClickSandwich}>
        
        </div>
        <Link to={"/"}>
          <div className="Titre_application">
              <h1>SPEEDALBUM</h1>
          </div>
        </Link>
      
        <div className='Menu_gauche_milieu'>
        
                                {props.connected ? 
                                (
                                  // Si l'utilisateur est connecté, afficher le lien vers la page de profil
                                  <Link className="menuOption" to="/Profil">
                                    <div className="menuSection">
                                      {/* Composant de profil (image, etc.) */}
                                      <img id="image_profile" src="prof.png" alt="Profil" />
                                      {userConnected}
                                    </div>
                                  </Link>
                                ) 
                                : (
                                  // Sinon, afficher les options de connexion
                                  
                                    <Link className="menuOption" to="/Connexion">
                                      <div className="menuSection">
                                        Connexion
                                      </div>
                                    </Link>
                                )}
            <Link className="menuOption" to="/Nouveau_projet">
              <div className="Titre_Nouveau_projet menuSection">
                New Project
              </div>
            </Link>
            <Link className="menuOption" to="/Sharing">
              <div className="menuSection">
                Sharing
              </div>
            </Link>

        </div>

        <div className='Menu_gauche_bas'>
          <Link className="menuOption" to="/About">
            <div className="Titre_About menuSection">
              About
            </div>
          </Link>
      
          <Link className="menuOption" to="/Contact">
            <div className="Titre_Contact menuSection">
              Contact
            </div>
          </Link>
        </div>
    </div>
  );
}

export default MenuBar;
