import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import LoginModal from "../core/Login";
import SignUpModal from "../core/SignUp";
import { ModeToggle } from './ThemeSwitcher';
// import { useTheme } from './ThemeSwitcher';
import { useSelector } from 'react-redux';
import LogoutBtn from "./LogoutBtn";


const Header = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const { scrollY } = useScroll();

    const isLoggedIn = useSelector(state => state.auth.status);


    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    });

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
                initial={{ y: 0 }}
                animate={{ y: isVisible ? 0 : "-100%" }}
                transition={{ duration: 0.3 }}
            >
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center">
                        {/* <img src="/logo.svg" alt="Skill Vulture Logo" width={40} height={40} /> */}
                        <span className="ml-2 text-xl font-bold text-black  ">Skill Vulture</span>
                    </Link>

                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
                                <NavLink to={item.href} className= {({isActive}) => ` hover:text-gray-900 transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                                    {item.name}
                                </NavLink>
                            </motion.div>
                        ))}
                    </nav>

                    <div className="flex space-x-4">
                        {isLoggedIn ? <LogoutBtn />
                            :
                            <div className="flex space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                                    onClick={() => setIsLoginOpen(true)}
                                >
                                    Login
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    onClick={() => setIsSignUpOpen(true)}
                                >
                                    Sign Up
                                </motion.button>
                            </div>}

                        <ModeToggle />
                    </div>

                </div>




            </motion.header>
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
        </>
    );
};

export default Header;
