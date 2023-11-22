const Navbar = () => {
    return(
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a href="" className="navbar-brand fw-semibold">LIA .</a>        
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-lg-flex justify-content-lg-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-link">
                                <a href="#" className="nav-link">Service</a>
                            </li>
                            <li className="nav-link">
                                <a href="#" className="nav-link">portofolio</a>
                            </li>
                            <li className="nav-link">
                                <a href="#" className="nav-link">Contact</a>
                            </li>
                            <li className="nav-link">
                                <a href="#" className="nav-link">About</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
        </>
    )
}
export default Navbar