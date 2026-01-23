import React, { useState } from 'react';
import './Login.css';
import { Button } from '../../components/Button/Button';
import { TextField } from '../../components/TextField/TextField';
import logoImage from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: email,
          password
        })
      });

      console.log('Login response status:', res.status);
      console.log('Login response headers:', res.headers);

      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Error desconocido' }));
        alert(error.message || 'Credenciales inválidas');
        setLoading(false);
        return;
      }

      const data = await res.json().catch((err) => {
        console.error('Error parsing JSON:', err);
        throw new Error('Respuesta inválida del servidor');
      });

      console.log('Login response data:', data);

      if (!data.token) {
        alert('Error: No se recibió el token');
        setLoading(false);
        return;
      }

      // guardar token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', email);

      // ir a home
      navigate('/home');
    } catch (error) {
      console.error('Login error details:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      alert(`Error de conexión con el servidor: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      {/* Background */}
      <div className="login__background">
        <div className="login__background-overlay" />
      </div>

      {/* Header */}
      <header className="login__header">
        <div className="login__header-content">
          <div className="login__logo-section">
            <div className="login__logo">
              <img
                src={logoImage}
                alt="Pasillo Austral Logo"
                className="login__logo-img"
              />
            </div>
            <div className="login__brand">
              <h1 className="login__brand-text">Pasillo Austral</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Card */}
      <div className="login__card">
        <div className="login__card-header">
          <h2 className="login__title">Iniciar sesión</h2>
          <p className="login__terms">
            Al continuar, aceptás nuestros{' '}
            <a href="#" className="login__link">Términos de uso</a>{' '}
            y confirmás que entendés la{' '}
            <a href="#" className="login__link">Política de privacidad.</a>
          </p>
        </div>

        <div className="login__form">
          <div className="login__field-wrapper">
            <TextField
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="login__field-wrapper">
            <TextField
              label="Contraseña"
              type="password"
              required
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <div className="login__links">
            <a href="#" className="login__link login__link--forgot">
              ¿Olvidaste tu contraseña?
            </a>

            <div className="login__register">
              <span className="login__register-text">
                ¿Sos un nuevo usuario?
              </span>{' '}
              <a
                className="login__link"
                onClick={() => navigate('/register')}
              >
                Registrate
              </a>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Log In'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;


