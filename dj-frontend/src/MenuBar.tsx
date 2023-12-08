// Import des composants nécessaires depuis les bibliothèques React et React Router DOM
import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useCallback, useState, useEffect } from "react";

// Import des styles CSS 
import './App.css'
import './MenuBar.css';

// Import de la bibliothèque crypto-js pour les opérations de hachage
import crypto from 'crypto-js';

// Définition du composant fonctionnel MenuBar
function MenuBar() {
  // État pour gérer l'état d'ouverture/fermeture du menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // État pour stocker l'utilisateur connecté (par défaut, utilisateur inconnu)
  const [userConnected, setUserConnected] = useState("#UserIncognito");

  // Interface pour représenter la structure du payload du token
  interface TokenPayload {
    username: string;
    passwordHash: string;
    // Autres champs du token si nécessaire
  }

  // Hook de navigation fourni par React Router DOM
  const navigate = useNavigate();

  // Effet useEffect pour vérifier si un utilisateur est déjà connecté
  useEffect(() => {
    // Récupération du token depuis le stockage local
    const token = localStorage.getItem('token');

    // Vérification de l'existence du token
    if (token) {
      // Extraction des données du token
      const userTokenData: TokenPayload = JSON.parse(token);

      // Récupération du nom d'utilisateur et du mot de passe actuellement stockés localement
      const userCurrentUsername = localStorage.getItem('userConnectedUsername')!;
      const userCurrentPassword = localStorage.getItem('userConnectedPassword')!;

      // Récupération du hachage stocké dans le token
      const storedHash = userTokenData.passwordHash;

      // Vérification si le mot de passe actuel est valide en comparant les hachages
      const passwordIsValid = crypto.SHA256(userCurrentPassword).toString() === storedHash;

      // Si le mot de passe est valide et les noms d'utilisateur correspondent
      if (passwordIsValid && userCurrentUsername === userTokenData.username) {
        // Mise à jour de l'état de l'utilisateur connecté
        setUserConnected(userCurrentUsername);
        
        // Redirection vers la page du profil
        navigate("/Profil");
      } else {
        // Si les informations de connexion ne sont pas valides, déconnexion
        handleLogOut();
      }
    }
  }, []); // Le tableau de dépendances est vide, donc cet effet ne s'exécutera qu'une fois après le montage initial

  // Gestionnaire de clic pour le bouton du menu hamburger
  const handleClickSandwich = useCallback(() => {
    const menuGauche = document.querySelector('.Menu_gauche');

    // Vérification de l'existence de l'élément du menu gauche
    if (menuGauche) {
      // Ajout ou suppression de la classe "bouger" pour ouvrir ou fermer le menu
      menuGauche.classList.toggle("bouger", !isMenuOpen);
      setIsMenuOpen(prevState => !prevState);
    }
  }, [isMenuOpen]);

  // Gestionnaire de déconnexion
  const handleLogOut = () => {
    // Suppression du token du stockage local
    localStorage.removeItem('token');
    
    // Réinitialisation de l'état de l'utilisateur connecté à "Utilisateur inconnu"
    setUserConnected("#UserIncognito");
  };

  // Rendu du composant MenuBar
  return (
    <div className="Menu_gauche">
      {/* Bouton du menu hamburger */}
      <div id="boutonSandwich" onClick={handleClickSandwich}></div>

      {/* Titre de l'application avec lien vers la page d'accueil */}
      <Link to={"/"}>
        <div className="Titre_application">
          <h1>SPEEDALBUM</h1>
        </div>
      </Link>

      {/* Section du menu gauche (milieu) */}
      <div className='Menu_gauche_milieu'>
        {/* Affichage du profil ou du lien de connexion en fonction de l'état de connexion */}
        {userConnected !== "#UserIncognito" ? (
          <Link className="menuOption" to="/Profil">
            <div className="menuSection">
              {/* Image du profil (à remplacer par une image réelle) */}
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

        {/* Liens vers les pages Nouveau_projet et Sharing */}
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

      {/* Section du menu gauche (bas) */}
      <div className='Menu_gauche_bas'>
        {/* Liens vers les pages About et Contact */}
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

// Export du composant MenuBar
export default MenuBar;
