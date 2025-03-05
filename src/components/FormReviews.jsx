import React, { useState } from 'react';
import "./Reviwes.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {   faRemove } from '@fortawesome/free-solid-svg-icons';
import { axiosClient2 } from '../api/axios';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';


function FormReviews({show ,setShow}) {
    const [cookies, setCookie] = useCookies(['reviews']);
    const [Errors, setErrors] = useState("");
    const [endReview ,setEndReview]=useState(false)

    const [stars ,setStars]=useState(1);
        const [first_name ,setFirst_name]=useState(1);
        const [last_name ,setLast_name]=useState(1);
        const [email ,setEmail]=useState(1);
        const [message ,setMassage]=useState(1);
        const [loading,setLoading]=useState(false)

        const feedback=[
            "We're sorry to hear you had a bad experience. Please let us know how we can improve.",
            "Thank you for your feedback. We're always striving to improve our service.",
            "We appreciate your feedback. Let us know how we can make your experience better.",
            "Thank you for your positive feedback! We're glad you enjoyed your experience.",
            "Wow! Thank you for the glowing review! We're thrilled to hear you had such a great experience with us."
          ]
          


        const handleSetCookie = () => {
            // Set a cookie named 'cookieName' with value 'cookieValue' and expiration after 5 years
            const expirationDate = new Date();
            expirationDate.setFullYear(expirationDate.getFullYear() + 5); // Set expiration date 5 years from now
            setCookie('reviews', 'accessafter5yeasr', { expires: expirationDate });
          };

        const handleReviews=async(e)=>{
            e.preventDefault();
            const data={
                first_name:first_name,
                last_name:last_name,
                email:email,
                stars:stars,
                comment:message
            }
            setLoading(true)
              try {
                const response = await axiosClient2.post("api/reviews",data);
                console.log(response)
                setLoading(false)
                handleSetCookie()
                setErrors("")
                setEndReview(true)
              
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


              function handleChange(){
                setShow(!show)
                console.log(show)
              }
  return (
    <>
    {
        endReview?(
            <>
            <div className='modal-review w-50'>
            <h3  className='mb-4 fs-4' style={{fontWeight:"bold"}}>{feedback[stars-1]}</h3>

            <button class="button me-4 mb-2" onClick={handleChange}> Close
            </button>


            <Link to={"/contact-us"}> 
            <button class="buttonn "> Support</button>
            </Link>

            </div>

            
            </>
        )
        :
        
        (
            <div className='col-lg-6 col-md-12  mx-auto modal-review '>
            <button onClick={handleChange} className='remove'><FontAwesomeIcon icon={faRemove}/></button>
            <form onSubmit={handleReviews}>
    
                {
                    Errors?(
                        <div className='text-center text-danger mb-4 alert alert-danger'>{Errors}</div>
    
                    ):(
                        <></>
                    )
                }
                <div className='w-100 d-flex flex-wrap align-items-between justify-content-between'>
               <label className="   ps-2 flex-1 input input-bordered flex items-center gap-2 input-info mb-2 ">
                FirstName 
                <input type="text" onChange={e=>setFirst_name(e.target.value)} className="grow" required  placeholder=" mouhamed" />
                </label>
                <label className=" ps-2 flex-1 ms-1 input input-bordered flex items-center gap-2 input-info mb-2 ">
                LastName 
                <input type="text" onChange={e=>setLast_name(e.target.value)} className="grow"  required placeholder=" ben ALI" />
                </label>
                </div>
    
    
                <div className='w-100 d-flex mb-3  flex-wrap align-items-between justify-content-between '>
                <label className=" ps-2 flex-1  input input-bordered flex items-center gap-2 input-info mb-2  ">
                Email : 
                <input type="text" onChange={e=>setEmail(e.target.value)}  className="grow" required placeholder=" daisy@site.com" />
                </label>
                <div className="  ps-2 flex-1  rating rating-lg ">
                <input type="radio" name="rating-8" className={`mask mask-star-2  ${stars>=1?"bg-orange-400":"bg-gray-500"}  me-3`} onClick={e=>stars>=1?setStars(stars-1):setStars(stars+1)} />
                <input type="radio" name="rating-8"  className={`mask mask-star-2  ${stars>=2?"bg-orange-400":"bg-gray-500"}  me-3`}   onClick={e=>stars>=2?setStars(stars-1):setStars(stars+1)} />
                <input type="radio" name="rating-8" className={`mask mask-star-2  ${stars>=3?"bg-orange-400":"bg-gray-500"}  me-3`}    onClick={e=>stars>=3?setStars(stars-1):setStars(stars+1)}/>
                <input type="radio" name="rating-8" className={`mask mask-star-2  ${stars>=4?"bg-orange-400":"bg-gray-500"}  me-3`}    onClick={e=>stars>=4?setStars(stars-1):setStars(stars+1)} />
                <input type="radio" name="rating-8"  className={`mask mask-star-2  ${stars>=5?"bg-orange-400":"bg-gray-500"}  me-3`}   onClick={e=>stars>=5?setStars(stars-1):setStars(stars+1)}/>
                </div>
                </div>
                <div className='w-100'>
                <textarea placeholder="Type your Comment" onChange={e=>setMassage(e.target.value)} className="w-100 textarea textarea-bordered textarea-info  " ></textarea>
    
                </div>
               <div className='w-100 d-flex align-items-center justify-content-start'>
               <button className='btn btn-primary mt-4 mb-3 bg-primary text-white'  type='submit'> Send <svg className='d-inline ms-1' width="20" height="20" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2017 22.7911L35.4652 3.5347M16.7493 23.657L21.1173 32.3932C22.1729 34.5043 22.7006 35.5599 23.3656 35.843C23.9426 36.0887 24.6022 36.044 25.1411 35.7233C25.762 35.3536 26.1433 34.2366 26.9061 32.0029L35.1592 7.83296C35.8239 5.88669 36.1561 4.91354 35.9287 4.26978C35.7307 3.70974 35.2903 3.26921 34.7303 3.07135C34.0865 2.84391 33.1134 3.17621 31.167 3.84078L6.99702 12.094C4.76331 12.8567 3.64645 13.2381 3.27673 13.859C2.95587 14.3978 2.91141 15.0574 3.15705 15.6343C3.44012 16.2992 4.4957 16.8271 6.60686 17.8826L15.343 22.2508C15.6909 22.4247 15.8648 22.5116 16.0154 22.6277C16.1492 22.7309 16.2691 22.8508 16.3721 22.9845C16.4885 23.1352 16.5753 23.3092 16.7493 23.657Z" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
                {
                        loading?(
                            <span class="spinner mt-0"></span>
                        ):(
                            <>
                            
                            </>
                        )
                    }      
                </div>           
            </form>
            <ToastContainer/>
    
        </div>
        )
    }
    </>

   



  );
}

export default FormReviews;
