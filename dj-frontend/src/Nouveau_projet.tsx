import React, { useCallback, useState, useRef, useEffect } from 'react';
import './Nouveau_projet.css';
import MenuBar from './MenuBar';

const Nouveau_projet = () => {
  const [numPages, setNumPages] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const handleNumPagesChange = useCallback((e: { target: { value: string; }; }) => {
    setNumPages(parseInt(e.target.value, 10) || 1);
    setCurrentPage(0);
  }, []);

  const handleFirstPage = useCallback(() => {
    setCurrentPage(0);
  }, [numPages]);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages - 1));
  }, [numPages]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  }, []);

  const handleLastPage = useCallback(() => {
    setCurrentPage(numPages -1);
  }, [numPages]);

  useEffect(() => {
    if (scrollerRef.current) {
      (scrollerRef.current as HTMLDivElement).scrollTo({
        left: currentPage * (scrollerRef.current as HTMLDivElement).clientWidth,
        behavior: 'smooth',
      });
    }
  }, [currentPage]);

  const renderPages = () => {
    const pages = [];

    for (let i = 0; i < numPages; i++) {
      pages.push(
        
        <div
          key={i}
          className={`slider-page ${i === currentPage ? 'current' : ''}`}
          id={`page${i + 1}`}
        >
          <div className="slidingButtonsZone">
            <button onClick={handleFirstPage} disabled={currentPage === 0}>
              First Page
            </button>
            <button onClick={handlePrevPage} disabled={currentPage === 0}>
              Previous Page
            </button>
            <button onClick={handleNextPage} disabled={currentPage === numPages - 1}>
              Next Page
            </button>
            <button onClick={handleLastPage} disabled={currentPage === numPages - 1}>
              Last Page
            </button>
            <p>Page {i + 2}</p>
          </div>
          {/* Contenu de la page */}
          
        </div>
      );
    }

    return pages;
  };

  return (
    <>
    <MenuBar></MenuBar>
    <div className='slider-container'>
      <div className='slider-scroller' ref={scrollerRef}>
        <div className='slider-page firstPage'>
          <label>
            Number of Pages:
            <input type='number' value={numPages} onChange={handleNumPagesChange} min={1} />
          </label>
          <div className='slidingButtonsZone'>
            <button onClick={handleFirstPage} disabled={currentPage === 0}>
              First Page
            </button>
            <button onClick={handlePrevPage} disabled={currentPage === 0}>
              Previous Page
            </button>
            <button onClick={handleNextPage} disabled={currentPage === numPages - 1}>
              Next Page
            </button>
            <button onClick={handleLastPage} disabled={currentPage === numPages - 1}>
              Last Page
            </button>
            <p>Page {currentPage}</p>
          </div>
        </div>
        {renderPages()}
        <div className='slider-page lastPage'>
          <label>
            Number of Pages:
            <input type='number' value={numPages} onChange={handleNumPagesChange} min={1} />
          </label>
          <div className='slidingButtonsZone'>
            <button onClick={handleFirstPage} disabled={currentPage === 0}>
              First Page
            </button>
            <button onClick={handlePrevPage} disabled={currentPage === 0}>
              Previous Page
            </button>
            <button onClick={handleNextPage} disabled={currentPage === numPages - 1}>
              Next Page
            </button>
            <button onClick={handleLastPage} disabled={currentPage === numPages - 1}>
              Last Page
            </button>
            <p>Page {currentPage}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Nouveau_projet;


