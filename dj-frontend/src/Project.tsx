import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';



interface ProjectProps {
  projectName: string;
  imageUrl: string;
}

const Project: React.FC<ProjectProps> = ({ projectName, imageUrl }) => {
  const navigate = useNavigate()

  
  const handleClickSavedProject = () =>{
    localStorage.setItem("projectToLoad" , projectName);
    navigate("/Nouveau_Projet");
  }
  

  return (

      <div onClick={handleClickSavedProject} style={{ border: '1px solid black', margin: '10px', width: '150px' , height: '150px'  , backgroundColor: "azure"}}>
        <p style={{ textAlign: 'center', margin: '5px 0', fontWeight: 'bold'  , position:"relative" , color:"black"}}>{projectName}</p>
        <img src={imageUrl} alt={`${projectName} Thumbnail`} style={{ width: '100%', height: '75%', objectFit: 'cover' }} />
      </div>

  );
};

export default Project;
