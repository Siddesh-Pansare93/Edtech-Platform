import React, { useState } from 'react';
import Logo from './Logo';
import { NavLink } from 'react-router-dom';
import { ModeToggle } from './ThemeSwitcher';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const items = [
        {
            title: "Home",
            path: "/",
        },
        {
            title: "Catalog",
            path: "/catalog",
        },
        {
            title: "About Us",
            path: "/about",
        },
        {
            title: "Contact Us",
            path: "/contact",
        },
    ];

    return (
        <header className={`w-full h-16 bg-transparent  sticky top-0 left-0 border-b-[1px] z-10 border-b-richblack-700 transition-all flex ${isMenuOpen ? 'flex-wrap' : 'flex-nowrap'} justify-between items-center px-4 sm:px-8`}>
            {/* Logo */}
            <div className={`w-full md:w-3/12 max-w-maxContent text-center ${isMenuOpen ? "hidden" : "block"} md:block`}>
              <Logo />
            </div>

            {/* Hamburger Menu (visible on small screens) */}
            <div className={`md:hidden flex items-center`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
                        <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                        <path d="M4 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </div>

            {/* Navigation Links */}
            <div className={`w-full md:w-6/12 justify-center gap-4 md:gap-20 flex-wrap ${isMenuOpen ? "block" : "hidden"} md:flex`}>
                {items.map((item, index) => (
                    <div key={index} className="w-full md:w-auto text-center">
                        <NavLink to={item.path} className="block py-2 md:py-0 font-semibold">{item.title}</NavLink>
                    </div>
                ))}
            </div>

            {/* Login / Sign Up */}
            <div className={`w-full md:w-3/12 flex gap-4 md:gap-10 justify-center flex-wrap ${isMenuOpen ? "block" : "hidden"} md:flex`}>
                <NavLink to="/login" className="block py-2 md:py-0 font-semibold">LOGIN</NavLink>
                <NavLink to="/signup" className="block py-2 md:py-0 font-semibold">SIGN UP</NavLink>
            </div>
            
            <ModeToggle />
        </header>
    );
}

export default Header;
