import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <div className='w-100 h-100 d-flex flex-column align-items-center justify-content-center'>
            <div className='w-100 h-100 d-flex flex-column align-items-center justify-content-center ' style={{marginTop:'200px'}}>
              <h3 className='text-center fs-2 mb-4 text-secondary' style={{fontWeight:'bold'}}>"Oops! The page you're looking for could not be found. Please check the URL and try again. </h3>
              {/* logo  */}
              <div class="loader-error mb-[100px] mt-[95px]">
            <div class="pac-man"></div>
            <div class="point p1"></div>
            <div class="point p2"></div>
             </div>
              {/* logo  */}
              <div className='d-flex align-items-center justify-content-center'>
              <Link style={{width:'120px'}} className='btn pt-2 font-bold btn-secondary me-2 mt-4' to={'/contact-us'}>Contact Us</Link>
              <Link style={{width:'120px'}} className='btn pt-2 font-bold btn-dark ms-2 mt-4' to={'/'}>Home</Link>
              </div>
            </div>
        </div>
    </div>
  )
}

export default NotFound
