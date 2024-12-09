import { NavLink } from 'react-router-dom';
import { useAuth } from '@/Context/AuthContext';

const Header = () => {
    const { isAuthenticated, logout } = useAuth(); // Obtén el estado y la función de logout

    const handleLogout = () => {
        logout(); // Limpia el token
        window.location.href = '/'; // Redirige al home
    };

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
                            Home
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
                                    Log Out
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">
                                    Log In
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/signup" className="nav-link">
                                    Sign Up
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
