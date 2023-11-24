import { useMediaQuery } from "../utils/MediaQueryHook";

const CardService = ({img, title, text, className}) => {
    
    const { fontSizeDesc } = useMediaQuery();
    const fontSize = fontSizeDesc()
    
    return(
        <div className="transparan d-flex justify-content-between p-2 mb-2 gap-3">
            <div className="d-flex p-1">
                <div className="col-2 rounded-3" style={{width:'4em', height:'4em', backgroundColor:'var(--warning)'}}>
                    {
                        img &&                        
                        <img style={{width:'100%',height:'100%'}}
                        className="rounded-3" src={img} alt={title} />
                    }
                </div>
                <div className="ms-3 col- 9 d-flex justify-content-center flex-column ms-2 me-2">
                    <p className="m-0 fw-semibold">{title}</p>
                    <p className="m-0 fw-light" style={{fontSize:'0.7rem'}}>{text}</p>
                </div>
            </div>
            { className &&
                <div className=" d-flex align-items-center col-1 justify-content-end pe-3">
                    <i style={{color:'var(--warning)'}} className={className}></i>
                </div>
            }
        </div>
    )
}
export default CardService