import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className="logo">
            <Link to={"/home"}>
            <h1 className="text-xl font-bold text-black dark:text-teal-400">SKILL VULTURES</h1>
            </Link>
        </div>
    );
};

export default Logo;