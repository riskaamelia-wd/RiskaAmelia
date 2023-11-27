import { useQuery } from "@apollo/client"
import { GETPORTFOLIO } from "../graphql/query"
import { useEffect, useState } from "react"
import CardPortofolio from "../elements/CardPortofolio"
import Navbar from "../components/navbar"
import Footer from "../components/Footer"
import { motion } from "framer-motion";

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
                <div className="d-flex col-10 col-lg-11 m-auto row mt-3">
                {
                    loading ?
                    <div className="lds-facebook"><div></div><div></div><div></div></div>
                    :
                    data?.portfolio.map((item)=>(
                        <motion.div
                            key={item.id}
                            className="col-md-4 col-6"
                            whileHover={{ scale: 1.1 }} 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            >
                            <a target='_blank' href={item.link} className="">               
                                <CardPortofolio
                                key={item.id}
                                img={item.img}
                                title={item.title}
                                text={item.category}
                                />
                            </a>
                            </motion.div>
                    ))
                }
            </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AllPortfolio