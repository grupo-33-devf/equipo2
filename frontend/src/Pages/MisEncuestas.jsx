import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoContent from '../Components/NoContent/NoContent';
import { useAuth } from '@/Context/AuthContext';

const MisEncuestas = () => {
    const [encuestas, setEncuestas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchEncuestas = async () => {
            if (!token) {
                setError('No se encontró un token válido.');
                setLoading(false);
                return;
            }

            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                const response = await axios.get(`${apiUrl}/api/encuestas/misencuestas`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setEncuestas(response.data); // Ajusta al formato de tu respuesta
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Hubo un problema al cargar tus encuestas.');
                setLoading(false);
            }
        };

        fetchEncuestas();

    }, [token]);

    const handleDelete = async (id) => {
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

            // Elimina la encuesta del estado local
            setEncuestas((prev) => prev.filter((encuesta) => encuesta._id !== id));
            alert('Encuesta eliminada exitosamente.');
        } catch (err) {
            console.error('Error al eliminar la encuesta:', err);
            alert('No se pudo eliminar la encuesta.');
        }
    };

    if (loading) {
        return (
            <div className="text-center">
                <h2>Cargando encuestas...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center">
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div className="container">
            {encuestas.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Fecha de Inicio</th>
                            <th>Fecha Final</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {encuestas.map((encuesta) => (
                            <tr key={encuesta._id}>
                                <td>{encuesta.titulo}</td>
                                <td>{encuesta.descripcion}</td>
                                <td>{new Date(encuesta.fecha_inicio).toLocaleDateString()}</td>
                                <td>{new Date(encuesta.fecha_fin).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(encuesta._id)}
                                    >
                                        <i className="bi bi-trash"></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <NoContent />
            )}
        </div>
    );
};

export default MisEncuestas;
