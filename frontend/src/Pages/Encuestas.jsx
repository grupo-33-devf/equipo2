import React, { useState, useEffect } from 'react';
import EncuestaCard from '../Components/EncuestaCard/EncuestaCard';
import NoContent from '../Components/NoContent/NoContent';
import axios from 'axios';

const Encuestas = () => {
    const [encuestas, setEncuestas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEncuestas = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
                const response = await axios.get(`${apiUrl}/api/encuestas/`);
                setEncuestas(response.data); // Asegúrate de que `response.data` contiene un array de encuestas
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
            <div className="px-4 py-5 my-5 text-center">
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
                        encuestas.map((encuesta, index) => (
                            <div key={encuesta.id || index} className="col-md-4">
                                <EncuestaCard
                                    header={encuesta.titulo}
                                    title={encuesta.descripcion}
                                />
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
