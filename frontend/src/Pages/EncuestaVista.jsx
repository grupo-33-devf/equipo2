import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EncuestaVista = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [encuesta, setEncuesta] = useState(null);
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState({});
    const [estadisticas, setEstadisticas] = useState({});
    const [error, setError] = useState(null);
    const [shortUrl, setShortUrl] = useState('');
    const [qrCodeData, setQrCodeData] = useState('');
    const [esCreador, setEsCreador] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                const userId = localStorage.getItem('usuario_id');

                // Obtener datos de la encuesta
                const encuestaResponse = await axios.get(`${apiUrl}/api/encuestas/${id}`);
                const encuestaData = encuestaResponse.data;
                setEncuesta(encuestaData);

                // Determinar si el usuario es el creador
                setEsCreador(encuestaData.creador_id === userId);

                // Obtener preguntas
                const preguntasResponse = await axios.get(`${apiUrl}/api/preguntas/${id}`);
                setPreguntas(preguntasResponse.data);

                // Obtener estadísticas si el usuario es el creador
                if (encuestaData.creador_id === userId) {
                    const respuestasResponse = await axios.get(`${apiUrl}/api/respuestas/${id}`);
                    setEstadisticas(respuestasResponse.data.respuestas || {});
                }
            } catch (err) {
                console.error('Error al cargar los datos:', err);
                setError('Hubo un problema al cargar la encuesta.');
            }
        };

        fetchData();
    }, [id]);

    const handleCompartir = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

            const shortUrlResponse = await axios.get(`${apiUrl}/api/urls/${id}/short_url`);
            setShortUrl(shortUrlResponse.data.urlAcortada);

            const qrResponse = await axios.get(`${apiUrl}/api/urls/${id}/qr-code`);
            setQrCodeData(qrResponse.data.qrCodeData);
        } catch (err) {
            console.error('Error al generar enlace para compartir:', err);
            alert('Hubo un problema al generar el enlace y el código QR.');
        }
    };

    const handleSubmit = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const respuestasArray = Object.entries(respuestas).map(([preguntaId, respuesta]) => ({
                encuesta_id: id,
                pregunta_id: preguntaId,
                respuesta,
            }));

            // Validar que todas las preguntas tengan respuesta
            if (respuestasArray.length !== preguntas.length) {
                alert('Por favor responde todas las preguntas.');
                return;
            }

            console.log('Enviando respuestas al servidor:', respuestasArray);

            for (const respuesta of respuestasArray) {
                await axios.post(`${apiUrl}/api/respuestas`, respuesta);
            }

            alert('Respuestas enviadas exitosamente.');
            navigate('/encuestas');
        } catch (err) {
            console.error('Error al enviar respuestas:', err.response?.data || err.message);
            alert('Hubo un problema al enviar las respuestas.');
        }
    };

    const generarDatosGrafica = (respuestas) => {
        if (!respuestas || respuestas.length === 0) return { labels: [], data: [] };

        const conteo = respuestas.reduce((acc, respuesta) => {
            acc[respuesta] = (acc[respuesta] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(conteo);
        const data = Object.values(conteo);

        return { labels, data };
    };

    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!encuesta) return <div>Cargando encuesta...</div>;

    return (
        <div className="container mt-5">
            <h1>{encuesta.titulo}</h1>
            <p>{encuesta.descripcion}</p>
            <p>
                Vigencia: {new Date(encuesta.fecha_inicio).toLocaleDateString()} -{' '}
                {new Date(encuesta.fecha_fin).toLocaleDateString()}
            </p>

            <button className="btn btn-primary mb-3" onClick={handleCompartir}>
                Compartir Encuesta
            </button>

            {shortUrl && (
                <div className="mb-3">
                    <p>
                        <strong>Enlace corto:</strong>{' '}
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                            {shortUrl}
                        </a>
                    </p>
                    {qrCodeData && <img src={qrCodeData} alt="Código QR" style={{ width: '200px' }} />}
                </div>
            )}

            {preguntas.map((pregunta) => {
                const respuestasPregunta = estadisticas[pregunta.texto] || [];
                const { labels, data } = generarDatosGrafica(respuestasPregunta);

                return (
                    <div key={pregunta._id} className="mb-5">
                        <h5>{pregunta.texto}</h5>

                        {esCreador && respuestasPregunta.length >= 2 && labels.length <= 10 && (
                            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                                <Bar
                                    data={{
                                        labels,
                                        datasets: [
                                            {
                                                label: 'Respuestas',
                                                data,
                                                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                    }}
                                    height={300}
                                />
                            </div>
                        )}

                        {!esCreador && (
                            <>
                                {pregunta.tipo === 'texto' ? (
                                    <input
                                        type="text"
                                        className="form-control mt-2"
                                        placeholder="Tu respuesta"
                                        onChange={(e) =>
                                            setRespuestas({
                                                ...respuestas,
                                                [pregunta._id]: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    pregunta.opciones.map((opcion, index) => (
                                        <div key={index} className="form-check">
                                            <input
                                                type="radio"
                                                name={`pregunta-${pregunta._id}`}
                                                className="form-check-input"
                                                value={opcion}
                                                onChange={() =>
                                                    setRespuestas({
                                                        ...respuestas,
                                                        [pregunta._id]: opcion,
                                                    })
                                                }
                                            />
                                            <label className="form-check-label">{opcion}</label>
                                        </div>
                                    ))
                                )}
                            </>
                        )}
                    </div>
                );
            })}

            {!esCreador && (
                <button type="button" className="btn btn-success mt-3" onClick={handleSubmit}>
                    Enviar Respuestas
                </button>
            )}
            {esCreador && <p className="texto-creador">Eres el creador de esta encuesta y no puedes responderla.</p>}
        </div>
    );
};

export default EncuestaVista;
