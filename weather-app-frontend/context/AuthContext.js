'use client'

import { createContext, useState, useEffect } from 'react'
import api from '../utils/api'
import { useRouter } from 'next/navigation'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    console.log(user,"user");
    console.log(loading,"loading");
    
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                try {
                    const res = await api.get('/auth/me') // Backend'de /auth/me rotasını oluşturmanız gerekebilir
                    setUser(res.data)
                } catch (error) {
                    console.error(error)
                    setUser(null)
                }
            }
            setLoading(false)
        }
        loadUser()
    }, [])

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password })
            localStorage.setItem('token', res.data.token)
            setUser({
                _id: res.data._id,
                name: res.data.name,
                email: res.data.email,
            })
            router.push('/dashboard')
        } catch (error) {
            throw error.response?.data?.message || 'Giriş yapılamadı'
        }
    }

    const register = async (name, email, password) => {
        try {
            const res = await api.post('/auth/register', { name, email, password })
            localStorage.setItem('token', res.data.token)
            setUser({
                _id: res.data._id,
                name: res.data.name,
                email: res.data.email,
            })
            router.push('/dashboard')
        } catch (error) {
            throw error.response?.data?.message || 'Kayıt yapılamadı'
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
