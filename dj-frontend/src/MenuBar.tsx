import { Link } from "react-router-dom";
import './App.css'



function MenuBar(){



    return (
        <div className="Menu_gauche">
            <div className="Titre_application"> 
            <h1>SPEEDALBUM</h1>
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
    )
}

export default MenuBar;