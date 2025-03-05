"use client";

import { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import {useTranslation} from "react-i18next";
import {FaArrowRightLong, FaQuoteRight,FaQuoteLeft} from "react-icons/fa6";
import {motion} from "framer-motion";
import pic1 from "../../assets/first.jpg"
import pic2 from "../../assets/philos.jpg"
import pic3 from "../../assets/pic3.jpg"
import Typewriter from 'typewriter-effect';
import {Link} from "react-router-dom";

function Slides() {
    const slides = [
        {
            url: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
            url: 'https://www.crcfacts.com/images/contact.jpg',
        },
        {
            url: "https://images.pexels.com/photos/257886/pexels-photo-257886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            url: "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            url: "https://meraki.cisco.com/wp-content/uploads/2021/12/mx-hero1.png"
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    // const goToSlide = (slideIndex) => {
    //     setCurrentIndex(slideIndex);
    // };
    function scrollToSection(sectionID) {
        const section = document.getElementById(sectionID);
        section.scrollIntoView({ behavior: 'smooth' });
    }



    const Cont = () => {
        const { t } = useTranslation();
        let textWithLineBreaks = t('slides.whoarewe');
        textWithLineBreaks = textWithLineBreaks.replace(/\n/g, '<br/>');
        var contact=t('slides.contact_paragraph');
        contact=contact.replace(/\n/g, '<br/>');
        var services=t("slides.services_paragraph");
        services=services.replace(/\n/g, '<br/>');
        var aboutUs =t("slides.aboutUsparagraph");
        var products=t("slides.products_paragraph")
        aboutUs=aboutUs.replace(/\n/g, '<br/>');
        products=products.replace(/\n/g, '<br/>');
        switch (currentIndex) {
            case 0:
                return (
                    <>
                        <div className="flex flex-col justify-center items-start  md:md:ml-[200px] " style={{position:"absolute",top:"15px" ,left:0}}>
                            <div className='backdrop-blur-xl p-2 rounded-xl rounded-bl-none rounded-br-none'>
                                <h1 className="md:text-2xl text-lg font-bold text-white capitalize fs-4 p-1 font-tech silde-titles">{t('slides.whoti')}</h1>
                            </div>
                            <div className='backdrop-blur-sm p-4 rounded-xl rounded-tl-none '>
                                <p className='md:text-xl font-sans font-bold text-white capitalize text-md'
                                   dangerouslySetInnerHTML={{__html: textWithLineBreaks}}></p>
                            </div>
                            <div className="p-5 " onClick={()=>scrollToSection('whoarewe')}>
                                <button className="p-[3px] relative" >
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"/>
                                    <div
                                        className="px-8 py-2  bg-indigo-500  rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                                        <span className='flex justify-center font-bold text-white items-center h-full'>for more<motion.span className='mt-[3px] ml-5 ' whileHover={{rotate:-30}}><FaArrowRightLong/> </motion.span>
                                    </span>
                                    </div>
                                </button>
                            </div>

                        </div>
                    </>
                )
            case 1:
                return (
                    <>
                        <div className="flex flex-col justify-center items-start h-full md:ml-[200px]  " style={{position:"absolute",top:"15px" ,left:0}}>
                            <div className='backdrop-blur-sm p-2 rounded-xl rounded-bl-none rounded-br-none'>
                                <h1 className="md:text-2xl font-bold text-lg fs-4 p-1  text-white capitalize font-tech silde-titles">{t('slides.contact')}</h1>
                            </div>
                            <div className='backdrop-blur-sm p-4 rounded-xl rounded-tl-none '>
                                <p className='md:text-xl text-white  font-sans font-bold capitalize text-md'
                                   dangerouslySetInnerHTML={{__html: contact}}></p>
                            </div>
                            <div className="p-4">
                                <Link to={"/contact-us"}>
                                <button className="p-[3px] relative ">
                                    <div
                                        className="absolute  inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"/>
                                    <div
                                        className="px-8 py-2  bg-indigo-500  rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                                        <span className='flex justify-center  font-bold text-white  items-center h-full'>Contact<motion.span className='mt-[3px] ml-5 ' whileHover={{rotate:-30}}><FaArrowRightLong/> </motion.span>
                                    </span>
                                    </div>
                                </button>
                                </Link>
                            </div>

                        </div>
                    </>
                )
            case 2:
                return (
                    <>
                        <div className="flex flex-col justify-center items-start h-full md:ml-[200px] " style={{position:"absolute",top:"15px" ,left:0}}>
                            <div className='backdrop-blur-sm p-2 rounded-xl rounded-bl-none rounded-br-none'>
                                <h1 className="md:text-2xl font-bold text-lg text-white fs-4 p-1  capitalize font-bold silde-titles">{t('slides.services')}</h1>
                            </div>
                            <div className='backdrop-blur-sm p-4 rounded-xl rounded-tl-none '>
                                <p className='md:text-xl text-white  font-sans font-bold capitalize text-md'
                                   dangerouslySetInnerHTML={{__html: services}}></p>
                            </div>
                            <div className="p-4">
                                <Link to={'/services'}>
                                <button className="p-[3px] relative">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"/>
                                    <div
                                        className="px-8 py-2   bg-indigo-500 rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                                        <span className='flex justify-center font-bold text-white items-center h-full'>Explore<motion.span
                                            className='mt-[3px] ml-5 '
                                            whileHover={{rotate: -30}}><FaArrowRightLong/> </motion.span>
                                    </span>
                                    </div>
                                </button>
                                </Link>
                            </div>

                        </div>
                    </>
                )
            case 3:
                return (
                    <>
                        <div className="flex flex-col justify-center items-start h-full md:ml-[200px] "  style={{position:"absolute",top:"15px" ,left:0}}>
                            <div className='p-2 rounded-xl rounded-bl-none rounded-br-none'>
                                <h1 className="md:text-2xl font-bold text-lg text-white fs-4 p-1  capitalize font-bold silde-titles">{t('slides.aboutus')}</h1>
                            </div>
                            <div className='bg-for-sildes  p-4  rounded-xl rounded-tl-none '>
                                <p className='md:text-xl text-white   font-sans font-bold  capitalize text-md'
                                   dangerouslySetInnerHTML={{__html: aboutUs}}></p>
                            </div>
                            <div className="pb-4">
                                <Link to={"/about-us"}>
                                <button className="p-[3px] relative">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"/>
                                    <div
                                        className="px-8 py-2  bg-indigo-500  rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                                        <span className='flex justify-center text-white font-bold items-center h-full'>Discover<motion.span
                                            className='mt-[3px] ml-5 '
                                            whileHover={{rotate: -30}}><FaArrowRightLong/> </motion.span>
                                    </span>
                                    </div>
                                </button>
                                </Link>
                            </div>

                        </div>
                    </>
                )
            case 4:
                return (
                    <>
                        <div className="flex flex-col justify-center items-start h-full md:ml-[200px] "  style={{position:"absolute",top:"15px" ,left:0}}>
                            <div className='backdrop-blur-sm p-2 rounded-xl rounded-bl-none rounded-br-none'>
                                <h1 className="md:text-2xl text-lg text-black  capitalize font-bold silde-titles">{t('slides.products')}</h1>
                            </div>
                            <div className='bg-for-sildes p-4 rounded-xl rounded-tl-none '>
                                <p className='md:text-xl text-white  font-sans font-bold  capitalize text-md'
                                   dangerouslySetInnerHTML={{__html: products}}></p>
                            </div>
                            <div className="p-4">
                                <Link to={'products'}>
                                <button className="p-[3px] relative">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"/>
                                    <div
                                        className="px-8 py-2   bg-indigo-500  rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                                        <span className='flex justify-center text-white font-bold  items-center h-full'>Explore<motion.span
                                            className='mt-[3px] ml-5 '
                                            whileHover={{rotate: -30}}><FaArrowRightLong/> </motion.span>
                                    </span>
                                    </div>
                                </button>
                                </Link>
                            </div>

                        </div>
                    </>
                )
        }
    }
    const { t } = useTranslation();

    let title1=t("cards.title1")
    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after five seconds (5000 milliseconds)
        }, 5000);

        return () => clearTimeout(timer); // Clear the timer when component unmounts
    }, []);

    return (
        <>
        <div className='h-[400px] w-full relative group'>
            {loading &&
              <div className="skeleton w-full h-full"></div>
            }
            <div
              style={{backgroundImage: `url(${slides[currentIndex].url})`, opacity: loading ? 0 : 1}}
                className='w-full h-full bg-gray-300  bg-center bg-cover duration-500 relative '
            >
                {
                    Cont()
                }
                {console.log(currentIndex)}

            </div>
            {/* Left Arrow */}
            <div
                className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30}/>
            </div>
            {/* Right Arrow */}
            <div
                className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30}/>
            </div>
            {/*<div className='flex top-4 justify-center py-2'>*/}
            {/*    {slides.map((slide, slideIndex) => (*/}
            {/*        <div*/}
            {/*            key={slideIndex}*/}
            {/*            onClick={() => goToSlide(slideIndex)}*/}
            {/*            className='text-2xl cursor-pointer'*/}
            {/*        >*/}
            {/*            <RxDotFilled/>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
            <div className={"p-12"}>
                <div className=" grid md:grid-cols-2 gap-5" id={'whoarewe'}>
                    <div className="p-5 h-[400px] ">
                        <h1 className="text-black text-3xl font-bold mb-8">
                            <Typewriter
                                options={{
                                    strings: [title1],
                                    autoStart: true,
                                    pauseFor: 3000000000,
                                    deleteSpeed: 200
                                }}
                            />
                        </h1>
                        <p className="text-black text-lg font-tech ">{t("cards.paragraph1")}</p>
                    </div>
                    <div className="h-[400px] p-6 ">
                        {loading &&
                            <div className="flex justify-center justify-items-center mt-[50%] md:mt-[30%] ">
                            <progress className="progress w-56 progress-success"></progress>
                             </div>
                        }
                        <div className="overflow-hidden inline-block rounded-xl">
                            <img src={pic1} alt='pic'
                                 onLoad={handleImageLoad}
                                 style={{ display: loading ? 'none' : 'block' }}
                                 className="rounded-xl h-[300px] w-[500px] hover:scale-110 duration-500 transition-transform "/>
                        </div>
                    </div>
                    <div className="p-6 h-[400px] ">
                        {loading &&
                            <div className="flex justify-center justify-items-center mt-[50%] md:mt-[30%] ">
                                <progress className="progress w-56 progress-success"></progress>
                            </div>
                        }
                        <div className="overflow-hidden inline-block rounded-xl">
                            <img src={pic2} alt='pic'

                                 onLoad={handleImageLoad}
                                 style={{ display: loading ? 'none' : 'block' }}
                                 className="rounded-xl h-[300px] w-[500px] hover:scale-110 duration-500 transition-transform "/>
                        </div>

                    </div>
                    <div className=" h-[400px] ">
                        <h1 className="text-black text-3xl font-bold mb-4">
                            <Typewriter
                                options={{
                                    strings: [t("cards.title2")],
                                    autoStart: true,
                                    pauseFor: 30000000000,
                                    deleteSpeed: 200
                                }}
                            />
                        </h1>
                        <p className="text-blue-500 text-lg font-bold flex ">
                            <FaQuoteLeft className="text-black mr-2 " />
                            {t("cards.paragraph21")}
                            <FaQuoteRight className="text-black ml-2 "/>

                        </p>
                        <p className="text-black text-lg font-tech ">{t("cards.paragraph22")}</p>
                    </div>
                    <div className=" h-[400px] ">
                        <h1 className="text-black text-3xl font-bold mt-12">
                            <Typewriter
                                options={{
                                    strings: [t("cards.title3")],
                                    autoStart: true,
                                    loop: true,
                                    pauseFor: 300000000,
                                    deleteSpeed: 200
                                }}
                            />
                        </h1>
                        <p className="text-black text-lg font-tech mt-5">{t("cards.paragraph3")}</p>
                    </div>
                    <div className="p-8 h-[400px] md:mt-12">
                        {loading &&
                            <div className="flex justify-center justify-items-center mt-[50%] md:mt-[30%] ">
                                <progress className="progress w-56 progress-success"></progress>
                            </div>
                        }
                        <div className="overflow-hidden inline-block rounded-xl">
                            <img src={pic3} alt="Did not loaded"
                                 onLoad={handleImageLoad}
                                 style={{ display: loading ? 'none' : 'block' }}
                                 className="rounded-xl h-[300px] w-[500px] hover:scale-110 duration-500 transition-transform "/>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}

export default Slides;
