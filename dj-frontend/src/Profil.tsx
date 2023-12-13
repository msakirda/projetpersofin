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

  const handleSubmit = async () => {
    console.log("données envoyées par le fetch updateProfile , sans compter username et token: " , formData);
  
    try {
      const storageUsername = localStorage.getItem('userConnectedUsername');
      const storageToken = localStorage.getItem('token');
      // Requête fetch pour la modification du profil de l'utilisateur
      const response = await fetch('http://localhost:3000/api/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: storageToken,
          username: storageUsername,
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log(responseData.message);
      // Handle the successful response here, if needed
  
    } catch (error) {
      console.error('Error connecting user:', error);
      // Handle the error here, if needed
    }
  };
  

  return (
    <>
      <MenuBar ></MenuBar>
      <div className='profile_panel_container'>
        <SectionTitle contenu='Profile'></SectionTitle>
        
        <div className='profile_panel_inside'>
          <label className='labelProfile'>
            Username:
            <input type="text" name="userName"  defaultValue={localStorage.getItem("userConnectedUsername")! }/>
          </label>
          <br />
          <label className='labelProfile'>
            Prénom:
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          </label>
          <br />

          <label className='labelProfile'>
            Nom:
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </label>
          <br />

          <label className='labelProfile'>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <br />

          {/* <label>
            Avatar:
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </label>
          <br />

          {formData.avatar && (
            <div>
              <p>Aperçu de l'avatar:</p>
              <img src={URL.createObjectURL(formData.avatar)} alt="Avatar Preview" style={{ width: '100px', height: '100px' }} />
            </div>
          )} */}

          <br />

          <button onClick={handleSubmit} >Valider les modifications</button>
        </div>
      
      </div>
    </>
  )
}
  
  export default Profil