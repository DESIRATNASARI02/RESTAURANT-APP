import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Toastify from 'toastify-js'
import CuisineForm from '../components/CuisineForm'

const API_URL = 'https://server.desiproject.online'

export default function EditCuisine() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [cuisine, setCuisine] = useState(null)

    async function fetchCuisine() {
        try {
            const { data } = await axios.get(`${API_URL}/cuisines/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.access_token}` }
            })
            setCuisine(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSubmit(e, form) {
        e.preventDefault()
        try {
            await axios.put(`${API_URL}/cuisines/${id}`, form, {
                headers: { Authorization: `Bearer ${localStorage.access_token}` }
            })
            navigate('/')
            Toastify({
                text: `${form.name} updated successfully`,
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
        fetchCuisine()
    }, [])

    return <CuisineForm title="Edit Cuisine" handleSubmit={handleSubmit} cuisineData={cuisine} />
}