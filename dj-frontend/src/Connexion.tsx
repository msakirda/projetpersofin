import { Link, useNavigate } from 'react-router-dom';
import './App.css'
import './Connexion.css'
import React, { useCallback, useState } from 'react';
import MenuBar from './MenuBar';


function About() {
    const navigate = useNavigate();
    const [identifiant, setIdentifiant] = useState('');
    const [nouveaumotdepasse, setNouveaumotdepasse] = useState('')
    const [resaisirmotdepasse,setResaisirmotdepasse] = useState('')
    const [email,setEmail] = useState('')

    const [identifiantConnexion, setidentifiantConnexion] = useState('');
    const [nouveaumotdepasseConnexion, setnouveaumotdepasseConnexion] = useState('')
    
    const handleCreationCompte = useCallback(
        async()=>{
            const response = await fetch("http://localhost:1337/api/userpersos", {
                method: "POST", 
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    identifiant: identifiant,
                    nouveaumotdepasse: nouveaumotdepasse,
                    resaisirmotdepasse: resaisirmotdepasse,
                    email: email,

                }) 
            });
            const data = await response.json()
            console.log("reponse authentication", data);
            if(data.user){
                navigate("/")
            }
            else {
                setNouveaumotdepasse("")
                setIdentifiant("")
            }

        }, [identifiant,nouveaumotdepasse, navigate]
    )

    return (
      <>
        <MenuBar></MenuBar>
        <div className='Menu_droite_connexion'>

            <div className='Fond_container'>
                <div className='Titre_connexion'> 
                    <h1>Créer un compte</h1>
                </div>

                <div className='Information_de_connexion'>
                    <div className='inputConnexion'>
                        <label > Identifiant:</label>
                        <input  className='inputConnectionInput' type='text' value={identifiant} onChange={(e) => setIdentifiant(e.target.value)}/>
                    </div>
                    <div className='inputConnexion'>
                        <label > Nouveau mot de passe:</label>
                        <input  className='inputConnectionInput' type='password' value={nouveaumotdepasse} onChange={(e) => setNouveaumotdepasse(e.target.value)}/>
                    </div>
                    <div className='inputConnexion'>
                        <label > Resaisir mot de passe:</label>
                        <input className='inputConnectionInput' type='password' value={resaisirmotdepasse} onChange={(e)=>setResaisirmotdepasse(e.target.value)}/>
                    </div>
                    <div className='inputConnexion'>
                        <label > Saisir e-mail:</label>
                        <input  className='inputConnectionInput' type='mail' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <button className='boutonCreerCompte' onClick={handleCreationCompte}>Créer</button>
                    <div className='promptCreationCompte'>

                    </div>
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
                    <div className='promptConnexion'>

                    </div>
                </div>
            </div>
        </div>
      </>
    )
  }
  
  export default About
  