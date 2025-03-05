'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
  } from '@clerk/nextjs'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    isSignedIn ?<nav className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <Image src="https://flowbite.com/docs/images/logo.svg" width={32} height={32} alt="Flowbite Logo" /> */}
          <span className="self-center text-2xl font-bold text-white">Leads</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Navbar Links */}
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-200 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            {/* Home Link */}
            {/* <li>
              <Link
                href="/"
                className="block py-2 px-4 text-white bg-blue-700 rounded-md hover:bg-blue-600 md:bg-transparent md:hover:text-blue-300"
              >
                Home
              </Link>
            </li> */}
            {/* <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut> */}
            <SignedIn>
              <UserButton />
            </SignedIn>



            {/* Other Links */}
            {/* <li>
              <Link href="/services" className="block py-2 px-4 text-white hover:bg-blue-600 rounded-md md:hover:text-blue-300">
                Services
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="block py-2 px-4 text-white hover:bg-blue-600 rounded-md md:hover:text-blue-300">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-2 px-4 text-white hover:bg-blue-600 rounded-md md:hover:text-blue-300">
                Contact
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>: <></>
  );
};

export default Navbar;
