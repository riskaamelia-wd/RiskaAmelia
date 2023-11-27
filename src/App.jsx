import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from './pages/Home'
import client from './utils/apollo-client'
import { ApolloProvider } from '@apollo/client'
import Layout from './templates/Layout'
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Layout/> 
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
