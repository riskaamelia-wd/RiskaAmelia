import Navbar from '../components/navbar'
import Jumbotorn from '../components/Jumbotron'
import vektor1 from '../assets/Vector 1.svg'
import vektor2 from '../assets/Vector 2.svg'
import CardService from '../elements/CardService'
import CardPortofolio from '../elements/CardPortofolio'
import Service from '../components/Service'
import Portfolio from '../components/Portfolio'

const Home = () => {
    
    return(
        <div className=' position-relative' style={{backgroundColor:'#030E21'}}>
        <div className='container' style={{ minHeight: '150rem' }}>
          <div className='position-absolute' style={{top:0, right:'0 '}}>
            <img src={vektor1} alt="" />
          </div>             
          <div className='position-absolute' style={{top:'25vh', left:'-80px'}}>
            <img src={vektor2} alt="" />
          </div>        
          <div className=' container position-absolute'>
            <Navbar/>
            <Jumbotorn/>      
            <Service/>
            <Portfolio/>  
          </div>
        </div>
      </div>
    )
}

export default Home