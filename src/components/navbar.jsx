const Navbar = ({service, portfolio, contact, about}) => {
    return(
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="col-10 col-md-11 m-auto d-flex justify-content-between">
                    <a href="" className="navbar-brand ps-3 fw-semibold text-start">LIA .</a>        
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-lg-flex justify-content-lg-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-link">
                                <a href={service} className="nav-link">Service</a>
                            </li>
                            <li className="nav-link">
                                <a href={portfolio} className="nav-link">portofolio</a>
                            </li>
                            <li className="nav-link">
                                <a href={contact} className="nav-link">Contact</a>
                            </li>
                            <li className="nav-link">
                                <a href={about} className="nav-link">About</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
        </>
    )
}
export default Navbar