import NavBar from "./NavBar";
import './MiddlePage.css'
import { ChangeEvent, useCallback, useState } from "react";

// Nouveau composant pour représenter une page du milieu
const MiddlePage: 
React.FC<{ pageIndex: number, currentPage: number, numPages: number, handleFirstPage: () => void, handlePrevPage: () => void, handleNextPage: () => void, handleLastPage: () => void }>
= ( { pageIndex, currentPage, numPages, handleFirstPage, handlePrevPage, handleNextPage, handleLastPage }) => {
    
    const [imageUrl, setImageUrl] = useState<string >("");
    const [imageFile, setImageFile] = useState<File >();

    const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
    
        if (files && files.length > 0) {
          const file = files[0];
          const imageUrlTMP = URL.createObjectURL(file);
          setImageUrl(imageUrlTMP);
          setImageFile(file);
        }
    } , []);

    return (
    <div className={`slider-page ${pageIndex === currentPage ? 'current' : ''}`} id={`page${pageIndex}`}>
      <NavBar  pageIndex={pageIndex} currentPage={currentPage} numPages={numPages} handleFirstPage={handleFirstPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handleLastPage={handleLastPage}></NavBar>
      {/* Contenu de la page */}
      <div className="frameContainer">
        <div className="imagePart">
            <input type="file" name={`fileImage${pageIndex}`}   id={`fileImage${pageIndex}`} className="inputfileImage" onChange={handleImageChange}/>
            <label htmlFor={`fileImage${pageIndex}`} >Choose a file </label>
            {imageUrl ? (
            <div className='imageMiddlePage'>
                <img src={imageUrl} alt="Image Preview" />
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