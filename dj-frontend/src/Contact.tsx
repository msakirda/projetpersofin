import './App.css'
import React from 'react';
import MenuBar from './MenuBar';


function Contact(props:{co:boolean}) {
    

    return (
      <>
        <MenuBar connected={props.co}></MenuBar>
        <div>
            <h1>Contact</h1>
        </div>
      </>
    )
  }
  
  export default Contact
  