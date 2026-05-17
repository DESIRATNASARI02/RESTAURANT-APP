import { useState } from 'react'
import axios from 'axios'
import Toastify from 'toastify-js'
import Button from '../components/Button'

const API_URL = 'https://server.desiproject.online'

export default function AddStaff() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await axios.post(`${API_URL}/add-user`, form, {
                headers: { Authorization: `Bearer ${localStorage.access_token}` }
            })
            Toastify({
                text: `Staff ${form.email} added successfully`,
                duration: 3000,
                close: false,
                gravity: 'bottom',
                position: 'right',
                style: { background: '#34D399', color: '#000000' }
            }).showToast()
            setForm({ username: '', email: '', password: '' })
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
        <>
            <div className="mb-7">
                <h1 className="font-serif text-3xl font-bold mb-1">Add Staff</h1>
                <p className="text-gray-500 text-sm">Register a new staff member</p>
            </div>
            <div className="bg-white rounded-xl border border-orange-200 p-8 max-w-lg shadow-sm">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Username</label>
                        <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="e.g. john_doe"
                            className="w-full px-4 py-3 border border-orange-200 rounded-lg outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="staff@tastoria.com"
                            className="w-full px-4 py-3 border border-orange-200 rounded-lg outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-1">Password</label>
                        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min. 5 characters"
                            className="w-full px-4 py-3 border border-orange-200 rounded-lg outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
                    </div>
                    <Button type="submit" variant="primary">Add Staff</Button>
                </form>
            </div>
        </>
    )
}