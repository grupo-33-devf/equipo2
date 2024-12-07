import React from 'react'

const Header = () => {
    return (
        <nav className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a
                href="/"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
            >
                <svg className="bi me-2" width={40} height={32}>
                    <use xlinkHref="#bootstrap" />
                </svg>
                <span className="fs-4">Encuestas</span>
            </a>
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <a href="/Home" className="nav-link active" aria-current="page">
                        Home
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/Encuestas" className="nav-link">
                        Encuestas
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/Mis encuestas" className="nav-link">
                        Mis encuestas
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/Login" className="nav-link">
                        Log in
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/Singup" className="nav-link">
                        Singup
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Header