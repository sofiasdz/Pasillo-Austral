import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { Button } from '../../components/Button/Button';
import { TextField } from '../../components/TextField/TextField';
import logoImage from '../../assets/logo.png';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: email,
          password
        })
      });

      console.log('Register response status:', res.status);

      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Error desconocido' }));
        alert(error.message || 'Error al registrarse');
        setLoading(false);
        return;
      }

      const data = await res.json().catch((err) => {
        console.error('Error parsing JSON:', err);
        throw new Error('Respuesta inválida del servidor');
      });

      console.log('Register response data:', data);

      // registro OK → redirigir a login (not home, since they need to login)
      alert('Usuario registrado correctamente. Por favor inicia sesión.');
      navigate('/login');
    } catch (error) {
      console.error('Register error details:', error);
      alert(`Error de conexión con el servidor: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      {/* Background */}
      <div className="register__background">
        <div className="register__background-overlay" />
      </div>

      {/* Header */}
      <header className="register__header">
        <div className="register__header-content">
          <div className="register__logo-section">
            <div className="register__logo">
              <img
                src={logoImage}
                alt="Pasillo Austral Logo"
                className="register__logo-img"
              />
            </div>
            <div className="register__brand">
              <h1 className="register__brand-text">Pasillo Austral</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Card */}
      <div className="register__card">
        <div className="register__card-header">
          <h2 className="register__title">Registrate</h2>
          <p className="register__terms">
            Al continuar, aceptás nuestros{' '}
            <a href="#" className="register__link">Términos de uso</a>{' '}
            y confirmás que entendés la{' '}
            <a href="#" className="register__link">Política de privacidad.</a>
          </p>
        </div>

        <div className="register__form">
          <div className="register__field-wrapper">
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

          <div className="register__field-wrapper">
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

          <div className="register__links">
            <div className="register__link-group">
              <span className="register__link-group-text">
                ¿Ya tenés usuario?
              </span>{' '}
              <a
                className="register__link"
                onClick={() => navigate('/login')}
              >
                Iniciá sesión
              </a>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrarme'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;


