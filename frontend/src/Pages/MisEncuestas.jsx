import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoContent from '../Components/NoContent/NoContent';
import { useAuth } from '@/Context/AuthContext';
import FormularioEncuesta from '../Components/FormularioEncuesta/FormularioEncuesta';
import { useNavigate } from 'react-router-dom';

const MisEncuestas = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [encuestas, setEncuestas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [totalActivas, setTotalActivas] = useState(0);
    const [totalPersonas, setTotalPersonas] = useState(0);
    const [encuestaEditando, setEncuestaEditando] = useState(null);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchEncuestas = async () => {
            setLoading(true);
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

                const response = await axios.get(`${apiUrl}/api/encuestas/misencuestas`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const encuestasData = response.data;

                const activas = encuestasData.filter(encuesta =>
                    isEncuestaDisponible(encuesta.fecha_inicio, encuesta.fecha_fin)
                ).length;
                setTotalActivas(activas);

                let totalRespuestasGlobal = 0;

                const respuestasPromises = encuestasData.map(async encuesta => {
                    try {
                        const respuestasResponse = await axios.get(`${apiUrl}/api/respuestas/${encuesta._id}`);
                        const respuestas = respuestasResponse.data.respuestas || {};

                        const totalRespuestas = Object.values(respuestas).reduce(
                            (acc, curr) => acc + curr.length, 0
                        );

                        totalRespuestasGlobal += totalRespuestas;

                        return { ...encuesta, personas: totalRespuestas || 0 };
                    } catch {
                        return { ...encuesta, personas: 0 };
                    }
                });

                const encuestasConPersonas = await Promise.all(respuestasPromises);

                setEncuestas(encuestasConPersonas);
                setTotalPersonas(totalRespuestasGlobal);
            } catch (err) {
                console.error(err);
                setError('Hubo un problema al cargar tus encuestas.');
            } finally {
                setLoading(false);
            }
        };

        fetchEncuestas();
    }, [token]);

    const handleEncuestaCreada = nuevaEncuesta => {
        setEncuestas([...encuestas, nuevaEncuesta]);
    };

    const handleEncuestaEditada = encuestaEditada => {
        setEncuestas(
            encuestas.map(encuesta => (encuesta._id === encuestaEditada._id ? encuestaEditada : encuesta))
        );
        setShowForm(false);
        setEncuestaEditando(null);
    };

    const handleDelete = async id => {
        if (!id) {
            alert('ID de encuesta no válido.');
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            await axios.delete(`${apiUrl}/api/encuestas/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setEncuestas(prev => prev.filter(encuesta => encuesta._id !== id));
            alert('Encuesta eliminada exitosamente.');
        } catch (err) {
            console.error('Error al eliminar la encuesta:', err);
            alert('No se pudo eliminar la encuesta.');
        }
    };

    const isEncuestaDisponible = (fechaInicio, fechaFin) => {
        const fechaActual = new Date();
        return fechaActual >= new Date(fechaInicio) && fechaActual <= new Date(fechaFin);
    };

    if (!token) {
        return <h2>Inicia sesión para ver tus encuestas.</h2>;
    }

    if (loading) {
        return <h2>Cargando encuestas...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="container">
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Encuestas Activas</h5>
                            <p className="card-text">{totalActivas}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Respuestas Totales</h5>
                            <p className="card-text">{totalPersonas}</p>
                        </div>
                    </div>
                </div>
            </div>

            <button
                className="btn btn-primary mb-4"
                onClick={() => {
                    setShowForm(!showForm);
                    setEncuestaEditando(null);
                }}
            >
                {showForm && !encuestaEditando ? 'Cancelar' : 'Crear Encuesta'}
            </button>

            {showForm && (
                <FormularioEncuesta
                    encuesta={encuestaEditando}
                    onEncuestaCreada={handleEncuestaCreada}
                    onEncuestaEditada={handleEncuestaEditada}
                    cerrarFormulario={() => {
                        setShowForm(false);
                        setEncuestaEditando(null);
                    }}
                />
            )}

            {encuestas.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Estado</th>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Fecha de Inicio</th>
                            <th>Fecha Final</th>
                            <th>Respuestas</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {encuestas.map(encuesta => {
                            const disponible = isEncuestaDisponible(encuesta.fecha_inicio, encuesta.fecha_fin);
                            return (
                                <tr key={encuesta._id}>
                                    <td>
                                        <i
                                            className={`bi ${disponible ? 'bi-circle-fill text-success' : 'bi-circle-fill text-danger'
                                                }`}
                                            title={disponible ? 'Disponible' : 'No disponible'}
                                        ></i>
                                    </td>
                                    <td>{encuesta.titulo}</td>
                                    <td>{encuesta.descripcion}</td>
                                    <td>{new Date(encuesta.fecha_inicio).toLocaleDateString()}</td>
                                    <td>{new Date(encuesta.fecha_fin).toLocaleDateString()}</td>
                                    <td>{encuesta.personas || 0}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary me-2"
                                            onClick={() => navigate(`/encuestas/${encuesta._id}`)}
                                        >
                                            <i className="bi bi-box-arrow-up-right"></i> Ver Encuesta
                                        </button>
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() => {
                                                setEncuestaEditando(encuesta);
                                                setShowForm(true);
                                            }}
                                        >
                                            <i className="bi bi-pencil"></i> Editar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(encuesta._id)}
                                        >
                                            <i className="bi bi-trash"></i> Eliminar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <NoContent />
            )}
        </div>
    );
};

export default MisEncuestas;
