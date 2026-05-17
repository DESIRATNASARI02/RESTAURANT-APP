import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'https://server.desiproject.online'

export default function Category() {
    const [categories, setCategories] = useState([])

    async function fetchCategories() {
        try {
            const { data } = await axios.get(`${API_URL}/categories`, {
                headers: { Authorization: `Bearer ${localStorage.access_token}` }
            })
            setCategories(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <>
            <div className="mb-7">
                <h1 className="font-serif text-3xl font-bold mb-1">Categories</h1>
                <p className="text-gray-500 text-sm">Manage cuisine categories</p>
            </div>
            <div className="bg-white rounded-xl border border-orange-200 overflow-hidden shadow-sm">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-orange-50">
                        <tr>
                            {['No', 'Name'].map(h => (
                                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-orange-200">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id} className="border-b border-gray-100 hover:bg-orange-50">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">{category.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}