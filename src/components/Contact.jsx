import CardService from "../elements/CardService";
import { useMediaQuery } from "../utils/MediaQueryHook";
import test from '../assets/lia.jpeg'
import Input from "../elements/Input";
import Textarea from "../elements/Textarea";

const Contact = ({id}) => {
    
    const { fontSizeDesc } = useMediaQuery();
    const fontSize = fontSizeDesc()
    return(
        <div className="mt-5" id={id}>
            <div className="text-center col-md-7 col-lg-6 col-10 m-auto">
                <p className="fw-semibold fs-2 fs-md-1">Let's Discuss Your <span style={{color:'var(--warning)'}}>Project</span></p>
                <p style={{fontSize:fontSize, color:'var(--secondary)'}}>Let's make something new, different and more meaningful or make thing more visual or conceptual</p>
            </div>
            <div className="d-flex flex-wrap-reverse justify-content-between row">
                <div className="col-md-5 col-lg-3 col-8 ">    
                    <div className="">
                        <CardService
                            icon={<i style={{fontSize:'25px'}} class="bi bi-telephone text-black mt-1"></i>}
                            title={'Call Me'}
                            text={'+6282218338566'}
                            style={{width:'3em', height:'3em', backgroundColor:'var(--warning)'}}
                        />   
                        <CardService
                            icon={<i style={{fontSize:'25px'}} class="bi bi-geo-alt text-black mt-1 "></i>}
                            title={'Address'}
                            text={'Jakarta'}              
                            style={{width:'3em', height:'3em', backgroundColor:'var(--warning)'}}
                        /> 
                    </div>                
                    <CardService
                        icon={<i style={{fontSize:'25px'}} class="bi bi-envelope-at text-black mt-1 "></i>}
                        title={'Email Me'}
                        text={'tugasriskaamelia@gmail.com'}
                        style={{width:'3em', height:'3em', backgroundColor:'var(--warning)'}}
                    /> 
                </div>
                <div className="col-md-7 col-lg-6 col-12">
                    <div className="d-md-flex gap-2">
                        <Input
                            placeholder={'Full Name'}
                        />
                        <Input
                            placeholder={'Your Email'}
                        />
                    </div>
                    <Input
                        placeholder={'Phone Number'}
                    />
                    <Textarea
                        placeholder={'Message'}
                    />                    
                    <button 
                        className="btn rounded-2 text-black mt-3 d-flex justify-content-end "
                        type="submit"
                        style={{backgroundColor:'var(--warning)'}}
                    >
                        Submit Message
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Contact