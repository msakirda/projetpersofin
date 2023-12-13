import './App.css'
import './Profil.css'
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import MenuBar from './MenuBar';
import SectionTitle from './SectionTitle';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone:string;
  address:string;
  country:string;
}

function Profil() {
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone : '',
    address:'',
    country:'',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const theToken = localStorage.getItem('token')
        const theUsername = localStorage.getItem('userConnectedUsername')

        const response = await fetch(`http://localhost:3000/getProfile/${theToken}/${theUsername}`);

        // if (!response.ok) {
        //   console.log("pas de réponse du serveur , c'est normal si l utilisateur viens d'etre créé");
        //   return;
        // }

        const responseData = await response.json();
        // Faites quelque chose avec les données reçues
        const datasReceived:FormData = {
          firstName:responseData.firstname,
          lastName:responseData.lastname,
          email:responseData.email,
          phone:responseData.phone,
          address:responseData.address,
          country:responseData.country,
        }
        setFormData(datasReceived)

        console.log(responseData);
        

      } catch (error) {
        console.error('Error fetching profile:', error);
        // Gérez l'erreur ici si nécessaire
      }
    };

    fetchData(); // Appelez la fonction fetchData ici

  }, []);

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
          phone:formData.phone,
          address:formData.address,
          country:formData.country,
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
        
        <div className='top_zone zone' >
          <div className='basic_infos zone'>
            <div className='label-input-container'>
              <label className='labelProfile'>
                Username:
              </label>
                <input type="text" name="userName" defaultValue={localStorage.getItem("userConnectedUsername")!}  disabled />
            </div>
            <div className='label-input-container'>
              <label className='labelProfile'>
                Prénom:
              </label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className='label-input-container'>
              <label className='labelProfile'>
                Nom:
              </label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div className='label-input-container'>
              <label className='labelProfile'>
                Email:
              </label>
                <input type="email" name="email" defaultValue={localStorage.getItem("userConnectedEmail")!}  disabled />
            </div>
            <div className='label-input-container'>
              <label className='labelProfile'>
                Phone:
              </label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className='label-input-container'>
              <label className='labelProfile'>
                Address:
              </label>
                <input type="string" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className='label-input-container'>
              <label className='labelProfile'>
                Country:
              </label>
                <input type="string" name="country" value={formData.country} onChange={handleChange} />
            </div>
            <button className='buttonValidateBasicInfos' onClick={handleSubmit}>Valider les modifications</button>
          </div>
          <div className='changeAvatar_zone zone'>

          </div>
        </div>
        <div className='changing_zone zone'>
          <div className='changePassword_zone zone'>

          </div>
          <div className='changeEmail_zone zone'>

          </div>
        </div>
      </div>
    </>
  )
}
  
  export default Profil