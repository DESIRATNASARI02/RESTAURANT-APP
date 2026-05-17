import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Toastify from 'toastify-js'
import Button from '../components/Button'
import UploadImage from './UploadImage'

const API_URL = 'https://server.desiproject.online'

export default function Dashboard() {
    const navigate = useNavigate()
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [cuisines, setCuisines] = useState([])
    const [selectedCuisineForUpload, setSelectedCuisineForUpload] = useState(null)

    async function fetchCuisines() {
        try {
            const { data } = await axios.get(`${API_URL}/cuisines`, {
                headers: { Authorization: `Bearer ${localStorage.access_token}` }
            })
            setCuisines(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDelete(id, name) {
        if (!confirm(`Delete "${name}"?`)) return
        try {
            await axios.delete(`${API_URL}/cuisines/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.access_token}` }
            })
            fetchCuisines()
            Toastify({
                text: `${name} deleted successfully`,
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

    useEffect(() => {
        fetchCuisines()
    }, [])

    return (
        <>
            <div className="flex justify-between items-start mb-7">
                <div>
                    <h1 className="font-serif text-3xl font-bold mb-1">Cuisines</h1>
                    <p className="text-gray-500 text-sm">Manage all your restaurant cuisines</p>
                </div>
                <Button variant="primary" onClick={() => navigate('/add-cuisine')}>
                    + Add Cuisine
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-orange-200 overflow-hidden shadow-sm">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-orange-50">
                        <tr>
                            {['No', 'Image', 'Name', 'Category Id', 'Price', 'Author', 'Actions'].map(h => (
                                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-orange-200">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {cuisines.map((cuisine, index) => (
                            <tr key={cuisine.id} className="border-b border-gray-100 hover:bg-orange-50">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">
                                    {cuisine.imgUrl ? (
                                        <img src={cuisine.imgUrl} alt={cuisine.name} className="w-12 h-12 object-cover rounded-lg" />
                                    ) : (
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">🍽️</div>
                                    )}
                                </td>
                                <td className="px-4 py-3 font-medium">{cuisine.name}</td>
                                <td className="px-4 py-3">
                                    <span className="bg-orange-50 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full">{cuisine.categoryId}</span>
                                </td>
                                <td className="px-4 py-3">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(cuisine.price)}
                                </td>
                                <td className="px-4 py-3">{cuisine.User?.username || '-'}</td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <Button variant="secondary" onClick={() => navigate(`/edit-cuisine/${cuisine.id}`)}>Edit</Button>
                                        <Button variant="secondary" onClick={() => {
                                            setSelectedCuisineForUpload(cuisine)
                                            setShowUploadModal(true)
                                        }}>Image</Button>
                                        <Button variant="danger" onClick={() => handleDelete(cuisine.id, cuisine.name)}>Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showUploadModal && (
                <UploadImage
                    cuisine={selectedCuisineForUpload}
                    onClose={() => {
                        setShowUploadModal(false)
                        setSelectedCuisineForUpload(null)
                    }}
                    onSuccess={fetchCuisines}
                />
            )}
        </>
    )
}