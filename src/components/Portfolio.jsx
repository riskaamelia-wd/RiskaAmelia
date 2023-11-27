import CardPortofolio from "../elements/CardPortofolio"
import test from '../assets/lia.jpeg'
import { useQuery } from "@apollo/client"
import { GETPORTFOLIO } from "../graphql/query"
import { useEffect, useState } from "react"
import { useMediaQuery } from "../utils/MediaQueryHook"
import { NavLink } from "react-router-dom";

const Portfolio = ({id}) => {
    const {data, loading, error} = useQuery(GETPORTFOLIO)
    const [port, setPort] = useState([])
    useEffect(()=>{
        if(!loading && error !== undefined){
            setPort(data.portfolio)
        }
        console.log(data?.portfolio?.link);
    })

    const {portfolio} = useMediaQuery()
    const cardPort = portfolio();
    return(
        <div className="p-3 mb-3 mt-5 col-10 col-md-11 m-auto transparan" id={id}>
            <div className="d-flex justify-content-between">
                <p className="fw-semibold fs-2 fs-md-1 m-0">Our Portofolio</p>
                <div className="d-flex align-items-center" style={{color:'var(--warning)'}}>
                    <NavLink to={'/allPortfolio'} className="m-0">See All</NavLink>
                <i  className="bi bi-arrow-right ms-3"></i>
                </div>
            </div>
            <div className="d-flex row">
                {
                    loading ?
                    <div className="lds-facebook"><div></div><div></div><div></div></div>
                    :
                    data?.portfolio.slice(0, cardPort).map((item, idx)=>(
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
    )
}
export default Portfolio