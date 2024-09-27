'use client'

import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import api from '../../utils/api'

const Dashboard = () => {
    const { user, loading } = useContext(AuthContext)
    const [weather, setWeather] = useState(null)
    const [city, setCity] = useState('')
    const [error, setError] = useState('')
    const [forecast, setForecast] = useState(null)
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [loading, user])

    const fetchCurrentWeather = async () => {
        if (!city) {
            setError('Lütfen bir şehir adı girin.')
            return
        }
        setError('')
        try {
            const res = await api.get(`/weather/current`, { params: { city } })
            setWeather(res.data)
        } catch (err) {
            setError(err.response?.data?.message || 'Hava durumu bilgisi alınamadı.')
            setWeather(null)
        }
    }

    const fetchWeatherForecast = async () => {
        if (!city) {
            setError('Lütfen bir şehir adı girin.')
            return
        }
        setError('')
        try {
            const res = await api.get(`/weather/forecast`, { params: { city } })
            setForecast(res.data)
        } catch (err) {
            setError(err.response?.data?.message || 'Hava durumu tahmini alınamadı.')
            setForecast(null)
        }
    }

    if (loading) {
        return <p className="text-center text-gray-700">Yükleniyor...</p>
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
            <div className="bg-darkBlue-800 bg-opacity-75 p-6 rounded shadow-md w-full max-w-md text-center text-white">
                <h1 className="text-2xl font-bold mb-4">Hoş Geldiniz, {user?.name}!</h1>
                {error && <p className="text-red-400 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-300">Şehir Adı</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 border rounded bg-darkBlue-700 text-white focus:outline-none focus:ring-2 focus:ring-darkBlue-500"
                        placeholder="Örn: İstanbul"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={fetchCurrentWeather}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Anlık Hava Durumu
                    </button>
                    <button
                        onClick={fetchWeatherForecast}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                        5 Günlük Tahmin
                    </button>
                </div>

                {weather && (
                    <div className="mt-6 bg-darkBlue-700 p-4 rounded">
                        <h2 className="text-xl font-semibold mb-2">{weather.name}, {weather.sys.country}</h2>
                        <p>Sıcaklık: {weather.main.temp}°C</p>
                        <p>Hava Durumu: {weather.weather[0].description}</p>
                        <p>Nem: {weather.main.humidity}%</p>
                        <p>Rüzgar Hızı: {weather.wind.speed} m/s</p>
                    </div>
                )}

                {forecast && (
                    <div className="mt-6 bg-darkBlue-700 p-4 rounded">
                        <h2 className="text-xl font-semibold mb-2">5 Günlük Tahmin</h2>
                        <ul>
                            {forecast.list.slice(0, 5).map((item) => (
                                <li key={item.dt} className="mb-2">
                                    <p>{new Date(item.dt * 1000).toLocaleDateString('tr-TR')}</p>
                                    <p>Sıcaklık: {item.main.temp}°C</p>
                                    <p>Hava Durumu: {item.weather[0].description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard
