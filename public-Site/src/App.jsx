import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './views/HomePage'
import DetailPage from './views/DetailPage'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
            </Routes>
        </BrowserRouter>
    )
}