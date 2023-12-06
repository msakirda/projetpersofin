import { Link } from "react-router-dom";
import React, { useCallback, useState, useEffect } from "react";
import './App.css'
import './MenuBar.css';
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
import * as jsrsasign from 'jsrsasign';




function MenuBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userConnected, setUserConnected] = useState("#UserIncognito");

  interface TokenPayload {
    username: string;
    passwordHash: string;
    // Autres champs du token
  }
  
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt.decode(token) as TokenPayload;
  
        // Assurez-vous d'avoir les informations actuelles de l'utilisateur (nom d'utilisateur et mot de passe)
        const userCurrentUsername = localStorage.getItem('userConnectedUsername')!;
        const userCurrentPassword = localStorage.getItem('userConnectedPassword')!;
  
        const storedHash = decodedToken.passwordHash;
  
        const passwordIsValid = bcrypt.compareSync(userCurrentPassword, storedHash);
  
        if (passwordIsValid && userCurrentUsername === decodedToken.username) {
          setUserConnected(userCurrentUsername);
        } else {
          handleLogOut();
        }
      } catch (error) {
        console.error('Error comparing passwords:', error);
        handleLogOut();
      }
    }
  }, []);
  
  function extractHashFromToken(token: string): string | null {
    const decodedToken = jwt.decode(token) as TokenPayload | null;
    return decodedToken ? decodedToken.passwordHash : null;
  }
  
  function extractUsernameFromToken(token: string): string | null {
    const decodedToken = jwt.decode(token) as TokenPayload | null;
    return decodedToken ? decodedToken.username : null;
  }

  
  

  const handleClickSandwich = useCallback(() => {
    const menuGauche = document.querySelector('.Menu_gauche');

    if (menuGauche) {
      menuGauche.classList.toggle("bouger", !isMenuOpen);
      setIsMenuOpen(prevState => !prevState);
    }
  }, [isMenuOpen]);

  const handleLogOut = () => {
    // Supprimer le token du stockage local
    localStorage.removeItem('token');
    // Mettre à jour l'état de l'utilisateur connecté
    setUserConnected("#UserIncognito");
  };

  return (
    <div className="Menu_gauche">
      <div id="boutonSandwich" onClick={handleClickSandwich}></div>
      <Link to={"/"}>
        <div className="Titre_application">
          <h1>SPEEDALBUM</h1>
        </div>
      </Link>
      <div className='Menu_gauche_milieu'>
        {userConnected !== "#UserIncognito" ? (
          <Link className="menuOption" to="/Profil">
            <div className="menuSection">
              {/* Composant de profil (image, etc.) */}
              <img id="image_profile" src="prof.png" alt="Profil" />
              {userConnected}
            </div>
          </Link>
        ) : (
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
