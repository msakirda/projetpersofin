import './App.css'
import React from 'react';
import MenuBar from './MenuBar';


function Profil(props:{co:boolean}) {
    

    return (
      <>
        <MenuBar connected={props.co}></MenuBar>
        <div>
            <h1>Profil</h1>
        </div>
      </>
    )
  }
  
  export default Profil