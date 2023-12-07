import './App.css'
import './Contact.css'
import React, { useState } from 'react';
import MenuBar from './MenuBar';



const Contact = () => {
  const [formData, setFormData] = useState({
    userName: '',
    message: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter le code pour envoyer les données du formulaire (formData) à votre backend
    // ou effectuer toute autre action souhaitée (par exemple, envoyer un e-mail).
    console.log('Nom d\'utilisateur:', formData.userName);
    console.log('Message:', formData.message);
    // Réinitialiser le formulaire après la soumission si nécessaire
    setFormData({
      userName: '',
      message: '',
    });
  };

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

export default Contact;

  