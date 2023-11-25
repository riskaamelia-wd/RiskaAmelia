import Navbar from '../components/navbar'
import Jumbotorn from '../components/Jumbotron'
import vektor1 from '../assets/Vector 1.png'
import vektor2 from '../assets/Vector 2.png'
import vektor3 from '../assets/Vector 3.png'
import vektor4 from '../assets/Vector 4.png'
import CardService from '../elements/CardService'
import CardPortofolio from '../elements/CardPortofolio'
import Service from '../components/Service'
import Portfolio from '../components/Portfolio'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Skill from '../components/Skill'

const Home = () => {
    
    return(
        <div className='position-relative row  m-0 p-0'>
        {/* <div className='m-0 p-0'> */}
          <div className='position-absolute col-8 m-0 p-0' style={{top:0, right:0}}>
            <img src={vektor1} alt="" />
          </div>             
          <div className='position-absolute col-8 m-0 p-0' style={{top:'25vh', left:0}}>
            <img src={vektor2} alt="" />
          </div>          
          <div className='position-absolute  col-8  m-0 p-0' style={{top:'45vh', right:0}}>
            <img src={vektor3} alt="" />
          </div>          
          <div className='position-absolute col-8 m-0 p-0' style={{top:'170vh', left:0}}>
            <img src={vektor4} alt="" />
          </div>        
          <div className='position-absolute  m-0 p-0 col-12 row' >
            <Navbar
              contact={'#contact'}
              service={'#service'}
              about={'#about'}
              portfolio={'#portfolio'}
            />
            <Jumbotorn
              id={'about'}
            />      
            <Skill/>
            <Service
              id={'service'}
            />
            <Portfolio
              id={'portfolio'}
            />  
            <Contact
              id={'contact'}
            />
            <Footer/>
          </div>
        {/* </div> */}
      </div>
    )
}

export default Home