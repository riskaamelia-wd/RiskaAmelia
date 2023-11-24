import CardService from "../elements/CardService";
import { useMediaQuery } from "../utils/MediaQueryHook";
import test from '../assets/lia.jpeg'

const Contact = () => {
    
    const { fontSizeDesc } = useMediaQuery();
    const fontSize = fontSizeDesc()
    return(
        <div className="mt-5">
            <div className="text-center col-md-7 col-lg-6 col-10 m-auto">
                <p className="fw-semibold fs-2 fs-md-1">Let's Discuss Your <span style={{color:'var(--warning)'}}>Project</span></p>
                <p style={{fontSize:fontSize, color:'var(--secondary)'}}>Let's make something new, different and more meaningful or make thing more visual or conceptual</p>
            </div>
            <div>
                <div className="col-4">                    
                    <CardService
                    // img={<i class="bi bi-telephone"></i>}
                    title={'Website'}
                    text={'50+ Project'}
                    />                 
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
        </div>
    )
}
export default Contact