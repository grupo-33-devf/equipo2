import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const EncuestaVista = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [encuesta, setEncuesta] = useState(null)
    const [preguntas, setPreguntas] = useState([])
    const [respuestas, setRespuestas] = useState({})
    const [estadisticas, setEstadisticas] = useState({})
    const [isCreador, setIsCreador] = useState(false)
    const [error, setError] = useState(null)
    const [cerrada, setCerrada] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'

                const encuestaResponse = await axios.get(`${apiUrl}/api/encuestas/${id}`)
                const encuestaData = encuestaResponse.data
                setEncuesta(encuestaData)

                const creadorId = encuestaData.creador_id
                const usuarioId = localStorage.getItem('usuario_id')
                setIsCreador(creadorId === usuarioId)

                const fechaActual = new Date()
                const fechaInicio = new Date(encuestaData.fecha_inicio)
                const fechaFin = new Date(encuestaData.fecha_fin)
                if (fechaActual < fechaInicio || fechaActual > fechaFin) {
                    setCerrada(true)
                }

                if (creadorId === usuarioId || !(fechaActual < fechaInicio || fechaActual > fechaFin)) {
                    const preguntasResponse = await axios.get(`${apiUrl}/api/preguntas/${id}`)
                    setPreguntas(preguntasResponse.data)

                    if (creadorId === usuarioId) {
                        try {
                            const estadisticasResponse = await axios.get(`${apiUrl}/api/respuestas/${id}`)
                            setEstadisticas(estadisticasResponse.data.respuestas || {})
                        } catch (err) {
                            console.warn('No hay respuestas disponibles para esta encuesta.')
                            setEstadisticas({})
                        }
                    }
                }
            } catch (err) {
                console.error('Error al cargar los datos:', err)
                setError('Hubo un problema al cargar la encuesta.')
            }
        }

        fetchData()
    }, [id])

    const handleRespuestaChange = (preguntaId, respuesta) => {
        setRespuestas({ ...respuestas, [preguntaId]: respuesta })
    }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault()

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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSubmit()
        }
    }

    const calcularPorcentajes = (respuestas) => {
        const totalRespuestas = respuestas.length
        const conteo = respuestas.reduce((acc, respuesta) => {
            acc[respuesta] = (acc[respuesta] || 0) + 1
            return acc
        }, {})

        return Object.entries(conteo)
            .map(([opcion, cantidad]) => ({
                opcion,
                cantidad,
                porcentaje: ((cantidad / totalRespuestas) * 100).toFixed(2),
            }))
            .sort((a, b) => b.cantidad - a.cantidad)
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>
    }

    if (!encuesta) {
        return <div>Cargando encuesta...</div>
    }

    if (cerrada && !isCreador) {
        return (
            <div className="container mt-5">
                <h1>Encuesta cerrada</h1>
                <p>Esta encuesta no está disponible actualmente.</p>
                <button className="btn btn-primary" onClick={() => navigate('/encuestas')}>
                    Volver a Encuestas
                </button>
            </div>
        )
    }

    return (
        <div className="container mt-5">
            <h1>{encuesta.titulo}</h1>
            <p>{encuesta.descripcion}</p>
            <p>
                Vigencia: {new Date(encuesta.fecha_inicio).toLocaleDateString()} -{' '}
                {new Date(encuesta.fecha_fin).toLocaleDateString()}
            </p>

            {!isCreador && (
                <form onKeyDown={handleKeyDown}>
                    {preguntas.map((pregunta) => (
                        <div key={pregunta._id} className="mb-3">
                            <label className="form-label">{pregunta.texto}</label>
                            {pregunta.tipo === 'texto' ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                        handleRespuestaChange(pregunta._id, e.target.value)
                                    }
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

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >
                        Enviar Respuestas
                    </button>
                </form>
            )}

            {isCreador && Object.keys(estadisticas).length > 0 && (
                <div className="mt-5">
                    <h3>Estadísticas</h3>
                    {Object.entries(estadisticas).map(([pregunta, respuestas]) => {
                        const porcentajes = calcularPorcentajes(respuestas)
                        return (
                            <div key={pregunta}>
                                <h5>{pregunta}</h5>
                                <ul>
                                    {porcentajes.map(({ opcion, porcentaje, cantidad }) => (
                                        <li key={opcion}>
                                            {opcion} - {porcentaje}% ({cantidad} votos)
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default EncuestaVista