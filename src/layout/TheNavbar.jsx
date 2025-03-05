
import { useState } from "react";
import {MdClose, MdSearch} from 'react-icons/md';
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import LanguageSelector from "../components/zaid/LanguageSelector";
import { Link, useNavigate } from "react-router-dom";
import '../index.css'
import logo from "../assets/dpng.png"
const Navbar = () => {
    const { t } = useTranslation();
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    console.log("showMenu:", showMenu);

    return (
        <div className='bg-neutral-900 '>
            <div>
                <div className=" md:hidden  " id={"myElement"}>
                    <button onClick={toggleMenu}>
                        {
                            showMenu?(
                            <svg viewBox="0 0 1024 1024" width={60} height={60} xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffff" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path></g></svg>
                            ):(
                          <img
                          width="64"
                          height="64"
                          src="https://img.icons8.com/glyph-neue/64/FFFFFF/menu--v1.png"
                          alt="menu--v1"
                        />
                            )
                        }

                    </button>
                </div>

                <div
                  className={`md:h-28  md:justify-evenly ml-12 pl-12 pb-3 md:bg-neutral-900 md:px-3 md:py-12 md:flex  ${showMenu ? 'block' : 'hidden'}`}
                  id="navbar">
                    <FlyoutLink to="#" FlyoutContent={TitleS}>
                        <Link to={'/'}><img src={logo} className="h-10" id='search'/></Link>
                    </FlyoutLink>

                    <FlyoutLink to="#" FlyoutContent={Servi}>
                        <Link to={"/services"}><h1 className={'text-xl font-tech'}
                                                   id='search'>{t('navbar.Services')} </h1></Link>
                    </FlyoutLink>

                    <FlyoutLink to="/products" FlyoutContent={Products}>
                        <h1 className={'text-xl'} id='search'><Link to="/products">{t('navbar.Products.pro01')}</Link>
                        </h1>
                    </FlyoutLink>
                    <FlyoutLink to="#" FlyoutContent={AboutUS}>
                        <h1 className={'text-xl d-flex align-items-center justify-content-center'} id='search'>
                            <div className='text-white flex'>{t('navbar.solutions.op0')}
                                <svg className="mt-2" viewBox="0 0 24 24" width={20} height={20} fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                                              fill="#ffffff"></path>
                                    </g>
                                </svg>
                            </div>
                        </h1>
                    </FlyoutLink>

                    <FlyoutLink FlyoutContent={ContactUS}>
                        <h2 className="text-xl" id='search'>
                            <Link to="/contact-us">
                                {t("footer.ContactUs")}

                            </Link>
                        </h2>
                    </FlyoutLink>
                    <div id='search'>
                        <SearchBar/>
                    </div>
                    <div id='search'><Link to={'/admin/dashboard'}>
                        <img width="35" height="35"
                             src="https://img.icons8.com/ios-glyphs/30/FFFFFF/admin-settings-male.png"
                             alt="admin-settings-male"/>
                    </Link></div>
                    <div className="d-flex  justify-start  " id='search'>
                        <LanguageSelector/>
                    </div>
                </div>
            </div>
        </div>

    );
};
const FlyoutLink = ({children, to, FlyoutContent}) => {
    const [open, setOpen] = useState(false);
    const showFlyout = FlyoutContent && open;

    return (
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
            className="relative w-fit h-fit "
        >
            <Link to={to} className="relative text-white">
                {children}
                <span
                    style={{
                        transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
                    }}
                    className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out "
                />
            </Link>
            <AnimatePresence>
                {showFlyout && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        style={{ translateX: "-50%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute left-1/2 top-12 bg-white text-black" id={'one'}
                    >
                        <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
                        <FlyoutContent />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Products = () => {

    return (
        <></>
    );
};
const TitleS = () => {
    return (
        <div></div>
    );
};
const ContactUS = () => {
    return (
        <div></div>
    );
};
const AboutUS = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="absolute -top-6 left-0 right-0 h-6  bg-transparent" id="hello"/>
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white"/>
            <div className="w-64 bg-white p-6 shadow-2xl rounded-xl" id={"products"}>
                <div className=" flex flex-col justify-center justify-items-center content-center p-1">
                    <Link to={'/about-us'}
                          className="block p-2  hover:border hover:border-2 rounded-4 hover:bg-gray-200 " >
                        <div className="flex gap-4">
                            <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/ophthalmology.png"
                                 alt="ophthalmology"/>
                            <p className=" text-xl font-bold hover:underline text-blue-900 hover:scale-105 transition duration-500 ease-in-out hover:text-blue-700">
                                {t("navbar.Products.pro1")}</p>
                        </div>
                    </Link>
                    <Link to={'/portfolio'}
                          className="block p-2  hover:border hover:border-2 rounded-4 hover:bg-gray-200">
                        <div className="flex gap-4">
                            <img width="32" height="32" src="https://img.icons8.com/material-sharp/48/guest-male.png"
                                 alt="guest-male"/>
                            <p className=" text-xl font-bold hover:underline text-blue-900 hover:scale-105 transition duration-500 ease-in-out hover:text-blue-700">
                                {t("navbar.Products.pro2")}</p>
                        </div>
                    </Link>
                    <Link to={'/research'}
                          className="block p-2  hover:border hover:border-2 rounded-4 hover:bg-gray-200">
                        <div className="flex gap-4">
                            <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/case-study.png"
                                 alt="case-study"/>
                            <p className=" text-xl font-bold hover:underline text-blue-900 hover:scale-105 transition duration-500 ease-in-out hover:text-blue-700">
                                {t("navbar.Products.pro3")}</p>
                        </div>
                    </Link>


                </div>
            </div>
        </div>
    );
};
const Servi = () => {
    const {t} = useTranslation();

    return (
        <>
            {/*<div className="w-64 bg-white p-6 shadow-xl rounded-xl" id={"products"}>*/}
            {/*    <div className="mb-3 space-y-3">*/}
          {/*        <h3 className="font-semibold">{t("navbar.Products.pro0")}</h3>*/}
          {/*        <Link to={'#'} className="block text-sm hover:underline">*/}
          {/*            {t("navbar.Products.pro1")}*/}
          {/*        </Link>*/}
          {/*        <Link to="#" className="block text-sm hover:underline">*/}
          {/*            {t("navbar.Products.pro2")}*/}
          {/*        </Link>*/}
          {/*        <Link to="#" className="block text-sm hover:underline">*/}
          {/*            {t("navbar.Products.pro3")}*/}
          {/*        </Link>*/}
          {/*        <Link to="#" className="block text-sm hover:underline">*/}
          {/*            {t("navbar.Products.pro4")}*/}
          {/*        </Link>*/}
          {/*    </div>*/}
          {/*    <button*/}
          {/*      className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">*/}
          {/*        button*/}
          {/*    </button>*/}
          {/*</div>*/}
      </>
    );
};
const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const navigate=useNavigate()
    const handleSearch=(e)=>{
        e.preventDefault();
        console.log(searchValue)
        navigate(`/search/${searchValue}`)
    }


    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
        setIsTyping(event.target.value !== '');

    };

    const handleClearInput = () => {
        setSearchValue('');
        setIsTyping(false);

    };

    return (
      <form className="relative" onSubmit={handleSearch}>
          <div
            className={`flex items-center justify-around border-2 rounded-xl py-1 px-2  focus:border-2 focus:border-blue-600  transition-all duration-200 ${isTyping ? 'border-green-500 shadow-green' : 'border-gray-300 shadow-gray'}`}
          >
              <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                placeholder="Serach For Products..."
                className="outline-none  flex-grow bg-neutral-900 transition duration-200 ease-in-out text-neutral-300 font-tech capitalize"
                />
                {searchValue && (
                    <motion.button
                        type="button"
                        onClick={handleClearInput}
                        whileTap={{scale: 0.9}}
                        className=" w-[24px] h-[24px] rounded-full  bg-secondary  justify-center  text-neutral-500 hover:text-neutral-700  "
                    >
                        <MdClose className=" w-[22px] h-[22px] ms-[1px] rounded-full"/>
                    </motion.button>
                )}
                <motion.button
                    type="submit"
                    whileTap={{scale: 0.9}}
                    className={`ml-2   items-center  rounded-full  w-[32px] h-[32px]   text-white  ${isTyping ? 'bg-green-500' : 'bg-gray-600'}`}
                >
                    <MdSearch className={`${isTyping ? 'opacity-100' : 'opacity-0'} w-[23px] h-[23px] ms-[5px]   `  }/>
                </motion.button>
            </div>
        </form>
    );
};

export default Navbar;
