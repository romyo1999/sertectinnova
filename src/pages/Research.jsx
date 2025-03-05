import React from 'react'
import { ResearchSlide } from '../components/slides/ResearchSlide'
import {Link as Route} from 'react-router-dom'
import {Link} from 'react-scroll'
import icon from '../assets/research/research.png'
import search from '../assets/research/search.png'
import sec1 from '../assets/research/section1.png'
import sec2 from '../assets/research/section2.png'
import sec3 from '../assets/research/section3.png'
import sec4 from '../assets/research/section4.png'
import sec5 from '../assets/research/section5.png'
import sec6 from '../assets/research/section6.png'
import Earth from '../components/Earth'
import { TypeWriter } from '../components/TypeWriter'
import { ScrollFixedImage } from '../components/slides/StickyScroll'
import ImageSpinner from '../components/ImageSpinner'
function Research() {

    const section1={
        "title":[
            {text:"Overview "},
            {text:" of "},
            {text:" Research"},
            {text:"Activities"},
            ],
                "image":sec1,
                "description":"Research at Sertect Innova is integral to our commitment to innovation and problem-solving. We dedicate resources to exploring cutting-edge technologies and developing solutions to address complex challenges."
            }



    const data=[
        {
            title: "Areas of Research Focus",
            description:
              "Our research focuses on developing algorithms for solving complex business problems, particularly in optimization and combinatorial optimization.",
            content: (
                <div style={{minHeight:"800px" ,minWidth:"1090px"}} >
                <img
                loading='lazy'
                  src={sec2}
                  width={600}
                  height={100}
                  className="img-fluid "
                  alt="linear board demo"
                />
              </div>
            ),
          }
 
        ,
       {
            title:"Benefits for Clients",
            description:" Our research directly translates into practical benefits for our clients, including innovative solutions that improve efficiency, reduce costs, and enhance performance.",
            content: (
                <div style={{minHeight:"800px" ,minWidth:"1090px"}} >
                <img
                loading='lazy'
                src={sec3}
                  width={600}
                  height={100}
                  className="img-fluid "
                  alt="linear board demo"
                />
              </div>
            ),        }
        ,
        {
            title:"Collaborations and Partnerships",
            description:"Our research focuses on developing algorithms for solving complex business problems, particularly in optimization and combinatorial optimization.",
            content: (
                <div style={{minHeight:"800px" ,minWidth:"1090px"}} >
                <img
                loading='lazy'
                src={sec4}
                  width={600}
                  height={100}
                  className="img-fluid "
                  alt="linear board demo"
                />
              </div>
            ),        }
        ,
        {
            title:"Future Directions",
            description:" Our future research will continue to focus on developing advanced algorithms and solutions to address emerging challenges in various industries, such as healthcare, transportation, and finance.",
            content: (
                <div style={{minHeight:"800px" ,minWidth:"1090px"}} >
                <img
                loading='lazy'
                src={sec5}
                  width={600}
                  height={100}
                  className="img-fluid "
                  alt="linear board demo"
                />
              </div>
            ),        }
        ,
       {
            title:"Knowledge Sharing and Dissemination",
            description:" We actively share our research findings through publications, presentations at conferences, and participation in industry events, contributing to the advancement of knowledge in our field.",
            content: (
                <div style={{minHeight:"800px" ,minWidth:"1090px"}} >
                <img
                loading='lazy'
                src={sec6}
                  width={600}
                  height={100}
                  className="img-fluid "
                  alt="linear board demo"
                />
              </div>
            ),        }
            
            
        
    ]


  return (
    <div className='bg-black'>
        <section id='hero' className='mb-4' style={{minHeight:"500px" ,position:"relative"}} >
        <ResearchSlide/>
        <div className= 'w-100 d-flex flex-column align-items-center justify-content-center  hero-research' style={{minHeight:"500px"}}>
            <h1 className='fs-1 text-white font-bold mb-3 ' >Research</h1>
            <Link to='overview'>
            <button className='research-button'>
            <div class="main-research">
                <div class="rings" id="ring1"></div>
                <div class="rings" id="ring2"></div>
                <div class="asteriods-large" id="asteriod1"></div>
                <div class="asteriods-large" id="asteriod2"></div>
                <div class="asteriods-large" id="asteriod3"></div>
                <div class="asteriods-large" id="asteriod4"></div>
                <div class="asteriods-large" id="asteriod5"></div>
                <div class="asteriods-small" id="asteriod6"></div>
                <div class="asteriods-small" id="asteriod7"></div>
                <div class="asteriods-small" id="asteriod8"></div>
                <div class="asteriods-small" id="asteriod9"></div>
                <div class="asteriods-small" id="asteriod10"></div>
                <div id="saturn"></div>
                <div id="explore">Explore</div>
            </div>
            </button>
            </Link>

        </div>
        {/* icon animation */}
            <img  src={icon}  className='icon-research' alt="icon research" width={300} height={300} />
        {/* icon animation */}

        {/* earth icon  */}
        <div className=' earth-icon' >
        <div className='d-flex align-items-center justify-content-center' style={{position:"relative"}}>
             <img   src={search} className='search-image' alt="search icon" width={150} height={150} />
            <Earth/>
        </div>
        </div>
        {/* earth icon  */}

        </section>
        {/* overview section  */}
        <section id='overview' className='col-lg-10 mx-auto ' style={{position:"relative"}}>
        <div className="w-100 diff  w-100 "  style={{minHeight:"500px"}}>



        <div className="diff-item-1 ">
        <div className=" t font-black grid place-content-center">

            <div className='container-fluid  '>
            <div className='row   bg-gradient-to-br from-purple-100 via-violet-600 shadow-2xl shadow-purple-300'>

                <div className='col-lg-7 col-md-12  d-flex flex-column justify-content-center align-items-end mt-4 '>
                <div className='w-75 mx-auto '>
                <TypeWriter styl words={section1.title}/>
                </div>
                <p className='w-75 mx-auto  fs-4 tracking-wide text-dark   '>{section1.description}</p>


                </div>
                <div className='col-lg-5 col-md-12   d-flex justify-content-center'>
                    <ImageSpinner circel={true}   width={400} height={400}   src={section1.image} alt="research icon" className='img-fluid' />
                </div>

            </div>
            </div>
            </div>
        </div>


        <div className="diff-item-2  ">
            <div className=" t font-black grid place-content-center">
        <div className='container-fluid   '>
            <div className='row bg-gradient-to-tr from-cyan-800 via-cyan-700 to-cyan-500 '>

                <div className= '  col-lg-7 col-md-12  d-flex flex-column justify-content-center align-items-end  '>
                <div className='w-75 mx-auto mt-4 text-danger'>
                <TypeWriter styl words={section1.title}/>
                </div>
                <p className='w-75 mx-auto  fs-4  tracking-wide  text-white  '>{section1.description}</p>


                </div>
                <div className='col-lg-5 col-md-12   d-flex justify-content-center'>
                    <ImageSpinner circel={true}  loading='lazy' width={400} height={400}  src={section1.image} alt="research icon" className='img-fluid' />
                </div>

            </div>
            </div>
            </div>
        </div>


        <div className="diff-resizer"></div>
        </div>

        </section>
        <br />

        {/* secction Area of research  */}
        <section className='col-lg-12 p-4  area-search  bg-slate-900	'>
            <ScrollFixedImage content={data}/>
        </section>
        {/* secction Area of research  */}

        <br />
        <br />
        {/* section connected with setrect innova  */}
        <section id='contactus'>
        <div className='d-flex align-items-center justify-content-around bg-violet-900	 p-4'>
        <h1 className='text-white fs-1 font-bold font-sans '>Connected with Sertect Innova  </h1>
        <Route to={'/contact-us'} class="cursor-pointer uppercase font-bold text-dark bg-white px-4 py-2 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#F44336,-0.5rem_-0.5rem_#00BCD4] transition">
        Contact Us
        </Route>
        </div>
        </section>
        {/* section connected with setrect innova  */}






    </div>
  )
}

export default Research
