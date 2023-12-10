// Import des modules React et ReactDOM/client
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Import du composant principal App depuis le fichier App.tsx
// Utilisation de ReactDOM.createRoot pour rendre le composant App dans la racine de l'élément avec l'ID 'root'
ReactDOM.createRoot(document.getElementById('root')!).render(
  // Utilisation de React.StrictMode pour des vérifications supplémentaires pendant le développement
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
