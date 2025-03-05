import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosClient2 } from '../api/axios'
import { ToastContainer, toast } from 'react-toastify';

function Login() {
    const [email ,setEmail]=useState("")
    const [password ,setPassword]=useState("")
    const [Errors ,setErrors]=useState("")
    const [Loading ,setLoading]=useState(false)
    const navigate=useNavigate()

// useEffect(()=>{
// getCsrf()
// },[])
//     const getCsrf=()=>{
//       axiosClient2.get("/sanctum/csrf-cookie").then(res=>console.log(res))
//     }



    const sendData=async(e)=>{
        e.preventDefault();

        const data={
            email:email,
            password:password
        }

        try {
          setLoading(true)
          const response=await axiosClient2.post('/api/login',data);
          console.log(response)
          setLoading(false)
          navigate('/admin/dashboard')


        } catch (error) {
          if(error.response){
            if(error.response.status==404){
              navigate('/admin/dashboard')
            }else{
              setErrors(error.response.data.message)
              console.error("Response Error",error.response.data)
              setEmail('')
              setPassword('')
              setLoading(false)
              setEmail('')
              setPassword('')
              console.error("Status Error",error.response.status)
              console.error("Headers",error.response.headers)
            }

          }else if(error.request){
            setEmail('')
            setPassword('')
              console.error("Request Error" ,error.request)
          }else{
            setEmail('')
            setPassword('')
              console.error("general Error" ,error.message)
      }
        }
    }

  return (
    <div className='d-flex align-items-center justify-content-center login '>
      <div className="card-form  p-4">

  <h4 className="title-form">Log In!</h4>
  <form className='p-4' onSubmit={sendData}>
          {
            Errors?(
              <>
              <div className="font-bold text-center bg-sky-200 rounded-2 p-1 text-danger mt-4">{Errors} </div>
              </>
            ):(
              <div className="mt-4"></div>
            )
          }
    <div className="field-form ">
      <svg className="input-icon-form" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"></path></svg>
      <input autocomplete="off" onChange={e=>setEmail(e.target.value)}  id="logemail" placeholder="Email" className="input-field-form" name="logemail" type="email" />
    </div>
    <div className="field-form">
      <svg className="input-icon-form" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path></svg>
      <input  autocomplete="off"  onChange={e=>setPassword(e.target.value)} id="logpass" placeholder="Password" className="input-field-form" name="logpass" type="password" />
    </div>
    <button className="btn-form" type="submit">
      {
        Loading?(
      <div class="flex flex-row gap-2">
        <div class="w-2 h-2  mt-2 mb-1 rounded-full bg-white animate-bounce"></div>
        <div class="w-2 h-2 mt-2 mb-1 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
        <div class="w-2 h-2 mt-2 mb-1 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
      </div>
        ):(
          <>
           Login
          </>
        )
      }

      </button>
    <a href="#" className="btn-link-form">Forgot your password?</a>
  </form>
</div>
    </div>
  )
}

export default Login
