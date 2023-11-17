import { Link } from 'react-router-dom';
import './App.css'
import React, { useState } from 'react';


function About() {
    const [identifiant, setIdentifiant] = useState('');
    const [nouveaumotdepasse, setNouveaumotdepasse] = useState('')
    const [resaisirmotdepasse,setResaisirmotdepasse] = useState('')
    const [email,setEmail] = useState('')

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
                            <label> Identifiant:
                                <input type='text' value={identifiant} onChange={(e) => setIdentifiant(e.target.value)}/>
                            </label>
                            <label> Nouveau mot de passe:
                                <input type='text' value={nouveaumotdepasse} onChange={(e) => setNouveaumotdepasse(e.target.value)}/>
                            </label>
                            <label> Resaisir mot de passe:
                                <input type='text' value={resaisirmotdepasse} onChange={(e)=>setResaisirmotdepasse(e.target.value)}/>
                            </label>
                            <label> Saisir e-mail:
                                <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </label>
                            </div>
                        <div className='Titre_connexion2'> 
                            <h1>Se connecter</h1>
                        </div>




                        


                    </div>



              </div>


      

      </>
    )
  }
  
  export default About
  