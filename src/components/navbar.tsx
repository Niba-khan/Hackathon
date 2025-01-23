'use client'
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { IoMdHeartEmpty } from 'react-icons/io';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'; // Import icons for menu toggle
import ShoppingCart from './Card';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <div className="flex justify-between items-center mx-auto max-w-screen-2xl p-4">
            <div className="flex items-center">
        <Image
          src={"/image/logo.png"}
          alt="logo"
          width={160}
          height={40}
          className="w-auto h-auto ml-4"
        />
      </div>
              

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-2xl"
                    aria-label="Toggle Mobile Menu"
                >
                    {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
                </button>

                {/* Navigation Links for Desktop */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-16 md:ml-[400px] font-medium">
                        <li>
                            <Link href="/" aria-label="Navigate to Home" className="hover:underline">Home</Link>
                        </li>
                        <li>
                            <Link href="/" aria-label="Navigate to Shop" className="hover:underline">Shop</Link>
                        </li>
                       
                        <li>
                            <Link href="/" aria-label="Navigate to Blog" className="hover:underline">Blog</Link>
                        </li>
                        <li>
                            <Link href="/contact" aria-label="Navigate to Contact" className="hover:underline">Contact</Link>
                        </li>
                    </ul>
                </nav>

                {/* Icons */}
                <div className="flex gap-3 md:space-x-12 md:mr-32 items-center">
                    <Link href='/myaccount'>
                        <FaRegUser aria-label="User Profile" size={20} />
                    </Link>
                    <FiSearch aria-label="Search" size={22} />
                    <IoMdHeartEmpty aria-label="Favorites" size={25} />
                    <div className="flex items-center z-10">
                        <ShoppingCart />
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Visible when isMenuOpen is true) */}
            <nav
                className={`md:hidden fixed top-0 left-0 w-full h-full bg-white z-20 transition-transform duration-300 ${isMenuOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-lg font-bold">Your Logo</h1>
                    <button
                        onClick={toggleMenu}
                        className="text-2xl"
                        aria-label="Close Mobile Menu"
                    >
                        <HiOutlineX />
                    </button>
                </div>
                <ul className="flex flex-col items-center space-y-6 py-8">
                    <li>
                        <Link href="/" aria-label="Navigate to Home" className="hover:underline">Home</Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="Navigate to Shop" className="hover:underline">Shop</Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="Navigate to Blog" className="hover:underline">Blog</Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="Navigate to Contact" className="hover:underline">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;