import React from 'react'

const Footer = () => {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p className="col-md-4 mb-0 text-body-secondary">© 2024 Insight Master, Dev</p>
                <a
                    href="/"
                    className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
                >
                    <svg className="bi me-2" width={40} height={32}>
                        <use xlinkHref="#bootstrap" />
                    </svg>
                </a>
                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item">
                        <a href="/" className="nav-link px-2 text-body-secondary">
                            Inicio
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/encuestas" className="nav-link px-2 text-body-secondary">
                            Encuestas
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/signup" className="nav-link px-2 text-body-secondary">
                            Unete
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="https://www.ingjosemario.com" className="nav-link px-2 text-body-secondary">
                            ¡Visita mi pagina!
                        </a>
                    </li>
                </ul>
            </footer>
        </div>

    )
}

export default Footer