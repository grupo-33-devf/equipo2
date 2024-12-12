import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '@/styles/form.css'
import logo from '@/assets/react.svg'
import { useAuth } from '@/Context/AuthContext'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const apiUrl = import.meta.env.VITE_API_URL

            const response = await axios.post(`${apiUrl}/api/users/login`, formData)

            if (response.status === 200) {
                console.log('Inicio de sesión exitoso:', response.data)

                login(response.data.token)
                localStorage.setItem('usuario_id', response.data.usuario_id)

                navigate('/')
            } else {
                setError('Hubo un problema al iniciar sesión.')
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Credenciales inválidas. Verifica tu correo y contraseña.')
            } else {
                setError('No se pudo conectar con el servidor.')
            }
        }
    }


    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit}>
                <img
                    className="mb-4"
                    src={logo}
                    alt="Logo"
                    width={72}
                    height={57}
                />
                <h1 className="h3 mb-3 fw-normal">Inicia Sesión</h1>

                {error && <div className="alert alert-danger">{error}</div>}

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
                    Iniciar Sesión
                </button>
            </form>
        </main>
    )
}

export default Login
