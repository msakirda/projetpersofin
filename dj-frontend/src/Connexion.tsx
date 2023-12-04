import { Link, useNavigate } from 'react-router-dom';
import './App.css'
import './Connexion.css'
import React, { useCallback, useState } from 'react';
import MenuBar from './MenuBar';


function Connection() {
    
    const navigate = useNavigate();
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
  

    const handleCreationCompte = useCallback(
        async()=>{
            const userData = {
                username: identifiant,
                email: email,
                password: nouveaumotdepasse,
              };

              setserverResponseCreation([]);
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
                    setIdentifiant('');
                    setNouveaumotdepasse('');
                    setResaisirmotdepasse('');
                    setEmail('');
                    //ici , passer a letat connecté pour toute l app
                    console.log(data.response);
                    
                    setserverResponseCreation(data.response);
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

    const handleClickConnection = useCallback(() => {

        setserverResponseConnection([]);
        if(!identifiantConnexion || !nouveaumotdepasseConnexion)
        {
            setserverResponseConnection([..."Certains champs ne sont pas remplis."]);
            setShewPromptConnexion(true);
            return;
        }


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
                setidentifiantConnexion('');
                setnouveaumotdepasseConnexion('');
                // ici, passer à l'état connecté pour toute l'app
                setserverResponseConnection(data.message);
                setShewPromptConnexion(true)
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
      

    return (
      <>
        <MenuBar connected={false}></MenuBar>
        <div className='Menu_droite_connexion'>

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
  
  export default Connection
  