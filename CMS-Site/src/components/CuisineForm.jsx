import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from './Button'
import { useNavigate } from 'react-router'

const API_URL = 'https://server.desiproject.online'

export default function CuisineForm({ title, handleSubmit, cuisineData }) {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        imgUrl: '',
        categoryId: ''
    })

    useEffect(() => {
        if (cuisineData) {
            setForm({
                name: cuisineData.name,
                description: cuisineData.description,
                price: cuisineData.price,
                imgUrl: cuisineData.imgUrl,
                categoryId: cuisineData.categoryId
            })
        }
    }, [cuisineData])

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

    function handleForm(e, fieldName) {
        if (fieldName === 'price' || fieldName === 'categoryId') {
            setForm((oldValue) => ({
                ...oldValue,
                [fieldName]: +e.target.value
            }))
        } else {
            setForm((oldValue) => ({
                ...oldValue,
                [fieldName]: e.target.value
            }))
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex justify-between items-center p-6 pb-0 mb-5">
                    <h3 className="font-serif text-xl">{title}</h3>
                </div>
                <div className="px-6">
                    <form onSubmit={(e) => handleSubmit(e, form)}>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Name</label>
                            <input type="text" placeholder="e.g. Sushi Roll"
                                value={form.name}
                                onChange={(e) => handleForm(e, 'name')}
                                className="w-full px-4 py-3 border border-orange-200 rounded-lg outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Description</label>
                            <textarea rows={3} placeholder="Describe the cuisine..."
                                value={form.description}
                                onChange={(e) => handleForm(e, 'description')}
                                className="w-full px-4 py-3 border border-orange-200 rounded-lg outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Price (IDR)</label>
                                <input type="number" placeholder="e.g. 85000" min={1}
                                    value={form.price}
                                    onChange={(e) => handleForm(e, 'price')}
                                    className="w-full px-4 py-3 border border-orange-200 rounded-lg outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Category</label>
                                <select value={form.categoryId}
                                    onChange={(e) => handleForm(e, 'categoryId')}
                                    className="w-full px-4 py-3 border border-orange-200 rounded-lg outline-none focus:border-orange-400">
                                    <option value="">Select category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Image URL</label>
                            <input type="text" placeholder="https://..."
                                value={form.imgUrl}
                                onChange={(e) => handleForm(e, 'imgUrl')}
                                className="w-full px-4 py-3 border border-orange-200 rounded-lg outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
                        </div>
                        <div className="flex justify-end gap-3 py-4">
                            <Button variant="secondary" onClick={() => navigate('/')}>Cancel</Button>
                            <Button type="submit" variant="primary">{title}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}