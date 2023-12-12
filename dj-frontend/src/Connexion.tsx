import { Link, useNavigate } from 'react-router-dom';
import './App.css'
import './Connexion.css'
import React, { useCallback, useState } from 'react';
import MenuBar from './MenuBar';
import SectionTitle from './SectionTitle';


function Connection() {
    
    const navigate = useNavigate(); // Utilisation du hook useNavigate pour la navigation

    // Utilisation de useState pour gérer l'état des champs du formulaire
    const [identifiant, setIdentifiant] = useState('');
    const [nouveaumotdepasse, setNouveaumotdepasse] = useState('')
    const [resaisirmotdepasse,setResaisirmotdepasse] = useState('')
    const [email,setEmail] = useState('')
    const [serverResponseCreation , setserverResponseCreation] = useState([""])

    const [identifiantConnexion, setidentifiantConnexion] = useState('');
    const [nouveaumotdepasseConnexion, setnouveaumotdepasseConnexion] = useState('')
    const [serverResponseConnection , setserverResponseConnection] = useState([""])

    const [showPromptConnexion , setShewPromptConnexion] = useState(false);
    const [showPromptCreation , setShewPromptCreation] = useState(false);
  
    // Fonction de gestion de la création de compte
    const handleCreationCompte = useCallback(
        async()=>{
            // Construction de l'objet userData avec les données du formulaire
            const userData = {
                username: identifiant,
                email: email,
                password: nouveaumotdepasse,
              };
              // Réinitialisation du tableau de réponses du serveur
              setserverResponseCreation([]);
              // Vérification des champs
              if(!identifiant || !nouveaumotdepasse || !resaisirmotdepasse || !email)
              {
                setserverResponseCreation([..."Certains champs ne sont pas remplis."]);
                setShewPromptCreation(true);
                return;
              }
               if(nouveaumotdepasse !== resaisirmotdepasse)
              {
                setserverResponseCreation([..."Les deux mots de passe ne sont pas identiques."]);
                setShewPromptCreation(true);
                return;
                }
               if(!email.includes('@'))
              {
                setserverResponseCreation([..."Email au mauvais format."]);
                setShewPromptCreation(true);
                return;
              }
              
              // Requête fetch pour créer un utilisateur
              fetch(`http://localhost:3000/users/create/${identifiant}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                

                return response.json();
              })
              .then(data => {
                console.log(data);
                if(!data.exists)
                {
                    // Mise à jour de l'état et stockage local du token
                    setserverResponseCreation(data.response);
                    if(!localStorage.getItem('token'))
                    {
                      localStorage.setItem('token', data.token);
                      localStorage.setItem('userConnectedUsername' , identifiant)
                      localStorage.setItem('userConnectedPassword' , nouveaumotdepasse)
                    }
                    // Réinitialisation des champs du formulaire
                    setIdentifiant('');
                    setNouveaumotdepasse('');
                    setResaisirmotdepasse('');
                    setEmail('');
                    console.log(data.response);
                    
                    // Redirection vers le profil après une courte attente
                    setShewPromptCreation(true)
                    setTimeout( ()=>{
                        navigate('/Profil')
                    } , 1000)
                }
              })
              .catch(error => {
                console.error('Error creating user:', error);
              });
              

        }, [identifiant,nouveaumotdepasse, navigate, email]
    )
    // Fonction de gestion de la connexion
    const handleClickConnection = useCallback(() => {
        // Réinitialisation du tableau de réponses du serveur
        setserverResponseConnection([]);
        // Vérification des champs
        if(!identifiantConnexion || !nouveaumotdepasseConnexion)
        {
            setserverResponseConnection([..."Certains champs ne sont pas remplis."]);
            setShewPromptConnexion(true);
            return;
        }

        // Requête fetch pour la connexion de l'utilisateur
        fetch('http://localhost:3000/users/connect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: identifiantConnexion,
            password: nouveaumotdepasseConnexion,
          }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            if (data.signedUp) {
              // Mise à jour de l'état et stockage local du token
                setserverResponseConnection(data.message);
                setShewPromptConnexion(true)
                if(!localStorage.getItem('token'))
                {
                  console.log(data.token)
                  localStorage.setItem('token', data.token.toString());
                  localStorage.setItem('userConnectedUsername' , identifiant)
                  console.log(identifiant);
                  
                  localStorage.setItem('userConnectedPassword' , nouveaumotdepasse)
                }
                // Réinitialisation des champs du formulaire
                setidentifiantConnexion('');
                setnouveaumotdepasseConnexion('');
                // Redirection vers le profil après une courte attente
                setTimeout( ()=>{
                    navigate('/Profil')
                } , 1000)
            }
            else{
                setserverResponseConnection(data.message)
                setShewPromptConnexion(true)
            }
          })
          .catch(error => {
            console.error('Error connecting user:', error);
          });
      }, [identifiantConnexion, nouveaumotdepasseConnexion, navigate]);
      
    // Rendu du composant Connection
    return (
      <>
        <MenuBar ></MenuBar>
        <div className='Menu_droite_connexion'>
            <SectionTitle  contenu='Connexion' ></SectionTitle>
            <div className='Fond_container'>

                <div className='Information_de_connexion'>
                    <div className='Titre_connexion'> 
                        <h1>Créer un compte</h1>
                    </div>
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
                    <div className='zoneValidationCreationCompte'>
                        <button className='boutonCreerCompte' onClick={handleCreationCompte}>Créer</button>
                        <div className='promptCreationCompte'  style={{ display: showPromptCreation ? 'block' : 'none' }}>
                            {serverResponseCreation}
                        </div>
                    </div>
                </div>


                <div className='Information_de_connexion_connexion'>
                    <div className='Titre_connexion2'> 
                        <h1>Se connecter</h1>
                    </div>
                    <div className='inputConnexion'>
                        <label > Identifiant:</label>
                        <input  className='inputConnectionInput' type='text' value={identifiantConnexion} onChange={(e) => setidentifiantConnexion(e.target.value)}/>
                    </div>
                    <div className='inputConnexion'>
                        <label > Mot de passe:</label>
                        <input   className='inputConnectionInput' type='password' value={nouveaumotdepasseConnexion} onChange={(e) => setnouveaumotdepasseConnexion(e.target.value)}/>
                    </div>
                    <div className='zoneValidationConnexion'>
                        <button className='boutonConnexion' onClick={handleClickConnection}>
                            Connexion
                        </button>
                        <div className='promptConnexion' style={{ display: showPromptConnexion ? 'block' : 'none' }} >
                            {serverResponseConnection}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
  }
  // Export du composant Connection
  export default Connection
  