import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none ${isActive ? 'active' : ''
                    }`
                }
            >
                <span className="fs-4">Encuestas</span>
            </NavLink>
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/encuestas" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Encuestas
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/misencuestas" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Mis encuestas
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Log in
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/signup" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Signup
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
