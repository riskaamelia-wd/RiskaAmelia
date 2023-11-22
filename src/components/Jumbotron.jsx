import NumberandText from "../elements/NumberandText"
import photo from '../assets/lia.jpeg'

const Jumbotorn = () => {
    return(
        <div className=" mt-md-5  mb-md-5 d-flex flex-row flex-fill justify-content-around">
            <div className="col-6 col-md-3 col-lg-2 d-flex flex-column justify-content-center position-relative">
                <h1 className="z-1 fw-semibold text-nowrap" style={{fontSize:'3rem'}}>Riska Amelia</h1>
                <hr className="border border-primary border-3 opacity-75"/>
                <p style={{ fontSize: '0.7rem' }} className="">
                    Eget malesuada tortor ut sed. Tincidunt viverra malesuada nisl vehicula vestibulum. Ut blandit fermentum,
                    cursus nulla. Imperdiet neque mi convallis quis interdum sagittis.
                </p>
            </div>
            <div className="d-none d-sm-block col-sm-4 col-lg-3">
                <img className="img-fluid" src={photo} alt="" style={{maxWidth: '100%', height: 'auto'}} />
            </div>

            <div className="col-lg-1 p-3 col-md-2 col-4">
                <NumberandText
                    text={'Years of Experience'}
                    number={'3+'}
                />
                <NumberandText
                    text={'Complete Project'}
                    number={'5+'}
                />
            </div>
        </div>
    )
}
export default Jumbotorn