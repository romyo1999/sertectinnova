import React from 'react';
import icon from "../assets/portfolio/icon.png"
import {Link} from "react-scroll"
import strongnet from "../assets/strongnet.png"
import { confirmAlert } from 'react-confirm-alert';
import {useTranslation} from "react-i18next";

const PortfolioHero = () => {
  const youtube="https://www.youtube.com/embed/IcLizAvhIcI"
  const {t}=useTranslation()

  const bio = async () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-confirm-alert' style={{ width: '70vw' }}>
            <h1 className='font-bold fs-3'>
              <img src={strongnet} width={200} height={200} alt='strongnet img' className='rounded-4 me-4'  style={{float:"left"}}/>
            </h1>
            <p className='fs-5 font-serif overflow-x-auto max-h-[600px]'>{t('videoDesc')}</p>
            <button className='btn btn-dark ps-4 pe-4' onClick={onClose}>Close</button>
          </div>
        );
      }
    });
  };


  return (
    <div className=''>
      <div className="px-6 py-12 text-center md:px-12 lg:my-12 lg:text-left">
        <div className="w-full mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="mt-12 lg:mt-0">
              <h1 className=" mt-0 mb-12 text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
              Sertect Innova <br /><span className="text-primary">Portfolio</span>
              </h1>
              <div className="d-flex align-items-center justify-content-center">
                <div className="relative mr-2 mb-2 grow md:mb-0 d-flex align-items-center justify-content-center" data-te-input-wrapper-init>
                <Link to='aboutus'>
                <button class="custom-button-portfolio">
                <span>Explore</span>
              </button>
                </Link>

                </div>

              </div>
            </div>
            <div className="mb-12 lg:mb-0">
              <div
                className="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden rounded-lg z-50"
                style={{ paddingTop: "56.25%" }}>
                    <button onClick={bio} className=' absolute top-0 right-0  smky-btn3  mb-4 hover:text-[#778464] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#abd373] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-dark font-bold'> 
                    bio
                  </button>
                  
                <iframe className="embed-responsive-item absolute top-10 right-0 bottom-0 left-0 h-[90%] w-full"
                  src={youtube}
                  allowFullScreen="" data-gtm-yt-inspected-2340190_699="true" id="240632615"></iframe>

              </div>
            </div>
          </div>
        </div>
      </div>
      <img className='icon' src={icon} width={300} height={300}/>
    </div>
  );
};

export default PortfolioHero;
