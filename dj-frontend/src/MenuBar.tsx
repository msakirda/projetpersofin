// Import des composants nécessaires depuis les bibliothèques React et React Router DOM
import { Link,  useNavigate } from "react-router-dom";
import  { useCallback, useState, useEffect } from "react";

// Import des styles CSS 
import './App.css'
import './MenuBar.css';

// Import de la bibliothèque crypto-js pour les opérations de hachage
import { isExpired, decodeToken } from "react-jwt";


// Définition du composant fonctionnel MenuBar
function MenuBar() {
  const [userConnected, setUserConnected] = useState("#UserIncognito");
  const navigate = useNavigate();
  const [isMenuOpen , setIsMenuOpen] = useState(false);
  const [avatarUrlState , setAvatarUrlState] = useState("");

  // Interface pour représenter la structure du payload du token
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
    if(userConnected !== '#UserIncognito')
    {
      setUserConnected('#UserIncognito');
      localStorage.removeItem('token')
      localStorage.setItem('userConnectedUsername' , '#UserIncognito');
      localStorage.setItem("projectToLoad" , "");
      localStorage.setItem("userConnectedAvatarUrl" , "")
      console.log("deconnexion.");
      navigate('/')

    }
  };

  const fetchAvatar = useCallback(async ()=>{
    const theToken = localStorage.getItem('token');
    const theUsername = localStorage.getItem('userConnectedUsername');
    const response = await fetch(`http://localhost:3000/getAvatar/${theToken}/${theUsername}`);
    const responseData = await response.json();
    const avatarUrl = responseData.avatarUrl;
    localStorage.setItem("userConnectedAvatarUrl" , avatarUrl?avatarUrl:"");
    setAvatarUrlState(avatarUrl?avatarUrl:"");
    
  }
  ,[])


  useEffect(() => {
    // Récupération du token depuis le stockage local
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
            setUserConnected(decodedToken.username);
          }
          ///////////////////////////////////////////////////////////////////////////////////
          fetchAvatar();
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

    setInterval(()=>{
      const token = localStorage.getItem("token")
      if(! token || isExpired(token))
      {
        handleLogout();
      }
    } , 1000)
  }, []);


  
  const handleClickNewProjectLink = ()=>{
    localStorage.setItem("projectToLoad" , "");
  }

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

  return (
    <div className="Menu_gauche">
      {/* Bouton du menu hamburger */}
      <div id="boutonSandwich" onClick={handleClickSandwich}></div>

      {/* Titre de l'application avec lien vers la page d'accueil */}
      <div className='Menu_gauche_milieu'>
        <Link to={"/"} className="Titre_application">
            <h1>SPEED ALBUM</h1>
        </Link>

        {/* Section du menu gauche (milieu) */}
      
        {/*  */}
                {userConnected !== "#UserIncognito" ? (
                  <Link className="menuOption" to="/Profil">
                    <div className="menuSection">
                      {/* Composant de profil (image, etc.) */}
                      
                      <img id="image_profile" src={(userConnected !== "#UserIncognito" && localStorage.getItem("userConnectedAvatarUrl") 
                      ? avatarUrlState 
                      : "./prof.png")
                      } alt="Profil" />
                      {userConnected} (Profile)
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
        <Link className="menuOption" to="/Nouveau_projet" onClick={handleClickNewProjectLink}>
          <div className="Titre_Nouveau_projet menuSection" >
            New Project
          </div>
        </Link>
        {/* <Link className="menuOption" to="/Sharing">
          <div className="menuSection">
            Sharing
          </div>
        </Link> */}
        {(userConnected !== "#UserIncognito" ? 
          <Link className="menuOption" to="/MyProjects">
            <div className="Titre_MyProjects menuSection">
              My Projects
            </div>
          </Link> 
          : 
          <></>
        )}
        {(userConnected !== "#UserIncognito" ? 
          <Link className="menuOption" to="/Plans">
            <div className="Titre_Plans menuSection">
              Premium
            </div>
          </Link> 
          : 
          <></>
        )}
      </div>

      {/* Section du menu gauche (bas) */}
      <div className='Menu_gauche_bas'>
        {userConnected === "#UserIncognito"  ? <></> : 
          <Link className="menuOption" to="/" onClick={handleLogout}>
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

// Export du composant MenuBar
export default MenuBar;
