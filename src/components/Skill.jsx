import react from '../assets/React logo.svg'
import bootstrap from '../assets/BOOTSTRAP.svg'
import redux from '../assets/REDUX.svg'
import javascript from '../assets/JavaScript logo.svg'

const Skill = () => {
    return(
        <div className="transparan p-3 p-lg-4 mt-4 mb-lg-5">
            <div className='col-10 col-md-11 m-auto d-flex justify-content-between '>
                <div className='col-2'>
                    <img style={{width:'100%'}} src={react} alt="" />
                </div>
                <div className='col-2'>
                    <img style={{width:'100%'}} src={redux} alt="" />
                </div>
                <div className='col-2'>
                    <img style={{width:'100%'}} src={javascript} alt="" />
                </div>
                <div className='col-2'>
                    <img style={{width:'100%'}} src={bootstrap} alt="" />
                </div>
            </div>
        </div>
    )
}
export default Skill