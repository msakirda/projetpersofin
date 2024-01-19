import React, { useState, useEffect } from 'react';
import Project from './Project';
import MenuBar from './MenuBar';
import './MyProjects.css'
import "./App.css"

interface Project {
  id: number;
  projectName: string;
  imageURL: string;
  // Add other properties as needed
}

const MyProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[] | undefined>(undefined);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/getProjectsPreview/${localStorage.getItem("userConnectedUsername")}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if(data.message)
        {
          console.log("il n'y a pas de projets.");
          
        }
        else{
          console.log('Fetched projects:', data);
          setProjects(data);
          console.log("Image URL: " + data[0].imageURL);
        }


        
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <MenuBar />
      <div className='menuRight'>
        <h1>My Projects</h1>
        <div className='projectsContainer'>
          {projects !== undefined ? (
            // Inside the map function in MyProjects component
            projects.map((project, i) => {
              return (
                <Project key={i} projectName={project.projectName} imageUrl={project.imageURL} />
              );
            })

          ) : (
            <p id="messageNoProjects">No projects found yet...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProjects;
