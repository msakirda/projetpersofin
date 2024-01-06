import NavBar from "./NavBar";
import './MiddlePage.css'
import { ChangeEvent, useCallback, useState } from "react";


interface ImageObject {
  pageNumber: number;
  file: File;
}

// Nouveau composant pour représenter une page du milieu
const MiddlePage: 
React.FC<{ middlePagesImages: Array<ImageObject>,updateMiddlePagesImages: any , pageIndex: number, currentPage: number, numPages: number, handleFirstPage: () => void, handlePrevPage: () => void, handleNextPage: () => void, handleLastPage: () => void }>
= ( { middlePagesImages , updateMiddlePagesImages, pageIndex, currentPage, numPages, handleFirstPage, handlePrevPage, handleNextPage, handleLastPage }) => {
    
    const [imageUrl, setImageUrl] = useState<string >("");

    const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
    
      if (imageUrl) {
        // Créez une nouvelle copie du tableau avec la modification
        const updatedMiddlePagesImages = middlePagesImages.map((image) => {
          if (image.pageNumber === pageIndex) {
            // Remplacez l'élément actuel par la nouvelle valeur
            return {
              pageNumber: pageIndex,
              file: files![0], // Remplacez par votre nouvelle valeur
            };
          }
          return image; // Pour les autres éléments, retournez l'image inchangée
        });
        // Mettez à jour l'état avec le nouveau tableau modifié
        updateMiddlePagesImages(updatedMiddlePagesImages);
        const imageUrlTMP = URL.createObjectURL(files![0]);
        setImageUrl(imageUrlTMP);
        return;
      }else if (files && files.length > 0) {
        const file = files[0];
        const imageUrlTMP = URL.createObjectURL(file);
        setImageUrl(imageUrlTMP);
        
        updateMiddlePagesImages([...middlePagesImages , { pageNumber: pageIndex, file :file }]);

      }
    }, [updateMiddlePagesImages]);

    return (
    <div className={`slider-page ${pageIndex === currentPage ? 'current' : ''}`} id={`page${pageIndex}`}>
      <NavBar  pageIndex={pageIndex} currentPage={currentPage} numPages={numPages} handleFirstPage={handleFirstPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handleLastPage={handleLastPage}></NavBar>
      {/* Contenu de la page */}
      <div className="frameContainer">
        <div className="imagePart">
            <input type="file" accept=".png" name={`fileImage${pageIndex}`}   id={`fileImage${pageIndex}`} className="inputfileImage" onChange={handleImageChange}/>
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