import NavBar from "./NavBar";

// Nouveau composant pour représenter une page du milieu
const MiddlePage: 
React.FC<{ pageIndex: number, currentPage: number, numPages: number, handleFirstPage: () => void, handlePrevPage: () => void, handleNextPage: () => void, handleLastPage: () => void }>
= ( { pageIndex, currentPage, numPages, handleFirstPage, handlePrevPage, handleNextPage, handleLastPage }) => {
    
    return (
    <div className={`slider-page ${pageIndex === currentPage ? 'current' : ''}`} id={`page${pageIndex + 1}`}>
      <NavBar  pageIndex={pageIndex} currentPage={currentPage} numPages={numPages} handleFirstPage={handleFirstPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handleLastPage={handleLastPage}></NavBar>
      {/* Contenu de la page */}
    </div>
    )
};

export default MiddlePage;