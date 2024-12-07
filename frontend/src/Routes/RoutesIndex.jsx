import { Routes, Route } from 'react-router-dom'
import Encuestas from '@/Pages/Encuestas'
import Home from '@/Pages/Home'
import Login from '@/Pages/Login'
import Signup from '@/Pages/Signup'
import MisEncuestas from '@/Pages/MisEncuestas'

const RoutesIndex = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/encuestas" element={<Encuestas />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/misencuestas" element={<MisEncuestas />} />
        </Routes>
    )
}

export default RoutesIndex