// Import des composants et modules nécessaires depuis react-router-dom
import {createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import des composants de chaque page
import Home from './Home';
import Nouveau_projet from './Nouveau_projet';
import About from './About';
import Contact from './Contact';
import Connexion from './Connexion';
import Profil from "./Profil"
import Sharing from './Sharing';
import MyProjects from './MyProjects';
import Plans from './Plans';


// Création d'une instance de BrowserRouter avec les différentes routes
const router = createBrowserRouter([
  
  {
    path: "/", // route pour la page d'accueil
    element: <Home />,
  },

  {
    path: "/Nouveau_projet", // route pour la page Nouveau_projet
    element: <Nouveau_projet />,
  },
  {
    path: "/About", // route pour la page About
    element:<About />
  },
  {
    path: "/Contact", // route pour la page Contact
    element:<Contact />
  },
  {
    path: "/Connexion", // route pour la page Connexion
    element:<Connexion />
  },
  {
    path: "/Profil", // route pour la page Profil
    element:<Profil />
  },
  {
    path: "/Sharing", // route pour la page sharing
    element:<Sharing />
  },
  {
    path: "/MyProjects", // route pour la page sharing
    element:<MyProjects />
  },
  {
    path: "/Plans", // route pour la page sharing
    element:<Plans />
  }

]);


// Définition du composant principal App qui utilise le RouterProvider avec le router créé

function App() {
  return (
    <RouterProvider router={router} />
  );
}

// Export du composant App comme composant principal de l'application
export default App;