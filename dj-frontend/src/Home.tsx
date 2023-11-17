import { Link } from 'react-router-dom'
import './App.css'
import './Home.css'
import MenuBar from './MenuBar'



function Home() {
    

    return (
      <>
          <MenuBar></MenuBar>
          <div className="menu_droite">
            <div className="texte_haut">
              <p>Texte en haut Iamque lituis cladium concrepantibus internarum non celate ut antea turbidum saeviebat ingenium a veri 
                consideratione detortum et nullo inpositorum vel conpositer inquirente nec discernente a societate n
                oxiorum insontes velut exturbatum e is fas omne discessit, et causarum legitima silente defensione carnifex rapinar
                orientales provincias, quas recensere puto nunc 
                oportunum absque Mesopotamia digesta, cum bella Parthica dicerentur, et Aegypto, quam necessario aliud reieci ad tempus.
              </p>
            </div>

            <div className="video">
              {/* Remplacez le lien de la vidéo par le vôtre */}
              <iframe width="100%" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameBorder="0" allowFullScreen></iframe>
            </div>

            <div className="texte_bas">
              <p>Texte en bas Utque proeliorum periti rectores primo catervas densas opponunt et fortes, deinde leves armaturas, 
                post iaculatores ultimasque subsidiales acies, si fors adegerit, iuvaturas, ita praepositis urbanae familiae suspensae digerentibus
                sollicite, quos insignes faciunt virgae dexteris aptatae velut tessera data castrensi iuxta vehiculi frontem omne textrinum incedit
                : huic atratum coquinae iungitur ministerium, dein totum promiscue servitium cum otiosis plebeiis de vicinitate coniunctis: postrema 
                multitudo spadonum a senibus in pueros desinens, obluridi distortaque lineamentorum conpage deformes, ut quaqua incesserit quisquam ce
                rnens mutilorum hominum agmina detestetur memoriam Samiramidis reginae illius veteris, quae teneros mares castravit omnium prima velut 
                vim iniectans naturae, eandemque ab instituto cursu retorquens, quae inter ipsa oriundi crepundia per primigenios seminis fontes tacita q
                uodam modo lege vias propagandae posteritatis ostendit.

                raefuit, cum Apodemio agente in rebus milites ducens, quos beneficiis suis oppigneratos elegerat imperator certus nec praemiis
                nec miseratione ulla posse deflecti.
              </p>
            </div>
        </div>
      </>
    )
  }
  
  export default Home
  