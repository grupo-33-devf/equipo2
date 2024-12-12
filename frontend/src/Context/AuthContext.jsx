import { createContext, useContext, useState, useEffect } from 'react'


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState(null)

    useEffect(() => {

        const storedToken = localStorage.getItem('token')
        if (storedToken) {
            setToken(storedToken)
            setIsAuthenticated(true)
        }
    }, [])

    const login = (newToken) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('usuario_id')
        setToken(null)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)
