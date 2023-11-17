import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Nouveau_projet from './Nouveau_projet';
import About from './About';
import Contact from './Contact';
import Connexion from './Connexion';


const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Home/>,
  },

  {
    path: "/Nouveau_projet",
    element: <Nouveau_projet/>,
  },
  {
    path: "/About",
    element:<About/>
  },
  {
    path: "/Contact",
    element:<Contact/>
  },
  {
    path: "/Connexion",
    element:<Connexion/>
  }
  
  


]);
function App() {
  return (
<RouterProvider router={router} />
  );
}

export default App;