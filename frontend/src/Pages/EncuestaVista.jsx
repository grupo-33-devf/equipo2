import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const EncuestaVista = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [encuesta, setEncuesta] = useState(null)
    const [preguntas, setPreguntas] = useState([])
    const [respuestas, setRespuestas] = useState({})
    const [error, setError] = useState(null)
    const [shortUrl, setShortUrl] = useState('')
    const [qrCodeData, setQrCodeData] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'

                const encuestaResponse = await axios.get(`${apiUrl}/api/encuestas/${id}`)
                const encuestaData = encuestaResponse.data
                setEncuesta(encuestaData)

                const preguntasResponse = await axios.get(`${apiUrl}/api/preguntas/${id}`)
                setPreguntas(preguntasResponse.data)
            } catch (err) {
                console.error('Error al cargar los datos:', err)
                setError('Hubo un problema al cargar la encuesta.')
            }
        }

        fetchData()
    }, [id])

    const handleCompartir = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'

            const shortUrlResponse = await axios.get(`${apiUrl}/api/urls/${id}/short_url`)
            if (shortUrlResponse.data.urlAcortada) {
                setShortUrl(shortUrlResponse.data.urlAcortada)
            } else {
                throw new Error('No se pudo obtener la URL corta.')
            }

            const qrResponse = await axios.get(`${apiUrl}/api/urls/${id}/qr-code`)
            if (qrResponse.data.qrCodeData) {
                setQrCodeData(qrResponse.data.qrCodeData)
            } else {
                throw new Error('No se pudo obtener el código QR.')
            }
        } catch (err) {
            console.error('Error al generar enlace para compartir:', err)
            alert('Hubo un problema al generar el enlace y el código QR.')
        }
    }

    const handleRespuestaChange = (preguntaId, respuesta) => {
        setRespuestas({ ...respuestas, [preguntaId]: respuesta })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
            const respuestasArray = Object.entries(respuestas).map(([preguntaId, respuesta]) => ({
                encuesta_id: id,
                pregunta_id: preguntaId,
                respuesta,
            }))

            for (const respuesta of respuestasArray) {
                await axios.post(`${apiUrl}/api/respuestas`, respuesta)
            }

            alert('Respuestas enviadas exitosamente.')
            navigate('/encuestas')
        } catch (err) {
            console.error('Error al enviar respuestas:', err)
            alert('Hubo un problema al enviar las respuestas.')
        }
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>
    }

    if (!encuesta) {
        return <div>Cargando encuesta...</div>
    }

    return (
        <div className="container mt-5">
            <h1>{encuesta.titulo}</h1>
            <p>{encuesta.descripcion}</p>
            <p>
                Vigencia: {new Date(encuesta.fecha_inicio).toLocaleDateString()} -{' '}
                {new Date(encuesta.fecha_fin).toLocaleDateString()}
            </p>

            {/* Botón Compartir */}
            <button className="btn btn-primary mb-3" onClick={handleCompartir}>
                Compartir Encuesta
            </button>

            {/* Mostrar la URL corta y el QR si están disponibles */}
            {shortUrl && (
                <div className="mb-3">
                    <p>
                        <strong>Enlace corto:</strong>{' '}
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                            {shortUrl}
                        </a>
                    </p>
                    {qrCodeData && (
                        <div>
                            <p><strong>Código QR:</strong></p>
                            <img src={qrCodeData} alt="Código QR" style={{ width: '200px' }} />
                        </div>
                    )}
                </div>
            )}

            {/* Formulario de respuestas */}
            <form onSubmit={handleSubmit}>
                {preguntas.map((pregunta) => (
                    <div key={pregunta._id} className="mb-3">
                        <label className="form-label">{pregunta.texto}</label>
                        {pregunta.tipo === 'texto' ? (
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => handleRespuestaChange(pregunta._id, e.target.value)}
                            />
                        ) : (
                            <div>
                                {pregunta.opciones.map((opcion, index) => (
                                    <div key={index} className="form-check">
                                        <input
                                            type="radio"
                                            name={`pregunta-${pregunta._id}`}
                                            id={`pregunta-${pregunta._id}-opcion-${index}`}
                                            value={opcion}
                                            className="form-check-input"
                                            onChange={() =>
                                                handleRespuestaChange(pregunta._id, opcion)
                                            }
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`pregunta-${pregunta._id}-opcion-${index}`}
                                        >
                                            {opcion}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <button type="submit" className="btn btn-success">
                    Enviar Respuestas
                </button>
            </form>
        </div>
    )
}

export default EncuestaVista
