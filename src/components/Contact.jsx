import CardService from "../elements/CardService";
import { useMediaQuery } from "../utils/MediaQueryHook";
import test from '../assets/lia.jpeg'
import Input from "../elements/Input";
import Textarea from "../elements/Textarea";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADDCONTACT } from "../graphql/mutation";
import { GETCONTACT } from "../graphql/query";
import emailjs from '@emailjs/browser'
import { NavLink } from "react-router-dom";
import {motion} from 'framer-motion'

const Contact = ({id}) => {
    const [data, setData] = useState({
        name :'',
        message :'',
        phone :'',
        email:''
    })
    const { fontSizeDesc } = useMediaQuery();
    const fontSize = fontSizeDesc()
    const [add] = useMutation(ADDCONTACT,{
        refetchQueries:[{query:GETCONTACT}]
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let setState = true

        if(setState) {
            setData({...data, [name]:value})
            console.log(data);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // setData({})
        if(window.confirm('Are you sure you want to submit?')){
            await add({
                variables:{
                    object:{
                        name : data?.name,
                        phone : data?.phone,
                        email: data.email,
                        message : data.message
                    }
                }
            })      
            await emailjs      
                .send(
                    'service_2ow4c38',
                    'template_g2g9yxq',
                    {
                        name : data?.name,
                        phone : data?.phone,
                        email : data?.email,
                        message : data?.message
                    },
                    'I4cPlwo89-sE8dr1w'
                )
                .then(
                    (result) => {
                    console.log(result.text);
                    },
                    (error) => {
                    console.log(error.text);
                    }
                )
            .then(() => {
                alert('Successfully')
            })
            .catch((err) => {
                alert(err.message)
            })
        }

        resetFrom()
    }

    const resetFrom = () => {
        setData({
            name : '',
            phone :'',
            email :'',
            message:''
        })
    }
    return(
        <div className="mt-5 mb-lg-5 col-10 col-md-11 m-auto" id={id}>
            <div className="text-center col-md-7 col-lg-6 col-12 m-auto">
                <p className="fw-semibold fs-2 fs-md-1">Let's Discuss Your <span style={{color:'var(--warning)'}}>Project</span></p>
                <p style={{fontSize:fontSize, color:'var(--secondary)'}}>Let's make something new, different and more meaningful or make thing more visual or conceptual</p>
            </div>
            <div className="d-flex mt-4 flex-wrap-reverse justify-content-between row">
                <div className="col-md-5 col-lg-3 m-auto">  
                    <motion.a                 
      whileHover={{ scale: 1.1 }}
    //   transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        target="_blank" href={'https://wa.link/hp10p5'} className="col-6 col-md-12">
                        <CardService
                            icon={<i style={{fontSize:'25px'}} className="bi bi-telephone text-black mt-1"></i>}
                            title={'Call Me'}
                            text={'+6282218338566'}
                            style={{width:'3em', height:'3em', backgroundColor:'var(--warning)'}}
                        />   
                    </motion.a>
                    <a href="mailto:tugasriskaamelia@gmail.com" target="_blank" className="col-8 col-md-12 m-auto">
                        <CardService
                            icon={<i style={{fontSize:'25px'}} className="bi bi-envelope-at text-black mt-1 "></i>}
                            title={'Email Me'}
                            text={'tugasriskaamelia@gmail.com'}
                            style={{width:'3em', height:'3em', backgroundColor:'var(--warning)'}}
                        /> 
                        </a>                            
                    <CardService
                        icon={<i style={{fontSize:'25px'}} className="bi bi-geo-alt text-black mt-1 "></i>}
                        title={'Address'}
                        text={'Jakarta'}              
                        style={{width:'3em', height:'3em', backgroundColor:'var(--warning)'}}
                    /> 
                </div>
                <form onSubmit={handleSubmit} className="col-md-7 col-lg-6 col-12 m-auto">
                    <div className="d-md-flex gap-2">
                        <Input
                            placeholder={'Full Name'}
                            name={'name'}
                            type={'text'}
                            value={data?.name}
                            onChange={handleChange}

                        />
                        <Input
                            placeholder={'Your Email'}
                            name={'email'}
                            type={'email'}
                            value={data?.email}
                            onChange={handleChange}
                        />
                    </div>
                    <Input
                        placeholder={'Phone Number'}
                        name={'phone'}
                        type={'text'}
                        value={data?.phone}
                        onChange={handleChange}
                    />
                    <Textarea
                        placeholder={'Message'}
                        name={'message'}
                        value={data?.message}
                        onChange={handleChange}
                    />                    
                    <button 
                        // disabled={}
                        className="btn btn-submit rounded-2 text-black mb-5 mt-3 "
                        type="submit"
                        style={{backgroundColor:'var(--warning)'}}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Contact