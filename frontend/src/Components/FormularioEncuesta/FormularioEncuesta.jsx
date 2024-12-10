import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@/Context/AuthContext'
import './FormularioEncuesta.css'

const FormularioEncuesta = ({ onEncuestaCreada, cerrarFormulario }) => {
    const { token } = useAuth()

    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const [preguntas, setPreguntas] = useState([])
    const [mensajeExito, setMensajeExito] = useState('')
    const [mensajeError, setMensajeError] = useState('')

    const handleAgregarPregunta = () => {
        setPreguntas([
            ...preguntas,
            { texto: '', tipo: 'opcion_multiple', opciones: [] },
        ])
    }

    const handleEliminarPregunta = (index) => {
        const nuevasPreguntas = preguntas.filter((_, i) => i !== index)
        setPreguntas(nuevasPreguntas)
    }

    const handlePreguntaChange = (index, field, value) => {
        const nuevasPreguntas = [...preguntas]
        nuevasPreguntas[index][field] = value
        setPreguntas(nuevasPreguntas)
    }

    const handleAgregarOpcion = (index) => {
        const nuevasPreguntas = [...preguntas]
        nuevasPreguntas[index].opciones.push('')
        setPreguntas(nuevasPreguntas)
    }

    const handleEliminarOpcion = (preguntaIndex, opcionIndex) => {
        const nuevasPreguntas = [...preguntas]
        nuevasPreguntas[preguntaIndex].opciones.splice(opcionIndex, 1)
        setPreguntas(nuevasPreguntas)
    }

    const handleOpcionChange = (preguntaIndex, opcionIndex, value) => {
        const nuevasPreguntas = [...preguntas]
        nuevasPreguntas[preguntaIndex].opciones[opcionIndex] = value
        setPreguntas(nuevasPreguntas)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMensajeExito('')
        setMensajeError('')

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'


            const encuestaResponse = await axios.post(
                `${apiUrl}/api/encuestas`,
                {
                    titulo,
                    descripcion,
                    fecha_inicio: fechaInicio,
                    fecha_fin: fechaFin,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const encuestaId = encuestaResponse.data._id


            for (const pregunta of preguntas) {
                await axios.post(
                    `${apiUrl}/api/preguntas`,
                    {
                        encuesta_id: encuestaId,
                        tipo: pregunta.tipo,
                        texto: pregunta.texto,
                        opciones: pregunta.opciones,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            }

            setMensajeExito('Encuesta guardada exitosamente.')
            setTitulo('')
            setDescripcion('')
            setFechaInicio('')
            setFechaFin('')
            setPreguntas([])
            onEncuestaCreada(encuestaResponse.data)
            cerrarFormulario()
        } catch (err) {
            console.error('Error al guardar la encuesta:', err)
            setMensajeError('Hubo un problema al guardar la encuesta.')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="formulario-encuesta mb-4">
            <h2>Crear Nueva Encuesta</h2>

            {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}
            {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

            <div className="mb-3">
                <label className="form-label">Título</label>
                <input
                    type="text"
                    className="form-control"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                    className="form-control"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Fecha de Inicio</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Fecha Final</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        required
                    />
                </div>
            </div>

            <h3 className="mb-3">Preguntas</h3>

            {preguntas.map((pregunta, index) => (
                <div key={index} className="mb-4">
                    <label className="form-label">Texto de la Pregunta</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        value={pregunta.texto}
                        onChange={(e) => handlePreguntaChange(index, 'texto', e.target.value)}
                        required
                    />

                    <label className="form-label">Tipo</label>
                    <select
                        className="form-select mb-2"
                        value={pregunta.tipo}
                        onChange={(e) => handlePreguntaChange(index, 'tipo', e.target.value)}
                    >
                        <option value="opcion_multiple">Opción Múltiple</option>
                        <option value="texto">Texto</option>
                    </select>

                    {pregunta.tipo === 'opcion_multiple' && (
                        <div className="opciones">
                            <h5>Opciones</h5>
                            {pregunta.opciones.map((opcion, opcionIndex) => (
                                <div key={opcionIndex} className="d-flex mb-2 align-items-center opciones">
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        value={opcion}
                                        onChange={(e) => handleOpcionChange(index, opcionIndex, e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleEliminarOpcion(index, opcionIndex)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-secondary mt-2"
                                onClick={() => handleAgregarOpcion(index)}
                            >
                                Agregar Opción
                            </button>
                        </div>
                    )}
                    <button
                        type="button"
                        className="btn btn-danger mt-2"
                        onClick={() => handleEliminarPregunta(index)}
                    >
                        Eliminar Pregunta
                    </button>
                </div>
            ))}

            <button
                type="button"
                className="btn btn-outline-primary mb-4"
                onClick={handleAgregarPregunta}
            >
                Agregar Pregunta
            </button>

            <button type="submit" className="btn btn-success w-100">
                Guardar Encuesta
            </button>
        </form>
    )
}

export default FormularioEncuesta
