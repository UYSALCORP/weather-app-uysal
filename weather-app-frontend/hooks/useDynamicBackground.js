'use client'

import { useEffect } from 'react'

const useDynamicBackground = () => {
    useEffect(() => {
        const hour = new Date().getHours()
        const isNight = hour >= 19 || hour <= 6 // 19:00-06:00 arası gece
        if (isNight) {
            document.body.classList.add('night')
        } else {
            document.body.classList.remove('night')
        }
    }, [])
}

export default useDynamicBackground
