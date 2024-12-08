import React from 'react'
import emoji_pensando from '../../assets/emoji_pensando.png'

const NoContent = () => {
    return (
        <div className="px-4 py-5 my-5 text-center">
            <img
                className="d-block mx-auto mb-4"
                src={emoji_pensando}
                alt=""
                width={72}
                height={70}
            />
            <h1 className="display-5 fw-bold text-body-emphasis">No hay contenido</h1>
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">
                    Esa idea que tienes en mente puede ser mejor dirigida si sabes que quiere tu publico
                    La mejor forma que tienes de hacerlo es con una encuesta ¡Empieza ahora!
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <a href="/signup">
                        <button type="button" className="btn btn-primary btn-lg px-4 gap-3">
                            Empieza hoy
                        </button>
                    </a>
                </div>
            </div>
        </div>

    )
}

export default NoContent