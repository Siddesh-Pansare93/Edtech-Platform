import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useSelector } from "react-redux";
import Logo from "./Logo";
import {ModeToggle} from "./ThemeSwitcher";

const Header = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { scrollY } = useScroll();

    const isLoggedIn = useSelector((state) => state.auth.status);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setIsVisible(false);
        } else if (latest < previous) {
            setIsVisible(true);
        }
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const navItems = [
        { name: "Home", href: "/home" },
        { name: "Courses", href: "/courses" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <motion.header
            className="sticky top-0 z-50 bg-gradient-to-r from-gray-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 shadow-lg text-gray-800 dark:text-gray-200"
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : "-100%" }}
            transition={{ duration: 0.3 }}
        >
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <Logo className="w-10 h-10" />
                    {/* <span className="text-xl font-bold">EduPlatform</span> */}
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-6">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                                `font-medium transition-transform transform hover:scale-105 ${
                                    isActive ? "underline underline-offset-4 text-indigo-600 dark:text-indigo-400" : "text-gray-700 dark:text-gray-300"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Search Bar */}
                <div className="hidden md:block relative">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="rounded-full px-4 py-2 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 16l4-4m0 0l4-4m-4 4H3"
                            />
                        </svg>
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <span>My Account</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-300 dark:bg-gray-700 shadow-lg rounded-md text-gray-900 dark:text-gray-200">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to="/logout"
                                        className="block px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-x-2">
                            <Link to="/login">
                                <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}

                    <ModeToggle />
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
