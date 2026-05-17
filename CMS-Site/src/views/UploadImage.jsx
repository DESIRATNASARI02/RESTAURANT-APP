import { useState } from 'react'
import axios from 'axios'
import Button from '../components/Button'
import Toastify from 'toastify-js'

const API_URL = 'https://server.desiproject.online'

export default function UploadImage({ cuisine, onClose, onSuccess }) {
    const [file, setFile] = useState(null)

    async function handleUpload(e) {
        e.preventDefault()
        if (!file) {
            Toastify({
                text: 'Please select a file',
                duration: 3000,
                close: true,
                gravity: 'bottom',
                position: 'right',
                style: { background: '#F87171', color: '#000000' }
            }).showToast()
            return
        }

        try {
            const formData = new FormData()
            formData.append('file', file)

            await axios.patch(`${API_URL}/cuisines/${cuisine.id}/img-url`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            Toastify({
                text: 'Image updated successfully',
                duration: 3000,
                close: true,
                gravity: 'bottom',
                position: 'right',
                style: { background: '#34D399', color: '#000000' }
            }).showToast()
            onSuccess()
            onClose()
        } catch (error) {
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                close: true,
                gravity: 'bottom',
                position: 'right',
                style: { background: '#F87171', color: '#000000' }
            }).showToast()
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl">
                <div className="flex justify-between items-center p-6 pb-0 mb-5">
                    <h3 className="font-serif text-xl">Upload Image</h3>
                    <button onClick={onClose} className="text-gray-400 hover:bg-orange-50 hover:text-orange-400 px-2 py-1 rounded-md transition">✕</button>
                </div>
                <div className="px-6 pb-6">
                
                    <form onSubmit={handleUpload}>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Select Image File</label>
                            <input type="file" accept="image/*"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full px-4 py-3 border border-orange-200 rounded-lg outline-none" />
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="secondary" onClick={onClose}>Cancel</Button>
                            <Button type="submit" variant="primary">Upload</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}