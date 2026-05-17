import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router'
import axios from 'axios'
import Toastify from 'toastify-js'
import Button from '../components/Button'

const API_URL = 'https://server.desiproject.online'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    if (localStorage.access_token) {
        return <Navigate to="/" />
    }

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${API_URL}/login`, { email, password })
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('user_email', data.email)
            localStorage.setItem('user_role', data.role)
            navigate('/')
            Toastify({
                text: 'Login success',
                duration: 3000,
                close: false,
                gravity: 'bottom',
                position: 'right',
                style: { background: '#34D399', color: '#000000' }
            }).showToast()
        } catch (error) {
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                close: false,
                gravity: 'bottom',
                position: 'right',
                style: { background: '#F87171', color: '#000000' }
            }).showToast()
        }
    }

    return (
        <div className="flex min-h-screen">
            <div className="w-96 bg-gradient-to-br from-orange-400 to-amber-400 flex flex-col justify-between p-12 relative overflow-hidden">
                <div className="flex flex-col gap-1">
                    <span className="font-serif text-3xl font-bold text-white">Tastoria</span>
                    <span className="text-xs font-medium text-white/75 tracking-widest uppercase">CMS Dashboard</span>
                </div>
                <div className="relative h-48">
                    <div className="w-64 h-64 rounded-full bg-white/15 absolute -top-10 -left-14" />
                    <div className="w-24 h-24 rounded-full bg-white/20 absolute bottom-0 right-10" />
                    <div className="text-8xl absolute top-5 left-1/2 -translate-x-1/2 z-10">🍽️</div>
                </div>
                <p className="text-white/90 italic text-sm leading-relaxed">
                    "Managing great food starts with a great system."
                </p>
            </div>
            <div className="flex-1 flex items-center justify-center bg-orange-50 p-12">
                <div className="w-full max-w-sm">
                    <h2 className="font-serif text-3xl font-bold mb-2">Welcome back</h2>
                    <p className="text-gray-500 mb-8">Sign in to your CMS account</p>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Email</label>
                            <input type="email" placeholder="admin@tastoria.com" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-orange-200 rounded-lg outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-1">Password</label>
                            <input type="password" placeholder="••••••••" value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-orange-200 rounded-lg outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
                        </div>
                        <Button type="submit" variant="primary" className="w-full">Sign In</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}