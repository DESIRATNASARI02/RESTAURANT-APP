import { useNavigate } from 'react-router'
import Button from './Button'

export default function Sidebar() {
    const navigate = useNavigate()

    return (
        <aside className="w-60 bg-white border-r border-orange-200 flex flex-col fixed top-0 left-0 h-screen z-50">
            <div className="px-5 py-6 border-b border-orange-200">
                <span className="font-serif text-xl font-bold">Tastoria</span>
                <span className="block text-xs text-gray-400 uppercase tracking-widest">CMS</span>
            </div>
            <nav className="flex-1 p-3 flex flex-col gap-1">
                <a onClick={() => navigate('/')} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-orange-50 hover:text-orange-400 cursor-pointer">
                    <span>🍜</span> Cuisines
                </a>
                <a onClick={() => navigate('/categories')} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-orange-50 hover:text-orange-400 cursor-pointer">
                    <span>🏷️</span> Categories
                </a>
                <a onClick={() => navigate('/add-staff')} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-orange-50 hover:text-orange-400 cursor-pointer">
                    <span>👤</span> Add Staff
                </a>
            </nav>
            <div className="p-4 border-t border-orange-200 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-orange-400 text-white flex items-center justify-center font-bold text-sm">A</div>
                    <div>
                        <div className="text-sm font-semibold">{localStorage.user_email || 'Admin'}</div>
                        <div className="text-xs text-gray-400">{localStorage.user_role || 'Admin'}</div>
                    </div>
                </div>
                <Button variant="danger" onClick={() => {
                    localStorage.clear()
                    navigate('/login')
                }}>
                    Logout
                </Button>
            </div>
        </aside>
    )
}