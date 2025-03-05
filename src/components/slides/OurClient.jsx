import { useState } from 'react';
import Carousel from 'react-simply-carousel';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowAltCircleLeft ,faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons"
import TeamCard from '../cards/TeamCard';
import ClientCard from '../cards/ClientCard';

function OurClient({data}) {

  const [activeSlide, setActiveSlide] = useState(0);
  return (
<div className='d-flex align-items-center justify-content-center col-lg-11 mx-auto'>
<Carousel
    
    containerProps={{
      style: {
        width: "100%",
        justifyContent: "space-between",
        userSelect: "none",
      },
    }}
    preventScrollOnSwipe
    swipeTreshold={60}
    activeSlideIndex={activeSlide}
    activeSlideProps={{
      style: {

      },
    }}
    onRequestChange={setActiveSlide}
    forwardBtnProps={{
      children: <FontAwesomeIcon className='bg-white fs-3 p-2 border rounded-circle' icon={faArrowAltCircleRight}/> ,
      style: {
        width: 40,
        height: 40,
        minWidth: 40,
        alignSelf: "center",

      },
    }}
    backwardBtnProps={{
      children:  <FontAwesomeIcon  className='bg-white fs-3 p-2 border rounded-circle' icon={faArrowAltCircleLeft}/>,
      style: {
        width: 40,
        height: 40,
        minWidth: 40,
        alignSelf: "center",

      },
    }}
    dotsNav={{
      show: true,
      itemBtnProps: {
        style: {
          height: 16,
          width: 16,
          borderRadius: "50%",
          border: 0,
          background:"white",
          margin:'20px  5px ',
          
        },
      },
      activeItemBtnProps: {
        style: {
          height: 16,
          width: 16,
          borderRadius: "50%",
          border: 0,
          background: "black",
          margin:'0px 5px ',
          marginTop:'20px',


        },
      },
    }}
    itemsToShow={3}
    speed={1000}
    centerMode
  >
    {data.map((item, index) => (
            <div className='d-fkex align-items-center justify-content-center p-2 bg(dark'>
              <ClientCard data={item}  key={index}/>
            </div>

    ))}
  </Carousel>
</div>
  
  );
}

export default OurClient;