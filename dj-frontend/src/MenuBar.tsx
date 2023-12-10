import React, { useState, useEffect , useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import './App.css'
import './MenuBar.css';

function MenuBar() {
  const [userConnected, setUserConnected] = useState("#UserIncognito");
  const navigate = useNavigate();
  const [isMenuOpen , setIsMenuOpen] = useState(false);

  interface TokenPayload {
    username: string;
    email: string;
    userId: number;
    // Add other properties based on your token structure
    // For example, you might have roles, permissions, expiration date, etc.
    roles: string[];
    permissions: string[];
    exp: number; // Expiration time (UNIX timestamp)
  }

  const handleLogout = () => {
    setUserConnected('#UserIncognito');
    localStorage.removeItem('token')
    localStorage.setItem('userConnectedUsername' , '#UserIncognito');
    localStorage.removeItem('userConnectedPassword');
    console.log("deconnexion.");
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    
  
    if (token && localStorage.getItem('userConnectedUsername') !== '#UserIncognito') {
      try {
        // Decode the token to get user information
        const decodedToken = decodeToken(token) as TokenPayload;
  

        console.log(localStorage.getItem('userConnectedUsername'));
        
        // No need to check for current user information as React-JWT handles this internally
        if (decodedToken && !isExpired(token) 
        ) {
          // Successful login, update state or perform other necessary actions
          if(userConnected === "#UserIncognito")
          {
            console.log(`User connected: ${decodedToken.username}`);
            setUserConnected(decodedToken.username);
          }
        } else {
          // Logout if the decoded token is null or undefined
          handleLogout();
        }
      } catch (error) {
        // Handle token decoding errors
        console.error('Error decoding token:', error);
        handleLogout();
      }
    }
    else{
      handleLogout();
    }
  }, []);


  
  

  const handleClickSandwich = useCallback(() => {
    const menuGauche = document.querySelector('.Menu_gauche');

    if (menuGauche) {
      menuGauche.classList.toggle("bouger", !isMenuOpen);
      setIsMenuOpen(prevState => !prevState);
    }
  }, [isMenuOpen]);

  return (
    <div className="Menu_gauche">
      <div id="boutonSandwich" onClick={handleClickSandwich}></div>
      <Link to={"/"}>
        <div className="Titre_application">
          <h1>SPEEDALBUM</h1>
        </div>
      </Link>
      <div className='Menu_gauche_milieu'>
        {/*  */}
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
        {/*  */}
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
        {userConnected === "#UserIncognito"  ? <></> : 
          <Link className="menuOption" to="/About" onClick={handleLogout}>
          <div className="deconnexionLink menuSection" >
            Deconnexion
          </div>
        </Link>
        }
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
