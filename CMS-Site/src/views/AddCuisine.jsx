import { useNavigate } from 'react-router'
import axios from 'axios'
import Toastify from 'toastify-js'
import CuisineForm from '../components/CuisineForm'

const API_URL = 'https://server.desiproject.online'

export default function AddCuisine() {
    const navigate = useNavigate()

    async function handleSubmit(e, form) {
        e.preventDefault()
        try {
            await axios.post(`${API_URL}/cuisines`, form, {
                headers: { Authorization: `Bearer ${localStorage.access_token}` }
            })
            navigate('/')
            Toastify({
                text: `${form.name} added successfully`,
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

    return <CuisineForm title="Add Cuisine" handleSubmit={handleSubmit} />
}