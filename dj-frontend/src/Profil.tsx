import './App.css'
import './Profil.css'
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import MenuBar from './MenuBar';
import SectionTitle from './SectionTitle';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  avatar: File | null;
}

function Profil() {
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    avatar: null,
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        avatar: file,
      }));
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Ajoutez ici la logique pour envoyer les données du formulaire au serveur
    console.log('Formulaire soumis avec les données:', formData);

    // Requête fetch pour la modification du profil de l'utilisateur
    fetch('http://localhost:3000/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token : localStorage.getItem('token'),
        username: localStorage.getItem('userConnectedUsername'), 
        firstname: formData.firstName,
        lastname: formData.lastName,
        email : formData.email,
        avatar: formData.avatar 
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
        
      }
      
    })
    .catch(error => {
      console.error('Error connecting user:', error);
    }), [] 
  };

    return (
      <>
        <MenuBar ></MenuBar>
        <div className='profile_panel_container'>
          <SectionTitle contenu='Profile'></SectionTitle>
          
          <div className='profile_panel_inside'>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" name="userName" value={localStorage.getItem("userConnectedUsername")!}  />
            </label>
            <br />
            <label>
              Prénom:
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </label>
            <br />

            <label>
              Nom:
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </label>
            <br />

            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <br />

            <label>
              Avatar:
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </label>
            <br />

            {formData.avatar && (
              <div>
                <p>Aperçu de l'avatar:</p>
                <img src={URL.createObjectURL(formData.avatar)} alt="Avatar Preview" style={{ width: '100px', height: '100px' }} />
              </div>
            )}

            <br />

            <button type="submit">Valider les modifications</button>
          </form>
          </div>
        
        </div>
      </>
    )
  }
  
  export default Profil