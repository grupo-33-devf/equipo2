import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@/styles/form.css';
import logo from '@/assets/logo.png';

const Signup = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_URL;

            const response = await axios.post(`${apiUrl}/api/users/register`, formData);

            if (response.status === 201) {
                console.log('Usuario registrado exitosamente:', response.data);

                // Muestra un mensaje de éxito
                setMessage('Registro exitoso. Serás redirigido al login en 20 segundos.');

                // Borra cualquier mensaje de error previo
                setError('');

                // Redirige a la página de login después de 20 segundos
                setTimeout(() => {
                    navigate('/login');
                }, 20000);
            } else {
                setError('Hubo un problema al registrarte.');
                setMessage('');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError('El usuario ya está registrado.');
            } else {
                setError('No se pudo conectar con el servidor.');
            }
            setMessage('');
        }
    };

    const handleGoogleAuth = () => {
        window.location.href = 'http://localhost:8000/api/auth/google';
    };

    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit}>
                <img className="mb-4" src={logo} alt="" width={90} height={80} />
                <h1 className="h3 mb-3 fw-normal">Regístrate</h1>

                {/* Mensaje de éxito */}
                {message && <div className="alert alert-success">{message}</div>}

                {/* Mensaje de error */}
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        name="nombre"
                        placeholder="Nombre completo"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="floatingName">Nombre completo</label>
                </div>
                <div className="form-floating">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        name="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="floatingInput">Correo electrónico</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="floatingPassword">Contraseña</label>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">
                    Registrarse
                </button>

                <hr />
                <button
                    type="button"
                    className="btn btn-danger w-100 py-2"
                    onClick={handleGoogleAuth}
                >
                    <i className="bi bi-google"></i> Registrarse con Google
                </button>
            </form>
        </main>
    );
};

export default Signup;
