import './App.css'
import React from 'react';
import MenuBar from './MenuBar';


function Nouveau_projet(props:{co:boolean}) {
    

    return (
      <>
        <MenuBar connected={props.co}></MenuBar>
        <div>
            <h1>Nouveau Projet</h1>
        </div>
      </>
    )
  }
  
  export default Nouveau_projet
  