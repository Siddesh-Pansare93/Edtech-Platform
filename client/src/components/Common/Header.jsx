import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { Search, Menu, X, User, Settings, ChevronDown, Sparkles } from "lucide-react";
import Logo from "./Logo";
import { ModeToggle } from "./ThemeSwitcher";
import LogoutBtn from "./LogoutBtn";

const Header = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { scrollY } = useScroll();

    const isLoggedIn = useSelector((state) => state.auth.status);
    const userData = useSelector(state => state.auth.userData);

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

    // Close mobile menu when screen size changes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) { // lg breakpoint
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            {/* Main Header */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ 
                    y: isVisible ? 0 : -100, 
                    opacity: isVisible ? 1 : 0 
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10  bg-gradient-to-l from-blue-500/5 via-purple-500/2 to-pink-500/2 shadow-2xl overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
                    
                    <div className="relative z-10 px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Logo className="w-7 h-7 sm:w-9 sm:h-9" />
                                </motion.div>
                            </Link>

                            {/* Desktop Navigation - Hidden on mobile/tablet */}
                            <nav className="hidden lg:flex items-center space-x-1">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className={({ isActive }) =>
                                            `relative px-3 py-2 rounded-lg transition-all duration-300 group text-sm ${
                                                isActive 
                                                    ? "text-blue-300" 
                                                    : "text-white/80 hover:text-white"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <span className="relative z-10">{item.name}</span>
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activeTab"
                                                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30"
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                )}
                                                <motion.div
                                                    className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    whileHover={{ scale: 1.05 }}
                                                />
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </nav>

                            {/* Search Bar - Hidden on mobile */}
                            <motion.div 
                                className="hidden lg:block relative"
                                animate={{ width: searchFocused ? 280 : 240 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                                    <input
                                        type="text"
                                        placeholder="Search courses..."
                                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 text-sm"
                                        onFocus={() => setSearchFocused(true)}
                                        onBlur={() => setSearchFocused(false)}
                                    />
                                </div>
                            </motion.div>

                            {/* Right Side Actions */}
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                {/* User Account or Login/Signup */}
                                {isLoggedIn ? (
                                    <div className="relative" ref={dropdownRef}>
                                        <motion.button
                                            className="flex items-center space-x-1 sm:space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-2 sm:px-3 py-2 rounded-lg transition-all duration-300 group"
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                                <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                            </div>
                                            <span className="hidden sm:block text-sm font-medium max-w-[80px] truncate">
                                                {userData?.name || 'Account'}
                                            </span>
                                            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                        </motion.button>
                                        
                                        <AnimatePresence>
                                            {dropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute right-0 mt-2 w-56 sm:w-64 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                                                >
                                                    <div className="p-4 border-b border-white/10">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                                                <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <div className="text-white font-medium text-sm truncate">{userData?.name}</div>
                                                                <div className="text-white/60 text-xs truncate">{userData?.email}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="p-2">
                                                        <Link
                                                            to="/profile"
                                                            className="flex items-center space-x-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                                                            onClick={() => setDropdownOpen(false)}
                                                        >
                                                            <User className="w-4 h-4" />
                                                            <span className="text-sm">Profile</span>
                                                        </Link>
                                                        
                                                        <Link
                                                            to={userData?.role === "student" ? "/student/dashboard" : "/instructor/dashboard"}
                                                            className="flex items-center space-x-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                                                            onClick={() => setDropdownOpen(false)}
                                                        >
                                                            <Settings className="w-4 h-4" />
                                                            <span className="text-sm">Dashboard</span>
                                                        </Link>
                                                        
                                                        <div className="border-t border-white/10 my-2" />
                                                        
                                                        <LogoutBtn className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200 text-sm" />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <div className="hidden sm:flex items-center space-x-2">
                                        <Link to="/login">
                                            <motion.button 
                                                className="px-3 py-2 text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-300 hover:bg-white/5 text-sm"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Login
                                            </motion.button>
                                        </Link>
                                        <Link to="/signup">
                                            <motion.button 
                                                className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 shadow-lg text-sm"
                                                whileHover={{ scale: 1.02, y: -1 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Sparkles className="w-3 h-3" />
                                                <span>Sign Up</span>
                                            </motion.button>
                                        </Link>
                                    </div>
                                )}

                                {/* Theme Toggle - Hidden on mobile */}
                                <div className="hidden sm:block">
                                    <ModeToggle />
                                </div>

                                {/* Mobile menu button - Shows on tablet and mobile */}
                                <motion.button
                                    className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {mobileMenuOpen ? (
                                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                                    ) : (
                                        <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        
                        {/* Mobile Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="fixed right-0 top-0 z-50 h-full w-72 sm:w-80 md:w-96 bg-black/90 backdrop-blur-xl border-l border-white/10 lg:hidden"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
                                    <h2 className="text-lg sm:text-xl font-bold text-white">Menu</h2>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                                    {/* Navigation */}
                                    <nav className="space-y-2 mb-6">
                                        {navItems.map((item) => (
                                            <NavLink
                                                key={item.name}
                                                to={item.href}
                                                className={({ isActive }) =>
                                                    `block px-4 py-3 rounded-lg transition-all duration-200 text-base ${
                                                        isActive 
                                                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
                                                            : "text-white/80 hover:text-white hover:bg-white/10"
                                                    }`
                                                }
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </nav>

                                    {/* Search Bar */}
                                    <div className="mb-6">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                                            <input
                                                type="text"
                                                placeholder="Search courses..."
                                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Theme Toggle for Mobile */}
                                    <div className="mb-6 lg:hidden">
                                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                                            <span className="text-white/80 text-sm">Theme</span>
                                            <ModeToggle />
                                        </div>
                                    </div>

                                    {/* Auth Actions for Mobile */}
                                    {!isLoggedIn && (
                                        <div className="space-y-3">
                                            <Link to="/login" className="block">
                                                <button 
                                                    className="w-full px-4 py-3 text-white/80 border border-white/20 rounded-lg hover:bg-white/5 transition-all duration-200 text-sm"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    Login
                                                </button>
                                            </Link>
                                            <Link to="/signup" className="block">
                                                <button 
                                                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    Sign Up
                                                </button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
