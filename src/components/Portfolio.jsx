import CardPortofolio from "../elements/CardPortofolio"
import test from '../assets/lia.jpeg'
import { useQuery } from "@apollo/client"
import { GETPORTFOLIO } from "../graphql/query"
import { useEffect, useState } from "react"
import { useMediaQuery } from "../utils/MediaQueryHook"

const Portfolio = ({id}) => {
    const {data, loading, error} = useQuery(GETPORTFOLIO)
    const [port, setPort] = useState([])
    useEffect(()=>{
        if(!loading && error !== undefined){
            setPort(data.portfolio)
        }
    })

    const {portfolio} = useMediaQuery()
    const cardPort = portfolio();
    return(
        <div className="p-3 mb-3 mt-5 col-10 col-md-11 m-auto transparan" id={id}>
            <div className="d-flex justify-content-between">
                <p className="fw-semibold fs-2 fs-md-1 m-0">Our Portofolio</p>
                <div className="d-flex align-items-center" style={{color:'var(--warning)'}}>
                    <p className="m-0">See All</p>
                <i  className="bi bi-arrow-right ms-3"></i>
                </div>
            </div>
            <div className="d-flex row">
                {
                    loading ?
                    <p>loading...</p>
                    :
                    data?.portfolio.slice(0, cardPort).map((item, idx)=>(
                        <div className="col-md-4 col-6">               
                            <CardPortofolio
                            img={item.img}
                            title={item.title}
                            text={item.category}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Portfolio