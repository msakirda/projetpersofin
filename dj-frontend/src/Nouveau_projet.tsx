import React, { useState } from 'react';
import MenuBar from './MenuBar';
import './Nouveau_projet.css';
import PageMiddle from './PageMiddle';

interface Page {
  id: number;
  component: React.ReactNode;
}

interface NouveauProjetProps {
  connected: boolean;
}

function Nouveau_projet({ connected }: NouveauProjetProps) {
  const [middlePages, setMiddlePages] = useState<Page[]>([]);

  // Fonction pour ajouter une nouvelle page de type PageMiddle
  const addMiddlePage = () => {
    const newPage: Page = {
      id: middlePages.length + 1,
      component: <PageMiddle key={middlePages.length} />,
    };
    setMiddlePages([...middlePages, newPage]);
  };

  // Fonction pour supprimer la dernière page ajoutée
  const removeLastPage = () => {
    if (middlePages.length > 0) {
      const updatedPages = [...middlePages];
      updatedPages.pop();
      setMiddlePages(updatedPages);
    }
  };

  return (
    <>
      <MenuBar connected={connected} />
      <div className='right_part'>
          <button onClick={addMiddlePage}>Ajouter une page</button>
          <button onClick={removeLastPage}>Supprimer la dernière page</button>

        <div className='scrollerBack'>
        <div className='scrollerContainer' style={{ width: `${(middlePages.length + 3) * 100}%` }}>


            <div className='page_1 onePage'>
              {/* Contenu de la première page */}
            </div>

            <div className='page_intro onePage'>
              {/* Contenu de la page d'introduction */}
            </div>

            {middlePages.map((page) => (
              <div key={page.id} className='onePage'>
                {page.component}
              </div>
            ))}

            <div className='page_conclusion onePage'>
              {/* Contenu de la page de conclusion */}
            </div>

            

          </div>
        </div>
      </div>
    </>
  );
}

export default Nouveau_projet;
