const NumberandText = ({text, number}) => {
    return(
        <>
            <p style={{fontSize:'0.9rem'}}>{text}</p>
            <p className="fw-bold fs-1 fs-lg-1">{number}</p>
        </>
    )
} 
export default NumberandText