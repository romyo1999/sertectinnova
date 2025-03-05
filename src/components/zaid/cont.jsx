// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { useTranslation } from 'react-i18next';
// import LanguageSelector from "./LanguageSelector.jsx";
// import { Link } from "react-router-dom";
// import { MdAdminPanelSettings } from "react-icons/md";
// import '../index.css'
// import Model from "./Model.jsx";
// const Navbar = () => {
//     const { t } = useTranslation();
//
//     return (
//         <div className="flex h-28 justify-evenly bg-neutral-900 px-3 py-12 " id="navbar">
//
//
//             <FlyoutLink to="#" FlyoutContent={TitleS}>
//                 <Model/>
//             </FlyoutLink>
//             <FlyoutLink to="#" FlyoutContent={HomeS}>
//                 <Link to={'/'}><h1 className={'text-xl'}>{t('navbar.home')}</h1></Link>
//             </FlyoutLink>
//             <FlyoutLink to="#" FlyoutContent={Servi}>
//                 <Link to={"/services"}><h1 className={'text-xl'}>{t('navbar.Services')} </h1></Link>
//             </FlyoutLink>
//             <FlyoutLink to="#" FlyoutContent={Products}>
//                 <h1 className={'text-xl'}>{t('navbar.Products.pro0')}</h1>
//             </FlyoutLink>
//             <FlyoutLink to="#" FlyoutContent={Solutions}>
//                 <h1 className={'text-xl'}>{t('navbar.solutions.op0')}</h1>
//             </FlyoutLink>
//             <div><Link to={'/dashboard'}><MdAdminPanelSettings className={"admin hover:z-2"}/></Link></div>
//             <div><LanguageSelector/></div>
//         </div>
//     );
// };
//
// const FlyoutLink = ({children, to, FlyoutContent }) => {
//     const [open, setOpen] = useState(false);
//     const showFlyout = FlyoutContent && open;
//
//     return (
//         <div
//             onMouseEnter={() => setOpen(true)}
//             onMouseLeave={() => setOpen(false)}
//             className="relative w-fit h-fit"
//         >
//             <Link to={to} className="relative text-white">
//                 {children}
//                 <span
//                     style={{
//                         transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
//                     }}
//                     className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out "
//                 />
//             </Link>
//             <AnimatePresence>
//                 {showFlyout && (
//                     <motion.div
//                         initial={{ opacity: 0, y: 15 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 15 }}
//                         style={{ translateX: "-50%" }}
//                         transition={{ duration: 0.3, ease: "easeOut" }}
//                         className="absolute left-1/2 top-12 bg-white text-black" id={'one'}
//                     >
//                         <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
//                         <FlyoutContent />
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };
//
// const Products = () => {
//     const { t } = useTranslation();
//
//     return (
//         <div className="w-64 bg-white p-6 shadow-xl " id={"products"}>
//             <div className="mb-3 space-y-3">
//                 <h3 className="font-semibold">{t("navbar.Products.pro0")}</h3>
//                 <Link to={'#'} className="block text-sm hover:underline">
//                     {t("navbar.Products.pro1")}
//                 </Link>
//                 <Link to="#" className="block text-sm hover:underline">
//                     {t("navbar.Products.pro2")}
//                 </Link>
//                 <Link to="#" className="block text-sm hover:underline">
//                     {t("navbar.Products.pro3")}
//                 </Link>
//                 <Link to="#" className="block text-sm hover:underline">
//                     {t("navbar.Products.pro4")}
//                 </Link>
//             </div>
//             <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
//                 button
//             </button>
//         </div>
//     );
// };
// const Solutions = () => {
//     const { t } = useTranslation();
//
//     return (
//         <div className="w-64 bg-white p-6 shadow-xl " >
//             <div className="mb-3 space-y-3">
//                 <h3 className="font-semibold">{t("navbar.solutions.op0")}</h3>
//                 <Link to={'#'} className="block text-sm hover:underline">
//                     {t("navbar.solutions.op1")}
//                 </Link>
//                 <Link to="#" className="block text-sm hover:underline">
//                     {t("navbar.solutions.op2")}
//                 </Link>
//                 <Link to="#" className="block text-sm hover:underline">
//                 {t("navbar.solutions.op3")}
//             </Link>
//             </div>
//             <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
//                 button
//             </button>
//         </div>
//     );
// };
// const TitleS = () => {
//     return (
//         <div></div>
//     );
// };
// const HomeS = () => {
//     return (
//         <div></div>
//     );
// };
// const Servi = () => {
//     const { t } = useTranslation();
//
//     return (
//         <div className="w-64 bg-white p-6 shadow-xl " id={"products"}>
//             <div className="mb-3 space-y-3">
//                 <h3 className="font-semibold">{t("navbar.Products.pro0")}</h3>
//                 <Link to={'#'} className="block text-sm hover:underline">
//                     {t("navbar.Products.pro1")}
//                 </Link>
//                 <Link to="#" className="block text-sm hover:underline">
//                     {t("navbar.Products.pro2")}
//                 </Link>
//                 <Link to="#" className="block text-sm hover:underline">
//                     {t("navbar.Products.pro3")}
//                 </Link>
//                 <Link to="#" className="block text-sm hover:underline">
//                     {t("navbar.Products.pro4")}
//                 </Link>
//             </div>
//             <button
//                 className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
//                 button
//             </button>
//         </div>
//     );
// };
//
//
// export default Navbar;









import React, { useState } from "react";
import {MdClose, MdSearch} from 'react-icons/md';
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import LanguageSelector from "./LanguageSelector.jsx";
import { Link } from "react-router-dom";
import { MdMenu, MdAdminPanelSettings } from "react-icons/md";
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
        <div>
            <div className="block md:hidden">
                <button onClick={toggleMenu}>
                    <MdMenu className="text-white size-20 p-6"/>
                </button>
            </div>
                <div className={`md:h-28 md:w-full md:justify-evenly ml-12 pl-12 pb-3 md:bg-neutral-900 md:px-3 md:py-12 md:flex  ${showMenu ? 'block' : 'hidden'}`} id="navbar">
                    <FlyoutLink to="#" FlyoutContent={TitleS}>
                        <Link to={'/'}><img src={logo} className="h-10"/></Link>
                    </FlyoutLink>
                <FlyoutLink to="#" FlyoutContent={Servi}>
                    <Link to={"/services"}><h1 className={'text-xl'}>{t('navbar.Services')} </h1></Link>
                </FlyoutLink>
                <FlyoutLink to="#" FlyoutContent={Solutions} >
                    <h1 className={'text-xl'}>{t('navbar.solutions.op0')}</h1>
                </FlyoutLink>
                    <FlyoutLink to="#" FlyoutContent={Products}>
                        <h1 className={'text-xl'}>{t('navbar.Products.pro0')}</h1>
                    </FlyoutLink>
                    <div >
                        <SearchBar/>
                    </div>
                    <FlyoutLink FlyoutContent={ContactUS}>
                        <h2 className="text-xl">Contact Us</h2>
                    </FlyoutLink>
                    <div><Link to={'/dashboard'}><MdAdminPanelSettings className={"admin hover:z-2"}/></Link></div>
                    <div><LanguageSelector/></div>
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
    const { t } = useTranslation();

    return (
        <div className="w-64 bg-white p-6 shadow-xl  " id={"products"}>
            <div className="mb-3 space-y-3">
                <h3 className="font-semibold">{t("navbar.Products.pro0")}</h3>
                <Link to={'#'} className="block text-sm hover:underline">
                    {t("navbar.Products.pro1")}
                </Link>
                <Link to="#" className="block text-sm hover:underline">
                    {t("navbar.Products.pro2")}
                </Link>
                <Link to="#" className="block text-sm hover:underline">
                    {t("navbar.Products.pro3")}
                </Link>
                <Link to="#" className="block text-sm hover:underline">
                    {t("navbar.Products.pro4")}
                </Link>
            </div>
            <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
                button
            </button>
        </div>
    );
};
const Solutions = () => {
    const { t } = useTranslation();

    return (
        <div className="w-64 bg-white p-6 shadow-xl " >
            <div className="mb-3 space-y-3">
                <h3 className="font-semibold">{t("navbar.solutions.op0")}</h3>
                <Link to={'#'} className="block text-sm hover:underline">
                    {t("navbar.solutions.op1")}
                </Link>
                <Link to="#" className="block text-sm hover:underline">
                    {t("navbar.solutions.op2")}
                </Link>
                <Link to="#" className="block text-sm hover:underline">
                    {t("navbar.solutions.op3")}
                </Link>
            </div>
            <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
                button
            </button>
        </div>
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
const Servi = () => {
    const { t } = useTranslation();

    return (

        <div className="w-64 bg-white p-6 shadow-xl" id={"products"}>
            <div className="mb-3 space-y-3">
                <h3 className="font-semibold">{t("navbar.Products.pro0")}</h3>
                <Link to={'#'} className="block text-sm hover:underline">
                    {t("navbar.Products.pro1")}
                </Link>
                <Link to="#" className="block text-sm hover:underline">
                    {t("navbar.Products.pro2")}
                </Link>
                <Link to="#" className="block text-sm hover:underline">
                    {t("navbar.Products.pro3")}
                </Link>
                <Link to="#" className="block text-sm hover:underline">
                    {t("navbar.Products.pro4")}
                </Link>
            </div>
            <button
                className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
                button
            </button>
        </div>
    );
};
const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleClearInput = () => {
        setSearchValue('');
    };

    return (
        <form className="relative">
            <div className="flex items-center border-2 border-gray-300 rounded-xl py-1 px-2">
                <input
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    placeholder="Serach For Products..."
                    className="outline-none flex-grow bg-neutral-900 transition duration-200 ease-in-out text-neutral-300"
                />
                {searchValue && (
                    <motion.button
                        type="button"
                        onClick={handleClearInput}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center justify-center  text-neutral-500 hover:text-neutral-700  "
                    >
                        <MdClose/>
                    </motion.button>
                )}
                <motion.button
                    type="submit"
                    whileTap={{ scale: 0.9 }}
                    className="ml-2 flex items-center justify-center bg-gray-600 text-white rounded-full p-2"
                >
                    <MdSearch />
                </motion.button>
            </div>
        </form>
    );
};

export default Navbar;
