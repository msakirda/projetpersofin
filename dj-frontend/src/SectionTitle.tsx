
import './SectionTitle.css'

function SectionTitle( props:{contenu:string}) {
    

    return (
      <>
        <div className='sectionTitleContainer'>
            <h1>{props.contenu}</h1>
        </div>  
      </>
    )
  }
  
  export default SectionTitle
  