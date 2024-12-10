import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoContent from '../Components/NoContent/NoContent';
import { useAuth } from '@/Context/AuthContext';
import FormularioEncuesta from '../Components/FormularioEncuesta/FormularioEncuesta';

const MisEncuestas = () => {
    const { token } = useAuth();
    const [encuestas, setEncuestas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchEncuestas = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                const response = await axios.get(`${apiUrl}/api/encuestas/misencuestas`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEncuestas(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Hubo un problema al cargar tus encuestas.');
                setLoading(false);
            }
        };

        fetchEncuestas();
    }, [token]);

    const handleEncuestaCreada = (nuevaEncuesta) => {
        setEncuestas([...encuestas, nuevaEncuesta]);
    };

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

            setEncuestas((prev) => prev.filter((encuesta) => encuesta._id !== id));
            alert('Encuesta eliminada exitosamente.');
        } catch (err) {
            console.error('Error al eliminar la encuesta:', err);
            alert('No se pudo eliminar la encuesta.');
        }
    };

    if (loading) {
        return <h2>Cargando encuestas...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="container">
            <button className="btn btn-primary mb-4" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancelar' : 'Crear Encuesta'}
            </button>

            {showForm && (
                <FormularioEncuesta
                    onEncuestaCreada={handleEncuestaCreada}
                    cerrarFormulario={() => setShowForm(false)}
                />
            )}

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
