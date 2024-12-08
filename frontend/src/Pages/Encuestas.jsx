import React from 'react'
import NoContent from '../Components/NoContent/NoContent'

const Encuestas = () => {
    return (
        <main>
            <div className="px-4 py-5 my-5 text-center">
                <h1 className="display-5 fw-bold text-body-emphasis">Ayuda a otros a resolver sus dudas</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                        Una encuesta es el ejercicio perfecto para empezar un nuevo proyecto,
                        saber los gustos de la gente, cuales son las nuevas tendencias de un campo
                        que desconoces o reforzar tus ideas, ayuda a otros a llegar al lugar correcto
                        en su nuevo emprendimiento
                    </p>
                </div>
            </div>

            <NoContent />

        </main>
    )
}

export default Encuestas