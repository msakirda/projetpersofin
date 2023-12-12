import React, { useCallback, useState } from 'react';
import MenuBar from './MenuBar';
import './Nouveau_projet.css';
import PageMiddle from './PageMiddle';
import SectionTitle from './SectionTitle';

interface Page {
  id: number;
  component: React.ReactNode;
}

interface NouveauProjetProps {
  connected: boolean;
}

function Nouveau_projet() {
  const [middlePages, setMiddlePages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);



  return (
    <>
      <MenuBar  />
      <div className='right_part'>
        <SectionTitle contenu='New Project'></SectionTitle>
        <div className='scrollerBack'>
          <div className='scrollerContainer' >

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
