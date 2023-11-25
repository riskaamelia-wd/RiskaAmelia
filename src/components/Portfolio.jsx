import CardPortofolio from "../elements/CardPortofolio"
import test from '../assets/lia.jpeg'

const Portfolio = ({id}) => {
    return(
        <div className="p-3 mb-3 mt-5  transparan" id={id}>
            <div className="d-flex justify-content-between">
                <p className="fw-semibold fs-2 fs-md-1 m-0">Our Portofolio</p>
                <div className="d-flex align-items-center" style={{color:'var(--warning)'}}>
                    <p className="m-0">See All</p>
                <i  className="bi bi-arrow-right ms-3"></i>
                </div>
            </div>
            <div className="d-flex row">
                <div className="col-md-4 col-6">               
                    <CardPortofolio
                    img={test}
                    title={'Website'}
                    text={'50+ Project'}
                    />
                </div>
                <div className="col-md-4 col-6">               
                    <CardPortofolio
                    img={test}
                    title={'Website'}
                    text={'50+ Project'}
                    />
                </div>
                <div className="col-md-4 col-6">               
                    <CardPortofolio
                    img={test}
                    title={'Website'}
                    text={'50+ Project'}
                    />
                </div>
                <div className="col-md-4 col-6">               
                    <CardPortofolio
                    img={test}
                    title={'Website'}
                    text={'50+ Project'}
                    />
                </div>
                <div className="col-md-4 col-6">               
                    <CardPortofolio
                    img={test}
                    title={'Website'}
                    text={'50+ Project'}
                    />
                </div>
                <div className="col-md-4 col-6">               
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
export default Portfolio