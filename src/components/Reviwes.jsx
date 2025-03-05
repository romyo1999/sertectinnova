import React, { useEffect, useState } from 'react'
import "./Reviwes.css"
import logo from "../assets/logo.png"


import FormReviews from './FormReviews';
import Carousel from './Carousel';
import { axiosClient2 } from '../api/axios';
import { useCookies } from 'react-cookie';
import Star from './Star';
import ImageSpinner from './ImageSpinner';
import ClassicLoader from './Loaders/ClassicLoader';


const Reviwes = () => {
  const [cookies] = useCookies(['reviews']);

  const [show ,setShow]=useState(false)
  const [reviews ,setReviews]=useState([])
  const [stars ,setStars]=useState(4)
  const [loading,setLoading]=useState(false)

    const rating=[
      "Poor",
      "Fair",
      "Good",
      "Very good",
      "Excellent"
    ]

    useEffect(()=>{
      fetchData()
    },[])

    const fetchData=async()=>{
      setLoading(true)
      try {
        const response = await axiosClient2.get("api/reviews/all");
        console.log(response.data.reviews)
        setReviews(response.data.reviews)
        console.log(response.data.reviews)
        setLoading(false)
      
      } catch (error) {
          if(error.response){
            console.error("Response Error",error.response.data)
            console(error.response.data)
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
    

      const total=()=>{
        if(reviews.length>0){
          return Math.ceil((reviews.reduce((tootal,item)=>tootal+item.stars,0))/reviews.length)

        }else{
          return 4.9
        }
      }


      // create  array from  number 
      // const repetitions = Array.from({ length: total() }, (_, index) => index + 1);
      // console.log(repetitions)
      // create  array from  number 

      
  return (

    <div className=' container-fluid '>
        <div className='text-center d-flex align-items-center justify-content-center'>
            <h2 className='me-4 fs-3 mb-3' style={{fontWeight:"bold"}}>Reviews</h2>
            {/* show the reviews form  */}
            <button className='btn btn-primary m-0 mb-3  ms-4 ' style={{fontWeight:"bold"}}  onClick={()=>setShow(!show)} disabled={cookies["reviews"]?true:false} > 
                <> <svg width="25" className='d-inline-block me-1' height="25" viewBox="0 0 47 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M37.3454 9.24398C34.1322 6.14741 29.8913 4.22125 25.3538 3.79755C20.8163 3.37386 16.2666 4.47918 12.489 6.92297C8.71148 9.36676 5.94282 12.9959 4.66036 17.1846C3.3779 21.3734 3.66202 25.8593 5.46374 29.869C5.65152 30.2417 5.71314 30.6612 5.63999 31.069L3.91665 39.0002C3.85026 39.3043 3.86382 39.6194 3.95611 39.9172C4.0484 40.2151 4.21654 40.4863 4.4454 40.7065C4.63302 40.8848 4.85641 41.0249 5.1021 41.1184C5.34779 41.2118 5.6107 41.2567 5.87499 41.2502H6.26665L14.6483 39.6377C15.0743 39.5887 15.5063 39.6469 15.9017 39.8065C20.0896 41.5315 24.7748 41.8036 29.1498 40.5757C33.5247 39.3478 37.3151 36.6969 39.8675 33.0801C42.4199 29.4633 43.5743 25.1072 43.1318 20.7628C42.6893 16.4184 40.6775 12.3579 37.4433 9.28148L37.3454 9.24398ZM15.6667 24.3752C15.2793 24.3752 14.9007 24.2653 14.5787 24.0592C14.2566 23.8532 14.0056 23.5604 13.8574 23.2178C13.7092 22.8751 13.6704 22.4981 13.7459 22.1344C13.8215 21.7707 14.008 21.4366 14.2819 21.1744C14.5558 20.9122 14.9047 20.7336 15.2846 20.6613C15.6645 20.5889 16.0582 20.626 16.4161 20.768C16.7739 20.9099 17.0798 21.1502 17.2949 21.4585C17.5101 21.7669 17.625 22.1294 17.625 22.5002C17.625 22.9975 17.4187 23.4744 17.0514 23.8261C16.6841 24.1777 16.186 24.3752 15.6667 24.3752ZM23.5 24.3752C23.1127 24.3752 22.734 24.2653 22.412 24.0592C22.0899 23.8532 21.8389 23.5604 21.6907 23.2178C21.5425 22.8751 21.5037 22.4981 21.5793 22.1344C21.6548 21.7707 21.8414 21.4366 22.1152 21.1744C22.3891 20.9122 22.7381 20.7336 23.1179 20.6613C23.4978 20.5889 23.8916 20.626 24.2494 20.768C24.6072 20.9099 24.9131 21.1502 25.1283 21.4585C25.3435 21.7669 25.4583 22.1294 25.4583 22.5002C25.4583 22.9975 25.252 23.4744 24.8847 23.8261C24.5175 24.1777 24.0194 24.3752 23.5 24.3752ZM31.3333 24.3752C30.946 24.3752 30.5674 24.2653 30.2453 24.0592C29.9233 23.8532 29.6723 23.5604 29.5241 23.2178C29.3758 22.8751 29.3371 22.4981 29.4126 22.1344C29.4882 21.7707 29.6747 21.4366 29.9486 21.1744C30.2224 20.9122 30.5714 20.7336 30.9513 20.6613C31.3311 20.5889 31.7249 20.626 32.0827 20.768C32.4406 20.9099 32.7464 21.1502 32.9616 21.4585C33.1768 21.7669 33.2917 22.1294 33.2917 22.5002C33.2917 22.9975 33.0853 23.4744 32.7181 23.8261C32.3508 24.1777 31.8527 24.3752 31.3333 24.3752Z" fill="white"/>
                </svg>
                 Write Reviwes</>
            
             </button>
        </div>
        {
              show?(
                <>
                <div className='cover'></div>
                <FormReviews show={show} setShow={setShow}/>
                </>
              ):(
                <></>
              )
            }

   <hr />

            {/* show reviews resulst */}
           <div className='col-lg-12  row'>

              {/* show total rating */}
              <div className='col-lg-3 bg-dark d-flex  flex-column align-items-center justify-content-center'>
                <ImageSpinner src={logo} alt="" className='mt-2' />
                <div className=' mt-4 mb-4 d-flex align-items-center jusify-content-center'>
                  <Star star={total()} stars={1} w={60} h={55}/>
                  <Star star={total()} stars={2} w={60} h={55}/>
                  <Star star={total()} stars={3} w={60} h={55}/>
                  <Star star={total()} stars={4} w={60} h={55}/>
                  <Star star={total()} stars={5} w={60} h={55}/>
                </div>
                <h2 className='mb-4 fs-3'>  <b className='text-white mt-4'>{rating[total()-1] }</b></h2>
              </div>
              
              {/* show total rating */}
              {/* show the reviews */}
              <div className='col-lg-9 col-md-12  bg-dark   '  >
                {
                  loading?(
                    
                    <div className='w-100'  style={{position:"absolute" ,top:0 ,left:0 ,background:"black" ,minHeight:"1000px" ,minWidth:"100%" ,zIndex:2009999999991}}>
                      <div className='w-100 d-flex align-items-center justify-content-center'>
                      <ClassicLoader/>
                      </div>
                    </div>
                  ):(
                    <Carousel  reviews={reviews}/>        
                    // <></> 
                    )
                }

              </div>
              {/* show the reviews */}
           </div>
            {/* show reviews result */}





        
    </div>
  )
}

export default Reviwes


