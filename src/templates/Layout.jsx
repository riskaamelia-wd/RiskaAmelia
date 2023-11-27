import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import AllPortfolio from '../pages/AllPortfolio'

const Layout = () => {
    return(
        <>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path='allPortfolio' element={<AllPortfolio/>}/>
            </Routes>
        </>
    )
}

export default Layout