export default function Button({ children, onClick, type = 'button', variant = 'primary', className = '' }) {
    const styles = {
        primary: 'bg-orange-400 hover:bg-orange-500 text-white font-semibold px-5 py-2 rounded-lg transition',
        secondary: 'border border-orange-200 text-gray-500 hover:border-orange-400 hover:text-orange-400 px-5 py-2 rounded-lg transition',
        danger: 'border border-red-200 text-red-400 hover:bg-red-50 px-5 py-2 rounded-lg transition'
    }

    return (
        <button type={type} onClick={onClick} className={`${styles[variant]} ${className}`}>
            {children}
        </button>
    )
}