import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import Encuestas from '../Pages/Encuestas'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import MisEncuestas from '../Pages/MisEncuestas'
import EncuestaVista from '../Pages/EncuestaVista'

const RoutesIndex = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/encuestas" element={<Encuestas />} />
            <Route path="/encuestas/:id" element={<EncuestaVista />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/misencuestas" element={<MisEncuestas />} />
        </Routes>
    )
}

export default RoutesIndex
