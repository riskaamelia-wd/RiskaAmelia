const CardService = ({img, title, text}) => {
    return(
        <div className="transparan d-flex justify-content-between p-2 gap-3">
            <div className="d-flex">
                <div className="col-2" style={{width:'4em', height:'4em'}}>
                    <img style={{width:'100%',height:'100%'}}
                    className="rounded-3" src={img} alt={title} />
                </div>
                <div className="ms-3 col- 9 d-flex justify-content-center flex-column ms-2 me-2">
                    <p className="m-0 fw-semibold">{title}</p>
                    <small className="fw-light">{text}</small>
                </div>
            </div>
            <div className=" d-flex align-items-center ms-5 col-1 justify-content-end pe-3">
                <i style={{color:'var(--warning)'}} className="bi bi-arrow-right"></i>
            </div>
        </div>
    )
}
export default CardService