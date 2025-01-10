import '@/styles/Gracias.css'
import { useAuth } from '@/Context/AuthContext'

const Gracias = () => {

    const { isAuthenticated } = useAuth()

    return (
        <div className='gracias'>
            <div className="px-4 py-5 my-5 text-center">
                <div className='icon-check'>
                    <i class="bi bi-check-circle"></i>
                </div>
                <h1 className="display-5 fw-bold text-body-emphasis">¡Gracias por participar!</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                        Gracias a tu encuesta puedes ayudar a muchisimas personas a llegar mas
                        facil a sus metas, te inivitamos a seguir participando o si gustas puedes
                        empezar una nueva encuesta
                    </p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        {!isAuthenticated ? (
                            <>
                                <a href="/encuestas">
                                    <button type="button" className="btn btn-primary btn-lg px-4 me-sm-3">
                                        Mas Encuestas
                                    </button>
                                </a>
                                <a href="/signup">
                                    <button type="button" className="btn btn-outline-secondary btn-lg px-4">
                                        Registrate
                                    </button>
                                </a>
                            </>
                        ) : (
                            <>
                                <a href="/encuestas">
                                    <button type="button" className="btn btn-primary btn-lg px-4 me-sm-3">
                                        Más Encuestas
                                    </button>
                                </a>
                                <a href="/misencuestas">
                                    <button type="button" className="btn btn-outline-secondary btn-lg px-4">
                                        Publica una encuesta
                                    </button>
                                </a>
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Gracias