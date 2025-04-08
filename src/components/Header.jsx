import React, { useState } from "react";
import logoHeader from "../assets/pictures/logoHeader.png";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    const handleNavAndScroll = (sectionId) => {
        if (location.pathname !== "/") {
            navigate(`/?scrollTo=${sectionId}`);
            setIsOpen(false);
        } else {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
            }
        }
    };

    return (
        <header className="relative bg-gradient-to-r pl-6 pr-6 md:pl-10 md:pr-10 from-black to-[#22000c] p-4 flex justify-between items-center">
            <Link to="/">
                <div className="flex items-center gap-2">
                    <img className="w-8 h-8 md:w-10 md:h-10" src={logoHeader} alt="logotype" />
                    <span className="logoFont text-white cursor-pointer text-3xl md:text-5xl">
                        Movie Space<span className="text-red-500">.</span>
                    </span>
                </div>
            </Link>

            <nav className="hidden md:block">
                <ul className="interFont flex gap-4 md:gap-6 text-gray-300 text-base md:text-lg">
                    <Link to="/"><li className="text-white font-bold cursor-pointer">Home</li></Link>
                    <li onClick={() => handleNavAndScroll("movies")} className="cursor-pointer">Movies</li>
                    <li onClick={() => handleNavAndScroll("cartoons")} className="cursor-pointer">Cartoons</li>
                    <Link to="/register"><li className="cursor-pointer">Profile</li></Link>
                </ul>
            </nav>

            <nav className="block md:hidden">
                <button className="p-2" onClick={handleOpen}>
                    <div className="w-6 h-0.5 bg-white mb-1.5"></div>
                    <div className="w-6 h-0.5 bg-white mb-1.5"></div>
                    <div className="w-6 h-0.5 bg-white"></div>
                </button>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 top-full right-0 w-48 bg-gradient-to-r from-black to-[#22000c] text-white rounded-md shadow-lg overflow-hidden"
                    >
                        <ul className="flex flex-col interFont">
                            <Link to="/"><li onClick={() => setIsOpen(false)} className="p-3 hover:bg-gray-800 cursor-pointer">Home</li></Link>
                            <li onClick={() => handleNavAndScroll("movies")} className="p-3 hover:bg-gray-800 cursor-pointer">Movies</li>
                            <li onClick={() => handleNavAndScroll("cartoons")} className="p-3 hover:bg-gray-800 cursor-pointer">Cartoons</li>
                            <Link to="/profile"><li onClick={() => setIsOpen(false)} className="p-3 hover:bg-gray-800 cursor-pointer">Profile</li></Link>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export { Header };