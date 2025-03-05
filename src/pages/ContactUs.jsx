
"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { ImagesSlider } from "../ui/images-slider";
import c2 from "../assets/contactus/contact2.png"
import c3 from "../assets/contactus/contact3.png"
import c1 from "../assets/contactus/contact4.png"
import {Link} from "react-scroll"
import { ToastContainer, toast } from 'react-toastify';
import { axiosClient2 } from "../api/axios";
import "./ContactUs.css"
import { useSettingContext } from "../providers/GeneralSettingProvider";

import GoogleMap from "../components/GoogleMap";
import Loader from "../components/loader";
import {useTranslation} from "react-i18next";


export default function ContactUs() {
  const {setting}=useSettingContext()
  const [loading,setLoading]=useState(false);
  const [Errors,setErrors]=useState('');
  const [Firstname,setFirstName]=useState('');
  const [Lastname,setLastName]=useState('');
  const [Email,setEmail]=useState('');
  const [Subject,setSubject]=useState('');
  const [Message,setMessage]=useState('');
  const [WebsiteEmail,setWebsiteEmail]=useState(setting?.email);
  const [WebsitePhone,setWebsitePhone]=useState(setting?.phone);
  const images = [
    c1,
    c2,
    c3,
  ];
  const {t}=useTranslation()



  const data = [
    { text: t("contactUs.text1"), value: t("contactUs.val1") },
    { text: t("contactUs.text2"), value: t("contactUs.val2")},
    { text: t("contactUs.text3"), value: t("contactUs.val3") },
    { text: t("contactUs.text4"), value: t("contactUs.val4") },
    { text: t("contactUs.text5"), value: t("contactUs.val5") },
    { text: t("contactUs.text6"), value: t("contactUs.val6") },
    { text: t("contactUs.text7"), value: t("contactUs.val7") },
    { text: t("contactUs.text8"), value: t("contactUs.val8") },
    { text: t("contactUs.text9"), value: t("contactUs.val9") },
  ];




  const handleContact=async(e)=>{
    e.preventDefault();

    const formData={
      first_name:Firstname,
      last_name:Lastname,
      email:Email,
      subject:Subject,
      message:Message,
    }
    setLoading(true)
    try {
      const response = await axiosClient2.post("/api/contact",formData);
      setLoading(false)
      setErrors("")
      toast.success("Your message has been successfully sent!.")
      setEmail("")
      setFirstName("")
      setLastName("")
      setSubject("")
      setMessage("")


    } catch (error) {
        if(error.response){
          console.error("Response Error",error.response.data)
          setErrors(error.response.data.message)
      toast.error("Failed to send review. Please try again later.")
          setLoading(false)
          console.error("Status Error",error.response.status)
          console.error("Headers",error.response.headers)
        }else if(error.request){
            console.error("Request Error" ,error.request)
        }else{
            console.error("general Error" ,error.message)
    }

    }
    setLoading(false)

  }




  return (
<>
<ToastContainer/>

<div style={{background:'black'}}>


<ImagesSlider  className="h-[40rem]" images={images} >
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="fs-1 font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          {t("contactUs.title")}
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4 hover:bg-green-900">
          <Link to="contact">{t("contactUs.des1")} →</Link>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
</div>

    {/* the section after the image silder  */}
    <div >
        <div className="row">
          <div className="col-lg-6 col-md-12 p-5">
            <div className="w-100 d-flex p-4 m-4 mt-4 flex-column align-items-center justify-content-center m-1 bg-white">
              <h1 className="text-center mb-4 fs-2" style={{fontWeight:"bold" ,fontFamily:"verdana"}}>{t("contactUs.title")}</h1>
              <section id="contact"  ></section>
              <p className="text-center fs-6 text-secondary  ps-1 pe-1" style={{fontWeight:"bold" ,fontFamily:"arial"}} >
                {t("contactUs.desc2")}
              </p>


<br />
 {/* card address  */}
 <div className="new-container w-100">

                  <div className="box w-100 mt-4">
                    <div className='d-flex align-items-center justify-content-start '>
                        <svg width="50" height="50" viewBox="0 0 107 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M53.3333 92.5016C82.7883 92.5016 106.667 83.1836 106.667 71.6891C106.667 65.831 100.464 60.5377 90.4821 56.7559C84.3909 66.4489 75.1024 74.804 63.304 79.1765C56.9621 81.5269 49.7045 81.5269 43.3627 79.1765C31.5642 74.804 22.2755 66.4489 16.1844 56.7559C6.2024 60.5377 0 65.831 0 71.6891C0 83.1836 23.8781 92.5016 53.3333 92.5016Z" fill="#1C274C"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M16 30.1302C16 13.4897 32.5655 0 53 0C73.4346 0 90 13.4897 90 30.1302C90 46.6403 78.1907 65.9058 59.7662 72.7956C55.4711 74.4014 50.5289 74.4014 46.2338 72.7956C27.8091 65.9058 16 46.6403 16 30.1302ZM53 41.625C58.8386 41.625 63.5714 37.4838 63.5714 32.375C63.5714 27.2664 58.8386 23.125 53 23.125C47.1614 23.125 42.4286 27.2664 42.4286 32.375C42.4286 37.4838 47.1614 41.625 53 41.625Z" fill="#1C274C"/>
                      </svg>
                          {/* <span className="fs-3 mt-2  ms-2"> Address</span> */}
                          <div className='text-end p-1 ms-2 fs-6'>
                      <strong>30, Appt 8, Rue Moulay Ahmed Loukili,
                     Hassan, 10000 Rabat, Maroc</strong>
                    </div>
                    </div>

  
                  </div>
                </div>
            {/* card address  */}

            {/* card Email  */}
            <div className="new-container w-100 p-2">
                  <div className="box w-100" >
                    <div className='d-flex align-items-center justify-content-start'>
                    <svg width="50" height="50" viewBox="0 0 74 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M37 46.4038L0 13.7513V55.75H74V13.7513L37 46.4038ZM37.0037 36.5544L0 3.87977V0.25H74V3.87977L37.0037 36.5544Z" fill="#1C274C"/>
                    </svg>

                    <div className='text-start  ms-4 p-1  fs-5'>  
                      <strong >
                      {
                        setting.length>0?setting[0].email:"sertectinnova@gmail.com"
                        }
                      </strong>
                    </div>
                    </div>

       
                  </div>
                </div>
            {/* card Email  */}

            {/* card phone */}
            <div className="new-container  w-100 p-2">
                  <div className="box ">
                    <div className='d-flex align-items-center justify-content-start'>
                    <svg width="50" height="50" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M51.6199 47.4739L49.7473 49.4452C49.7473 49.4452 45.2966 54.131 33.1483 41.3409C21 28.551 25.4506 23.8653 25.4506 23.8653L26.6298 22.6239C29.5346 19.5658 29.8084 14.656 27.2741 11.0716L22.09 3.73951C18.9533 -0.696833 12.8923 -1.28287 9.29706 2.50219L2.84426 9.2958C1.0616 11.1726 -0.133002 13.6055 0.0118737 16.3044C0.38249 23.2091 3.33291 38.0648 19.7965 55.3981C37.2553 73.7789 53.6368 74.5094 60.3358 73.8483C62.4547 73.6391 64.2973 72.4966 65.7822 70.9331L71.6225 64.7846C75.5646 60.6344 74.453 53.5193 69.4091 50.616L61.5548 46.095C58.2429 44.1887 54.2082 44.7486 51.6199 47.4739Z" fill="#1C274C"/>
                    </svg>

                    <div className='text-center p-1 ms-2 fs-5'>
                      <strong>
                      {
                        setting.length>0?setting[0].phone:"+212 6600 45 065"
                        }
                      </strong>
                    </div>                    </div>


                  </div>
                </div>
            {/* card phone */}

            </div>

          </div>


          <div className="col-lg-6 col-md-12 bg-white">
          <div className="w-100 d-flex align-items-center justify-content-center m-1  p-4">
            {/* form for contact  */}
            <form className="form w-100" onSubmit={handleContact} >
            <p className="form-title font-sans mt-5 w-100 mb-3">{t("contactUs.title2")}</p>
            <p className="message fs-5 mb-3">{t("contactUs.desc3")}</p>
            {
            Errors?(
              <>
              <div className="alert alert-danger text-danger mt-4">{Errors} </div>
              </>
            ):(
              <div className="mt-4"></div>
            )
          }
        <div className="flex mb-4 mt-2">
        <label className='w-50'>
            <input required placeholder="" name="first_name" value={Firstname} onChange={e=>setFirstName(e.target.value)} type="text" className="input"/>
            <span>{t("contactUs.formName")} :</span>
        </label>

        <label className='w-50'>
            <input required placeholder=""  name="last_name" value={Lastname} onChange={e=>setLastName(e.target.value)} type="text" className="input"/>
            <span>{t("contactUs.formLast")} :</span>
        </label>
    </div>

    <label className='mb-4'>
        <input required placeholder="" name="email" value={Email} onChange={e=>setEmail(e.target.value)} type="text" className="input " />
        <span>{t("contactUs.formEmail")}  :</span>
    </label>

        {/* select object  */}
        <select required value={Subject} name="subject" className="select select-success w-fullw-100 mb-4" onChange={e=>setSubject(e.target.value)}>
        <option value={" "} >{t("contactUs.formSub")} </option>
        {
          data.map(e=>(
          <option key={e.text} value={e.value}>{e.value}</option>
          ))
        }
      </select>
        {/* select object  */}

        {/* text area  */}
        <textarea required value={Message} name="message" onChange={e=>setMessage(e.target.value)} placeholder={t("contactUs.msg")} className="textarea textarea-bordered textarea-success textarea-lg w-full " ></textarea>
        {/* text area  */}

    <button type="submit" className="submit mt-4">
      {
        loading?(
          <>
          <Loader/>
          </>
        ):(
      <>
      <b className="text-white fs-4 me-2">{t("contactUs.formSend")} </b>
      <svg className="d-inline  " width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.2017 22.7911L35.4652 3.5347M16.7493 23.657L21.1173 32.3932C22.1729 34.5043 22.7006 35.5599 23.3656 35.843C23.9426 36.0887 24.6022 36.044 25.1411 35.7233C25.762 35.3536 26.1433 34.2366 26.9061 32.0029L35.1592 7.83296C35.8239 5.88669 36.1561 4.91354 35.9287 4.26978C35.7307 3.70974 35.2903 3.26921 34.7303 3.07135C34.0865 2.84391 33.1134 3.17621 31.167 3.84078L6.99702 12.094C4.76331 12.8567 3.64645 13.2381 3.27673 13.859C2.95587 14.3978 2.91141 15.0574 3.15705 15.6343C3.44012 16.2992 4.4957 16.8271 6.60686 17.8826L15.343 22.2508C15.6909 22.4247 15.8648 22.5116 16.0154 22.6277C16.1492 22.7309 16.2691 22.8508 16.3721 22.9845C16.4885 23.1352 16.5753 23.3092 16.7493 23.657Z" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      </>
        )
      }

    </button>
</form>
            {/* form for contact  */}
            </div>
          </div>
        </div>


        {/* map place  */}

        <div className="col-lg-12">
        <GoogleMap/>
        </div>
        {/* map place  */}

    </div>


</>


  );
}
