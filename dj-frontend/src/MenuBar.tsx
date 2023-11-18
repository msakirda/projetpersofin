import { Link } from "react-router-dom";
import React, { useCallback, useState } from "react";
import './App.css'
import './MenuBar.css';

function MenuBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleClickSandwich = useCallback(() => {
    const menuGauche = document.querySelector('.Menu_gauche');

    if (menuGauche) {
      menuGauche.classList.toggle("bouger", !isMenuOpen);
      setIsMenuOpen(prevState => !prevState);
    }
  }, [isMenuOpen]);

  return (
    <div className="Menu_gauche">
      <div className="Titre_application">
        <h1>SPEEDALBUM</h1>
      </div>
      <div id="boutonSandwich" onClick={handleClickSandwich}>
        {/* Vous pouvez ajouter un icône de bouton sandwich ici */}
      </div>
      <div className='Menu_gauche_milieu'>
        <div className="Titre_Nouveau_projet">
          <Link to="/Nouveau_projet">Nouveau Projet</Link>
          <Link to="/Connexion">CONNEXION</Link>
        </div>
      </div>
      <div className='Menu_gauche_bas'>
        <div className="Titre_About">
          <Link to="/About">About</Link>
        </div>
        <div className="Titre_Contact">
          <Link to="/Contact">Contact</Link>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
