import React, { lazy } from 'react'
import "./CardServices.css"
import ImageSpinner from './ImageSpinner'
const CardServices = ({image ,title ,description}) => {
  return (
        <div className="flip-card col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="flip-card-inner ">
                <div className="flip-card-front d-flex flex-column align-items-center justify-content-center ">
                    <ImageSpinner loading={lazy} src={image} alt="" className='mb-4 border border-4 rounded-4'  width={500} height={200}/>
                    <h2 className='text-dark fs-4 mt-2 mb-4' style={{fontWeight:'bold'}}>{title}</h2>
                </div>


                <div className="flip-card-back d-flex flex-column align-items-center justify-content-center">
                    <p className="title text-dark  text-3xl mb-4">{title} </p>
                    <div className='text-secondary overflow-x-auto text-xl'style={{fontWeight:'bold'}} >{description}</div>

                </div>
            </div>
        </div>
  )
}

export default CardServices
