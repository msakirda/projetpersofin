import './App.css'
import './Profil.css'
import  { ChangeEvent, useEffect, useState } from 'react';
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
  
  //change password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  //change email states
  const [newEmail, setNewEmail] = useState("");
  const [repeatNewEmail, setRepeatNewEmail] = useState("");

  //basic infos state
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: localStorage.getItem("userConnectedEmail")!,
    phone : '',
    address:'',
    country:'',
  });

  // Separate state for avatar
  const [avatar, setAvatar] = useState<string >();
  const [avatarFile, setAvatarFile] = useState<File >();



  useEffect(() => {
    ///////////////////////////////////////////////////////get Profile infos
    const fetchData = async () => {
      try {
        const theToken = localStorage.getItem('token')
        const theUsername = localStorage.getItem('userConnectedUsername')

        const response = await fetch(`http://localhost:3000/getProfile/${theToken}/${theUsername}`);

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

    ///////////////////////////////////////////////////////get avatar
    const fetchAvatar = async () => {
      try {
        const theToken = localStorage.getItem('token');
        const theUsername = localStorage.getItem('userConnectedUsername');
    
        const response = await fetch(`http://localhost:3000/getAvatar/${theToken}/${theUsername}`);
    
        const responseData = await response.json();
        const avatarUrl = responseData.avatarUrl;
        localStorage.setItem("userConnectedAvatarUrl" , avatarUrl);
    
        // Maintenant, vous avez l'URL de l'avatar
        console.log('Avatar URL:', avatarUrl);
    
        // Vous pouvez maintenant utiliser cette URL pour afficher l'image dans votre composant React
        setAvatar(avatarUrl);
        window.location.reload();
      } catch (error) {
        console.error('Error fetching avatar:', error);
        // Gérez l'erreur ici si nécessaire
      }
    };
    

    fetchAvatar(); // Appelez la fonction fetchData ici
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
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      setAvatarFile(file);
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
  

  const handleClickChangePassword = async () => {
    try {
      const storageUsername = localStorage.getItem('userConnectedUsername');
      const storageToken = localStorage.getItem('token');
  
      const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
      };
      
      // Add Authorization header only if storageToken is present
      if (storageToken) {
        headers['Authorization'] = storageToken;
      }
      
      const response = await fetch('http://localhost:3000/api/changePassword', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          token: storageToken,
          username: storageUsername,
          currentPassword,
          newPassword,
        }),
      });
      
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log(responseData.message);
  
      // Réinitialisez les champs de mot de passe dans votre état local si nécessaire
      setCurrentPassword('');
      setNewPassword('');
      setRepeatNewPassword('');
  
      // Gérez la réponse ici si nécessaire
    } catch (error) {
      console.error('Error changing password:', error);
      // Gérez l'erreur ici si nécessaire
    }
  };
  

  async function handleClickChangeEmail() {
    try {
      const storageUsername = localStorage.getItem('userConnectedUsername');
      const storageToken = localStorage.getItem('token');
  
      const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
      };
      
      // Add Authorization header only if storageToken is present
      if (storageToken) {
        headers['Authorization'] = storageToken;
      }
      
      const response = await fetch('http://localhost:3000/api/changeEmail', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          token: storageToken,
          username: storageUsername,
          newEmail,
        }),
      });
      
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      else{
        localStorage.setItem("userConnectedEmail" , newEmail)
        formData.email = newEmail;
        window.location.reload();
      }
  
      const responseData = await response.json();
      console.log(responseData.message);
  
      // Réinitialisez les champs de mot de passe dans votre état local si nécessaire
      setNewEmail('');
      setRepeatNewEmail('');
  
      // Gérez la réponse ici si nécessaire
    } catch (error) {
      console.error('Error changing password:', error);
      // Gérez l'erreur ici si nécessaire
    }
  }

  const handleAvatarSubmit = async () => {
    try {
      const storageToken = localStorage.getItem('token')!;
      const storageUsername = localStorage.getItem('userConnectedUsername')!;
      

      const formDataTMP = new FormData();
      formDataTMP.append('token', storageToken);
      formDataTMP.append('username', storageUsername);
      formDataTMP.append('avatar', avatarFile!);

      console.log(storageToken);
      

      const response = await fetch('http://localhost:3000/api/changeAvatar', {
        method: 'PUT',
        body: formDataTMP,
        headers: {
          // Omit 'Content-Type' header when using FormData, it will be set automatically
          'Authorization': `Bearer ${storageToken}`, // Include the token here
        },
      });

  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log(responseData.message);
      // Handle the successful response here, if needed
    } catch (error) {
      console.error('Error changing avatar:', error);
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
                <input type="email" name="email" defaultValue={formData.email}  disabled />
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
          <input type="file" name="file" id="file" className="inputfile" onChange={handleAvatarChange}/>
          <label htmlFor="file">Choose a file</label>

              
              {
              
              avatar ? (
                <div className='imageProfilDiv'>
                  <img src={avatar!} alt="Avatar Preview" style={{ width: '100px', height: '100px' }} />
                </div>
              )
                :
                <img className="imageProfileUndefined" src="../prof.png" alt=""  />

            }
            <button onClick={handleAvatarSubmit}>Changer l'avatar</button>
</div>

        </div>
        <div className='changing_zone zone'>

          <div className='changePassword_zone zone'>
            <div className='label-input-container'>
              <label className='labelProfile'>
                Current password:
              </label>
                <input type="string" name="currentPassword" value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} />
            </div>
            <div className='label-input-container'>
              <label className='labelProfile'>
                New password:
              </label>
                <input type="string" name="newPassword" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
            </div>
            <div className='label-input-container'>
                <label className='labelProfile'>
                Repeat New password:
                </label>
                  <input type="string" name="newPassword" value={repeatNewPassword} onChange={(e)=>setRepeatNewPassword(e.target.value)} />
            </div>
            <button className="buttonClickChangePassword" onClick={handleClickChangePassword}>Change Password</button>
          </div>

          <div className='changeEmail_zone zone'>
            <div className='label-input-container'>
              <label className='labelProfile'>
                New email:
              </label>
                <input type="string" name="newEmail" value={newEmail} onChange={(e)=>setNewEmail(e.target.value)} />
            </div>
            <div className='label-input-container'>
              <label className='labelProfile'>
                Repeat new email:
              </label>
                <input type="string" name="repeatNewEmail" value={repeatNewEmail} onChange={(e)=>setRepeatNewEmail(e.target.value)} />
            </div>
            <button className="buttonClickChangeEmail" onClick={handleClickChangeEmail}>Change email</button>
          </div>

        </div>
      </div>
    </>
  )
}
  
  export default Profil