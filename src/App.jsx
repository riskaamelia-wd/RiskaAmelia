import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import Navbar from './components/navbar'
import Jumbotorn from './components/Jumbotron'
import vektor1 from './assets/Vector 1.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-vh-100 position-relative' style={{backgroundColor:'#030E21'}}>
      <div className='container'>
        <div className='position-absolute top-0 end-0'>
          <img src={vektor1} alt="" />
        </div>
        <div className=' container position-absolute'>
          <Navbar/>
          <Jumbotorn/>
        </div>
      </div>
    </div>
  )
}

export default App
