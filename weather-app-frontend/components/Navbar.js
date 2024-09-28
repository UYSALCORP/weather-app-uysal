'use client'

import Link from 'next/link'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import DarkModeToggle from './DarkModeToggle'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    return (
        <nav className="bg-darkBlue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <span className="text-white text-xl font-bold">Hava Durumu</span>
                </Link>
                <DarkModeToggle />
                    <button
                        className="text-white ml-4 md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            )}
                        </svg>
                    </button>
                    <div className={`md:flex items-center ${isOpen ? 'block' : 'hidden'}`}>
                       
                    {user ? (
                        <>
                            <Link href="/dashboard">
                                <span className="text-white mr-4 hover:text-darkBlue-200">Dashboard</span>
                            </Link>
                            <button onClick={logout} className="text-white hover:text-darkBlue-200">
                                Çıkış Yap
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <span className="text-white mr-4 hover:text-darkBlue-200">Sign in</span>
                            </Link>
                            <Link href="/register">
                                <span className="text-white hover:text-darkBlue-200">Kayıt Ol</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
