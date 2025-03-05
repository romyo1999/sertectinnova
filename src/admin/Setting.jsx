import React, { useEffect, useState } from 'react'
import {PencilIcon} from "@heroicons/react/24/outline"
import { FaEdit } from 'react-icons/fa'
import { axiosClient2 } from '../api/axios'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '../components/loader'
import { useSettingContext } from '../providers/GeneralSettingProvider'
import { useUserContext } from '../providers/UserProvider'
const Setting = () => {
    const {setting ,reload ,setReload}=useSettingContext()
    console.log(setting)
    const [loading ,setLoading]=useState(false)
    const [email ,setEmail]=useState(setting.length>0?setting[0].email:"")
    const [phone ,setPhone]=useState(setting.length>0?setting[0].phone:"")
    const [facebook ,setFacebook]=useState(setting.length>0?setting[0].facebook:"")
    const [linkedin ,setLinkedin]=useState(setting.length>0?setting[0].linkedin:"")
    const [Errors ,setErrors]=useState("")

    const {data,count ,setCount}=useUserContext()
    useEffect(()=>{
      setCount(count+1)
      },[])
    


    // useEffect(()=>{
    //     const timeoutId = setTimeout(() => {
    //         if(setting.length>0){
    //             setEmail(setting[0].email)
    //             setPhone(setting[0].phone)
    //             setFacebook(setting[0].facebook)
    //             setLinkedin(setting[0].linkedin)
    //         }
    
    //       }, 1000);
      
    //       return () => clearTimeout(timeoutId);

    // },[restart])

    const handleEmail=(e)=>{
      setEmail(e);
      setPhone(setting[0].phone);
      setFacebook(setting[0].facebook);
      setLinkedin(setting[0].linkedin);
    }

    const handlePhone=(e)=>{
      setPhone(e);
      email?'':setEmail(setting[0].email);
      facebook?'':setFacebook(setting[0].facebook);
      linkedin?'':setLinkedin(setting[0].linkedin);
    }

    const handleFacebook=(e)=>{
      setFacebook(e);
      phone?'':setPhone(setting[0].phone);
      email?'':setEmail(setting[0].email);
      linkedin?'':setLinkedin(setting[0].linkedin);
    }

    const handleLinkedin=(e)=>{
      setLinkedin(e);
      phone?'':setPhone(setting[0].phone);
      facebook?'':setFacebook(setting[0].facebook);
      email?'':setEmail(setting[0].email);
    }

    const handleUpdate=async(e)=>{
        e.preventDefault();
      

        const formData={
            email:email,
            phone:phone,
            facebook:facebook,
            linkedin:linkedin,
        }
        console.log(formData)
        setLoading(true)
        console.log(email,phone,facebook,linkedin)
        try {
          const response = await axiosClient2.put("/api/setting",formData);
          console.log(response)
          setReload(reload+10)
          setLoading(false)
          setErrors("")
          toast.success("Setting Updated successfilly!.")
        
        } catch (error) { 
            if(error.response){
              console.error("Response Error",error.response.data)
              setErrors(error.response.data.message)
          toast.error("Failed to Update Setting . Please try again later.")
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
          <div style={{minWidth:"1300px"}} className='overflow-x-auto   '>
            <ToastContainer/>
        <div className="flex flex-row space-x-8 h-screen p-1">
        <div className="flex-grow p-2  border rounded-lg shadow-lg ml-28 mb-8">
         <div className=' flex items-center justify-between mb-3'></div>

         <form className="form w-75 mx-auto" onSubmit={handleUpdate} >
            <p className="form-title w-100 mb-3">Website Information Contact </p>
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
            <input   placeholder={`${setting.length>0?setting[0].email:""}`} value={email} name="email"  onChange={e=>handleEmail(e.target.value)} type="text" className="input"/>
            <span>Email :</span>
        </label>

        <label className='w-50'>
            <input   placeholder={`${setting.length>0?setting[0].phone:""}`} value={phone} name="phone"  onChange={e=>handlePhone(e.target.value)} type="text" className="input"/>
            <span>Phone :</span>
        </label>
    </div>  
            
    <label className='mb-4'>
        <input   placeholder={`${setting.length>0?setting[0].facebook:""}`} value={facebook}  name="facebook"  onChange={e=>handleFacebook(e.target.value)} type="text" className="input " />
        <span>Facebook :</span>
    </label> 

    <label className='mb-4'>
        <input   placeholder={`${setting.length>0?setting[0].linkedin:""}`}  value={linkedin} name="linkedin"   onChange={e=>handleLinkedin(e.target.value)} type="text" className="input " />
        <span>Linkedin :</span>
    </label> 
        


    <button type="submit" className="submit mt-4">
      {
        loading?(
          <>
          <Loader/>
          </>
        ):(
      <span className='flex items-center justify-center'>
      <b className="text-white  fs-4 me-2">Update</b> 
       <FaEdit className='d-inline text-white fs-4'/>
      </span>
        )
      }

    </button>
</form>

    







    </div>
    </div>
    </div>
  )
}

export default Setting
