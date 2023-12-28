import NavBar from "./NavBar";
import './MiddlePage.css'
import { ChangeEvent, useState } from "react";

// Nouveau composant pour représenter une page du milieu
const MiddlePage: 
React.FC<{ pageIndex: number, currentPage: number, numPages: number, handleFirstPage: () => void, handlePrevPage: () => void, handleNextPage: () => void, handleLastPage: () => void }>
= ( { pageIndex, currentPage, numPages, handleFirstPage, handlePrevPage, handleNextPage, handleLastPage }) => {
    
    const [imageUrl, setImageUrl] = useState<string >();
    const [imageFile, setImageFile] = useState<File >();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
    
        if (files && files.length > 0) {
          const file = files[0];
          const imageUrl = URL.createObjectURL(file);
          setImageUrl(imageUrl);
          setImageFile(file);
        }
    };

    return (
    <div className={`slider-page ${pageIndex === currentPage ? 'current' : ''}`} id={`page${pageIndex + 1}`}>
      <NavBar  pageIndex={pageIndex} currentPage={currentPage} numPages={numPages} handleFirstPage={handleFirstPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handleLastPage={handleLastPage}></NavBar>
      {/* Contenu de la page */}
      <div className="frameContainer">
        <div className="imagePart">
            <input type="file" name="fileImage"   id="fileImage" className="inputfileImage" onChange={handleImageChange}/>
            <label htmlFor="fileImage" >Choose a file </label>
            {imageUrl ? (
            <div className='imageMiddlePage'>
                <img src={imageUrl!} alt="Image Preview" />
            </div>
            )
            :
            <></>}
        </div>
        <div className="settingsPart">

        </div>
      </div>
    </div>
    )
};

export default MiddlePage;