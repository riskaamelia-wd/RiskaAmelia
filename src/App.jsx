import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Navbar from './components/navbar'
import Jumbotorn from './components/Jumbotron'
import vektor1 from './assets/Vector 1.svg'
import CardService from './elements/CardService'
import test from './assets/lia.jpeg'
import CardPortofolio from './elements/CardPortofolio'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=' position-relative' style={{backgroundColor:'#030E21'}}>
      <div className='container min-vh-100'>
        <div className='position-absolute top-0 end-0'>
          <img src={vektor1} alt="" />
        </div>
        <div className=' container position-absolute'>
          <Navbar/>
          <Jumbotorn/>
          <CardService
            img={test}
            title={'Website'}
            text={'50+ Project'}
          />          
          <CardPortofolio
            img={test}
            title={'Website'}
            text={'50+ Project'}
          />
        </div>
      </div>
    </div>
  )
}

export default App
