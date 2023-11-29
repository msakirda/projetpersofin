import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Nouveau_projet from './Nouveau_projet';
import About from './About';
import Contact from './Contact';
import Connexion from './Connexion';
import Profil from "./Profil"

let connected = false;

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Home co={connected}/>,
  },

  {
    path: "/Nouveau_projet",
    element: <Nouveau_projet co={connected}/>,
  },
  {
    path: "/About",
    element:<About co={connected}/>
  },
  {
    path: "/Contact",
    element:<Contact co={connected}/>
  },
  {
    path: "/Connexion",
    element:<Connexion co={connected}/>
  },
  {
    path: "/Profil",
    element:<Profil co={connected}/>
  }
  
  
  


]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;