import { NavLink } from 'react-router-dom'
import { useAuth } from '@/Context/AuthContext'
import React, { useState, useEffect } from 'react'
import './Header.css'

const Header = () => {
    const { isAuthenticated, logout } = useAuth()

    const handleLogout = () => {
        logout()
        window.location.href = '/'
    }

    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {

        const savedMode = localStorage.getItem('darkMode') === 'true'
        setDarkMode(savedMode)
        if (savedMode) {
            document.body.classList.add('dark-mode')
        }
    }, [])

    const toggleDarkMode = () => {
        const newMode = !darkMode
        setDarkMode(newMode)
        if (newMode) {
            document.body.classList.add('dark-mode')
        } else {
            document.body.classList.remove('dark-mode')
        }

        localStorage.setItem('darkMode', newMode)
    }

    return (
        <header className="container">
            <nav className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <NavLink
                    to="/"
                    className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
                >
                    <span className="fs-4">Insight Master</span>
                </NavLink>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" aria-current="page">
                            Inicio
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/encuestas" className="nav-link">
                            Encuestas
                        </NavLink>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <NavLink to="/misencuestas" className="nav-link">
                                    Mis Encuestas
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={handleLogout}>
                                    Cerrar sesión
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">
                                    Identificate
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/signup" className="nav-link">
                                    Registrate
                                </NavLink>
                            </li>
                        </>
                    )}
                    <li className="nav-item">
                        <button
                            className="btn btn-outline-secondary nav-link"
                            onClick={toggleDarkMode}
                            style={{ border: 'none', background: 'none' }}
                        >
                            {darkMode ? (
                                <i className="bi bi-sun-fill"></i>
                            ) : (
                                <i className="bi bi-moon-fill"></i>
                            )}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
