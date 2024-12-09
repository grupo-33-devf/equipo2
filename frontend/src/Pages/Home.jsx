import React from 'react'
import dashboard from '@/assets/dashboard.png'
import { useAuth } from '@/Context/AuthContext'

const Home = () => {

    const { isAuthenticated } = useAuth()

    return (
        <main>
            <div className="px-4 pt-5 my-5 text-center border-bottom">
                <h1 className="display-4 fw-bold text-body-emphasis">Insight Master</h1>
                <h2 className="display-8 fw-bold text-body-emphasis"> Tu mejor opción en encuestas</h2>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                        Obtén datos precisos y accionables con nuestras soluciones rápidas,
                        personalizadas y de alta calidad.
                    </p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">

                        {!isAuthenticated ? (
                            <>
                                <a href="/signin">
                                    <button type="button" className="btn btn-primary btn-lg px-4 me-sm-3">
                                        Empieza hoy
                                    </button>
                                </a>
                            </>
                        ) : (
                            <>
                            </>
                        )
                        }

                        <a href="/encuestas">
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4">
                                Ayuda a otros
                            </button>
                        </a>
                    </div>
                </div>
                <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
                    <div className="container px-5">
                        <img
                            src={dashboard}
                            className="img-fluid border rounded-3 shadow-lg mb-4"
                            alt="Example image"
                            width={700}
                            height={500}
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>

            <div className="container px-4 py-5" id="featured-3">
                <h2 className="pb-2 border-bottom">Tu mejor opción</h2>
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                    <div className="feature col">
                        <div
                            className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"
                            style={{ width: '3rem', height: '3rem', borderRadius: '50%' }}
                        >
                            <i class="bi bi-emoji-laughing"></i>
                        </div>
                        <h3 className="fs-2 text-body-emphasis">Totalmente gratis</h3>
                        <p>
                            Configura tus encuestas en minutos con opciones de personalización que
                            se adaptan a tus necesidades. Elige entre diferentes tipos de preguntas y
                            estilos
                        </p>
                        <a href="/encuestas" className="icon-link">
                            Empieza hoy
                            <svg className="bi">
                                <use xlinkHref="#chevron-right" />
                            </svg>
                        </a>
                    </div>
                    <div className="feature col">
                        <div
                            className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"
                            style={{ width: '3rem', height: '3rem', borderRadius: '50%' }}
                        >
                            <i class="bi bi-bar-chart"></i>
                        </div>
                        <h3 className="fs-2 text-body-emphasis">Análisis en Tiempo Real</h3>
                        <p>
                            Obtén resultados al instante y visualízalos en gráficos dinámicos.
                            Analiza las respuestas para tomar decisiones informadas y optimizar
                            tus estrategias
                        </p>
                        <a href="/encuestas" className="icon-link">
                            Empieza hoy
                            <svg className="bi">
                                <use xlinkHref="#chevron-right" />
                            </svg>
                        </a>
                    </div>
                    <div className="feature col">
                        <div
                            className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"
                            style={{ width: '3rem', height: '3rem', borderRadius: '50%' }}
                        >
                            <i class="bi bi-share"></i>
                        </div>
                        <h3 className="fs-2 text-body-emphasis">Compartir con Facilidad</h3>
                        <p>
                            Comparte tus encuestas con un solo clic mediante enlaces cortos o
                            códigos QR. Llega a más personas de forma rápida y eficiente
                        </p>
                        <a href="/encuestas" className="icon-link">
                            Empieza hoy
                            <svg className="bi">
                                <use xlinkHref="#chevron-right" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>


        </main>
    )
}

export default Home