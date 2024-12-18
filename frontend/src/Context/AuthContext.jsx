import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {

        const storedToken = localStorage.getItem('token')
        const storedUserId = localStorage.getItem('usuario_id')

        if (storedToken) {
            setToken(storedToken)
            setIsAuthenticated(true)
        }

        const params = new URLSearchParams(location.search)
        const tokenFromURL = params.get('token')
        const userIdFromURL = params.get('usuario_id')

        if (tokenFromURL && userIdFromURL) {
            localStorage.setItem('token', tokenFromURL)
            localStorage.setItem('usuario_id', userIdFromURL)

            setToken(tokenFromURL)
            setIsAuthenticated(true)
            navigate('/')
        }
    }, [location, navigate])

    const login = (newToken, userId) => {
        localStorage.setItem('token', newToken)
        localStorage.setItem('usuario_id', userId)
        setToken(newToken)
        setIsAuthenticated(true)
        navigate('/')
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('usuario_id')
        setToken(null)
        setIsAuthenticated(false)
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
