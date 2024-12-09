import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirección
import axios from 'axios';
import '@/styles/form.css';
import logo from '@/assets/react.svg';
import { useAuth } from '@/Context/AuthContext'; // Importa el contexto de autenticación

const Login = () => {
    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Estados para manejo de errores y éxito
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate
    const { login } = useAuth(); // Usa el contexto de autenticación

    // Manejo del cambio en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Manejo del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_URL;

            // Realiza la solicitud POST usando Axios
            const response = await axios.post(`${apiUrl}/api/users/login`, formData);

            if (response.status === 200) {
                console.log('Inicio de sesión exitoso:', response.data);

                // Almacena el token en el contexto y redirige
                login(response.data.token); // Llama al método de login del contexto
                navigate('/'); // Redirige al home
            } else {
                setError('Hubo un problema al iniciar sesión.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Credenciales inválidas. Verifica tu correo y contraseña.');
            } else {
                setError('No se pudo conectar con el servidor.');
            }
        }
    };

    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit}>
                <img
                    className="mb-4"
                    src={logo}
                    alt=""
                    width={72}
                    height={57}
                />
                <h1 className="h3 mb-3 fw-normal">Inicia Sesión</h1>

                {/* Mensajes de error */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Campo para el email */}
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

                {/* Campo para la contraseña */}
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

                {/* Botón de envío */}
                <button className="btn btn-primary w-100 py-2" type="submit">
                    Iniciar Sesión
                </button>
            </form>
        </main>
    );
};

export default Login;
