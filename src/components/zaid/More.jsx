import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import i18n from '../i18/index';
import { MdLanguage } from "react-icons/md";
import { ArrowDownCircleIcon, ArrowDownIcon, ArrowDownOnSquareIcon, ArrowDownOnSquareStackIcon, ArrowDownTrayIcon, ListBulletIcon } from "@heroicons/react/16/solid";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const More = () => {
    const { t } = useTranslation(); // Use useTranslation hook to get the t function
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // i18n.language contains the language assigned to lng in i18n.js file.
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: "sp", name: "Spanish", icon: <MdLanguage className="planet-icon" /> },
        { code: "en", name: "English", icon: <MdLanguage className="planet-icon" /> },
        { code: "fr", name: "French", icon: <MdLanguage className="planet-icon" /> },
    ];

    const chooseLanguage = (code) => {
        i18n.changeLanguage(code);   // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
        setSelectedLanguage(code);
        setIsOpen(false);
    }

    return (
        <div className="relative"  style={{zIndex:2009999999990}}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center rounded-md focus:outline-none"
            >
                <span className="text-white text-lg ">More 
                {
                    isOpen?(
                        <FaSortUp  className="d-inline fs-6 pt-0 pt-1 ms-1 bg-secondary rounded-full align-items-center justify-center"/>

                    ):(
                        <FaSortDown  className="d-inline fs-6 pt-0 pb-1 ms-1 bg-secondary rounded-full align-items-center justify-center"/>

                    )
                }
                </span>
            </button>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute rounded-3 z-10 mt-1 w-52 bg-white rounded-md shadow-lg"
                >
                    <ul className="py-1 w-100 d-flex flex-column items-center justify-center">
                        <li onClick={() => setIsOpen(!isOpen)} className="m-2 fs-5 rounded-4  ps-4 pe-4 font-sans hover:text-blue-900 hover:bg-gray-200"> <Link to={"/about-us"}>About Us</Link></li>
                        <li  onClick={() => setIsOpen(!isOpen)} className="m-2 fs-5 rounded-4  ps-4 pe-4 font-sans hover:text-blue-900 hover:bg-gray-200"><Link to={"/portfolio"}>Portfolio</Link></li>
                        <li  onClick={() => setIsOpen(!isOpen)} className="m-2 fs-5 rounded-4  ps-4 pe-4 font-sans hover:text-blue-900 hover:bg-gray-200"><Link to={"/research"}>Reseach</Link></li>

                    </ul>
                </motion.div>
            )}
        </div>
    );

    
};

export default More;
