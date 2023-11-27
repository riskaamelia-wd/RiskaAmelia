import CardService from "../elements/CardService"
import test from '../assets/lia.jpeg'
import { useMediaQuery } from "../utils/MediaQueryHook";

const Service = ({id}) => {
    const { fontSizeDesc } = useMediaQuery();
    const fontSize = fontSizeDesc()
    return(
        <div id={id} className="col-10 col-md-11 row m-auto d-flex justify-content-evenly mt-5 mb-lg-5">
            <div className="col-lg-4 col-md-4 col-12">
                <p className="fw-semibold fs-2 fs-md-1 text-nowrap">My Awesome Service</p>
                <p className="fw-light" style={{color:'var(--secondary)', fontSize: fontSize}}>Eget malesuada tortor ut sed. Tincidunt viverra malesuada nisl vehicula vestibulum. Ut blandit fermentum, cursus nulla. Imperdiet neque mi convallis quis interdum sagittis.</p>
            </div>
            <div className="col-md-6 col-12 justify-content-center mt-2 flex-column d-flex">
                <CardService
                img={test}
                title={'Website Design'}
                text={'50+ Project'}
                className={"bi bi-arrow-right"}
                style={{width:'4em', height:'4em'}}
                /> 
                <CardService
                img={test}
                title={'Website'}
                text={'50+ Project'}
                className={"bi bi-arrow-right"}
                style={{width:'4em', height:'4em'}}
                />  
            </div>
        </div>
    )
}
export default Service