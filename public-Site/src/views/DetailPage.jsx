import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import axios from 'axios'
import Navbar from '../components/Navbar'

const API_URL = 'https://server.desiproject.online'

export default function DetailPage() {
    const { id } = useParams()
    const [cuisine, setCuisine] = useState(null)

    async function fetchDetail() {
        try {
            const { data } = await axios.get(`${API_URL}/pub/cuisines/${id}`)
            setCuisine(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDetail()
    }, [])

    return (
        <div className="min-h-screen bg-orange-50">
            <Navbar />
            <section className="max-w-5xl mx-auto px-6 py-10 pb-20">
                <Link to="/" className="inline-flex items-center gap-2 text-orange-400 font-medium mb-6 hover:underline">
                    ← Back to Menu
                </Link>
                {cuisine ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl overflow-hidden shadow-sm border border-orange-200">
                        {cuisine.imgUrl ? (
                            <img src={cuisine.imgUrl} alt={cuisine.name} className="w-full h-80 object-cover" />
                        ) : (
                            <div className="w-full h-80 bg-orange-100 flex items-center justify-center text-6xl">🍽️</div>
                        )}
                        <div className="p-12">
                            <div className="text-orange-400 text-xs font-semibold uppercase mb-2">{cuisine.Category?.name || '-'}</div>
                            <h1 className="font-serif text-4xl font-bold mb-4">{cuisine.name}</h1>
                            <div className="text-2xl font-bold mb-6">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(cuisine.price)}
                            </div>
                            <hr className="border-orange-100 mb-6" />
                            <p className="text-gray-500 mb-6">{cuisine.description}</p>
                            <div className="text-sm text-gray-400">
                                Added by <span className="font-semibold text-gray-600">{cuisine.User?.username || 'Chef'}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-400">Loading...</div>
                )}
            </section>
            <footer className="border-t border-orange-200 py-8 text-center">
                <p className="font-serif text-xl font-bold mb-1">Tastoria</p>
                <p className="text-gray-400 text-sm">© 2026 Tastoria. All rights reserved.</p>
            </footer>
        </div>
    )
}