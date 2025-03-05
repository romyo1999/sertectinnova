import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import i18n from '../i18/index';
import { MdLanguage } from "react-icons/md";

const LanguageSelector = () => {
    const { t } = useTranslation(); // Use useTranslation hook to get the t function
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // i18n.language contains the language assigned to lng in i18n.js file.
    const [isOpen, setIsOpen] = useState(false);

    const languages = [

        { code: "en", name: "English", icon: <MdLanguage className="planet-icon fs-2 rounded-full bg-white" /> },
        { code: "fr", name: "French", icon: <MdLanguage className="planet-icon fs-2 rounded-full bg-white" /> },
        { code: "sp", name: "Spanish", icon: <MdLanguage className="planet-icon fs-2 rounded-full bg-white " /> },
    ];

    const chooseLanguage = (code) => {
        i18n.changeLanguage(code);   // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
        setSelectedLanguage(code);
        setIsOpen(false);
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center rounded-md focus:outline-none"
            >
                <span className="text-white text-lg hover:bg-white p-1   rounded-full ">{languages.find(lang => lang.code === selectedLanguage).icon}</span>
            </button>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 mt-1 w-32 bg-white rounded-md shadow-lg"
                >
                    <ul className="py-1">
                        {languages.map((lang) => (
                            <li key={lang.code}>
                                <button
                                    onClick={() => chooseLanguage(lang.code)}
                                    className={`${
                                        lang.code === selectedLanguage ? "bg-gray-200" : ""
                                    } block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 focus:outline-none w-full text-left`}
                                >
                                    {lang.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default LanguageSelector;
