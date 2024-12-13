import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EncuestaCard from '../Components/EncuestaCard/EncuestaCard';
import NoContent from '../Components/NoContent/NoContent';
import axios from 'axios';

const Encuestas = () => {
    const [encuestas, setEncuestas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEncuestas = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                const response = await axios.get(`${apiUrl}/api/encuestas/`);

                const fechaActual = new Date();
                const encuestasFiltradas = response.data.filter((encuesta) => {
                    const fechaInicio = new Date(encuesta.fecha_inicio);
                    const fechaFin = new Date(encuesta.fecha_fin);
                    return fechaInicio <= fechaActual && fechaFin >= fechaActual;
                });

                setEncuestas(encuestasFiltradas);
                setLoading(false);
            } catch (err) {
                setError('Hubo un problema al cargar las encuestas.');
                setLoading(false);
            }
        };

        fetchEncuestas();
    }, []);

    if (loading) {
        return (
            <main>
                <div className="px-4 py-5 my-5 text-center">
                    <h1 className="display-5 fw-bold text-body-emphasis">Cargando encuestas...</h1>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main>
                <div className="px-4 py-5 my-5 text-center">
                    <h1 className="display-5 fw-bold text-body-emphasis">Error</h1>
                    <p>{error}</p>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="px-4 my-5 text-center">
                <h1 className="display-5 fw-bold text-body-emphasis">Ayuda a otros a resolver sus dudas</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                        Una encuesta es el ejercicio perfecto para empezar un nuevo proyecto,
                        saber los gustos de la gente, cuáles son las nuevas tendencias de un campo
                        que desconoces o reforzar tus ideas. Ayuda a otros a llegar al lugar correcto
                        en su nuevo emprendimiento.
                    </p>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    {encuestas.length > 0 ? (
                        encuestas.map((encuesta) => (
                            <div key={encuesta._id} className="col-md-4">
                                <div
                                    onClick={() => navigate(`/encuestas/${encuesta._id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <EncuestaCard
                                        header={encuesta.titulo}
                                        title={encuesta.descripcion}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <NoContent />
                    )}
                </div>
            </div>
        </main>
    );
};

export default Encuestas;
