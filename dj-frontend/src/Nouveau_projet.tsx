import  { useCallback, useState, useRef, useEffect } from 'react';
import './Nouveau_projet.css';
import MenuBar from './MenuBar';
import MiddlePage from './MiddlePage';
import NavBar from './NavBar';




const Nouveau_projet = () => {
  const [numPages, setNumPages] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [middlePagesImages, setMiddlePagesImages] = useState<Array<File>>([]); // Nouvel état pour stocker les fichiers d'image
  const [resultVideoUrl , setResultVideoUrl] = useState<string>("");
  


  const updateMiddlePagesImages = (newImages: File[]) => {
    setMiddlePagesImages(newImages);
    console.log(newImages);
    
  };

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

  const scrollToCurrent = () =>{
    if (scrollerRef.current) {
      (scrollerRef.current as HTMLDivElement).scrollTo({
        left: currentPage * (scrollerRef.current as HTMLDivElement).clientWidth,
        behavior: 'smooth',
      });
    }
  }

  useEffect(() => {
    scrollToCurrent();
  }, [currentPage ]);

  useEffect(() => {
    const handleResize = () => {
      // Code à exécuter lors du redimensionnement de la fenêtre
      scrollToCurrent()
      console.log('La fenêtre a été redimensionnée !');
    };

    // Ajouter un écouteur d'événements pour le redimensionnement de la fenêtre
    window.addEventListener('resize', handleResize);

    // Nettoyer l'écouteur d'événements lorsque le composant est démonté
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentPage]);

  const generateVideo = async () => {
    try {
      const formData = new FormData();
  
      // Ajoutez chaque fichier au formulaire de données
      middlePagesImages.forEach((file, index) => {
        formData.append("videoFiles" ,file);
      });
  
      const response = await fetch('http://localhost:3000/generate-video', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      setResultVideoUrl(result.url);
      console.log('Files uploaded successfully:', result);
      console.log('Here is the url of the created video:', result.url);
  
      // Continue with other actions if needed
    } catch (error) {
      console.error('Error uploading files to the server:', error);
    }
  };
  


  
  
  const renderPages = () => {
    const pages = [];

    // Première page
    pages.push(
      <div key="firstPage" id="firstPage" className={`slider-page firstPage`}>
        <NavBar pageIndex={0} currentPage={currentPage} numPages={numPages + 2} handleFirstPage={handleFirstPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handleLastPage={handleLastPage} />
        <div id="settingsPart">
          <label id='numberOfPagesInput'>
            Number of Pages:
            <input type='number' value={numPages} onChange={handleNumPagesChange} min={1} max={99} />
          </label>
        </div>
      </div>
    );

    // Pages du milieu
    let tmpPage
    for (let i = 0; i < numPages; i++) {
      tmpPage = <MiddlePage key={i} middlePagesImages={middlePagesImages} updateMiddlePagesImages={updateMiddlePagesImages} pageIndex={i + 1} currentPage={currentPage} numPages={numPages + 2} handleFirstPage={handleFirstPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handleLastPage={handleLastPage} />
      pages.push(tmpPage);
    }
    

    // Dernière page
    pages.push(
      <div key="lastPage" className={`slider-page lastPage`}>
        <NavBar pageIndex={numPages + 1} currentPage={currentPage} numPages={numPages + 2} handleFirstPage={handleFirstPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handleLastPage={handleLastPage} />
        <div id='generateVideoPart'>
          <button onClick={generateVideo}>Générer la vidéo</button>
          <video controls src={resultVideoUrl} style={{ width: '50%', height: 'auto' , display: resultVideoUrl ? 'block' : 'none'}}> </video>
        </div>
        

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
