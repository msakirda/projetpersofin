import { Link } from 'react-router-dom';
import './App.css'
import React, { useState } from 'react';


function About() {
    const [identifiant, setIdentifiant] = useState('');
    const [nouveaumotdepasse, setNouveaumotdepasse] = useState('')
    const [resaisirmotdepasse,setResaisirmotdepasse] = useState('')
    const [email,setEmail] = useState('')

    const [identifiantConnexion, setidentifiantConnexion] = useState('');
    const [nouveaumotdepasseConnexion, setnouveaumotdepasseConnexion] = useState('')
    

    return (
      <>
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
        <div className='Menu_droite_connexion'>

            <div className='Fond_container'>
                <div className='Titre_connexion'> 
                    <h1>Créer un compte</h1>
                </div>

                <div className='Information_de_connexion'>
                    <div className='inputConnexion'>
                        <label > Identifiant:</label>
                        <input  type='text' value={identifiant} onChange={(e) => setIdentifiant(e.target.value)}/>
                    </div>
                    <div className='inputConnexion'>
                        <label > Nouveau mot de passe:</label>
                        <input  type='password' value={nouveaumotdepasse} onChange={(e) => setNouveaumotdepasse(e.target.value)}/>
                    </div>
                    <div className='inputConnexion'>
                        <label > Resaisir mot de passe:</label>
                        <input type='password' value={resaisirmotdepasse} onChange={(e)=>setResaisirmotdepasse(e.target.value)}/>
                    </div>
                    <div className='inputConnexion'>
                        <label > Saisir e-mail:</label>
                        <input  type='mail' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <button className='boutonCreerCompte'>
                        Créer un compte
                    </button>
                </div>

                <div className='Titre_connexion2'> 
                    <h1>Se connecter</h1>
                </div>

                <div className='Information_de_connexion_connexion'>
                    <div className='inputConnexion'>
                        <label > Identifiant:</label>
                        <input  type='text' value={identifiantConnexion} onChange={(e) => setidentifiantConnexion(e.target.value)}/>
                    </div>
                    <div className='inputConnexion'>
                        <label > Mot de passe:</label>
                        <input  type='password' value={nouveaumotdepasseConnexion} onChange={(e) => setnouveaumotdepasseConnexion(e.target.value)}/>
                    </div>
                    <button className='boutonConnexion'>
                        Connexion
                    </button>
                </div>
            </div>
        </div>
      </>
    )
  }
  
  export default About
  