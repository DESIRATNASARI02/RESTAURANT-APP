import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import Category from './views/Category'
import AddStaff from './views/AddStaff'
import AddCuisine from './views/AddCuisine'
import EditCuisine from './views/EditCuisine'
import BaseLayout from './views/BaseLayout'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<BaseLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/categories" element={<Category />} />
                    <Route path="/add-staff" element={<AddStaff />} />
                    <Route path="/add-cuisine" element={<AddCuisine />} />
                    <Route path="/edit-cuisine/:id" element={<EditCuisine />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}