import { Link } from 'react-router'

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-orange-50/90 backdrop-blur-md border-b border-orange-200 shadow-sm">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="font-serif text-2xl font-bold">Tastoria</Link>
                <div className="flex gap-7">
                    <Link to="/" className="text-sm font-medium text-gray-500 hover:text-orange-400">Home</Link>
                </div>
            </div>
        </nav>
    )
}