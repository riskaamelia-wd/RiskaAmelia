import { useQuery } from "@apollo/client"
import { GETPORTFOLIO } from "../graphql/query"
import { useEffect, useState } from "react"
import CardPortofolio from "../elements/CardPortofolio"
import { useMediaQuery } from "../utils/MediaQueryHook"
import Navbar from "../components/navbar"
import Footer from "../components/Footer"

const AllPortfolio = () => {
    const {data, loading, error} = useQuery(GETPORTFOLIO)
    const [port, setPort] = useState([])
    useEffect(()=>{
        if(!loading && error !== undefined){
            setPort(data.portfolio)
        }
        console.log(data?.portfolio?.link);
    })
    return(
        <div style={{backgroundColor:'#030E21'}}>
            <div className="min-vh-100">
                <Navbar                
                    contact={'/#contact'}
                    service={'/#service'}
                    about={'/#about'}
                    portfolio={'/#portfolio'}
                />
                <div className="d-flex row col-10 col-lg-11 m-auto">
                    {
                        loading ?
                        <div className="lds-facebook"><div></div><div></div><div></div></div>
                        :
                        data?.portfolio.map((item, idx)=>(
                            <a target='_blank' href={item.link} className="col-md-4 col-6">               
                                <CardPortofolio
                                    img={item.img}
                                    title={item.title}
                                    text={item.category}
                                />
                            </a>
                        ))
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AllPortfolio