import { useMediaQuery } from "../utils/MediaQueryHook";

const CardPortofolio = ({ img, title, text }) => {
    
    const { heightImgPortfolio } = useMediaQuery();
    const height = heightImgPortfolio() 
  return (
    <div className="rounded-3 m-1 mt-4" >
      <div 
        className="col-12  rounded-top-3 transparan-white" 
        style={{width:'100%', height:height}}
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
