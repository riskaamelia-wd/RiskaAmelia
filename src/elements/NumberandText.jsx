import { useMediaQuery } from "react-responsive";

const NumberandText = ({text, number}) => { 
    const isMobile = useMediaQuery({ maxWidth: 588 });
    const isTablet = useMediaQuery({ minWidth: 588, maxWidth: 1023 });
    const fontSizeText = isMobile ? '0.57rem' : (isTablet ? '1em' : '1.4em');
    const fontSizeNumber = isMobile ? '0.9rem' : (isTablet ? '1em' : '3.7em');
    return(
        <div className="mb-md-3 m-1">
            <p 
            style={{fontSize:fontSizeText, color:'var(--secondary)'}}
             className="m-0">{text}</p>
            <p style={{fontSize:fontSizeNumber}} className="fw-bold m-0">{number}</p>
        </div>
    )
} 
export default NumberandText