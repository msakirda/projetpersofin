import React, { useCallback, useState, useRef, useEffect } from 'react';
import './Nouveau_projet.css';
import MenuBar from './MenuBar';
import MiddlePage from './MiddlePage';
import NavBar from './NavBar';
import ffmpeg from 'fluent-ffmpeg';


const Nouveau_projet = () => {
  const [numPages, setNumPages] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [middlePagesImages, setMiddlePagesImages] = useState<Array<File>>([]); // Nouvel état pour stocker les fichiers d'image
  

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
    setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages + 1));
  }, [numPages]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  }, []);

  const handleLastPage = useCallback(() => {
    setCurrentPage(numPages + 1);
  }, [numPages]);

  useEffect(() => {
    if (scrollerRef.current) {
      (scrollerRef.current as HTMLDivElement).scrollTo({
        left: currentPage * (scrollerRef.current as HTMLDivElement).clientWidth,
        behavior: 'smooth',
      });
    }
  }, [currentPage]);

  

  // const generateVideo = () => {
  //   const outputFileName = 'output.mp4';
  //   const images: string[] = [];
  

  
  //   // Ajoutez les images des pages intermédiaires
  //   middlePagesImages.forEach((file) => {
  //     const imageUrl = URL.createObjectURL(file);
  //     images.push(imageUrl);
  //   });
  
  //   // Commande FFmpeg pour la conversion d'images en vidéo avec musique
  //   ffmpeg()
  //     .input(images.join(' '))
  //     .inputFPS(3)  // Définissez la fréquence d'images par seconde
  //     .outputOptions('-c:v libx264 -pix_fmt yuv420p')
  //     .output(outputFileName)
  //     .on('end', () => {
  //       console.log('Génération de la vidéo terminée !');
  //     })
  //     .on('error', (err: any) => {
  //       console.error('Erreur lors de la génération de la vidéo :', err);
  //     })
  //     .run();
  // };

  


  const renderPages = () => {
    const pages = [];

    // Première page
    pages.push(
      <div key="firstPage" className={`slider-page firstPage`}>
        <NavBar pageIndex={0} currentPage={currentPage} numPages={numPages + 2} handleFirstPage={handleFirstPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handleLastPage={handleLastPage} />
        <label>
          Number of Pages:
          <input type='number' value={numPages} onChange={handleNumPagesChange} min={1} max={99} />
        </label>
      </div>
    );

    // Pages du milieu
    let tmpPage
    for (let i = 0; i < numPages; i++) {
      tmpPage = <MiddlePage key={i} pageIndex={i + 1} currentPage={currentPage} numPages={numPages + 2} handleFirstPage={handleFirstPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handleLastPage={handleLastPage} />
      pages.push(tmpPage);
    }
    

    // Dernière page
    pages.push(
      <div key="lastPage" className={`slider-page lastPage`}>
        <NavBar pageIndex={numPages + 1} currentPage={currentPage} numPages={numPages + 2} handleFirstPage={handleFirstPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handleLastPage={handleLastPage} />
        {/* <button onClick={generateVideo}>Générer la vidéo</button> */}
      </div>
    );


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
