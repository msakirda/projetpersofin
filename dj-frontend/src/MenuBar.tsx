import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useCallback, useState, useEffect } from "react";
import './App.css'
import './MenuBar.css';
import crypto from 'crypto-js';  // Use crypto-js for client-side hashing





function MenuBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userConnected, setUserConnected] = useState("#UserIncognito");

  interface TokenPayload {
    username: string;
    passwordHash: string;
    // Autres champs du token
  }

  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Assume the token contains user information or is a hash of user data
      const userTokenData = JSON.parse(token);

      // Assurez-vous d'avoir les informations actuelles de l'utilisateur (nom d'utilisateur et mot de passe)
      const userCurrentUsername = localStorage.getItem('userConnectedUsername')!;
      const userCurrentPassword = localStorage.getItem('userConnectedPassword')!;

      // Example: Hash the password and compare it with the stored hash in the token
      const storedHash = userTokenData.passwordHash;
      const passwordIsValid = crypto.SHA256(userCurrentPassword).toString() === storedHash;

      console.log(userCurrentUsername , userCurrentPassword);

      if (passwordIsValid && userCurrentUsername === userTokenData.username) {
        setUserConnected(userCurrentUsername);
        
        
        navigate("/Profil")
      } else {
        handleLogOut();
      }
    }
  }, []);
  

  
  

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
