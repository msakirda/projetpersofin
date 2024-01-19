import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "./Project.css"



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
  

  const handleDeleteProject = async () => {
    try {
      if(!window.confirm("êtes vous sûr de vouloir supprimer ce projet?"))
        return;

      // Envoyer une requête à l'API pour supprimer le projet
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3000/api/deleteProject/${projectName}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        
        // Mettre à jour l'interface utilisateur ou rediriger si nécessaire
        console.log('Projet supprimé avec succès.');
        window.location.reload();
      } else {
        console.error('Échec de la suppression du projet.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du projet :', error);
    }
  };

  return (
    <div id="divProjectGlobal">
      <div id="projectDiv" onClick={handleClickSavedProject} style={{  margin: '10px', width: '150px' , height: '150px'  , backgroundColor: "azure"}}>
        <p style={{ textAlign: 'center', margin: '5px 0', fontWeight: 'bold'  , position:"relative" , color:"black"}}>{projectName}</p>
        <img src={imageUrl} alt={`${projectName} Thumbnail`} style={{ width: '100%', height: '75%', objectFit: 'cover' }} />
        
      </div>
      <img id="imageDelete" src="./effacer.png" alt="icone effacer projet" onClick={handleDeleteProject}/>
    </div>
  );
};

export default Project;
