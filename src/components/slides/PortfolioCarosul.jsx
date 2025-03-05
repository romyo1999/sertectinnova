import { useState } from 'react';
import Carousel from 'react-simply-carousel';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowAltCircleLeft ,faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons"
import ImageSpinner from '../ImageSpinner';

function PortfolioCarosul({data}) {
  const [activeSlide, setActiveSlide] = useState(0);
    console.log(data)
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
        // borderTop:"3px solid salmon",
        // borderLeft:"3px solid salmon",
        // borderRight:"3px solid rgb(43, 91, 221) ",
        // borderBottom:"3px solid rgb(43, 91, 221) ",
      },
    }}
    onRequestChange={setActiveSlide}
    forwardBtnProps={{
      children: <FontAwesomeIcon className='bg-warning fs-3 p-2 border rounded-circle' icon={faArrowAltCircleRight}/> ,
      style: {
        width: 40,
        height: 40,
        minWidth: 40,
        alignSelf: "center",

      },
    }}
    backwardBtnProps={{
      children:  <FontAwesomeIcon  className='bg-info fs-3 p-2 border rounded-circle' icon={faArrowAltCircleLeft}/>,
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
          background:"gray",
          margin:'0px 5px '
        },
      },
      activeItemBtnProps: {
        style: {
          height: 16,
          width: 16,
          borderRadius: "50%",
          border: 0,
          background: "black",
          margin:'0px 5px '
        },
      },
    }}
    itemsToShow={3}
    speed={1000}
    centerMode
  >
    {data.map((item, index) => (
      <div className='rounded-xl bg-gray-700 hover:bg-gray-900 hover:scale-110 duration-700 d-flex flex-column align-items-center jusify-content-centrt'
        style={{
          width: 400,
          height: 600,
          border: "30px solid white",
          borderRadius:"50px",
          textAlign: "center",
          lineHeight: "240px",
          boxSizing: "border-box",
          margin:1
        }}
        key={index}
      >
       <ImageSpinner src={item.image} width={200} height={200} alt={item.title} />
       <h2 className='fs-3 p-1 text-white'>{item.title}</h2>
       <p className='fs-5  overflow-x-auto p-2 ' style={{lineHeight:"28px",color:"#ccc"}}> {item.description}</p>
       
      </div>
    ))}
  </Carousel>
    </div>
   
  
  );
}

export default PortfolioCarosul;