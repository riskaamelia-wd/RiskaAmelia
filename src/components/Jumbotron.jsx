import NumberandText from "../elements/NumberandText"
import photo from '../assets/lia.jpeg'
import { useMediaQuery } from '../utils/MediaQueryHook'

const Jumbotorn = () => {    
    // const isMobile = useMediaQuery({ maxWidth: 588 });
    // const isTablet = useMediaQuery({ minWidth: 588, maxWidth: 1023 });
    // const fontSizeName = isMobile ? '2em' : (isTablet ? '3em' : '5em');
    // const fontSizeDesc = isMobile ? '0.6em' : (isTablet ? '0.8em' : '1em');
    
  const { fontSizeName,  fontSizeDesc} = useMediaQuery();

  const getfontSizeName = fontSizeName();
  const getfontSizeDesc = fontSizeDesc()

    return(
        <div className=" mt-md-5 mt-3  mb-md-5 d-flex flex-row flex-fill justify-content-between">
            <div className="col-6 col-md-3 col-lg-2 d-flex flex-column justify-content-center position-relative">
                <h1 className=" fw-semibold text-nowrap mt-2 mt-md-0" style={{fontSize:getfontSizeName }}>Riska Amelia</h1>
                <hr style={{ borderColor: 'var(--warning)', borderWidth: '4px', opacity: '0.75' }} className="col-7"/>

                <p style={{ fontSize: getfontSizeDesc, color:'var(--secondary)' }} className="">
                    Eget malesuada tortor ut sed. Tincidunt viverra malesuada nisl vehicula vestibulum. Ut blandit fermentum,
                    cursus nulla. Imperdiet neque mi convallis quis interdum sagittis.
                </p>
            </div>
            <div className="d-none d-sm-block col-sm-4 col-lg-4">
                <img className="img-fluid rounded-3" src={photo} alt="" style={{maxWidth: '100%', height: 'auto'}} />
            </div>

            <div className="col-lg-2 col-md-2 col-3 d-flex flex-column justify-content-center mt-5 mt-md-0">
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