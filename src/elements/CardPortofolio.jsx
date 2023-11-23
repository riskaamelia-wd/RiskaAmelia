const CardPortofolio = ({ img, title, text }) => {
  return (
    <div className="transparan rounded-3 mb-3 mt-3" >
      <div className="col-12 rounded-3" 
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
