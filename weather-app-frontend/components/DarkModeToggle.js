'use client'

import { useEffect, useState } from 'react'

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme === 'dark') {
            setIsDark(true)
            document.body.classList.add('night')
        } else {
            setIsDark(false)
            document.body.classList.remove('night')
        }
    }, [])

    const toggleDarkMode = () => {
        if (isDark) {
            document.body.classList.remove('night')
            localStorage.setItem('theme', 'light')
        } else {
            document.body.classList.add('night')
            localStorage.setItem('theme', 'dark')
        }
        setIsDark(!isDark)
    }

    return (
        <button
            onClick={toggleDarkMode}
            className="text-white bg-transparent border border-white px-3 py-1 rounded hover:bg-white hover:text-darkBlue-800 transition-colors duration-300"
        >
            {isDark ? 'Gündüz Modu' : 'Gece Modu'}
        </button>
    )
}

export default DarkModeToggle
