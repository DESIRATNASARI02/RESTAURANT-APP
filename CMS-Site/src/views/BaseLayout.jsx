import { Navigate, Outlet } from 'react-router'
import Toastify from 'toastify-js'
import Sidebar from '../components/Sidebar'

export default function BaseLayout() {
    if (!localStorage.access_token) {
        Toastify({
            text: 'Please login first',
            duration: 3000,
            close: false,
            gravity: 'bottom',
            position: 'right',
            style: { background: '#F87171', color: '#000000' }
        }).showToast()
        return <Navigate to="/login" />
    }

    return (
        <div className="flex min-h-screen bg-orange-50">
            <Sidebar />
            <main className="ml-60 flex-1 p-8">
                <Outlet />
            </main>
        </div>
    )
}