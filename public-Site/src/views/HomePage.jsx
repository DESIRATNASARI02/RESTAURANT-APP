import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

const API_URL = 'https://server.desiproject.online'

export default function HomePage() {
    const [cuisines, setCuisines] = useState([])
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [sort, setSort] = useState('DESC')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    async function fetchCuisines() {
        try {
            const { data } = await axios.get(`${API_URL}/pub/cuisines`, {
                params: { page: currentPage, search, filter, sort }
            })
            setCuisines(data.data)
            setTotalPages(data.totalPages)
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchCategories() {
        try {
            const { data } = await axios.get(`${API_URL}/pub/categories`)
            setCategories(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCuisines()
    }, [currentPage, search, filter, sort])

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <div className="min-h-screen bg-orange-50">
            <Navbar />
            <section className="max-w-5xl mx-auto px-6 py-20 relative overflow-hidden">
                <div className="relative z-10 max-w-lg">
                    <span className="text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4 block">Fresh & Delicious</span>
                    <h1 className="font-serif text-5xl font-bold leading-tight mb-4">
                        Discover Our<br />
                        <em className="text-orange-400 not-italic">Finest Cuisines</em>
                    </h1>
                    <p className="text-gray-500 text-lg">Handcrafted dishes made with the finest ingredients, served with love.</p>
                </div>
                <div className="absolute right-0 top-5 -z-0">
                    <div className="w-80 h-80 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 absolute -right-14 -top-14 opacity-60" />
                    <div className="w-28 h-28 rounded-full bg-orange-400 absolute right-40 top-36 opacity-20" />
                </div>
            </section>
            <section className="max-w-5xl mx-auto px-6 pb-8 border-b border-orange-200">
                <div className="flex gap-3 flex-wrap">
                    <div className="flex-1">
                        <input type="text" placeholder="Search cuisine..." value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
                            className="w-full px-4 py-3 border border-orange-200 rounded-lg outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 bg-white" />
                    </div>
                    <div className="flex gap-3">
                        <select value={filter} onChange={(e) => { setFilter(e.target.value); setCurrentPage(1) }}
                            className="px-4 py-3 border border-orange-200 rounded-lg outline-none bg-white focus:border-orange-400">
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <select value={sort} onChange={(e) => { setSort(e.target.value); setCurrentPage(1) }}
                            className="px-4 py-3 border border-orange-200 rounded-lg outline-none bg-white focus:border-orange-400">
                            <option value="DESC">Newest First</option>
                            <option value="ASC">Oldest First</option>
                        </select>
                    </div>
                </div>
            </section>
            <section className="max-w-5xl mx-auto px-6 py-10 pb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cuisines.map(cuisine => (
                        <Card key={cuisine.id} cuisine={cuisine} />
                    ))}
                </div>
                <div className="flex justify-center gap-2 mt-10">
                    <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}
                        className="px-4 py-2 border border-orange-200 rounded-lg text-sm hover:border-orange-400 hover:text-orange-400 transition disabled:opacity-50">‹</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button key={p} onClick={() => setCurrentPage(p)}
                            className={`px-4 py-2 rounded-lg text-sm transition ${currentPage === p ? 'bg-orange-400 text-white' : 'border border-orange-200 hover:border-orange-400 hover:text-orange-400'}`}>
                            {p}
                        </button>
                    ))}
                    <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-orange-200 rounded-lg text-sm hover:border-orange-400 hover:text-orange-400 transition disabled:opacity-50">›</button>
                </div>
            </section>
            <footer className="border-t border-orange-200 py-8 text-center">
                <p className="font-serif text-xl font-bold mb-1">Tastoria</p>
                <p className="text-gray-400 text-sm">© 2026 Tastoria. All rights reserved.</p>
            </footer>
        </div>
    )
}