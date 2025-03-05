import React, { useEffect, useState } from 'react'
import logo from "../assets/services/logo.png"
import test from "../assets/research/section1.png"
import "./Portfolio.css"
import {Link} from "react-scroll" 
import PortfolioHero from '../components/PortfolioHero'
import PortfolioCarosul from '../components/slides/PortfolioCarosul'
import {Link as Route} from 'react-router-dom'

import service1 from "../assets/portfolio/s1.png"
import service2 from "../assets/portfolio/s2.png"
import service3 from "../assets/portfolio/s3.png"
import service4 from "../assets/portfolio/s4.png"
import service5 from "../assets/portfolio/s5.png"
import service6 from "../assets/portfolio/s6.png"
import OurTeam from '../components/slides/OurTeam'
import OurClient from '../components/slides/OurClient'
import OurProject from '../components/slides/OurProject'
import { OurBrand } from '../components/slides/OurBrand'
import { axiosClient2 } from '../api/axios'
import ClassicSpinner from '../components/Loaders/ClassicSpinner'
import ClassicLoader from '../components/Loaders/ClassicLoader'
import {useTranslation} from "react-i18next";


const Portfolio = () => {
  const {t}=useTranslation();
    const data={
        "aboutus":t("profiler.def")
        ,
        "services": [
            {
                title:t("profiler.title1") ,
                description:t("profiler.desc1"),
                image: service6
            },
            {
                title: t("profiler.title2"),
                description: t("profiler.desc2"),
                image: service1
            },
            {
                title: t("profiler.title3"),
                description: t("profiler.desc3"),
                image: service2
            },
            {
                title: t("profiler.title4"),
                description: t("profiler.desc4"),
                image: service3
            }
            ,
            {
                title:t("profiler.title5") ,
                description: t("profiler.desc5"),
                image: service4
            }
            ,
            {
                title:t("profiler.title6") ,
                description: t("profiler.desc6"),
                image:service5
            }
        ],
        'team':[
            {
                "first_name": "John",
                "last_name": "Doe",
                "image": test,
                "role": "Software Engineer",
                "facebook": "https://www.facebook.com/john.doe.fb",
                "twitter": "https://twitter.com/john_doe_tw",
                "linkedin": "https://www.linkedin.com/in/john-doe-linkedin"
            },
            {
                "first_name": "Alice",
                "last_name": "Smith",
                "image": service2,
                "role": "Marketing Manager",
                "facebook": "https://www.facebook.com/alice.smith.fb",
                "twitter": "https://twitter.com/alice_smith_tw",
                "linkedin": "https://www.linkedin.com/in/alice-smith-linkedin"
            },
            {
                "first_name": "David",
                "last_name": "Johnson",
                "image": service3,
                "role": "Financial Analyst",
                "facebook": "https://www.facebook.com/david.johnson.fb",
                "twitter": "https://twitter.com/david_johnson_tw",
                "linkedin": "https://www.linkedin.com/in/david-johnson-linkedin"
            },
            {
                "first_name": "Emily",
                "last_name": "Brown",
                "image": service1,
                "role": "Graphic Designer",
                "facebook": "https://www.facebook.com/emily.brown.fb",
                "twitter": "https://twitter.com/emily_brown_tw",
                "linkedin": "https://www.linkedin.com/in/emily-brown-linkedin"
            },
            {
                "first_name": "Michael",
                "last_name": "Wilson",
                "image": service1,
                "role": "Sales Manager",
                "facebook": "https://www.facebook.com/michael.wilson.fb",
                "twitter": "https://twitter.com/michael_wilson_tw",
                "linkedin": "https://www.linkedin.com/in/michael-wilson-linkedin"
            },
            {
                "first_name": "Sophia",
                "last_name": "Lee",
                "image": service1,
                "role": "HR Specialist",
                "facebook": "https://www.facebook.com/sophia.lee.fb",
                "twitter": "https://twitter.com/sophia_lee_tw",
                "linkedin": "https://www.linkedin.com/in/sophia-lee-linkedin"
            }
        ],
        "clients":[
            {
                "name": "ABC Technologies",
                "image": service1,
                "stars": 4,
                "comment": "ABC Technologies provided excellent customer service and delivered high-quality products. Their team was very responsive and attentive to our needs. Overall, we had a great experience working with them.",
                "created_at": "2024-04-09T10:00:00Z"
            },
            {
                "name": "XYZ Corporation",
                "image": service1,
                "stars": 5,
                "comment": "We had an outstanding experience with XYZ Corporation. Their professionalism and attention to detail exceeded our expectations. We highly recommend their services to anyone seeking top-notch solutions.",
                "created_at": "2024-04-08T15:30:00Z"
            },
            {
                "name": "LMN Enterprises",
                "image": service1,
                "stars": 3,
                "comment": "While LMN Enterprises provided satisfactory service overall, there were some areas that could be improved. We encountered minor issues with communication and timeliness, but their team was receptive to feedback.",
                "created_at": "2024-04-07T12:45:00Z"
            },
            {
                "name": "PQR Innovations",
                "image": service1,
                "stars": 5,
                "comment": "PQR Innovations went above and beyond to meet our needs. Their innovative solutions and dedicated team impressed us greatly. We're extremely satisfied with the results and look forward to future collaborations.",
                "created_at": "2024-04-06T09:20:00Z"
            },
            {
                "name": "EFG Solutions",
                "image": service1,
                "stars": 4,
                "comment": "EFG Solutions provided exceptional service throughout our project. Their expertise and professionalism were evident in every interaction. We're grateful for their contributions to our success.",
                "created_at": "2024-04-05T14:10:00Z"
            },
            {
                "name": "RST Enterprises",
                "image": service1,
                "stars": 2,
                "comment": "Our experience with RST Enterprises was disappointing overall. We encountered several challenges, including poor communication and delays in project delivery. We do not recommend their services.",
                "created_at": "2024-04-04T11:55:00Z"
            }
        ],
        "projects": [
            {
                "title": "Project A",
                "client": "ABC Corporation",
                "type": "Web Development",
                "image": service4,
                "description": "This project involves designing and developing a dynamic website for ABC Corporation.",
                "budget": "$10,000",
                "duration": "3 months"
            },
            {
                "title": "Project B",
                "client": "XYZ Corp",
                "type": "Mobile App Development",
                "image": service3,
                "description": "Developing a mobile application for XYZ Corp to streamline their internal processes.",
                "budget": "$15,000",
                "duration": "4 months"
            },
            {
                "title": "Project C",
                "client": "123 Corp",
                "type": "UI/UX Design",
                "image": test,
                "description": "Designing intuitive user interfaces for various applications and platforms for 123 Corp.",
                "budget": "$8,000",
                "duration": "2 months"
            },
            {
                "title": "Project D",
                "client": "Tech Innovations Inc.",
                "type": "Data Analysis",
                "image": service1,
                "description": "Performing in-depth data analysis to derive meaningful insights for Tech Innovations Inc.",
                "budget": "$12,000",
                "duration": "3 months"
            },
            {
                "title": "Project E",
                "client": "Global Solutions Ltd.",
                "type": "Consulting",
                "image": logo,
                "description": "Providing consulting services to Global Solutions Ltd. for optimizing their business strategies.",
                "budget": "$20,000",
                "duration": "6 months"
            }
        ],

        "brands":[
          {"image":"http://pluspng.com/img-png/microsoft-logo-png-microsoft-logo-png-clipart-background-png-play-1392x711.png" ,link:"https://www.microsoft.com/fr-fr/"},
          {"image":"https://pngimg.com/uploads/ibm/ibm_PNG19658.png" ,link:"https://www.ibm.com/services"},
          {"image":"https://1000logos.net/wp-content/uploads/2016/11/Cisco-logo.png" ,link:"https://www.cisco.com/"},
          // {"image":"http://logos-download.com/wp-content/uploads/2016/10/Python_logo_wordmark.png" ,link:"https://www.python.org/"},
          // {"image":"https://www.pngmart.com/files/16/official-Google-Logo-Transparent-PNG.png" ,link:"https://about.google/products/"},
          // {"image":"https://logospng.org/download/amazon-web-services/logo-amazon-web-services-1024.png" ,link:"https://aws.amazon.com/free/database/?trk=fa206696-f2a0-4af5-b1b0-564051144c8d&sc_channel=ps&s_kwcid=AL!4422!10!71056168286914!71056696193884&ef_id=fd96225f291e19f16c9f44623cad85f7:G:s"},
          {"image":"https://logos-download.com/wp-content/uploads/2022/01/Palo_Alto_Networks_Logo.png" ,link:"https://www.paloaltonetworks.fr/"},
          {"image":"https://1000logos.net/wp-content/uploads/2020/08/Sophos-Logo-1536x960.png" ,link:"https://www.sophos.com/fr-fr?utm_source=bing&utm_medium=cpc&utm_campaign=mg-2023-af-fr-demg-bin-bra-convr-all-search-exact&utm_term=sophos&utm_content=na&cmp=7014w000001syCRAAY&&msclkid=f85951347b9613a750af370949a44331&gclid=f85951347b9613a750af370949a44331&gclsrc=3p.ds"},
          {"image":"https://kinglead.com.tw/wp-content/uploads/2022/08/CS-Fortinet.png" ,link:"https://www.fortinet.com/fr"},
         

      ]
    }



    const [data2 ,setData2]=useState({});
    const [loading ,setLoading]=useState(false);

    useEffect(()=>{
      fetchData()
    },[])

    const fetchData=async()=>{
      setLoading(true)
      const response= await axiosClient2.get("/api/portfolio");
      setData2(response.data)
      console.log(typeof(data) ,typeof(data2))
      console.log(data ,data2)
      setLoading(false)
    }




    function totalRating(){
      if(Object.keys(data2).length>0){
        return (data2.clients.reduce((total ,index)=>total+index.stars,0))/data2.clients.length
      }else{
        return 4.88
      }

    }




  return (
    <div >
 {/* hero section start */}
<div className="e-card playing " id='hero'>
  <div className="image "></div>
  <div className="wave"> <img src={logo} width={30} height={30} alt="" /> </div>
  <div className="wave-2"></div>
  <div className="wave-3"> <img src={logo} width={30} height={30} alt="" /> </div>
  <div className="wave-4"></div>
      <div className="">
      <PortfolioHero/>
</div>
</div>
 {/* End  Herro section */}
<br />




{/* scrool buttons */}
<div className="buttons-scroll cursor-pointer">
  <button className="main-button">
<b>Scroll</b>
</button>
<Link to='aboutus' class="discord-button button-scroll" style={{ transitionDelay: '0s, 0s, 0s', transitionProperty: 'transform, background, box-shadow' }}>
    {t("footer.AboutUs")}
</Link>
<Link to='services' class="twitter-button button-scroll" style={{
  transitionDelay: '0.1s, 0s, 0.1s',
  transitionProperty: 'transform, background, box-shadow'
}}>
Services
</Link>
<Link to='hero' class="reddit-button button-scroll" style={{
  transitionDelay: '0.2s, 0s, 0.2s',
  transitionProperty: 'transform, background, box-shadow'
}}
>
Top
</Link>
<Link to='projects' class="messenger-button button-scroll" style={{
  transitionDelay: '0.3s, 0s, 0.3s',
  transitionProperty: 'transform, background, box-shadow'
}}
>
Projects
</Link>
<Link to='team' class="pinterest-button button-scroll" style={{
  transitionDelay: '0.4s, 0s, 0.4s',
  transitionProperty: 'transform, background, box-shadow'
}}
>
Team
</Link>
<Link to='clients' class="instagram-button button-scroll" style={{
  transitionDelay: '0.5s, 0s, 0.5s',
  transitionProperty: 'transform, background, box-shadow'
}}
>
   Clients
</Link>
<Link to='footer' class="snapchat-button button-scroll" style={{
  transitionDelay: '0.6s, 0s, 0.6s',
  transitionProperty: 'transform, background, box-shadow'
}}
>
  Bottom

</Link>
<Link to='brands' class="whatsapp-button button-scroll" style={{
  transitionDelay: '0.7s, 0s, 0.7s',
  transitionProperty: 'transform, background, box-shadow'
}}
>
 Brands
</Link>
</div>
{/* scrool button-scrolls-scroll */}






 {/* about us section start  */}

<section id='aboutus' className='d-flex flex-column align-items-center justify-content-center'>
<h1 className='section-title'>{t("slides.aboutus")}</h1>
<div className="wrapper w-100 row d-flex align-items-center justify-content-center">
  <div className="panel col-lg-8 col-md-9 col-sm-10 mt-4">
    <b className='fs-3 p-4 d-inline-block text-dark'>{data.aboutus}</b>
  </div>
</div>

</section>
 {/* about us section end  */}


{/* section services */}
<br />
<hr />
<section id='services' className='d-flex flex-column align-items-center justify-content-center'>
<h1 className='section-title mb-4'>{t("slides.services")}</h1>

<div className='d-inline-block' style={{width:"auto"}}>
<PortfolioCarosul data={data.services} />
</div>
</section>
{/* section services */}

{/* section our team  */}
<br />
<hr />
<section id='team' className='bg-gray-200 d-flex flex-column align-items-center justify-content-center '>
        <h1 className='section-title mb-4'>{t("profiler.team")}</h1>
        <div className='d-inline-block' style={{width:"auto"}}>
        <OurTeam data={Object.keys(data2).length>0?data2.team:data.team} />
        </div>
</section>
{/* section our team  */}
<br />
<hr />
{/* section clients  */}
<section id='clients' className=' d-flex flex-column align-items-center justify-content-center clients '>
<h1 className='section-title mb-4'>{t("profiler.clients")}</h1>
<div className='d-flex align-items-center justify-content-center mb-4'>

<svg width="45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill={totalRating()>=1?"orange":"gray"} d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
<svg width="45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill={totalRating()>=2?"orange":"gray"} d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
<svg width="45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill={totalRating()>=3?"orange":"gray"} d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
<svg width="45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill={totalRating()>=4?"orange":"gray"} d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
<svg width="45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill={totalRating()>=5?"orange":"gray"} d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
  <h2 className='fs-3 font-bold ms-1	'> {totalRating().toFixed(2)} Total Rating</h2>
</div>
<div className='d-inline-block' style={{width:"auto"}}>
    <OurClient data={Object.keys(data2).length>0?data2.clients:data.clients}/>
</div>

</section>
{/* section clients  */}

<hr />
{/* sections projects  */}
<section id='projects' className=' d-flex flex-column align-items-center justify-content-center  '>
<h1 className='section-title mb-4'>{t("profiler.projects")}</h1>
<div className='col-lg-12  mx-auto d-flex align-items-center justify-content-center  p-4' >
  <OurProject data={Object.keys(data2).length>0?data2.projects:data.projects}/>
</div>

</section>
{/* sections projects  */}

{/* section Brands  */}
<section id='brands' className=' d-flex flex-column align-items-center pb-4 justify-content-center brands ' style={{maxHeight:"400px"}}>
<h1 className='section-title text-white'>{t("profiler.brands")}</h1>
  <OurBrand data={data.brands}/>

</section>
{/* section Brands  */}


{/* section connected with setrect innova  */}
<hr />
<section id='contactus'>
<div className='d-flex align-items-center justify-content-around bg-purple-500 p-4'>
<h1 className='text-white fs-1 font-bold font-sans '>{t("profiler.connect")}</h1>
<Route to={'/contact-us'} class="cursor-pointer uppercase font-bold text-dark bg-white px-4 py-2 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#F44336,-0.5rem_-0.5rem_#00BCD4] transition">
    {t("footer.ContactUs")}
</Route>
</div>
</section>
{/* section connected with setrect innova  */}

{/* section footer  */}
<section id='footer'>
</section>
{/* section footer  */}




    </div>
  )
}

export default Portfolio
