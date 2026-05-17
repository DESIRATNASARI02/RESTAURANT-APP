import { Link } from 'react-router'

export default function Card({ cuisine }) {
    return (
        <Link to={`/detail/${cuisine.id}`}>
            <div className="bg-white rounded-xl border border-orange-200 shadow-sm overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-lg transition">
                {cuisine.imgUrl ? (
                    <img src={cuisine.imgUrl} alt={cuisine.name} className="w-full h-52 object-cover" />
                ) : (
                    <div className="w-full h-52 bg-orange-100 flex items-center justify-center text-4xl">🍽️</div>
                )}
                <div className="p-5">
                    <div className="text-orange-400 text-xs font-semibold uppercase mb-2">
                        {cuisine.Category?.name || 'Cuisine'}
                    </div>
                    <div className="font-serif text-xl mb-2">{cuisine.name}</div>
                    <div className="text-gray-500 text-sm mb-4 line-clamp-2">{cuisine.description}</div>
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(cuisine.price)}
                        </span>
                        <span className="border border-orange-400 text-orange-400 px-4 py-2 rounded-full text-sm hover:bg-orange-400 hover:text-white transition">
                            View Detail
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}