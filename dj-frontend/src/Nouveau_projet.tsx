import React, { useCallback, useState, useRef, useEffect } from 'react';
import './Nouveau_projet.css';
import MenuBar from './MenuBar';
import MiddlePage from './MiddlePage';
import NavBar from './NavBar';



const Nouveau_projet = () => {
  const [numPages, setNumPages] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const handleNumPagesChange = useCallback((e: { target: { value: string; }; }) => {
    let newNumPages = parseInt(e.target.value, 10) || 1;
    newNumPages = Math.min(99, Math.max(1, newNumPages));
    setNumPages(newNumPages);
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
    setCurrentPage(numPages - 1);
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
      if (i === 0) {
        // Première page
        pages.push(
          <div key={i} className={`slider-page firstPage`} id={`page${i + 1}`}>
            <NavBar  pageIndex={i} currentPage={currentPage} numPages={numPages} handleFirstPage={handleFirstPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handleLastPage={handleLastPage}></NavBar>

            <label>
              Number of Pages:
              <input type='number' value={numPages} onChange={handleNumPagesChange} min={1} max={99} />
            </label>
          </div>
        );
      } else if (i === numPages - 1) {
        // Dernière page
        pages.push(
          <div key={i} className={`slider-page lastPage`} id={`page${i + 1}`}>
              <NavBar  pageIndex={i} currentPage={currentPage} numPages={numPages} handleFirstPage={handleFirstPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handleLastPage={handleLastPage}></NavBar>

          </div>
        )
      } else {
        // Pages du milieu
        pages.push(<MiddlePage key={i} pageIndex={i} currentPage={currentPage} numPages={numPages} handleFirstPage={handleFirstPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handleLastPage={handleLastPage} />);
      }
    }

    return pages;
  };

  return (
    <>
      <MenuBar></MenuBar>
      <div className='slider-container'>
        <div className='slider-scroller' ref={scrollerRef}>
          
          {renderPages()}
          
        </div>
      </div>
    </>
  );
};

export default Nouveau_projet;
