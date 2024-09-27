'use client'

import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Link from 'next/link'

const Login = () => {
    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await login(email, password)
        } catch (err) {
            setError(err)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-transparent">
            <form onSubmit={handleSubmit} className="bg-darkBlue-800 bg-opacity-75 p-6 rounded shadow-md w-full max-w-sm text-white">
                <h2 className="text-2xl font-bold mb-4 text-center">Giriş Yap</h2>
                {error && <p className="text-red-400 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-300">E-posta</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded bg-darkBlue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300">Şifre</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded bg-darkBlue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded">
                    Giriş Yap
                </button>
                <p className="mt-4 text-center">
                    Henüz hesabınız yok mu?{' '}
                    <Link href="/register" className="text-blue-400 hover:text-blue-200">
                        Kayıt Ol
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login
