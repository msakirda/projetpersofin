import './App.css'
import React from 'react';
import MenuBar from './MenuBar';


function About(props:{co:boolean}) {
    

    return (
      <>
        <MenuBar connected={props.co}></MenuBar>
       <div>
          <h1>About</h1>
      </div>

      

      </>
    )
  }
  
  export default About
  