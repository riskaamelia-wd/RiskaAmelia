import { useMediaQuery } from "../utils/MediaQueryHook";

const CardPortofolio = ({ img, title, text, className }) => {

    const { heightImgPortfolio } = useMediaQuery();
    const height = heightImgPortfolio() 
  return (
    <div className="rounded-3 m-1 mt-2 p-1" >
      <div 
        className={`col-12  rounded-top-3 transparan-white ${className}`} 
        style={{width:'100%'
        , height:height
      }}
    //   style={{height:'10em', aspectRatio: '1 / 1' }}
      >
        <img style={{ width: '100%', height:'100%'}} className="card-img-top rounded-top-3" src={img} alt="" />
      </div>
      <div className="card-body p-2">
        <p className="card-title fw-semibold">{title}</p>
        <p className="card-text fw-light">{text}</p>
      </div>
    </div>
  );
};

export default CardPortofolio;
