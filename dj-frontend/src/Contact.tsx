// Import des fichiers CSS et du module React et useState depuis React
import './App.css'
import './Contact.css'
import React, { useState } from 'react';

// Import du composant MenuBar
import MenuBar from './MenuBar';


// Définition du composant fonctionnel Contact
const Contact = () => {
  // Utilisation de useState pour gérer l'état du formulaire
  const [formData, setFormData] = useState({
    userName: '',
    message: '',
  });
  // Fonction handleChange pour mettre à jour l'état lorsqu'un champ du formulaire change
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Fonction handleSubmit pour gérer la soumission du formulaire
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();     // Empêche le comportement par défaut du formulaire (rechargement de la page)

    // Affiche les données dans la console (simule l'envoi à un serveur)
    console.log('Nom d\'utilisateur:', formData.userName);
    console.log('Message:', formData.message);
    // Réinitialise les champs du formulaire après la soumission
    setFormData({
      userName: '',
      message: '',
    });
  };
  // Rendu du composant Contact
  return (
    <>
      <MenuBar ></MenuBar>
      <div className='right_menu'>
        <div className='allContactForm'>
          <h1>Contact-us</h1>
          <form onSubmit={handleSubmit} className='formPart'>
            <div className='username_part'>
              <label htmlFor="userName">Username:</label>
              <br />
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>
            <div className='message_part'>
              <label htmlFor="message">Message:</label>
              <br />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className="bouton_envoyer">
              <button  type="submit">Envoyer</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
// Export du composant Contact
export default Contact;

  