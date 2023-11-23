import CardService from "../elements/CardService"
import test from '../assets/lia.jpeg'
import { useMediaQuery } from "../utils/MediaQueryHook";

const Service = () => {
    const { fontSizeDesc } = useMediaQuery();
    const fontSize = fontSizeDesc()
    return(
        <div  className="d-flex flex-fill justify-content-around mt-5">
            <div className="col-lg-3 col-md-4 col-5">
                <p className="fw-semibold fs-2 fs-md-1">My Awesome Service</p>
                <p className="fw-light" style={{color:'var(--secondary)', fontSize: fontSize}}>Eget malesuada tortor ut sed. Tincidunt viverra malesuada nisl vehicula vestibulum. Ut blandit fermentum, cursus nulla. Imperdiet neque mi convallis quis interdum sagittis.</p>
            </div>
            <div className="col-md-6 col-6 justify-content-end flex-column d-flex">
                {/* <CardService
                img={test}
                title={'Website'}
                text={'50+ Project'}
                />  */}
                <CardService
                img={test}
                title={'Website'}
                text={'50+ Project'}
                /> 
                <CardService
                img={test}
                title={'Website'}
                text={'50+ Project'}
                />  
            </div>
        </div>
    )
}
export default Service