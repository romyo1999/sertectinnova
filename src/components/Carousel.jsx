import { faArrowAltCircleLeft, faArrowAltCircleRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import Star from './Star';

function Carousel({reviews}) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);


  // start colors 
  const colors = [
    "#001F3F", // Dark Navy
    "#800020", // Burgundy
    "#36454F", // Charcoal Gray
    "#000000", // Midnight Black
    "#254117", // Forest Green
    "#4169E1", // Royal Blue
    "#800000", // Maroon
    "#2F4F4F", // Deep Purple
    "#008080", // Dark Teal
    "#708090", // Slate Gray
    "#3D2B1F", // Chocolate Brown
    "#222222", // Ebony Black
    "#000080", // Navy Blue
    "#420D09", // Mahogany Brown
    "#006400", // Deep Emerald Green
    "#660099", // Plum Purple
    "#333333", // Charcoal Black
    "#0F52BA", // Sapphire Blue
    "#381701", // Espresso Brown
    "#556B2F", // Dark Olive Green
    "#191970", // Indigo Blue
    "#130A06", // Coal Black
    "#01796F", // Pine Green
    "#481C1C", // Deep Aubergine Purple
    "#1C1C1C", // Graphite Gray
    "#191970", // Midnight Blue
    "#3D1B1B", // Dark Chocolate Brown
    "#4B0082", // Blackcurrant Purple
    "#084B8A", // Deep Forest Green
    "#0F0F0F", // Onyx Black
    "#000080", // Rich Navy Blue
    "#36454F", // Charcoal Charcoal Gray
    "#000000", // Jet Black
    "#355E3B", // Hunter Green
    "#2F4F4F", // Dark Slate Gray
    "#800000", // Mulberry Purple
    "#003333", // Deep Teal
    "#0A0A0A", // Obsidian Black
    "#4B0082", // Rich Indigo Blue
    "#2E2E2E", // Cocoa Brown
    "#080808", // Ebony Charcoal Black
    "#08457E", // Deep Sea Blue
    "#3C2F23", // Dark Walnut Brown
    "#71797E", // Stormy Gray
    "#000000", // Ink Black
    "#002366"  // Deep Cobalt Blue
];
//end colors



function selectFirst10Characters(str) {
  return str.substring(0, 10);
}

function render() {
    // Generate a random number between 0 and 49
    const randomNumber = Math.floor(Math.random() * 50);
    return randomNumber;
}

  return (
    <div className='w-100' style={{position:"relative"}}>
 <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'gray',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
            position:"absolute",
            right:0,
          },
          children: <svg className='ms-1' width="22" height="15" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M62.9321 3.05075C64.8074 1.17604 67.3505 0.122881 70.0021 0.122881C72.6538 0.122881 75.1969 1.17604 77.0721 3.05075L117.072 43.0507C118.947 44.926 120 47.4691 120 50.1207C120 52.7724 118.947 55.3155 117.072 57.1907L77.0721 97.1907C75.1861 99.0123 72.6601 100.02 70.0381 99.9975C67.4162 99.9747 64.908 98.923 63.054 97.0689C61.1999 95.2148 60.1482 92.7067 60.1254 90.0848C60.1026 87.4628 61.1106 84.9368 62.9321 83.0507L85.8621 60.1207L10.0021 60.1207C7.34997 60.1207 4.80643 59.0672 2.93107 57.1918C1.05571 55.3164 0.00213623 52.7729 0.00213623 50.1207C0.00213623 47.4686 1.05571 44.925 2.93107 43.0497C4.80643 41.1743 7.34997 40.1207 10.0021 40.1207L85.8621 40.1207L62.9321 17.1907C61.0574 15.3155 60.0043 12.7724 60.0043 10.1207C60.0043 7.4691 61.0574 4.92602 62.9321 3.05075Z" fill="white"/>
          </svg>
          ,
        }}
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'gray',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
            position:"absolute",
            left:0,
            zIndex:1999,

          },
          children:  <svg className='ms-1' width="22" height="15" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M57.07 97.07C55.1947 98.9447 52.6516 99.9979 50 99.9979C47.3484 99.9979 44.8053 98.9447 42.93 97.07L2.93 57.07C1.05529 55.1947 0.00213623 52.6516 0.00213623 50C0.00213623 47.3484 1.05529 44.8053 2.93 42.93L42.93 2.93C44.816 1.10842 47.342 0.100473 49.964 0.123257C52.586 0.146041 55.0941 1.19773 56.9482 3.05181C58.8023 4.9059 59.854 7.41402 59.8767 10.036C59.8995 12.658 58.8916 15.184 57.07 17.07L34.14 40H110C112.652 40 115.196 41.0536 117.071 42.9289C118.946 44.8043 120 47.3478 120 50C120 52.6522 118.946 55.1957 117.071 57.0711C115.196 58.9464 112.652 60 110 60H34.14L57.07 82.93C58.9447 84.8053 59.9979 87.3484 59.9979 90C59.9979 92.6516 58.9447 95.1947 57.07 97.07Z" fill="white"/>
          </svg>
          ,
        }}
        responsiveProps={[
          {
            itemsToShow: 4,
            itemsToScroll: 2,
            minWidth: 768,
          },
        ]}
        speed={900}
        easing="linear"
      >
        {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}


        {
            reviews.length>0?
            reviews.map((e)=>(
                <div className='d-flex flex-column align-items-start justify-content-start p-1 reviews-item' style={{ width: 300, height: 300,background:"rgb(240, 237, 237)" }}>
                <div className='d-flex flex-row align-items-center justify-content-start'>
                  <div className='d-inline-block d-flex align-items-center justify-content-center fs-3 text-white' style={{width:"80px",height:"80px" ,borderRadius:"100%" ,background:colors[render()]}}>{e.first_name[0].toUpperCase()+""+e.last_name[0].toUpperCase()}</div>
                  <div className='d-flex flex-column  ms-2 align-items-center justify-content-center'>
                  <h4 className='mt-3 fs-4  text-dark' style={{lineHeight:"24px"}}>{e.first_name+" "+e.last_name}</h4>
                  <h6 className='text-secondary'>{selectFirst10Characters(e.created_at)}</h6>
                  </div>
                </div>
                <div className='d-flex  align-items-center justify-content-center'>
                  <Star  star={e.stars} stars={1} w={40} h={40}/>
                  <Star star={e.stars} stars={2} w={40} h={40}/>
                  <Star star={e.stars} stars={3} w={40} h={40}/>
                  <Star star={e.stars} stars={4} w={40} h={40}/>
                  <Star star={e.stars} stars={5} w={40} h={40}/>
                  </div>
                  <p className="mt-4 fs-5 overflow-x-auto p-1" style={{ fontFamily: "Roboto", textAlign: "center", fontWeight: "bold" }}>
                  {e.comment} 
                </p>

      
              </div>
            )):(
              <></>
            )
        }
        
      </ReactSimplyCarousel>

    </div>
     
  );
}

export default Carousel;