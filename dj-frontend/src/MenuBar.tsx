import { Link } from "react-router-dom";
import React, { useCallback, useState } from "react";
import './App.css'
import './MenuBar.css';

function MenuBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="Titre_application">
            <h1>SPEEDALBUM</h1>
        </div>
      
        <div className='Menu_gauche_milieu'>
            <div className="Titre_Nouveau_projet menuSection">
                <Link className="menuOption" to="/Nouveau_projet">Nouveau Projet</Link>
            </div>
            <div className="menuSection">
                <Link className="menuOption" to="/Connexion">Connexion</Link>
            </div>
        </div>

        <div className='Menu_gauche_bas'>
            <div className="Titre_About menuSection">
                <Link className="menuOption" to="/About">About</Link>
            </div>
            <div className="Titre_Contact menuSection">
                <Link className="menuOption" to="/Contact">Contact</Link>
            </div>
        </div>
    </div>
  );
}

export default MenuBar;
