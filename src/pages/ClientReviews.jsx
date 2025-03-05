import axios from 'axios'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ClassicSpinner from '../components/Loaders/ClassicSpinner'

const feedback=[
    "We're sorry to hear you had a bad experience. Please let us know how we can improve.",
    "Thank you for your feedback. We're always striving to improve our service.",
    "We appreciate your feedback. Let us know how we can make your experience better.",
    "Thank you for your positive feedback! We're glad you enjoyed your experience.",
    "Wow! Thank you for the glowing review! We're thrilled to hear you had such a great experience with us."
  ]

const ClientReviews = () => {
    const {id ,name}=useParams()
    const [stars ,setStars]=useState(1)
    const [comment ,setComment]=useState("")
    const [end ,setEnd]=useState("")
    const [loading ,setLoading]=useState(false)

    const handleUpdate=async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name.replace("+"," "));
        formData.append('stars', stars);
        formData.append('comment', comment);
    
    
        try {
          setLoading(true)
          const response = await axios.put(`http://localhost:8000/api/clients/${id/2024}`, formData, {
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
            },
    
          });
          console.log(response.data);
          setLoading(false)
          setEnd(feedback[stars-1])
        } catch (error) {
            console.log(error)
          setLoading(false)
          alert("System Error Please Try Agin Later")
        }
    }

  return (
    <div className='container-fluid  min-h-[1000px] mt-0' style={{backgroundImage:"url(https://live.staticflickr.com/7307/28064997846_5933e487af_z.jpg)",backgroundColor:"black"}}>
        {
            end?(
                <>
            <div className='modal-review w-50'>
            <h3  className='mb-4 fs-4' style={{fontWeight:"bold"}}>{feedback[stars-1]}</h3>

            <Link to={"/"}> 
            <button class="button  me-4"> Home</button>
            </Link>


            <Link to={"/contact-us"}> 
            <button class="buttonn "> Support</button>
            </Link>

            </div>
                </>
            ):(
                        <div className='w-100 h-100 d-flex align-items-center justify-content-center'>
        <form className="col-lg-8 col-md-10 col-sm-11 rating-card mt-[150px]" onSubmit={handleUpdate}>
  <div className="text-wrapper">
    <p className="text-primary text-white">Hello {name.replace(/\+/g," ")} Please Rate Your Experience</p>
    <p className="text-secondary">to help us serve you better</p>
  </div>

  <div className="rating-stars-container">
    <input value={5} onChange={(e)=>setStars(e.target.value)} name="star" id="star-5" type="radio" />
    <label for="star-5" className="star-label">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
          pathLength="360"
        ></path>
      </svg>
    </label>

    <input value={4} onChange={(e)=>setStars(e.target.value)} name="star" id="star-4" type="radio" />
    <label for="star-4" className="star-label">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
          pathLength="360"
        ></path>
      </svg>
    </label>
    <input value={3} name="star" onChange={(e)=>setStars(e.target.value)} id="star-3" type="radio" />
    <label for="star-3" className="star-label">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
          pathLength="360"
        ></path>
      </svg>
    </label>
    <input value={2} name="star"onChange={(e)=>setStars(e.target.value)} id="star-2" type="radio" />
    <label for="star-2" className="star-label">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
          pathLength="360"
        ></path>
      </svg>
    </label>
    <input value={1} name="star" onChange={(e)=>setStars(e.target.value)} id="star-1" type="radio" />
    <label for="star-1" className="star-label">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
          pathLength="360"
        ></path>
      </svg>
    </label>
  </div>

  <textarea class="comment-client " onChange={e=>setComment(e.target.value)} name="text" type="text" placeholder="Tell us what you think! Your feedback matters "></textarea>
  <button class="w-full h-40 flex items-center justify-center cursor-pointer mt-0 ">
  <div
    class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group"
  >
    <span
      class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"
    ></span>
    <span
      class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        class="w-5 h-5 text-green-400"
      >
        <path
          d="M14 5l7 7m0 0l-7 7m7-7H3"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg>
    </span>
    <span
      class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        class="w-5 h-5 text-green-400"
      >
        <path
          d="M14 5l7 7m0 0l-7 7m7-7H3"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg>
    </span>
    <span
      class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200"
      >
        {
            loading?(
                <div class="flex flex-row gap-2">
                <div class="w-2 h-2  mt-2 mb-1 rounded-full bg-white animate-bounce"></div>
                <div class="w-2 h-2 mt-2 mb-1 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                <div class="w-2 h-2 mt-2 mb-1 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
              </div>
            ):(
                <>Send</>
            )

        }
        
      </span>
    </div>
    </button>


    </form>

        </div>
            )
        }

    </div>
 
  );
}

export default ClientReviews
